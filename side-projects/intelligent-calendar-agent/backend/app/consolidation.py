"""After idle timeout, distill conversation into memory string updates."""

from __future__ import annotations

import json
from typing import Any

from openai import OpenAI

from app.config import settings
from app.observability import log_event
from app.store import Store

CONSOLIDATION_PROMPT = """You are a memory curator for a calendar assistant.
Given the full conversation transcript for ONE user session, output a JSON object ONLY (no markdown) with this shape:
{
  "user_memory_add": ["string facts to remember about this user's preferences, identity, constraints"],
  "user_memory_remove": ["exact strings to forget if they are contradicted or obsolete — must match prior memory text if possible"],
  "agent_memory_add": ["global rules that should apply to all users of this assistant"],
  "agent_memory_remove": ["exact agent-level strings to remove if obsolete"]
}
Rules:
- Each item is a short plain string (identity, preferences, who-is-who, scheduling rules).
- If nothing should change, use empty arrays.
- Do not duplicate information already implied by existing memories unless correcting.
"""


def consolidate_session(store: Store, session_id: str, user_id: str, req_id: str) -> dict[str, Any]:
    if not settings.openai_api_key:
        log_event("memory.consolidation_skipped", req_id=req_id, extra={"reason": "no_openai_key"})
        return {"skipped": True, "reason": "no_openai_key"}

    transcript = store.full_transcript(session_id)
    if not transcript:
        return {"skipped": True, "reason": "empty_transcript"}

    existing_user = store.list_user_memory(user_id)
    existing_agent = store.list_agent_memory()

    client = OpenAI(api_key=settings.openai_api_key)
    payload = {
        "existing_user_memory": existing_user,
        "existing_agent_memory": existing_agent,
        "transcript": transcript,
    }
    resp = client.chat.completions.create(
        model=settings.llm_model,
        messages=[
            {"role": "system", "content": CONSOLIDATION_PROMPT},
            {"role": "user", "content": json.dumps(payload, ensure_ascii=False)},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )
    raw = resp.choices[0].message.content or "{}"
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        log_event(
            "memory.consolidation_parse_error",
            req_id=req_id,
            user_id=user_id,
            session_id=session_id,
            extra={"raw": raw[:500]},
        )
        return {"error": "parse_error"}

    ua = data.get("user_memory_add") or []
    ur = data.get("user_memory_remove") or []
    aa = data.get("agent_memory_add") or []
    ar = data.get("agent_memory_remove") or []

    for s in ur:
        if isinstance(s, str) and s.strip():
            store.delete_user_memory(user_id, s.strip())
    for s in ua:
        if isinstance(s, str) and s.strip():
            store.add_user_memory(user_id, s.strip())

    for s in ar:
        if isinstance(s, str) and s.strip():
            store.delete_agent_memory(s.strip())
    for s in aa:
        if isinstance(s, str) and s.strip():
            store.add_agent_memory(s.strip())

    log_event(
        "memory.consolidation_done",
        req_id=req_id,
        user_id=user_id,
        session_id=session_id,
        extra={
            "user_add": len(ua),
            "user_remove": len(ur),
            "agent_add": len(aa),
            "agent_remove": len(ar),
        },
    )
    return {
        "user_memory_add": ua,
        "user_memory_remove": ur,
        "agent_memory_add": aa,
        "agent_memory_remove": ar,
    }
