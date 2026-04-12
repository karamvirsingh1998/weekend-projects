"""Signed OAuth state for backend redirect flow (return_to after Google)."""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import secrets
import time
from urllib.parse import urlparse

from fastapi import HTTPException

from app.config import settings


def _b64url_decode(s: str) -> bytes:
    pad = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + pad)


def sign_oauth_return_to(return_to: str) -> str:
    exp = int(time.time()) + 900
    payload_obj = {"u": return_to, "exp": exp}
    payload = json.dumps(payload_obj, sort_keys=True, separators=(",", ":"))
    sig = hmac.new(
        settings.google_client_secret.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    token = json.dumps({"p": payload, "s": sig}, separators=(",", ":"))
    return base64.urlsafe_b64encode(token.encode("utf-8")).decode("ascii").rstrip("=")


def verify_oauth_return_state(state: str | None) -> str:
    if not state or not str(state).strip():
        raise HTTPException(status_code=400, detail="missing OAuth state")
    try:
        outer = json.loads(_b64url_decode(state.strip()).decode("utf-8"))
        payload = outer["p"]
        sig = outer["s"]
    except Exception as e:
        raise HTTPException(status_code=400, detail="invalid OAuth state") from e
    if not secrets.compare_digest(
        sig,
        hmac.new(
            settings.google_client_secret.encode("utf-8"),
            payload.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest(),
    ):
        raise HTTPException(status_code=400, detail="OAuth state signature mismatch")
    try:
        obj = json.loads(payload)
        return_to = obj["u"]
        exp = int(obj["exp"])
    except Exception as e:
        raise HTTPException(status_code=400, detail="invalid OAuth state payload") from e
    if int(time.time()) > exp:
        raise HTTPException(status_code=400, detail="OAuth state expired — start login again")
    validate_return_to_url(return_to)
    return return_to


def validate_return_to_url(url: str) -> None:
    p = urlparse(url)
    if p.scheme not in ("http", "https"):
        raise HTTPException(status_code=400, detail="return_to must use http or https")
    host = (p.hostname or "").lower()
    if host in ("localhost", "127.0.0.1"):
        return
    extra = [h.strip().lower() for h in settings.oauth_extra_return_hosts.split(",") if h.strip()]
    if host in extra:
        return
    raise HTTPException(
        status_code=400,
        detail=(
            f"return_to host {host!r} not allowed. "
            "Use http://localhost or http://127.0.0.1 for dev, or set OAUTH_EXTRA_RETURN_HOSTS."
        ),
    )
