# Intelligent Calendar Agent (MVP)

**Problem.** Scheduling is high-friction: calendar Tetris, long email threads, and tools that either only expose slots (Calendly) or stay fully manual. This project is a small **AI executive-assistant** slice: it reasons about **constraints and priorities** (e.g. deep work, who outranks whom), not only about empty slots.

**What this repo delivers (assignment mapping).**

| Deliverable | Where |
|-------------|--------|
| Agent + calendar tools (list / create / update / delete / free-busy) | `backend/app/agent_runner.py`, `calendar_facade.py`, `calendar_google.py` / `calendar_mock.py` |
| Persistent user + global “agent” memory | SQLite via `store.py`; seeds `data/personas.json`; idle consolidation `consolidation.py` |
| OAuth session (Google Calendar) | `main.py` OAuth routes, `Store` for tokens |
| Observability | Structured logs (`observability.py`), tool traces in API responses |
| Automated evaluation | `eval/scenarios.json` + `eval/run_eval.py` → **`EVALUATION.md`** |
| Technical write-up | This file + `docs/ARCHITECTURE.md` |
| Demo | **Screenshots:** add files under `docs/screenshots/` (see below) |

**Out of scope for this MVP.** Outlook / Microsoft Graph; true multi-calendar free-busy across *other people’s* tenants; full product auth for arbitrary end users. The UI uses **personas** to simulate multiple profiles against one backend; with Google enabled, one OAuth’d calendar is shared (events tagged with `persona_id` in extended properties).

---

## Approach (how it works)

1. **Intent** — A small LLM call classifies each user message as **chitchat** vs **appointment** so calendar tools are only injected when scheduling is relevant.
2. **Memory** — Per-user and global strings are loaded from SQLite and prepended to the system prompt (no vector DB in v1). Rules like “no meetings before 10:00” apply on every turn without re-stating them.
3. **Tools** — The model calls **list / create / update / delete / freebusy** through a **facade** that switches between an in-memory **mock** calendar (default) and **Google Calendar API** after OAuth (`MOCK_CALENDAR_DEFAULT=false`).
4. **Reliability** — Tool JSON is parsed defensively; errors return structured `ok: false` payloads so the model can retry or explain. Logs carry `req_id`, intent, and tool summaries for debugging.

---

## Repository layout

- `backend/` — FastAPI, SQLite, OAuth, agent.
- `frontend/` — Vite + React chat UI (personas, memory panels, **Link Google Calendar**).
- `eval/` — Benchmark scenarios and runner.
- `docs/screenshots/` — **Demo images** (you can drop your captures here).
- `EVALUATION.md` — **Auto-generated** success rate and timings (run `eval/run_eval.py`).

---

## Quickstart

**Backend**

```bash
cd side-projects/intelligent-calendar-agent/backend
cp .env.example .env
# OPENAI_API_KEY=...  GOOGLE_* optional for live Calendar
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend**

```bash
cd side-projects/intelligent-calendar-agent/frontend
npm install && npm run dev
```

Open the URL Vite prints (often `http://localhost:5173`). API is proxied to port **8000**.

**Google Calendar (optional)** — Enable Calendar API; create an OAuth **Web** client; in **Authorized redirect URIs** add `http://localhost:8000/api/auth/google/callback` (see `GET /api/auth/google/status`). Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, then use **Link Google Calendar**. If the consent app is in **Testing**, add your Gmail under **Test users**. If `redirect_uri` errors persist, ensure no stale shell `export GOOGLE_REDIRECT_URI` overrides `backend/.env` (`unset GOOGLE_REDIRECT_URI`).

---

## Evaluation strategy & metrics

- **Scenarios** live in `eval/scenarios.json`: intent, **which tools ran** (flow accuracy), mock calendar side effects, and memory-aware replies.
- **Success rate** = fraction of scenarios where every check in `expect` passes (binary per case). The runner also records **latency per scenario** and writes **`EVALUATION.md`**.
- **Run:** `python eval/run_eval.py` from the project root (loads `backend/.env` for the API key). Use `-v` and `--scenario <id>` for debugging.

Details of fields (`reply_contains_any`, `tool_names_all`, etc.) are in `eval/run_eval.py`.

---

## Trade-offs

- **Model:** `gpt-4o-mini` — good latency/cost for tool-calling; harder multi-party scheduling may need a larger model or a dedicated planner step.
- **Memory:** Plain-string store + full prompt injection — simple and debuggable; does not scale to thousands of facts (embeddings + retrieval would be the next step).
- **Calendar:** Mock by default for CI and demos; one Google account for live demos.

---

## Future enhancements

- **Classical ML / structured side:** Train a **intent + slot** model (or linear / gradient-boosted classifier) on labeled utterances for faster/cheaper routing; use **constraint solvers** (ILP / CP-SAT) for “find a mutual slot” instead of pure LLM guessing.
- **Skills / multi-agent:** Split **router**, **calendar tool executor**, and **memory writer** into separate agents or tool-skills with explicit contracts; add a **verifier** step that checks proposed events against hard rules before API calls.
- **Retrieval:** Embedding index over memories + past meetings; **RAG** for “what did we decide about Alex?”
- **Product:** Outlook/Microsoft Graph, org-wide free-busy, notifications, and full multi-tenant auth.

---

## Demo (screenshots)

Add your captures under **`docs/screenshots/`**, for example:

- `01_chat_scheduling.png` — natural-language scheduling in the chat UI  
- `02_memory_sidebar.png` — persona + memory panels  
- `03_google_link_or_eval.png` — OAuth or mock/eval relevant screen  

Reference them in your write-up or deck as needed.

---

## License / note

Do not commit real `.env` secrets. Rotate keys if they were ever shared.
