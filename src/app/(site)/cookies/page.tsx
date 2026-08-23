import type { Metadata } from "next";
import { LegalPageLayout, cookiePolicyContent } from "@/features/legal";

export const metadata: Metadata = {
  title: `${cookiePolicyContent.title} — Dipak Vishwakarma`,
  description: cookiePolicyContent.metaDescription,
  alternates: {
    canonical: "https://dipakvishwakarma.com/cookies",
  },
  openGraph: {
    title: `${cookiePolicyContent.title} — Dipak Vishwakarma`,
    description: cookiePolicyContent.metaDescription,
    url: "https://dipakvishwakarma.com/cookies",
    type: "website",
  },
};

export default function CookiesPage() {
  return <LegalPageLayout document={cookiePolicyContent} indexNumber="03" />;
}
