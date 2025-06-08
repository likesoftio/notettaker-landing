/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_USE_DRF: string;
  readonly REACT_APP_API_URL: string;
  readonly REACT_APP_USE_DRF: string;
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
  readonly REACT_APP_UNSPLASH_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
