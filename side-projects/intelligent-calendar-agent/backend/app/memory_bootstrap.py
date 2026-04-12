from app.store import Store, load_personas


def ensure_preloaded_memories(store: Store) -> None:
    if store.get_meta("memories_seeded") == "1":
        return
    data = load_personas()
    for p in data.get("personas", []):
        uid = p["id"]
        for m in p.get("preloaded_user_memory", []):
            store.add_user_memory(uid, m)
    for m in data.get("agent_preloaded_memory", []):
        store.add_agent_memory(m)
    store.set_meta("memories_seeded", "1")
