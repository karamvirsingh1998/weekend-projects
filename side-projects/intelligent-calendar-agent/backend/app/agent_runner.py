"""LLM agent with calendar tools, intent routing, and observability."""

from __future__ import annotations

import json
import time
from typing import Any

from openai import OpenAI

from app.calendar_facade import CalendarFacade, parse_tool_json
from app.config import settings
from app.observability import log_event

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "calendar_list_events",
            "description": "List calendar events between time_min and time_max (ISO 8601 strings).",
            "parameters": {
                "type": "object",
                "properties": {
                    "time_min": {"type": "string"},
                    "time_max": {"type": "string"},
                },
                "required": ["time_min", "time_max"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "calendar_create_event",
            "description": "Create an event. Use attendee emails when known. Respect user memory constraints.",
            "parameters": {
                "type": "object",
                "properties": {
                    "summary": {"type": "string"},
                    "start": {"type": "string"},
                    "end": {"type": "string"},
                    "description": {"type": "string"},
                    "attendees": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["summary", "start", "end"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "calendar_update_event",
            "description": "Update an existing event by id.",
            "parameters": {
                "type": "object",
                "properties": {
                    "event_id": {"type": "string"},
                    "summary": {"type": "string"},
                    "start": {"type": "string"},
                    "end": {"type": "string"},
                    "description": {"type": "string"},
                    "attendees": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["event_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "calendar_delete_event",
            "description": "Delete an event by id.",
            "parameters": {
                "type": "object",
                "properties": {"event_id": {"type": "string"}},
                "required": ["event_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "calendar_freebusy",
            "description": "Return busy intervals for the primary calendar in the window.",
            "parameters": {
                "type": "object",
                "properties": {
                    "time_min": {"type": "string"},
                    "time_max": {"type": "string"},
                },
                "required": ["time_min", "time_max"],
            },
        },
    },
]


def classify_intent(client: OpenAI, user_text: str) -> str:
    r = client.chat.completions.create(
        model=settings.llm_model,
        messages=[
            {
                "role": "system",
                "content": 'Classify the user message as exactly one label: "chitchat" or "appointment". '
                "appointment includes scheduling, moving, canceling meetings, checking availability, calendar questions.",
            },
            {"role": "user", "content": user_text},
        ],
        temperature=0,
    )
    label = (r.choices[0].message.content or "").strip().lower()
    if "appointment" in label:
        return "appointment"
    return "chitchat"


def run_agent_turn(
    *,
    client: OpenAI,
    facade: CalendarFacade,
    user_id: str,
    persona_id: str,
    messages: list[dict[str, str]],
    req_id: str,
    user_memory: list[str],
    agent_memory: list[str],
) -> tuple[str, dict[str, Any]]:
    """Returns assistant text and metadata (intent, tool_calls, decision_log)."""
    t0 = time.perf_counter()
    user_last = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")
    intent = classify_intent(client, user_last)
    log_event("agent.intent", req_id=req_id, user_id=user_id, intent=intent)

    mem_lines = (
        "Long-term memory — user:\n"
        + "\n".join(f"- {m}" for m in user_memory)
        + "\n\nLong-term memory — agent (global):\n"
        + "\n".join(f"- {m}" for m in agent_memory)
    )
    sys_parts = [
        "You are an executive calendar assistant.",
        mem_lines,
        "Use tools for any calendar mutation or availability lookup.",
        "Always obey user memory constraints (times, priorities, deep work blocks).",
        "When trade-offs exist (e.g., CEO vs peer), prefer higher priority per user memory and state your rationale briefly.",
        f"Active persona id: {persona_id} (tag internal reasoning; events may store this id).",
    ]
    if intent == "chitchat":
        sys_parts.append(
            "The user intent is chitchat — reply conversationally without calling calendar tools unless they explicitly ask about their calendar."
        )
    else:
        sys_parts.append("The user intent involves scheduling — use tools as needed.")

    sys_content = "\n".join(sys_parts)

    openai_messages: list[dict[str, Any]] = [{"role": "system", "content": sys_content}, *messages]

    tool_rounds = 0
    decision_log: list[dict[str, Any]] = []
    max_rounds = 6

    while tool_rounds < max_rounds:
        kwargs: dict[str, Any] = {
            "model": settings.llm_model,
            "messages": openai_messages,
            "temperature": 0.3,
        }
        if intent == "appointment":
            kwargs["tools"] = TOOLS
            kwargs["tool_choice"] = "auto"
        resp = client.chat.completions.create(**kwargs)
        msg = resp.choices[0].message
        if intent == "chitchat" or not getattr(msg, "tool_calls", None):
            text = msg.content or ""
            elapsed = (time.perf_counter() - t0) * 1000
            log_event(
                "agent.reply",
                req_id=req_id,
                user_id=user_id,
                intent=intent,
                duration_ms=elapsed,
                extra={"tool_rounds": tool_rounds},
            )
            return text, {
                "intent": intent,
                "tool_rounds": tool_rounds,
                "decision_log": decision_log,
            }

        openai_messages.append(
            {
                "role": "assistant",
                "content": msg.content,
                "tool_calls": [
                    {
                        "id": tc.id,
                        "type": "function",
                        "function": {"name": tc.function.name, "arguments": tc.function.arguments},
                    }
                    for tc in msg.tool_calls
                ],
            }
        )

        for tc in msg.tool_calls:
            name = tc.function.name
            args = {}
            try:
                args = json.loads(tc.function.arguments or "{}")
            except json.JSONDecodeError:
                decision_log.append(
                    {"tool": name, "error": "bad_arguments", "raw": tc.function.arguments}
                )
                result = json.dumps({"ok": False, "error": "malformed_arguments"})
            else:
                result = _dispatch_tool(facade, name, args, persona_id)
                parsed = parse_tool_json(result)
                if isinstance(parsed, dict) and parsed.get("ok") is False:
                    decision_log.append({"tool": name, "args": args, "result": parsed})
                else:
                    decision_log.append({"tool": name, "args": args, "result_preview": result[:400]})

            openai_messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": result if isinstance(result, str) else json.dumps(result),
                }
            )
        tool_rounds += 1

    text = "I hit a safety limit on tool calls; please narrow the request."
    return text, {"intent": intent, "tool_rounds": tool_rounds, "decision_log": decision_log}


def _dispatch_tool(facade: CalendarFacade, name: str, args: dict[str, Any], persona_id: str) -> str:
    try:
        if name == "calendar_list_events":
            return facade.list_events(args["time_min"], args["time_max"])
        if name == "calendar_create_event":
            return facade.create_event(
                summary=args["summary"],
                start=args["start"],
                end=args["end"],
                description=args.get("description"),
                attendees=args.get("attendees"),
                persona_id=persona_id,
            )
        if name == "calendar_update_event":
            return facade.update_event(
                args["event_id"],
                summary=args.get("summary"),
                start=args.get("start"),
                end=args.get("end"),
                description=args.get("description"),
                attendees=args.get("attendees"),
            )
        if name == "calendar_delete_event":
            return facade.delete_event(args["event_id"])
        if name == "calendar_freebusy":
            return facade.freebusy(args["time_min"], args["time_max"])
    except KeyError as e:
        return json.dumps({"ok": False, "error": f"missing_field:{e}"})
    return json.dumps({"ok": False, "error": f"unknown_tool:{name}"})
