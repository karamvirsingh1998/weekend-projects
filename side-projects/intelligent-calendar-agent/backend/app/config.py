from urllib.parse import urlparse

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    openai_api_key: str = ""
    llm_model: str = "gpt-4o-mini"

    # Google OAuth (Calendar scope). Leave empty to run in mock-calendar mode only.
    google_client_id: str = ""
    google_client_secret: str = ""
    # Comma-separated allowlist. Each must be listed under Authorized redirect URIs in Google Cloud.
    # Include both if you open the app via localhost or 127.0.0.1 (they differ to Google).
    # Prefer /oauth/callback; legacy "/" kept so old Google Console entries still work.
    # Vite may use 5174+ if 5173 is taken — register matching URIs in Google Cloud.
    # Primary flow: backend callback only — register http://localhost:8000/api/auth/google/callback in Google.
    google_redirect_uri: str = (
        "http://localhost:8000/api/auth/google/callback,http://localhost:8000/api/auth/google/callback/,"
        "http://localhost:5173/oauth/callback,http://127.0.0.1:5173/oauth/callback,"
        "http://localhost:5173/oauth/callback/,http://127.0.0.1:5173/oauth/callback/,"
        "http://localhost:5174/oauth/callback,http://127.0.0.1:5174/oauth/callback,"
        "http://localhost:5175/oauth/callback,http://127.0.0.1:5175/oauth/callback,"
        "http://localhost:5176/oauth/callback,http://127.0.0.1:5176/oauth/callback,"
        "http://localhost:5173/,http://127.0.0.1:5173/"
    )

    # Optional comma-separated hostnames allowed in return_to (after OAuth) besides localhost / 127.0.0.1.
    oauth_extra_return_hosts: str = ""

    # Backend serves OAuth start; redirect can land on frontend which forwards code to /auth/google/callback
    public_backend_url: str = "http://localhost:8000"

    # If set, this exact URL is sent to Google as redirect_uri (must match Console). Otherwise derived from public_backend_url.
    google_oauth_callback_uri: str = ""

    data_dir: str = ".data"
    database_path: str = ""

    # Idle seconds before post-conversation memory consolidation
    idle_consolidation_seconds: int = 60

    # Evaluation / demo — set MOCK_CALENDAR_DEFAULT=false after Google OAuth to use live Calendar
    mock_calendar_default: bool = True

    @field_validator("public_backend_url", mode="before")
    @classmethod
    def _public_backend_url_non_empty(cls, v: object) -> object:
        if v is None or (isinstance(v, str) and not str(v).strip()):
            return "http://localhost:8000"
        return v

    def db_path_resolved(self) -> str:
        if self.database_path:
            return self.database_path
        return f"{self.data_dir.rstrip('/')}/app.db"

    def allowed_redirect_uris_list(self) -> list[str]:
        """Env list plus backend callback variants (localhost + 127.0.0.1) for the API port."""
        base = [x.strip() for x in self.google_redirect_uri.split(",") if x.strip()]
        merged: list[str] = []
        for u in self.backend_oauth_redirect_uris_for_allowlist():
            if u not in merged:
                merged.append(u)
        for u in base:
            if u not in merged:
                merged.append(u)
        return merged

    def google_oauth_backend_redirect_uri(self) -> str:
        """Single redirect_uri sent in the Google authorize + token requests (must appear in Console exactly)."""
        g = self.google_oauth_callback_uri.strip()
        if g:
            return g.rstrip("/")
        return f"{self.public_backend_url.rstrip('/')}/api/auth/google/callback"

    def backend_oauth_redirect_uris_for_allowlist(self) -> list[str]:
        """Primary callback plus localhost↔127.0.0.1 aliases so resolve_redirect_uri and Google Console stay in sync."""
        primary = self.google_oauth_backend_redirect_uri()
        out: list[str] = []
        for u in (primary, primary + "/"):
            if u not in out:
                out.append(u)
        p = urlparse(primary)
        if p.scheme in ("http", "https") and p.hostname in ("localhost", "127.0.0.1") and p.port:
            other_host = "127.0.0.1" if p.hostname == "localhost" else "localhost"
            alt = f"{p.scheme}://{other_host}:{p.port}/api/auth/google/callback"
            for u in (alt, alt + "/"):
                if u not in out:
                    out.append(u)
        return out

    def backend_oauth_redirect_uris_for_google_console(self) -> list[str]:
        """Copy-paste into Google Cloud → Web client → Authorized redirect URIs (add every line)."""
        return self.backend_oauth_redirect_uris_for_allowlist()


settings = Settings()
