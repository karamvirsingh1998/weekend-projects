"""In-memory mock Google Calendar for demos and evaluation when OAuth is unavailable."""

from __future__ import annotations

import json
import threading
import uuid
from datetime import datetime, timezone
from typing import Any


def _parse_iso(s: str) -> datetime:
    if s.endswith("Z"):
        s = s.replace("Z", "+00:00")
    return datetime.fromisoformat(s)


class MockCalendar:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._events: dict[str, dict[str, Any]] = {}

    def reset(self) -> None:
        with self._lock:
            self._events.clear()

    def list_events(self, time_min: str, time_max: str) -> list[dict[str, Any]]:
        t0 = _parse_iso(time_min).timestamp()
        t1 = _parse_iso(time_max).timestamp()
        out: list[dict[str, Any]] = []
        with self._lock:
            for eid, ev in self._events.items():
                st = _parse_iso(ev["start"]).timestamp()
                if t0 <= st < t1:
                    out.append({"id": eid, **ev})
        out.sort(key=lambda x: _parse_iso(x["start"]).timestamp())
        return out

    def create_event(
        self,
        *,
        summary: str,
        start: str,
        end: str,
        description: str | None = None,
        attendees: list[str] | None = None,
        extended_properties: dict[str, str] | None = None,
    ) -> dict[str, Any]:
        eid = str(uuid.uuid4())
        ev = {
            "summary": summary,
            "start": start,
            "end": end,
            "description": description or "",
            "attendees": attendees or [],
            "extendedProperties": extended_properties or {},
        }
        with self._lock:
            self._events[eid] = ev
        return {"id": eid, **ev}

    def update_event(
        self,
        event_id: str,
        *,
        summary: str | None = None,
        start: str | None = None,
        end: str | None = None,
        description: str | None = None,
        attendees: list[str] | None = None,
    ) -> dict[str, Any]:
        with self._lock:
            if event_id not in self._events:
                raise ValueError(f"Event not found: {event_id}")
            ev = dict(self._events[event_id])
            if summary is not None:
                ev["summary"] = summary
            if start is not None:
                ev["start"] = start
            if end is not None:
                ev["end"] = end
            if description is not None:
                ev["description"] = description
            if attendees is not None:
                ev["attendees"] = attendees
            self._events[event_id] = ev
        return {"id": event_id, **ev}

    def delete_event(self, event_id: str) -> None:
        with self._lock:
            if event_id not in self._events:
                raise ValueError(f"Event not found: {event_id}")
            del self._events[event_id]

    def freebusy(self, time_min: str, time_max: str) -> list[dict[str, Any]]:
        """Return busy intervals [{start, end}] for primary calendar."""
        t0 = _parse_iso(time_min).timestamp()
        t1 = _parse_iso(time_max).timestamp()
        busy: list[dict[str, Any]] = []
        with self._lock:
            for ev in self._events.values():
                st = _parse_iso(ev["start"]).timestamp()
                en = _parse_iso(ev["end"]).timestamp()
                if en <= t0 or st >= t1:
                    continue
                busy.append({"start": ev["start"], "end": ev["end"]})
        busy.sort(key=lambda x: _parse_iso(x["start"]).timestamp())
        return busy

    def get_event(self, event_id: str) -> dict[str, Any] | None:
        with self._lock:
            ev = self._events.get(event_id)
            if not ev:
                return None
            return {"id": event_id, **dict(ev)}


def mock_tool_result_ok(data: Any) -> str:
    return json.dumps({"ok": True, "data": data}, default=str)


def mock_tool_result_err(msg: str) -> str:
    return json.dumps({"ok": False, "error": msg})
