import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat, Poppins } from "next/font/google";
import "@/styles/globals.css";
import {
  authorityClosersOrganization,
  dipakPerson,
  SITE_URL,
} from "@/lib/structured-data";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dipak Vishwakarma | High-Ticket Sales Coach",
  description:
    "Dipak Vishwakarma is a high-ticket sales coach and founder of Authority Closers. He writes about buyer psychology, objection handling, consultative selling, and confident decisions.",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Dipak Vishwakarma",
    title: "Dipak Vishwakarma | High-Ticket Sales Coach",
    description:
      "Dipak Vishwakarma is a high-ticket sales coach and founder of Authority Closers. He writes about buyer psychology, objection handling, consultative selling, and confident decisions.",
    images: [
      {
        url: "/social/dipak-og-default-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Dipak Vishwakarma — Founder of Authority Closers | The Certainty Builder™",
      },
      {
        url: "/social/dipak-og-retina-2400x1260.jpg",
        width: 2400,
        height: 1260,
        alt: "Dipak Vishwakarma — Founder of Authority Closers | The Certainty Builder™ (Retina)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipak Vishwakarma | High-Ticket Sales Coach",
    description:
      "Dipak Vishwakarma is a high-ticket sales coach and founder of Authority Closers. He writes about buyer psychology, objection handling, consultative selling, and confident decisions.",
    images: [
      {
        url: "/social/dipak-x-share-1600x900.jpg",
        width: 1600,
        height: 900,
        alt: "Dipak Vishwakarma — The Certainty Builder™ | High-Ticket Sales Expert",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        {/* NayaGrowth Tracking & GTag Bootstrap */}
        <script
          src="https://api.nayagrowth.com/capture/tracking-bootstrap.js"
          async
        />
        {/* NayaGrowth Form Capture Script */}
        <script
          src="https://api.nayagrowth.com/capture/v1.js"
          data-naya-connector="src_authorityclosers_web"
          async
        />

        {/* Structured Data / JSON-LD for Google Search & Entity Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                dipakPerson,
                authorityClosersOrganization,
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Dipak Vishwakarma",
                  inLanguage: "en",
                  publisher: {
                    "@id": `${SITE_URL}/#person`,
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
