#!/usr/bin/env python3
"""
One-time OAuth in the terminal: opens a browser, listens on localhost for the
redirect, saves refresh/access tokens to the same SQLite DB as the FastAPI app.

Before running:
1. In Google Cloud → OAuth client (Web) → Authorized redirect URIs, add the URI
   the script prints (it may use 8888, or 8889, … if 8888 is busy).
   You can add several at once, e.g.:
     http://127.0.0.1:8888/oauth/callback
     http://127.0.0.1:8889/oauth/callback
2. backend/.env must have GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET.
3. Set MOCK_CALENDAR_DEFAULT=false when using the app with Google Calendar API.

Usage (from backend/):
  python scripts/google_oauth_cli.py
  python scripts/google_oauth_cli.py --yes
  python scripts/google_oauth_cli.py --port 8890
"""

from __future__ import annotations

import argparse
import os
import socket
import sys
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

# backend/ as cwd
BACKEND = Path(__file__).resolve().parents[1]
os.chdir(BACKEND)
sys.path.insert(0, str(BACKEND))

DEFAULT_PORT_CANDIDATES = (8888, 8889, 8890, 8891, 8892, 9000, 9090)


def _pick_port(explicit: int | None) -> int:
    if explicit is not None:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            s.bind(("127.0.0.1", explicit))
            return explicit
        except OSError as e:
            raise SystemExit(f"Port {explicit} is not available: {e}") from e
        finally:
            s.close()

    for p in DEFAULT_PORT_CANDIDATES:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            s.bind(("127.0.0.1", p))
            return p
        except OSError:
            continue
        finally:
            s.close()
    raise SystemExit(
        "Could not bind any of ports "
        + str(DEFAULT_PORT_CANDIDATES)
        + ". Close whatever is using them (or run: lsof -i :8888) or pass --port."
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Save Google OAuth tokens to the app SQLite DB.")
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Skip the prompt (you already added the redirect URI in Google Cloud).",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=None,
        metavar="N",
        help=f"Force local port (default: first free among {DEFAULT_PORT_CANDIDATES[0]}…).",
    )
    args = parser.parse_args()

    from app.calendar_google import make_flow
    from app.config import settings
    from app.store import Store

    if not settings.google_client_id or not settings.google_client_secret:
        print("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in backend/.env")
        return 1

    port = _pick_port(args.port)
    redirect_uri = f"http://127.0.0.1:{port}/oauth/callback"

    print("Using redirect URI (must be in Google Cloud → Authorized redirect URIs):")
    print(f"  {redirect_uri}")
    print()
    if not args.yes:
        input("Press Enter when it is saved in Google Cloud…")

    result: dict[str, str] = {}

    class _Handler(BaseHTTPRequestHandler):
        def do_GET(self) -> None:
            qs = parse_qs(urlparse(self.path).query)
            if qs.get("code"):
                result["code"] = qs["code"][0]
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(
                b"<html><body><p>Authorization received. You can close this tab.</p></body></html>"
            )

        def log_message(self, *args: object) -> None:
            pass

    server = HTTPServer(("127.0.0.1", port), _Handler)

    def _serve_one() -> None:
        server.handle_request()

    th = threading.Thread(target=_serve_one, daemon=True)
    th.start()

    flow = make_flow(redirect_uri)
    url, _ = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )
    print(f"Listening on 127.0.0.1:{port}. Opening browser — sign in with your Google account.\n")
    webbrowser.open(url)
    th.join(timeout=300)
    server.server_close()

    code = result.get("code")
    if not code:
        print("No authorization code received (timeout or you closed the tab early).")
        return 1

    try:
        flow.fetch_token(code=code)
    except Exception as e:
        print(f"Token exchange failed: {e}")
        return 1

    creds = flow.credentials
    store = Store()
    store.upsert_oauth(
        refresh_token=creds.refresh_token,
        access_token=creds.token,
        expires_at=creds.expiry.timestamp() if creds.expiry else None,
        calendar_id="primary",
    )
    print("Saved OAuth tokens to the app database. Restart uvicorn if it is running.")
    print("Set MOCK_CALENDAR_DEFAULT=false in .env to use Google Calendar in the agent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
