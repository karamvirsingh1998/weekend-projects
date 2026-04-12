#!/usr/bin/env python3
"""List upcoming events from the real Google Calendar (requires tokens from UI or google_oauth_cli.py)."""

from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]
os.chdir(BACKEND)
sys.path.insert(0, str(BACKEND))

from app.calendar_facade import CalendarFacade
from app.calendar_mock import MockCalendar
from app.config import settings
from app.store import Store


def main() -> int:
    if settings.mock_calendar_default:
        print("MOCK_CALENDAR_DEFAULT is true — set it to false in .env to call Google.")
        return 1
    store = Store()
    mock = MockCalendar()
    facade = CalendarFacade(store, mock)
    if not facade.use_live_google():
        print("No refresh token in DB. Run: python scripts/google_oauth_cli.py --yes")
        print("Or complete 'Link Google Calendar' in the web UI.")
        return 1
    now = datetime.now(timezone.utc)
    tmin = now.isoformat().replace("+00:00", "Z")
    tmax = (now + timedelta(days=14)).isoformat().replace("+00:00", "Z")
    raw = facade.list_events(tmin, tmax)
    data = json.loads(raw)
    if not data.get("ok"):
        print(json.dumps(data, indent=2))
        return 1
    events = data.get("data") or []
    print(f"Next ~14 days: {len(events)} event(s)")
    for ev in events[:20]:
        print(f"  - {ev.get('summary', '(no title)')} | {ev.get('start')} → {ev.get('end')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
