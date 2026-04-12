"""Validate redirect_uri against server allowlist (must match Google Cloud Console)."""

from fastapi import HTTPException

from app.config import settings


def resolve_redirect_uri(requested: str | None) -> str:
    allowed = settings.allowed_redirect_uris_list()
    if not requested or not str(requested).strip():
        raise HTTPException(
            status_code=400,
            detail="redirect_uri is required — use the app’s OAuth callback URL (e.g. .../oauth/callback).",
        )
    r = str(requested).strip()
    if r in allowed:
        return r
    r_slash = r if r.endswith("/") else r + "/"
    r_noslash = r.rstrip("/")
    for a in allowed:
        if a == r_slash:
            return a
        if a.rstrip("/") == r_noslash:
            return a
    raise HTTPException(
        status_code=400,
        detail={
            "error": "redirect_uri_not_allowed",
            "requested": requested,
            "allowed": allowed,
            "hint": "Add the requested URI to GOOGLE_REDIRECT_URI in .env (comma-separated) and to Google Cloud → OAuth client → Authorized redirect URIs.",
        },
    )
