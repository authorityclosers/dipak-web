import type { Metadata } from "next";
import { ConnectHub } from "@/features/connect";
import { PERSON_ID, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Connect with Dipak Vishwakarma | Official Links",
  description:
    "Official links for Dipak Vishwakarma, high-ticket sales coach and founder of Authority Closers. Find his articles, social profiles, and contact details.",
  alternates: {
    canonical: `${SITE_URL}/connect`,
  },
  openGraph: {
    title: "Connect with Dipak Vishwakarma | Official Links",
    description:
      "Official links for Dipak Vishwakarma, high-ticket sales coach and founder of Authority Closers. Find his articles, social profiles, and contact details.",
    url: `${SITE_URL}/connect`,
    type: "profile",
    images: [
      {
        url: "/social/dipak-og-default-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Connect with Dipak Vishwakarma — High-Ticket Sales Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect with Dipak Vishwakarma | Official Links",
    description:
      "Official links for Dipak Vishwakarma, high-ticket sales coach and founder of Authority Closers.",
    images: ["/social/dipak-og-default-1200x630.jpg"],
  },
};

export default function ConnectPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/connect#profilepage`,
    url: `${SITE_URL}/connect`,
    name: "Connect with Dipak Vishwakarma",
    mainEntity: {
      "@id": PERSON_ID,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConnectHub />
    </>
  );
}
