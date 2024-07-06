/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");
const { withSentryConfig } = require("@sentry/nextjs");

const contentSecurityPolicy = `
  img-src 'self' data: blob: https://avatars.githubusercontent.com;
  font-src 'self' https://fonts.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  worker-src 'self' blob:;
  object-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  connect-src 'self' blob: https://api.github.com;
  report-to csp-endpoint;
  report-uri https://o4505897577414656.ingest.sentry.io/api/4507515658633216/security/?sentry_key=aedf98be74b399f0ad188a7bbc6419a3;
  upgrade-insecure-requests;
`;

const reportTo = {
  group: "csp-endpoint",
  max_age: 10886400,
  endpoints: [
    {
      url: "https://o4505897577414656.ingest.sentry.io/api/4507515658633216/security/?sentry_key=aedf98be74b399f0ad188a7bbc6419a3",
    },
  ],
};

module.exports = withPlausibleProxy({
  customDomain: "https://plausible.hedium.nl",
})(
  withSentryConfig(
    {
      async headers() {
        return [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Content-Security-Policy",
                value: contentSecurityPolicy.replace(/\n/g, ""),
              },
              {
                key: "Report-To",
                value: JSON.stringify(reportTo),
              },
            ],
          },
        ];
      },
    },
    {
      org: "sjors-van-holst-0c97a3b77",
      silent: true,
      release: "1.0.0",
      project: "de-terschelling-podcast",
    },
    {
      disableLogger: true,
      hideSourceMaps: true,
      transpileClientSDK: true,
      widenClientFileUpload: true,
      automaticVercelMonitors: true,
    },
  ),
);
