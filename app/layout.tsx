import "./layout.scss";

import content from "@/public/content/pages/home/index.json";

import PlausibleProvider from "next-plausible";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";
import { Hind, Montserrat } from "next/font/google";
import { ReactNode } from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const montserrat = Montserrat({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const hind = Hind({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlausibleProvider domain="de-terschelling-podcast.nl">
      <html lang="en" className={`${montserrat.variable} ${hind.variable}`}>
        <head>
          <link rel="manifest" href="/site.webmanifest" />
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

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </head>

        <body>{children}</body>
      </html>
    </PlausibleProvider>
  );
}
