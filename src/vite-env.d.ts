/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_SHORT_NAME?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_PORT?: string;
  readonly VITE_ENABLE_MOCK_AUTH?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_KKM_SCORE?: string;
  readonly VITE_DEFAULT_GURU_PIN?: string;
  readonly VITE_DEFAULT_SISWA_PIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
