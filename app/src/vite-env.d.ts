/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESEND_API_KEY: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_STRIPE_SECRET_KEY: string;
  readonly VITE_FRONTEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  axeptioSettings: {
    clientId: string;
    cookiesVersion: string;
    googleConsentMode: {
      default: {
        analytics_storage: string;
        ad_storage: string;
        ad_user_data: string;
        ad_personalization: string;
        wait_for_update: number;
      };
    };
  };
  axeptioSDK?: {
    openCookies: () => void;
  };
}

