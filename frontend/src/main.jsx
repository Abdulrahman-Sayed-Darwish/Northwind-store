import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router";
import * as Sentry from "@sentry/react";
import { SentryErrorFallback } from "./components/SentryErrorFallback.jsx";
import { SentryUserSync } from "./components/SentryUserSync.jsx";
const queryClient = new QueryClient();

const apiBase = import.meta.env.VITE_API_URL ?? "";
const tracePropagationTargets =
  apiBase.length > 0
    ? [apiBase]
    : typeof window !== "undefined"
      ? [window.location.origin]
      : [];
// Sentry هيراقب أخطاء React والـ Browser، وكمان هيتابع أداء الـ requests والـ sessions.
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  sendDefaultPii: true, // دي لو عايز اخلي sentery يجمع بعض بيانات الجلسه
  integrations: [
    Sentry.browserTracingIntegration(), // دي بتخلي Sentry يتابع الأداء والـ requests في الـ Browser
    Sentry.replayIntegration({
      //أشوف سياق اللي المستخدم كان بيعمله قبل المشكلة
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: tracePropagationTargets,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider>
      <SentryUserSync />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sentry.ErrorBoundary fallback={<SentryErrorFallback />}>
            <App />
          </Sentry.ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
);
