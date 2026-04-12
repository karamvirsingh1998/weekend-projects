import json
import os
import sqlite3
import threading
import time
from pathlib import Path

from app.config import settings


class Store:
    """SQLite persistence: sessions, messages, string memories, OAuth tokens."""

    def __init__(self, path: str | None = None) -> None:
        self.path = path or settings.db_path_resolved()
        Path(os.path.dirname(self.path) or ".").mkdir(parents=True, exist_ok=True)
        self._lock = threading.Lock()
        self._conn = sqlite3.connect(self.path, check_same_thread=False)
        self._conn.row_factory = sqlite3.Row
        self._init_schema()

    def _init_schema(self) -> None:
        cur = self._conn.cursor()
        cur.executescript(
            """
            CREATE TABLE IF NOT EXISTS oauth_tokens (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                refresh_token TEXT,
                access_token TEXT,
                expires_at REAL,
                calendar_id TEXT
            );
            CREATE TABLE IF NOT EXISTS user_memory (
                user_id TEXT NOT NULL,
                memory TEXT NOT NULL,
                created_at REAL NOT NULL,
                updated_at REAL NOT NULL,
                UNIQUE(user_id, memory)
            );
            CREATE TABLE IF NOT EXISTS agent_memory (
                memory TEXT NOT NULL PRIMARY KEY,
                created_at REAL NOT NULL,
                updated_at REAL NOT NULL
            );
            CREATE TABLE IF NOT EXISTS chat_sessions (
                session_id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                created_at REAL NOT NULL,
                last_activity_at REAL NOT NULL
            );
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at REAL NOT NULL,
                FOREIGN KEY(session_id) REFERENCES chat_sessions(session_id)
            );
            CREATE TABLE IF NOT EXISTS pending_consolidation (
                session_id TEXT PRIMARY KEY,
                scheduled_at REAL NOT NULL,
                FOREIGN KEY(session_id) REFERENCES chat_sessions(session_id)
            );
            CREATE TABLE IF NOT EXISTS meta (
                k TEXT PRIMARY KEY,
                v TEXT NOT NULL
            );
            """
        )
        self._conn.commit()

    def get_meta(self, k: str) -> str | None:
        with self._lock:
            row = self._conn.execute("SELECT v FROM meta WHERE k=?", (k,)).fetchone()
        return row["v"] if row else None

    def set_meta(self, k: str, v: str) -> None:
        with self._lock:
            self._conn.execute(
                "INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v",
                (k, v),
            )
            self._conn.commit()

    def upsert_oauth(
        self,
        *,
        refresh_token: str | None,
        access_token: str | None,
        expires_at: float | None,
        calendar_id: str | None = "primary",
    ) -> None:
        with self._lock:
            self._conn.execute(
                """
                INSERT INTO oauth_tokens (id, refresh_token, access_token, expires_at, calendar_id)
                VALUES (1, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                  refresh_token=excluded.refresh_token,
                  access_token=excluded.access_token,
                  expires_at=excluded.expires_at,
                  calendar_id=excluded.calendar_id
                """,
                (refresh_token, access_token, expires_at, calendar_id),
            )
            self._conn.commit()

    def get_oauth(self) -> dict | None:
        with self._lock:
            row = self._conn.execute("SELECT * FROM oauth_tokens WHERE id=1").fetchone()
        if not row:
            return None
        return dict(row)

    def list_user_memory(self, user_id: str) -> list[str]:
        with self._lock:
            rows = self._conn.execute(
                "SELECT memory FROM user_memory WHERE user_id=? ORDER BY updated_at",
                (user_id,),
            ).fetchall()
        return [r["memory"] for r in rows]

    def add_user_memory(self, user_id: str, memory: str) -> None:
        now = time.time()
        with self._lock:
            self._conn.execute(
                """
                INSERT INTO user_memory (user_id, memory, created_at, updated_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(user_id, memory) DO UPDATE SET updated_at=excluded.updated_at
                """,
                (user_id, memory, now, now),
            )
            self._conn.commit()

    def delete_user_memory(self, user_id: str, memory: str) -> None:
        with self._lock:
            self._conn.execute(
                "DELETE FROM user_memory WHERE user_id=? AND memory=?",
                (user_id, memory),
            )
            self._conn.commit()

    def list_agent_memory(self) -> list[str]:
        with self._lock:
            rows = self._conn.execute("SELECT memory FROM agent_memory ORDER BY updated_at").fetchall()
        return [r["memory"] for r in rows]

    def add_agent_memory(self, memory: str) -> None:
        now = time.time()
        with self._lock:
            self._conn.execute(
                """
                INSERT INTO agent_memory (memory, created_at, updated_at)
                VALUES (?, ?, ?)
                ON CONFLICT(memory) DO UPDATE SET updated_at=excluded.updated_at
                """,
                (memory, now, now),
            )
            self._conn.commit()

    def delete_agent_memory(self, memory: str) -> None:
        with self._lock:
            self._conn.execute("DELETE FROM agent_memory WHERE memory=?", (memory,))
            self._conn.commit()

    def ensure_session(self, session_id: str, user_id: str) -> None:
        now = time.time()
        with self._lock:
            self._conn.execute(
                """
                INSERT INTO chat_sessions (session_id, user_id, created_at, last_activity_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(session_id) DO UPDATE SET last_activity_at=excluded.last_activity_at
                """,
                (session_id, user_id, now, now),
            )
            self._conn.commit()

    def get_session(self, session_id: str) -> dict | None:
        with self._lock:
            row = self._conn.execute(
                "SELECT session_id, user_id, last_activity_at FROM chat_sessions WHERE session_id=?",
                (session_id,),
            ).fetchone()
        return dict(row) if row else None

    def touch_session(self, session_id: str) -> None:
        now = time.time()
        with self._lock:
            self._conn.execute(
                "UPDATE chat_sessions SET last_activity_at=? WHERE session_id=?",
                (now, session_id),
            )
            self._conn.commit()

    def append_message(self, session_id: str, role: str, content: str) -> None:
        now = time.time()
        with self._lock:
            self._conn.execute(
                "INSERT INTO messages (session_id, role, content, created_at) VALUES (?,?,?,?)",
                (session_id, role, content, now),
            )
            self._conn.commit()

    def recent_messages(self, session_id: str, limit: int = 30) -> list[dict]:
        with self._lock:
            rows = self._conn.execute(
                """
                SELECT role, content, created_at FROM messages
                WHERE session_id=? ORDER BY id DESC LIMIT ?
                """,
                (session_id, limit),
            ).fetchall()
        rows = list(reversed(rows))
        return [{"role": r["role"], "content": r["content"]} for r in rows]

    def schedule_consolidation(self, session_id: str, delay_sec: float) -> None:
        at = time.time() + delay_sec
        with self._lock:
            self._conn.execute(
                """
                INSERT INTO pending_consolidation (session_id, scheduled_at)
                VALUES (?, ?)
                ON CONFLICT(session_id) DO UPDATE SET scheduled_at=excluded.scheduled_at
                """,
                (session_id, at),
            )
            self._conn.commit()

    def list_due_consolidations(self) -> list[str]:
        now = time.time()
        with self._lock:
            rows = self._conn.execute(
                "SELECT session_id FROM pending_consolidation WHERE scheduled_at <= ?",
                (now,),
            ).fetchall()
        return [r["session_id"] for r in rows]

    def clear_pending_consolidation(self, session_id: str) -> None:
        with self._lock:
            self._conn.execute("DELETE FROM pending_consolidation WHERE session_id=?", (session_id,))
            self._conn.commit()

    def reschedule_consolidation(self, session_id: str, delay_sec: float) -> None:
        """Push consolidation forward (e.g. user still active)."""
        at = time.time() + delay_sec
        with self._lock:
            self._conn.execute(
                """
                INSERT INTO pending_consolidation (session_id, scheduled_at)
                VALUES (?, ?)
                ON CONFLICT(session_id) DO UPDATE SET scheduled_at=excluded.scheduled_at
                """,
                (session_id, at),
            )
            self._conn.commit()

    def session_stale_for_consolidation(self, session_id: str, idle_sec: float) -> bool:
        """True if last activity was more than idle_sec ago."""
        now = time.time()
        with self._lock:
            row = self._conn.execute(
                "SELECT last_activity_at FROM chat_sessions WHERE session_id=?",
                (session_id,),
            ).fetchone()
        if not row:
            return False
        return now - row["last_activity_at"] >= idle_sec

    def full_transcript(self, session_id: str) -> list[dict]:
        with self._lock:
            rows = self._conn.execute(
                "SELECT role, content FROM messages WHERE session_id=? ORDER BY id ASC",
                (session_id,),
            ).fetchall()
        return [{"role": r["role"], "content": r["content"]} for r in rows]


def load_personas() -> dict:
    base = Path(__file__).resolve().parent.parent / "data" / "personas.json"
    with open(base, encoding="utf-8") as f:
        return json.load(f)
