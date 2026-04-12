import { useCallback, useEffect, useRef, useState } from "react";

type Persona = { id: string; display_name: string; role: string };

type MemoryFilter = "both" | "user" | "agent";

/** Fixed path so Google Cloud can list exact URIs (root `/` vs `/oauth/callback` both confuse Console). */
function oauthRedirectUri(): string {
  return `${window.location.origin}/oauth/callback`;
}

export default function App() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [userId, setUserId] = useState("priya");
  const [memoryFilter, setMemoryFilter] = useState<MemoryFilter>("both");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string; meta?: string }[]>([]);
  const [memory, setMemory] = useState<{ user: string[]; agent: string[] }>({ user: [], agent: [] });
  const [busy, setBusy] = useState(false);
  const [oauth, setOauth] = useState<{ configured: boolean; url: string | null }>({
    configured: false,
    url: null,
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollChatToEnd = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollChatToEnd();
  }, [messages, busy]);

  useEffect(() => {
    const u = new URL(window.location.href);
    if (u.searchParams.get("google_oauth") === "ok") {
      u.searchParams.delete("google_oauth");
      window.history.replaceState({}, "", u.pathname + (u.search ? u.search : ""));
    }
    const code = u.searchParams.get("code");
    if (code) {
      fetch("/api/auth/google/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirect_uri: oauthRedirectUri() }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const t = await res.text();
            throw new Error(t || res.statusText);
          }
          window.history.replaceState({}, "", "/");
        })
        .catch((e) => {
          alert(
            `Google token exchange failed: ${e instanceof Error ? e.message : String(e)}. Check backend logs.`
          );
        });
    }
    fetch("/api/personas")
      .then((r) => r.json())
      .then((d) => setPersonas(d.personas || []))
      .catch(() => {});
    fetch("/api/auth/google/status")
      .then((r) => r.json())
      .then((d) => setOauth({ configured: !!d.configured, url: null }))
      .catch(() => {});
  }, []);

  const refreshMemory = useCallback(() => {
    fetch(`/api/memory?user_id=${encodeURIComponent(userId)}`)
      .then((r) => r.json())
      .then((d) => setMemory({ user: d.user_memory || [], agent: d.agent_memory || [] }))
      .catch(() => {});
  }, [userId]);

  useEffect(() => {
    refreshMemory();
  }, [refreshMemory]);

  const onPersonaChange = (nextId: string) => {
    setUserId(nextId);
    setSessionId(null);
    setMessages([]);
  };

  const onSend = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          message: text,
          session_id: sessionId || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }
      const data = await res.json();
      setSessionId(data.session_id);
      const meta = `${data.intent} · ${data.req_id?.slice(0, 8)}…`;
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.reply,
          meta,
        },
      ]);
      refreshMemory();
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `Error: ${e instanceof Error ? e.message : String(e)}` },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  const connectGoogle = async () => {
    try {
      const r = await fetch(
        `/api/auth/google/url?return_to=${encodeURIComponent(window.location.origin + "/")}`
      );
      const data = await r.json();
      if (!r.ok) {
        alert(`Could not start Google login: ${JSON.stringify(data)}`);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      alert("Server did not return a Google URL — check GOOGLE_CLIENT_ID / SECRET and backend logs.");
    } catch (e) {
      alert(`Network error starting Google login: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const showUserMem = memoryFilter === "both" || memoryFilter === "user";
  const showAgentMem = memoryFilter === "both" || memoryFilter === "agent";

  return (
    <div className="shell">
      <section className="chat-panel" aria-label="Chat">
        <header className="chat-header">
          <div>
            <h1>Calendar assistant</h1>
            <p className="chat-sub">Ask in plain language — scheduling, availability, or casual chat.</p>
          </div>
          {oauth.configured && (
            <button type="button" className="btn-ghost" onClick={connectGoogle}>
              Link Google Calendar
            </button>
          )}
        </header>

        <div className="chat-stream" role="log" aria-live="polite">
          {messages.length === 0 && (
            <div className="bubble assistant intro">
              <strong>Hi — I’m your calendar copilot.</strong>
              <p>
                Pick someone on the right, then try: “What’s free Thursday afternoon?” or “Schedule 30 minutes
                with Alex next week.”
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              <span className="bubble-label">{m.role === "user" ? "You" : "Assistant"}</span>
              <div className="bubble-text">{m.text}</div>
              {m.meta && <div className="bubble-meta">{m.meta}</div>}
            </div>
          ))}
          {busy && (
            <div className="bubble assistant typing-indicator" aria-busy="true">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="composer">
          <textarea
            ref={inputRef}
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message the assistant…"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={busy}
          />
          <button type="button" className="btn-send" disabled={busy || !input.trim()} onClick={onSend}>
            Send
          </button>
        </div>
      </section>

      <aside className="sidebar" aria-label="Persona and memory">
        <div className="sidebar-block">
          <label className="field-label" htmlFor="persona">
            Person
          </label>
          <select
            id="persona"
            className="select-lg"
            value={userId}
            onChange={(e) => onPersonaChange(e.target.value)}
          >
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.display_name} — {p.role}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-block">
          <label className="field-label" htmlFor="mem-filter">
            Memory panels
          </label>
          <select
            id="mem-filter"
            className="select-lg"
            value={memoryFilter}
            onChange={(e) => setMemoryFilter(e.target.value as MemoryFilter)}
          >
            <option value="both">Show both</option>
            <option value="user">Long-term only</option>
            <option value="agent">Agent only</option>
          </select>
        </div>

        <div className="sidebar-actions">
          <button type="button" className="btn-secondary" onClick={refreshMemory}>
            Refresh memory
          </button>
        </div>

        {showUserMem && (
          <div className="memory-card">
            <h2>Long-term memory</h2>
            <p className="memory-hint">Preferences and facts for the selected person.</p>
            <ul className="memory-items">
              {memory.user.length === 0 ? (
                <li className="empty">No entries yet.</li>
              ) : (
                memory.user.map((line, i) => (
                  <li key={i}>{line}</li>
                ))
              )}
            </ul>
          </div>
        )}

        {showAgentMem && (
          <div className="memory-card agent">
            <h2>Agent memory</h2>
            <p className="memory-hint">Global rules for every user.</p>
            <ul className="memory-items">
              {memory.agent.length === 0 ? (
                <li className="empty">No entries yet.</li>
              ) : (
                memory.agent.map((line, i) => (
                  <li key={i}>{line}</li>
                ))
              )}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
