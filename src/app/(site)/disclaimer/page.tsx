import type { Metadata } from "next";
import { LegalPageLayout, disclaimerContent } from "@/features/legal";

export const metadata: Metadata = {
  title: `${disclaimerContent.title} — Dipak Vishwakarma`,
  description: disclaimerContent.metaDescription,
  alternates: {
    canonical: "https://dipakvishwakarma.com/disclaimer",
  },
  openGraph: {
    title: `${disclaimerContent.title} — Dipak Vishwakarma`,
    description: disclaimerContent.metaDescription,
    url: "https://dipakvishwakarma.com/disclaimer",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return <LegalPageLayout document={disclaimerContent} indexNumber="04" />;
}
