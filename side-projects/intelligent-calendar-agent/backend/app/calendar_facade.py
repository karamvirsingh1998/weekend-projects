"""Routes calendar operations to mock or live Google Calendar."""

from __future__ import annotations

import json
from typing import Any

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

from app.calendar_google import GoogleCalendarClient, credentials_from_tokens
from app.calendar_mock import MockCalendar, mock_tool_result_err, mock_tool_result_ok
from app.config import settings
from app.store import Store


class CalendarFacade:
    def __init__(self, store: Store, mock: MockCalendar) -> None:
        self._store = store
        self._mock = mock

    def use_live_google(self) -> bool:
        if settings.mock_calendar_default:
            return False
        row = self._store.get_oauth()
        return bool(row and row.get("refresh_token"))

    def _live_client(self) -> GoogleCalendarClient | None:
        row = self._store.get_oauth()
        if not row or not row.get("refresh_token"):
            return None
        creds = credentials_from_tokens(
            refresh_token=row["refresh_token"],
            access_token=row.get("access_token"),
            expires_at=row.get("expires_at"),
        )
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            self._store.upsert_oauth(
                refresh_token=creds.refresh_token,
                access_token=creds.token,
                expires_at=creds.expiry.timestamp() if creds.expiry else None,
                calendar_id=row.get("calendar_id") or "primary",
            )
        cid = row.get("calendar_id") or "primary"
        return GoogleCalendarClient(creds, calendar_id=cid)

    def list_events(self, time_min: str, time_max: str) -> str:
        try:
            if self.use_live_google():
                client = self._live_client()
                if not client:
                    return mock_tool_result_err("OAuth not configured")
                data = client.list_events(time_min, time_max)
            else:
                data = self._mock.list_events(time_min, time_max)
            return mock_tool_result_ok(data)
        except Exception as e:
            return mock_tool_result_err(str(e))

    def create_event(
        self,
        *,
        summary: str,
        start: str,
        end: str,
        description: str | None = None,
        attendees: list[str] | None = None,
        persona_id: str | None = None,
    ) -> str:
        ext = {"persona_id": persona_id} if persona_id else {}
        try:
            if self.use_live_google():
                client = self._live_client()
                if not client:
                    return mock_tool_result_err("OAuth not configured")
                data = client.create_event(
                    summary=summary,
                    start=start,
                    end=end,
                    description=description,
                    attendees=attendees,
                    extended_properties=ext or None,
                )
            else:
                data = self._mock.create_event(
                    summary=summary,
                    start=start,
                    end=end,
                    description=description,
                    attendees=attendees,
                    extended_properties=ext or None,
                )
            return mock_tool_result_ok(data)
        except Exception as e:
            return mock_tool_result_err(str(e))

    def update_event(
        self,
        event_id: str,
        *,
        summary: str | None = None,
        start: str | None = None,
        end: str | None = None,
        description: str | None = None,
        attendees: list[str] | None = None,
    ) -> str:
        try:
            if self.use_live_google():
                client = self._live_client()
                if not client:
                    return mock_tool_result_err("OAuth not configured")
                data = client.update_event(
                    event_id,
                    summary=summary,
                    start=start,
                    end=end,
                    description=description,
                    attendees=attendees,
                )
            else:
                data = self._mock.update_event(
                    event_id,
                    summary=summary,
                    start=start,
                    end=end,
                    description=description,
                    attendees=attendees,
                )
            return mock_tool_result_ok(data)
        except Exception as e:
            return mock_tool_result_err(str(e))

    def delete_event(self, event_id: str) -> str:
        try:
            if self.use_live_google():
                client = self._live_client()
                if not client:
                    return mock_tool_result_err("OAuth not configured")
                client.delete_event(event_id)
            else:
                self._mock.delete_event(event_id)
            return mock_tool_result_ok({"deleted": event_id})
        except Exception as e:
            return mock_tool_result_err(str(e))

    def freebusy(self, time_min: str, time_max: str) -> str:
        try:
            if self.use_live_google():
                client = self._live_client()
                if not client:
                    return mock_tool_result_err("OAuth not configured")
                data = client.freebusy(time_min, time_max)
            else:
                data = self._mock.freebusy(time_min, time_max)
            return mock_tool_result_ok(data)
        except Exception as e:
            return mock_tool_result_err(str(e))


def parse_tool_json(s: str) -> dict[str, Any]:
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        return {"ok": False, "error": "invalid_json"}
