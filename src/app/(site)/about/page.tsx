import type { Metadata } from "next";
import { AboutHub } from "@/features/dipak-about";
import { PERSON_ID, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Dipak Vishwakarma | High-Ticket Sales Coach",
  description:
    "Meet Dipak Vishwakarma, high-ticket sales coach and founder of Authority Closers. Read about his work in buyer psychology, consultative selling, and sales education.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Dipak Vishwakarma | High-Ticket Sales Coach",
    description:
      "Meet Dipak Vishwakarma, high-ticket sales coach and founder of Authority Closers. Read about his work in buyer psychology, consultative selling, and sales education.",
    url: `${SITE_URL}/about`,
    type: "profile",
    images: [
      {
        url: "/media/01_dsc06974.webp",
        width: 1200,
        height: 900,
        alt: "About Dipak Vishwakarma — Founder of Authority Closers",
      },
    ],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: "About Dipak Vishwakarma",
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
      <AboutHub />
    </>
  );
}
