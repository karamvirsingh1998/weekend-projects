# Architecture (memory & observability)

## Memory / user profile

- **SQLite** tables: per-user memory strings, global agent memory, chat history, OAuth tokens, session metadata.
- **Bootstrap:** `data/personas.json` seeds initial user facts and agent rules once (`memories_seeded` in meta).
- **Retrieval:** On each turn, all strings for the active user plus all agent strings are injected into the **system** prompt (MVP: no embeddings).
- **Evolution:** After idle time, a small JSON-only LLM pass can add/remove memory lines (`consolidation.py`).

## Agent

- **Intent:** `chitchat` vs `appointment` — calendar tools are only bound when intent is `appointment`.
- **Facade:** Routes to **MockCalendar** or **Google Calendar API** based on config and OAuth presence.
- **Observability:** Structured logs with `req_id`, `user_id`, intent, and tool execution summaries; API responses can include tool traces for the UI.

For setup and OAuth, see the root **README.md**.
