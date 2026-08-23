import type { Metadata } from "next";
import { LegalPageLayout, termsOfServiceContent } from "@/features/legal";

export const metadata: Metadata = {
  title: `${termsOfServiceContent.title} — Dipak Vishwakarma`,
  description: termsOfServiceContent.metaDescription,
  alternates: {
    canonical: "https://dipakvishwakarma.com/terms",
  },
  openGraph: {
    title: `${termsOfServiceContent.title} — Dipak Vishwakarma`,
    description: termsOfServiceContent.metaDescription,
    url: "https://dipakvishwakarma.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return <LegalPageLayout document={termsOfServiceContent} indexNumber="02" />;
}
