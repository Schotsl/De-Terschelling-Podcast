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

const url = `${process.env.NEXT_PUBLIC_URL}/banner-1200x630.png`;
const alt = "Timo en Sjors voor fotobehang van de Brandaris";

const { title, description } = content;

export const dynamic = "force-static";
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),

  openGraph: {
    url,
    type: "website",
    title,
    locale: "nl_NL",
    siteName: title,
    images: [
      {
        url,
        alt,
        width: 1200,
        height: 630,
      },
    ],
    description,
  },

  twitter: {
    images: [
      {
        url,
        alt,
        width: 1200,
        height: 630,
      },
    ],
  },

  authors: [
    { name: "Sjors van Holst", url: "https://sjorsvanholst.nl/" },
    { name: "Timo Steenmeijer" },
  ],
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
