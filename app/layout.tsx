import "./layout.scss";

import PlausibleProvider from "next-plausible";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const openSans = Open_Sans({
  weight: ["400", "700", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlausibleProvider domain="de-terschelling-podcast.nl">
      <html lang="en" className={openSans.className}>
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </head>

        <body>{children}</body>
      </html>
    </PlausibleProvider>
  );
}
