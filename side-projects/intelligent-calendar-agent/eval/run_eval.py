#!/usr/bin/env python3
"""Offline evaluation: agent + mock calendar in-process with an isolated temp DB per scenario."""

from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
import time
from pathlib import Path

# Repo root: eval/ -> intelligent-calendar-agent
ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "backend"
sys.path.insert(0, str(BACKEND))


def load_backend_env() -> None:
    """Load backend/.env so OPENAI_API_KEY works when running from repo root (does not override existing exports)."""
    p = BACKEND / ".env"
    if not p.is_file():
        return
    for raw in p.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key, val = key.strip(), val.strip().strip('"').strip("'")
        if key:
            os.environ.setdefault(key, val)


def tools_from_meta(meta: dict) -> list[str]:
    out: list[str] = []
    for row in meta.get("decision_log") or []:
        if isinstance(row, dict) and row.get("tool"):
            out.append(str(row["tool"]))
    return out


def check_expectations(
    *,
    reply: str,
    meta: dict,
    mock_events_titles: str,
    ex: dict,
) -> tuple[bool, list[str]]:
    ok = True
    reasons: list[str] = []

    if "intent" in ex:
        want, got = ex["intent"], meta.get("intent")
        if got != want:
            ok = False
            reasons.append(f"intent want {want!r} got {got!r}")
    if "intent_one_of" in ex:
        got = meta.get("intent")
        allowed = ex["intent_one_of"]
        if got not in allowed:
            ok = False
            reasons.append(f"intent want one of {allowed!r} got {got!r}")

    if ex.get("reply_not_empty") and not (reply or "").strip():
        ok = False
        reasons.append("empty reply")

    rlow = (reply or "").lower()
    phrases_any = ex.get("reply_contains_any", [])
    if phrases_any:
        if not any(p.lower() in rlow for p in phrases_any):
            ok = False
            reasons.append(f"reply missing any of phrases: {phrases_any!r}")

    for phrase in ex.get("reply_contains_all", []):
        if phrase.lower() not in rlow:
            ok = False
            reasons.append(f"missing required phrase: {phrase!r}")

    for phrase in ex.get("reply_must_not_contain", []):
        if phrase.lower() in rlow:
            ok = False
            reasons.append(f"forbidden phrase present: {phrase!r}")

    title_needle = ex.get("mock_event_title_contains")
    if title_needle:
        if title_needle.lower() not in mock_events_titles.lower():
            ok = False
            reasons.append(f"no mock event title containing {title_needle!r}")

    tr = int(meta.get("tool_rounds") or 0)
    if "tool_rounds_min" in ex:
        m = int(ex["tool_rounds_min"])
        if tr < m:
            ok = False
            reasons.append(f"tool_rounds want >= {m} got {tr}")
    if "tool_rounds_max" in ex:
        m = int(ex["tool_rounds_max"])
        if tr > m:
            ok = False
            reasons.append(f"tool_rounds want <= {m} got {tr}")

    names = tools_from_meta(meta)
    one_of = ex.get("tool_names_one_of")
    if one_of:
        if not any(n in names for n in one_of):
            ok = False
            reasons.append(f"expected at least one of {one_of!r}, got {names!r}")

    for name in ex.get("tool_names_all", []):
        if name not in names:
            ok = False
            reasons.append(f"missing required tool {name!r} (have {names})")

    return ok, reasons


