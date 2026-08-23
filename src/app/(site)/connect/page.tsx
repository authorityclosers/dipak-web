import type { Metadata } from "next";
import { ConnectHub } from "@/features/connect";

export const metadata: Metadata = {
  title: "Connect with Dipak Vishwakarma | Official Links & Social Hub",
  description:
    "Official link hub and directory for Dipak Vishwakarma — High-Ticket Sales Coach and Founder of Authority Closers. Access YouTube masterclasses, LinkedIn essays, Instagram, and sales advisory.",
  alternates: {
    canonical: "https://dipakvishwakarma.com/connect",
  },
  openGraph: {
    title: "Connect with Dipak Vishwakarma | Official Links & Social Hub",
    description:
      "Official link hub and directory for Dipak Vishwakarma — High-Ticket Sales Coach and Founder of Authority Closers. Access YouTube masterclasses, LinkedIn essays, Instagram, and sales advisory.",
    url: "https://dipakvishwakarma.com/connect",
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
    title: "Connect with Dipak Vishwakarma | Official Links & Social Hub",
    description:
      "Official link hub and directory for Dipak Vishwakarma — High-Ticket Sales Coach and Founder of Authority Closers.",
    images: ["/social/dipak-og-default-1200x630.jpg"],
  },
};

export default function ConnectPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Dipak Vishwakarma",
      alternateName: ["Dipak", "The Certainty Builder"],
      jobTitle: "High-Ticket Sales Coach",
      description:
        "High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers helping founders and sales teams build certainty and close high-ticket deals.",
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
        "Enterprise Sales Strategy",
      ],
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
