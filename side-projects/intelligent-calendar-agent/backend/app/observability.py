import json
import logging
import time
import uuid
from typing import Any

_logger = logging.getLogger("calendar_agent")


def setup_logging(level: int = logging.INFO) -> None:
    logging.basicConfig(
        level=level,
        format="%(message)s",
    )


def log_event(
    event: str,
    *,
    req_id: str | None = None,
    user_id: str | None = None,
    session_id: str | None = None,
    intent: str | None = None,
    extra: dict[str, Any] | None = None,
    duration_ms: float | None = None,
) -> None:
    payload: dict[str, Any] = {
        "ts": time.time(),
        "event": event,
    }
    if req_id:
        payload["req_id"] = req_id
    if user_id:
        payload["user_id"] = user_id
    if session_id:
        payload["session_id"] = session_id
    if intent:
        payload["intent"] = intent
    if duration_ms is not None:
        payload["duration_ms"] = round(duration_ms, 2)
    if extra:
        payload["extra"] = extra
    _logger.info(json.dumps(payload, default=str))


def new_req_id() -> str:
    return str(uuid.uuid4())
