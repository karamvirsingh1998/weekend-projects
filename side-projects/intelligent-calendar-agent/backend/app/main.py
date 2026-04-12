import asyncio
import uuid
from contextlib import asynccontextmanager
from urllib.parse import quote, urlparse

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field

from app.agent_runner import run_agent_turn
from app.calendar_facade import CalendarFacade
from app.calendar_mock import MockCalendar
from app.config import settings
from app.consolidation import consolidate_session
from app.memory_bootstrap import ensure_preloaded_memories
from app.observability import log_event, new_req_id, setup_logging
from app.oauth_redirect import resolve_redirect_uri
from app.oauth_state import sign_oauth_return_to, validate_return_to_url, verify_oauth_return_state
from app.store import Store, load_personas

setup_logging()

store = Store()
mock_calendar = MockCalendar()
facade = CalendarFacade(store, mock_calendar)


@asynccontextmanager
async def lifespan(app: FastAPI):
    log_event(
        "startup.oauth_redirect_allowlist",
        extra={
            "merged_backend_oauth_callbacks": settings.backend_oauth_redirect_uris_for_allowlist(),
            "uris": settings.allowed_redirect_uris_list(),
            "google_register_this_redirect_uri": settings.google_oauth_backend_redirect_uri(),
            "hint": (
                "merged_backend_oauth_callbacks must stay in the allowlist; if missing, fix PUBLIC_BACKEND_URL / "
                "google_oauth_callback_uri. Add google_register_this_redirect_uri to Google Cloud → Web client."
            ),
        },
    )
    ensure_preloaded_memories(store)
    task = asyncio.create_task(_consolidation_loop())
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass


