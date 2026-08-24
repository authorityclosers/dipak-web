import type { Metadata } from "next";
import { AboutHub } from "@/features/dipak-about";

export const metadata: Metadata = {
  title: "About Dipak Vishwakarma — High-Ticket Sales Coach | Founder of Authority Closers",
  description:
    "Dipak Vishwakarma is a High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers. Discover the story, frameworks, and philosophy behind The Certainty Builder™.",
  alternates: {
    canonical: "https://dipakvishwakarma.com/about",
  },
  openGraph: {
    title: "About Dipak Vishwakarma — High-Ticket Sales Coach | Founder of Authority Closers",
    description:
      "Dipak Vishwakarma is a High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers. Discover the story, frameworks, and philosophy behind The Certainty Builder™.",
    url: "https://dipakvishwakarma.com/about",
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
    mainEntity: {
      "@type": "Person",
      name: "Dipak Vishwakarma",
      alternateName: ["Dipak", "The Certainty Builder"],
      jobTitle: "High-Ticket Sales Coach | Founder of Authority Closers",
      description:
        "Dipak Vishwakarma is a High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers.",
      url: "https://dipakvishwakarma.com",
      image: "https://dipakvishwakarma.com/media/01_dsc06974.webp",
      worksFor: {
        "@type": "Organization",
        name: "Authority Closers",
        url: "https://authorityclosers.com",
      },
      sameAs: [
        "https://www.linkedin.com/in/dipak-vishwakarma",
        "https://youtube.com/@dipakvishwakarmasalescoach",
        "https://www.instagram.com/dipakv.sales",
        "https://authorityclosers.com",
      ],
      knowsAbout: [
        "High-Ticket Sales",
        "Sales Psychology",
        "Buyer Psychology",
        "Objection Handling",
        "Consultative Selling",
        "Deal Architecture",
      ],
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