def main() -> int:
    load_backend_env()
    os.environ.setdefault("MOCK_CALENDAR_DEFAULT", "true")

    from openai import OpenAI

    from app.agent_runner import run_agent_turn
    from app.calendar_facade import CalendarFacade
    from app.calendar_mock import MockCalendar
    from app.config import settings
    from app.memory_bootstrap import ensure_preloaded_memories
    from app.store import Store

    parser = argparse.ArgumentParser(description="Run intelligent-calendar-agent eval scenarios.")
    parser.add_argument(
        "--scenario",
        action="append",
        dest="only",
        metavar="ID",
        help="Run only scenario id(s). May be passed multiple times.",
    )
    parser.add_argument("--verbose", "-v", action="store_true", help="Print per-scenario details.")
    parser.add_argument("--list", action="store_true", help="List scenario ids and exit.")
    args = parser.parse_args()

    scenarios_path = Path(__file__).with_name("scenarios.json")
    scenarios = json.loads(scenarios_path.read_text(encoding="utf-8"))
    if args.list:
        for sc in scenarios:
            print(sc["id"])
        return 0

    if args.only:
        want = set(args.only)
        scenarios = [s for s in scenarios if s["id"] in want]
        missing = want - {s["id"] for s in scenarios}
        if missing:
            print(f"Unknown scenario id(s): {sorted(missing)}", file=sys.stderr)
            return 2

    if not settings.openai_api_key:
        print("SKIP: OPENAI_API_KEY not set (export it or add to backend/.env).", file=sys.stderr)
        return 2

    if not scenarios:
        print("No scenarios to run.", file=sys.stderr)
        return 2

    passed = 0
    failures: list[dict] = []
    timings: list[tuple[str, float]] = []

    for sc in scenarios:
        sid = sc["id"]
        t_run = time.perf_counter()
        with tempfile.TemporaryDirectory() as td:
            db = str(Path(td) / "eval.db")
            store = Store(path=db)
            mock = MockCalendar()
            facade = CalendarFacade(store, mock)
            ensure_preloaded_memories(store)

            uid = sc["user_id"]
            msg = sc["message"]
            ex = sc.get("expect", {})

            user_mem = store.list_user_memory(uid)
            agent_mem = store.list_agent_memory()
            client = OpenAI(api_key=settings.openai_api_key)
            reply, meta = run_agent_turn(
                client=client,
                facade=facade,
                user_id=uid,
                persona_id=uid,
                messages=[{"role": "user", "content": msg}],
                req_id=f"eval-{sid}",
                user_memory=user_mem,
                agent_memory=agent_mem,
            )

            events = mock.list_events("2026-04-01T00:00:00Z", "2026-12-31T23:59:59Z")
            titles_blob = " ".join(e.get("summary", "") for e in events)

            ok, reasons = check_expectations(
                reply=reply or "",
                meta=meta,
                mock_events_titles=titles_blob,
                ex=ex,
            )
        elapsed_ms = (time.perf_counter() - t_run) * 1000
        timings.append((sid, elapsed_ms))

        if args.verbose:
            print(
                f"[{sid}] {elapsed_ms:.0f}ms intent={meta.get('intent')} tools={tools_from_meta(meta)} rounds={meta.get('tool_rounds')}",
                flush=True,
            )

        if ok:
            passed += 1
        else:
            failures.append(
                {
                    "id": sid,
                    "reasons": reasons,
                    "reply_preview": (reply or "")[:500],
                    "tools": tools_from_meta(meta),
                    "ms": round(elapsed_ms, 1),
                }
            )
        time.sleep(0.15)

    total = len(scenarios)
    rate = (passed / total * 100) if total else 0.0
    out = {
        "passed": passed,
        "total": total,
        "success_rate_percent": round(rate, 2),
        "model": settings.llm_model,
        "timings_ms": {k: round(v, 1) for k, v in timings},
    }
    print(json.dumps(out, indent=2))
    if failures:
        print("\nFailures:\n", json.dumps(failures, indent=2))
    report_path = ROOT / "EVALUATION.md"
    _write_report(report_path, passed, total, rate, failures, settings.llm_model, timings)
    print(f"\nWrote {report_path}")
    return 0 if passed == total else 1


def _write_report(
    path: Path,
    passed: int,
    total: int,
    rate: float,
    failures: list,
    model: str,
    timings: list[tuple[str, float]],
) -> None:
    lines = [
        "# Evaluation Report",
        "",
        "Automated benchmark: intent routing, tool-flow correctness, memory-aware replies, and mock calendar side effects. Regenerate with `python eval/run_eval.py`.",
        "",
        f"- **Success rate**: {passed}/{total} ({rate:.2f}%)",
        f"- **Model**: `{model}`",
        f"- **Generated**: `eval/run_eval.py`",
        "",
        "## Scenarios",
        "",
        "Definitions and expectations live in `eval/scenarios.json`.",
        "",
        "## Timing (ms)",
        "",
        "| Scenario | ms |",
        "|----------|-----|",
    ]
    for sid, ms in timings:
        lines.append(f"| {sid} | {ms:.1f} |")
    lines.extend(
        [
            "",
            "## Interesting failures",
            "",
        ]
    )
    if not failures:
        lines.append("None in this run. When tests fail, use the reasons and reply previews below to debug (e.g. tighten prompts, add tool guards, or extend `reply_contains_any` options).")
    else:
        for f in failures:
            lines.append(f"### `{f['id']}`")
            lines.append("")
            for r in f.get("reasons") or []:
                lines.append(f"- {r}")
            lines.append("")
            lines.append(f"Tools: `{f.get('tools')}`")
            lines.append("")
            lines.append(f"> {(f.get('reply_preview') or '')[:280]}")
            lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    raise SystemExit(main())