app = FastAPI(title="Intelligent Calendar Agent", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def _consolidation_loop() -> None:
    idle = float(settings.idle_consolidation_seconds)
    while True:
        await asyncio.sleep(5)
        try:
            due = store.list_due_consolidations()
            for sid in due:
                if not store.session_stale_for_consolidation(sid, idle):
                    store.reschedule_consolidation(sid, idle)
                    continue
                sess = store.get_session(sid)
                if not sess:
                    store.clear_pending_consolidation(sid)
                    continue
                uid = sess["user_id"]
                rid = new_req_id()
                log_event("memory.consolidation_start", req_id=rid, session_id=sid, user_id=uid)
                consolidate_session(store, sid, uid, rid)
                store.clear_pending_consolidation(sid)
        except Exception as e:
            log_event("memory.consolidation_loop_error", extra={"error": str(e)})


class ChatIn(BaseModel):
    user_id: str = Field(..., description="Persona id, e.g. priya")
    message: str
    session_id: str | None = None


class ChatOut(BaseModel):
    reply: str
    session_id: str
    intent: str
    req_id: str
    observability: dict


@app.get("/health")
def health():
    oauth_row = store.get_oauth()
    has_refresh = bool(oauth_row and oauth_row.get("refresh_token"))
    live = facade.use_live_google()
    return {
        "status": "ok",
        "using_google_calendar_api": live,
        "mock_calendar": not live,
        "mock_calendar_env": settings.mock_calendar_default,
        "google_oauth_token_present": has_refresh,
        "google_calendar_hint": (
            "Live Calendar active."
            if live
            else (
                "Using in-memory mock calendar — set MOCK_CALENDAR_DEFAULT=false in .env and complete "
                "'Link Google Calendar' so tokens are saved, then restart uvicorn."
                if not has_refresh
                else "Mock mode forced by MOCK_CALENDAR_DEFAULT=true."
            )
        ),
    }


@app.get("/api/personas")
def personas():
    data = load_personas()
    return {"personas": data.get("personas", [])}


@app.get("/api/memory")
def get_memory(user_id: str):
    return {
        "user_id": user_id,
        "user_memory": store.list_user_memory(user_id),
        "agent_memory": store.list_agent_memory(),
    }


@app.post("/api/chat", response_model=ChatOut)
def chat(body: ChatIn):
    if not settings.openai_api_key:
        raise HTTPException(503, "OPENAI_API_KEY not configured")
    req_id = new_req_id()
    session_id = body.session_id or str(uuid.uuid4())
    store.ensure_session(session_id, body.user_id)
    store.touch_session(session_id)

    user_mem = store.list_user_memory(body.user_id)
    agent_mem = store.list_agent_memory()

    prior = store.recent_messages(session_id, limit=24)
    messages: list[dict[str, str]] = []
    messages.extend(prior)
    messages.append({"role": "user", "content": body.message})

    from openai import OpenAI

    client = OpenAI(api_key=settings.openai_api_key)
    reply, meta = run_agent_turn(
        client=client,
        facade=facade,
        user_id=body.user_id,
        persona_id=body.user_id,
        messages=messages,
        req_id=req_id,
        user_memory=user_mem,
        agent_memory=agent_mem,
    )

    store.append_message(session_id, "user", body.message)
    store.append_message(session_id, "assistant", reply)
    store.touch_session(session_id)
    store.schedule_consolidation(session_id, float(settings.idle_consolidation_seconds))

    log_event(
        "chat.completed",
        req_id=req_id,
        user_id=body.user_id,
        session_id=session_id,
        intent=meta.get("intent"),
        extra={"tool_rounds": meta.get("tool_rounds")},
    )

    return ChatOut(
        reply=reply,
        session_id=session_id,
        intent=meta.get("intent", "unknown"),
        req_id=req_id,
        observability={
            "tool_rounds": meta.get("tool_rounds"),
            "decision_log": meta.get("decision_log"),
        },
    )


class OAuthExchange(BaseModel):
    code: str
    redirect_uri: str = Field(..., description="Same value used when starting OAuth (browser origin + /).")


@app.post("/api/auth/google/exchange")
def google_exchange(body: OAuthExchange):
    log_event(
        "oauth.exchange_attempt",
        extra={"redirect_uri": body.redirect_uri[:80] if body.redirect_uri else None},
    )
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(400, "Google OAuth not configured on server")
    redirect_uri = resolve_redirect_uri(body.redirect_uri)

    from app.calendar_google import make_flow

    flow = make_flow(redirect_uri)
    try:
        flow.fetch_token(code=body.code)
    except Exception as e:
        log_event("oauth.exchange_error", extra={"error": str(e)})
        raise HTTPException(400, f"Token exchange failed: {e}") from e
    creds = flow.credentials
    store.upsert_oauth(
        refresh_token=creds.refresh_token,
        access_token=creds.token,
        expires_at=creds.expiry.timestamp() if creds.expiry else None,
        calendar_id="primary",
    )
    log_event("oauth.connected", extra={"has_refresh": bool(creds.refresh_token)})
    return {"ok": True}


@app.get("/api/auth/google/callback")
def google_oauth_callback(
    code: str | None = None,
    state: str | None = None,
    error: str | None = None,
    error_description: str | None = None,
):
    """Google redirects here (fixed URI). Token exchange runs on the server; then redirect browser to the SPA."""
    if error:
        msg = error_description or error
        raise HTTPException(400, f"Google OAuth error: {msg}")
    if not code:
        raise HTTPException(400, "missing authorization code")
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(400, "Google OAuth not configured on server")

    return_to = verify_oauth_return_state(state)
    backend_uri = settings.google_oauth_backend_redirect_uri()
    resolve_redirect_uri(backend_uri)

    from app.calendar_google import make_flow

    flow = make_flow(backend_uri)
    try:
        flow.fetch_token(code=code)
    except Exception as e:
        log_event("oauth.callback_exchange_error", extra={"error": str(e)})
        raise HTTPException(400, f"Token exchange failed: {e}") from e
    creds = flow.credentials
    store.upsert_oauth(
        refresh_token=creds.refresh_token,
        access_token=creds.token,
        expires_at=creds.expiry.timestamp() if creds.expiry else None,
        calendar_id="primary",
    )
    log_event("oauth.connected", extra={"has_refresh": bool(creds.refresh_token), "via": "backend_callback"})
    sep = "&" if ("?" in return_to) else "?"
    return RedirectResponse(url=f"{return_to}{sep}google_oauth=ok")


@app.get("/api/auth/google/status")
def google_oauth_status():
    """Single call on page load: replaces separate /status + /diagnostics (fewer log lines)."""
    ready = bool(settings.google_client_id and settings.google_client_secret)
    return {
        "configured": ready,
        "client_id": settings.google_client_id if ready else "",
        "allowed_redirect_uris_in_env": settings.allowed_redirect_uris_list(),
        "register_in_google_authorized_redirect_uris": settings.google_oauth_backend_redirect_uri(),
        "add_these_redirect_uris_to_google_cloud": settings.backend_oauth_redirect_uris_for_google_console(),
        "oauth_flow": (
            "Google returns redirect_uri_mismatch until the Web OAuth client (same client_id below) lists "
            "every URI in add_these_redirect_uris_to_google_cloud under Authorized redirect URIs. "
            "Publishing status must allow your Google account (Test users if app is in Testing)."
        ),
    }


@app.get("/api/auth/google/diagnostics")
def google_oauth_diagnostics():
    """Public checks: compare client_id with Google Cloud Console; URIs must be registered there."""
    return {
        "client_id": settings.google_client_id,
        "oauth_client_type_must_be": "Web application",
        "allowed_redirect_uris_in_env": settings.allowed_redirect_uris_list(),
        "verified_locally": True,
        "if_error_redirect_uri_mismatch": (
            "Open Google Cloud → APIs & Services → Credentials → OAuth 2.0 Client IDs → "
            "select the row whose Client ID matches exactly the value above (Web client). "
            "Under Authorized redirect URIs, add each URI from allowed_redirect_uris_in_env exactly, "
            "including trailing slash. Add matching Authorized JavaScript origins (origin only, no path)."
        ),
    }


@app.get("/api/auth/google/echo-redirect")
def google_echo_redirect(
    origin: str = Query(
        ...,
        description="Your browser origin only: copy window.location.origin (e.g. http://localhost:5174)",
    ),
):
    """Returns the exact redirect URI + JS origin to paste into Google Cloud for that dev server port."""
    raw = origin.strip()
    if "://" not in raw:
        raw = "http://" + raw.lstrip("/")
    p = urlparse(raw)
    if p.scheme not in ("http", "https") or p.hostname not in ("localhost", "127.0.0.1"):
        raise HTTPException(
            400,
            "origin must look like http://localhost:5173 or http://127.0.0.1:5173 (use the URL bar from your Vite tab).",
        )
    netloc = p.netloc
    base = f"{p.scheme}://{netloc}"
    callback = f"{base}/oauth/callback"
    pb = urlparse(settings.public_backend_url)
    backend_origin = f"{pb.scheme}://{pb.netloc}" if pb.scheme and pb.netloc else ""
    js_origins = [base]
    if backend_origin and backend_origin not in js_origins:
        js_origins.append(backend_origin)
    return {
        "register_in_authorized_redirect_uris": [
            settings.google_oauth_backend_redirect_uri(),
            settings.google_oauth_backend_redirect_uri() + "/",
            callback,
            callback + "/",
        ],
        "register_in_authorized_javascript_origins": list(dict.fromkeys(js_origins)),
        "same_client_id_as_env": settings.google_client_id,
        "try_auth_url": f"/api/auth/google/url?return_to={quote(base + '/', safe='')}",
        "hint": "If Vite says Local: http://localhost:5174 — use echo-redirect?origin=http://localhost:5174 and add those strings to Google.",
    }


@app.get("/api/auth/google/console-checklist")
def google_console_checklist():
    """Copy-paste list for Google Cloud → OAuth Web client (fixes Error 400 redirect_uri_mismatch)."""
    cli_ports = (8888, 8889, 8890, 8891, 8892, 9000, 9090)
    vite_ports = (5173, 5174, 5175, 5176)
    redirect_uris: list[str] = [
        settings.google_oauth_backend_redirect_uri(),
        settings.google_oauth_backend_redirect_uri() + "/",
    ]
    for port in vite_ports:
        redirect_uris.extend(
            [
                f"http://localhost:{port}/oauth/callback",
                f"http://127.0.0.1:{port}/oauth/callback",
                f"http://localhost:{port}/oauth/callback/",
                f"http://127.0.0.1:{port}/oauth/callback/",
            ]
        )
    redirect_uris.extend(
        [
            "http://localhost:5173/",
            "http://127.0.0.1:5173/",
        ]
    )
    redirect_uris.extend([f"http://127.0.0.1:{p}/oauth/callback" for p in cli_ports])
    origins = []
    pb = urlparse(settings.public_backend_url)
    if pb.scheme and pb.netloc:
        origins.append(f"{pb.scheme}://{pb.netloc}")
        if pb.hostname == "localhost":
            origins.append(f"http://127.0.0.1:{pb.port or 8000}")
        elif pb.hostname == "127.0.0.1":
            origins.append(f"http://localhost:{pb.port or 8000}")
    for port in vite_ports:
        origins.extend([f"http://localhost:{port}", f"http://127.0.0.1:{port}"])
    return {
        "error_you_see": "400 redirect_uri_mismatch",
        "fix": "Prefer registering only authorized_redirect_uris[0] (backend callback). Legacy SPA callbacks listed if you still use ?redirect_uri= on /url.",
        "authorized_redirect_uris": list(dict.fromkeys(redirect_uris)),
        "authorized_javascript_origins": list(dict.fromkeys(origins)),
        "verify_client_id_matches_env": settings.google_client_id,
        "dynamic_help": "GET /api/auth/google/echo-redirect?origin=http://localhost:YOUR_VITE_PORT",
    }


@app.get("/api/auth/google/config")
def google_oauth_config():
    """Copy these into Google Cloud → OAuth client → Authorized redirect URIs (and matching JS origins)."""
    uris = settings.allowed_redirect_uris_list()
    origins: list[str] = []
    for u in uris:
        p = urlparse(u)
        if p.scheme and p.netloc:
            origins.append(f"{p.scheme}://{p.netloc}")
    return {
        "allowed_redirect_uris": uris,
        "authorized_javascript_origins_suggestion": list(dict.fromkeys(origins)),
        "hint": "Redirect URIs must match exactly. Add every host you use (localhost vs 127.0.0.1). Also add the origins above under Authorized JavaScript origins (no path).",
    }


@app.get("/api/auth/google/url")
def google_auth_url(
    return_to: str | None = Query(
        None,
        description="After OAuth, open this URL in the browser (usually window.location.origin + '/').",
    ),
    redirect_uri: str | None = Query(
        None,
        description="Legacy only: SPA callback e.g. http://localhost:5173/oauth/callback. Omit to use backend /api/auth/google/callback.",
    ),
):
    if not settings.google_client_id or not settings.google_client_secret:
        return {"url": None, "configured": False}
    from app.calendar_google import make_flow

    if redirect_uri and str(redirect_uri).strip():
        resolved = resolve_redirect_uri(redirect_uri)
        flow = make_flow(resolved)
        url, _ = flow.authorization_url(
            access_type="offline",
            include_granted_scopes="true",
            prompt="consent",
        )
        return {
            "url": url,
            "configured": True,
            "redirect_uri_used": resolved,
            "mode": "legacy_spa_callback",
        }

    rt = (return_to or "http://localhost:5173/").strip()
    validate_return_to_url(rt)
    backend_uri = settings.google_oauth_backend_redirect_uri()
    resolve_redirect_uri(backend_uri)
    state = sign_oauth_return_to(rt)
    flow = make_flow(backend_uri)
    url, _ = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
        state=state,
    )
    return {
        "url": url,
        "configured": True,
        "redirect_uri_used": backend_uri,
        "mode": "backend_callback",
    }


@app.post("/api/dev/reset-mock-calendar")
def reset_mock():
    mock_calendar.reset()
    return {"ok": True}
