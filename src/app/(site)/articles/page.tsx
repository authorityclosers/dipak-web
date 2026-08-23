import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { ArticlesHub } from "@/features/articles";

export const metadata: Metadata = {
  title: "Principles & Frameworks by Dipak Vishwakarma — Founder of Authority Closers | High-Ticket Sales Expert",
  description:
    "Explore strategic frameworks, field notes, and essays on buyer psychology, consultative communication, deal architecture, and personal authority by Dipak Vishwakarma.",
  alternates: {
    canonical: "https://dipakvishwakarma.com/articles",
  },
  openGraph: {
    title: "Principles & Frameworks by Dipak Vishwakarma",
    description:
      "Strategic frameworks and essays on high-ticket sales psychology, objection elimination, and consultative authority.",
    url: "https://dipakvishwakarma.com/articles",
    siteName: "Dipak Vishwakarma — Founder of Authority Closers",
    images: [
      {
        url: "/media/04_dsc07013.webp",
        width: 1800,
        height: 1200,
        alt: "Dipak Vishwakarma — Principles & Frameworks Archive",
      },
    ],
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Principles & Frameworks by Dipak Vishwakarma",
    description:
      "A strategic archive of high-ticket sales frameworks, buyer psychology insights, and consultative principles by Dipak Vishwakarma, Founder of Authority Closers.",
    url: "https://dipakvishwakarma.com/articles",
    author: {
      "@type": "Person",
      name: "Dipak Vishwakarma",
      jobTitle: "High-Ticket Sales Coach | Founder of Authority Closers",
      worksFor: {
        "@type": "Organization",
        name: "Authority Closers",
        url: "https://authorityclosers.com",
      },
      url: "https://dipakvishwakarma.com",
    },
    hasPart: articles.map((a) => ({
      "@type": "Article",
      headline: a.displayTitle,
      url: `https://dipakvishwakarma.com/articles/${a.slug}`,
      datePublished: a.date,
      description: a.excerpt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlesHub articles={articles} />
    </>
  );
}
