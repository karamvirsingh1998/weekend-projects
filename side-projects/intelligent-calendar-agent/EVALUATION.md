# Evaluation Report

Automated benchmark: intent routing, tool-flow correctness, memory-aware replies, and mock calendar side effects. Regenerate with `python eval/run_eval.py`.

- **Success rate**: 7/7 (100.00%)
- **Model**: `gpt-4o-mini`
- **Generated**: `eval/run_eval.py`

## Scenarios

Definitions and expectations live in `eval/scenarios.json`.

## Timing (ms)

| Scenario | ms |
|----------|-----|
| chitchat_greeting | 2048.9 |
| appointment_list_events_tool | 3292.4 |
| appointment_create_event_mock | 3859.6 |
| memory_constraint_before_10 | 2421.0 |
| memory_recall_agent_timezone_rule | 1665.2 |
| appointment_freebusy_or_list | 3735.0 |
| chitchat_not_calendar_tools | 1813.8 |

## Interesting failures

None in this run. When tests fail, use the reasons and reply previews below to debug (e.g. tighten prompts, add tool guards, or extend `reply_contains_any` options).