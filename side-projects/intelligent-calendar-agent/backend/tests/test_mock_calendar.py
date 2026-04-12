from app.calendar_mock import MockCalendar


def test_mock_crud():
    m = MockCalendar()
    ev = m.create_event(
        summary="Hello",
        start="2026-04-15T10:00:00Z",
        end="2026-04-15T10:30:00Z",
    )
    eid = ev["id"]
    listed = m.list_events("2026-04-15T00:00:00Z", "2026-04-15T23:59:59Z")
    assert len(listed) == 1
    m.update_event(eid, summary="Hello2")
    assert m.get_event(eid)["summary"] == "Hello2"
    m.delete_event(eid)
    assert m.get_event(eid) is None
