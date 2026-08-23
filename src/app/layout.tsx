import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat, Poppins } from "next/font/google";
import "@/styles/globals.css";

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
  metadataBase: new URL("https://dipakvishwakarma.com"),
  title: "Dipak Vishwakarma — Founder of Authority Closers | High-Ticket Sales Expert",
  description:
    "Dipak Vishwakarma is the Founder of Authority Closers and a High-Ticket Sales Expert helping founders and sales teams build certainty, handle objections, and close high-value deals.",
  alternates: {
    canonical: "https://dipakvishwakarma.com/",
  },
  openGraph: {
    type: "website",
    url: "https://dipakvishwakarma.com/",
    siteName: "Dipak Vishwakarma",
    title: "Dipak Vishwakarma — Founder of Authority Closers | High-Ticket Sales Expert",
    description:
      "Dipak Vishwakarma is the Founder of Authority Closers and a High-Ticket Sales Expert helping founders and sales teams build certainty, handle objections, and close high-value deals.",
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
    title: "Dipak Vishwakarma — Founder of Authority Closers | High-Ticket Sales Expert",
    description:
      "Dipak Vishwakarma is the Founder of Authority Closers and a High-Ticket Sales Expert helping founders and sales teams build certainty, handle objections, and close high-value deals.",
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
        {/* Preload High Priority LCP Assets */}
        <link rel="preload" href="/hero/dipak-seated.webp" as="image" type="image/webp" />
        <link rel="preload" href="/hero/enso-brush-master.webp" as="image" type="image/webp" />

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
                {
                  "@type": "Person",
                  "@id": "https://dipakvishwakarma.com/#person",
                  name: "Dipak Vishwakarma",
                  alternateName: ["Dipak", "The Certainty Builder"],
                  jobTitle: "High-Ticket Sales Coach | Founder of Authority Closers",
                  worksFor: {
                    "@type": "Organization",
                    name: "Authority Closers",
                    url: "https://authorityclosers.com",
                  },
                  url: "https://dipakvishwakarma.com",
                  image: "https://dipakvishwakarma.com/media/01_dsc06974.webp",
                  sameAs: [
                    "https://www.linkedin.com/in/dipak-vishwakarma",
                    "https://youtube.com/@dipakvishwakarmasalescoach",
                    "https://www.instagram.com/dipakv.sales",
                    "https://authorityclosers.com",
                  ],
                  description:
                    "Dipak Vishwakarma is a High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers helping founders and sales teams build certainty, handle objections, and close high-ticket deals.",
                  knowsAbout: [
                    "High-Ticket Sales",
                    "Sales Psychology",
                    "Buyer Psychology",
                    "Objection Handling",
                    "Consultative Selling",
                    "Deal Architecture",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://dipakvishwakarma.com/#website",
                  url: "https://dipakvishwakarma.com",
                  name: "Dipak Vishwakarma",
                  publisher: {
                    "@id": "https://dipakvishwakarma.com/#person",
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
