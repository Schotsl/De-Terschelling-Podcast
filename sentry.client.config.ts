import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://aedf98be74b399f0ad188a7bbc6419a3@o4505897577414656.ingest.us.sentry.io/4507515658633216",
  debug: false,
  enabled: process.env.NODE_ENV !== "development",
  tracesSampleRate: 1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
