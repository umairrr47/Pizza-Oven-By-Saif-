/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;

  // other VITE_ vars you may have:
  readonly VITE_API_URL?: string;
  // add more keys if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
