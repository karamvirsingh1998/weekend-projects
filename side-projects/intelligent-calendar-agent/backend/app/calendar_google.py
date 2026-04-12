"""Google Calendar API wrapper with refresh-token handling."""

from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from typing import Any

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from app.config import settings

SCOPES = ["https://www.googleapis.com/auth/calendar"]


def make_flow(redirect_uri: str) -> Flow:
    """redirect_uri must match one entry in Google Cloud Authorized redirect URIs exactly.

    PKCE is disabled: we create one Flow for the auth URL and another for token exchange;
    with default PKCE, each Flow gets a different code_verifier so fetch_token always fails.
    Web clients with a client secret do not require PKCE.
    """
    return Flow.from_client_config(
        {
            "web": {
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [redirect_uri],
            }
        },
        scopes=SCOPES,
        redirect_uri=redirect_uri,
        autogenerate_code_verifier=False,
    )


def credentials_from_tokens(
    *,
    refresh_token: str | None,
    access_token: str | None,
    expires_at: float | None,
) -> Credentials:
    creds = Credentials(
        token=access_token,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.google_client_id,
        client_secret=settings.google_client_secret,
        scopes=SCOPES,
    )
    if expires_at:
        creds.expiry = datetime.fromtimestamp(expires_at, tz=timezone.utc)
    return creds


class GoogleCalendarClient:
    def __init__(self, creds: Credentials, calendar_id: str = "primary") -> None:
        self._service = build("calendar", "v3", credentials=creds, cache_discovery=False)
        self._calendar_id = calendar_id

    def list_events(self, time_min: str, time_max: str) -> list[dict[str, Any]]:
        try:
            resp = (
                self._service.events()
                .list(
                    calendarId=self._calendar_id,
                    timeMin=_to_rfc3339(time_min),
                    timeMax=_to_rfc3339(time_max),
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        except HttpError as e:
            raise RuntimeError(self._format_http_error(e)) from e
        items = resp.get("items", [])
        out: list[dict[str, Any]] = []
        for it in items:
            out.append(_normalize_event(it))
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
        body: dict[str, Any] = {
            "summary": summary,
            "start": _event_time_body(start),
            "end": _event_time_body(end),
        }
        if description:
            body["description"] = description
        if attendees:
            body["attendees"] = [{"email": a} for a in attendees]
        if extended_properties:
            body["extendedProperties"] = {"private": extended_properties}
        try:
            created = self._service.events().insert(calendarId=self._calendar_id, body=body).execute()
        except HttpError as e:
            raise RuntimeError(self._format_http_error(e)) from e
        return _normalize_event(created)

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
        try:
            existing = (
                self._service.events().get(calendarId=self._calendar_id, eventId=event_id).execute()
            )
        except HttpError as e:
            raise RuntimeError(self._format_http_error(e)) from e
        if summary is not None:
            existing["summary"] = summary
        if description is not None:
            existing["description"] = description
        if start is not None:
            existing["start"] = _event_time_body(start)
        if end is not None:
            existing["end"] = _event_time_body(end)
        if attendees is not None:
            existing["attendees"] = [{"email": a} for a in attendees]
        try:
            updated = (
                self._service.events()
                .update(calendarId=self._calendar_id, eventId=event_id, body=existing)
                .execute()
            )
        except HttpError as e:
            raise RuntimeError(self._format_http_error(e)) from e
        return _normalize_event(updated)

    def delete_event(self, event_id: str) -> None:
        try:
            self._service.events().delete(calendarId=self._calendar_id, eventId=event_id).execute()
        except HttpError as e:
            raise RuntimeError(self._format_http_error(e)) from e

    def freebusy(self, time_min: str, time_max: str) -> list[dict[str, Any]]:
        body = {
            "timeMin": _to_rfc3339(time_min),
            "timeMax": _to_rfc3339(time_max),
            "items": [{"id": self._calendar_id}],
        }
        try:
            resp = self._service.freebusy().query(body=body).execute()
        except HttpError as e:
            raise RuntimeError(self._format_http_error(e)) from e
        cal = resp.get("calendars", {}).get(self._calendar_id, {})
        busy = cal.get("busy", [])
        return [{"start": b["start"], "end": b["end"]} for b in busy]

    @staticmethod
    def _format_http_error(e: HttpError) -> str:
        try:
            return json.dumps(json.loads(e.content.decode("utf-8")))
        except Exception:
            return str(e)


def _to_rfc3339(iso_or_rfc: str) -> str:
    if iso_or_rfc.endswith("Z"):
        return iso_or_rfc
    dt = datetime.fromisoformat(iso_or_rfc.replace("Z", "+00:00"))
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _event_time_body(iso: str) -> dict[str, str]:
    if "T" not in iso:
        return {"date": iso}
    return {"dateTime": iso, "timeZone": "UTC"}


def _normalize_event(raw: dict[str, Any]) -> dict[str, Any]:
    eid = raw.get("id", "")
    start = raw.get("start", {})
    end = raw.get("end", {})
    start_s = start.get("dateTime") or start.get("date", "")
    end_s = end.get("dateTime") or end.get("date", "")
    attendees = [a.get("email", "") for a in raw.get("attendees", []) if a.get("email")]
    ext = (raw.get("extendedProperties") or {}).get("private") or {}
    return {
        "id": eid,
        "summary": raw.get("summary", ""),
        "start": start_s,
        "end": end_s,
        "description": raw.get("description", "") or "",
        "attendees": attendees,
        "extendedProperties": ext,
    }
