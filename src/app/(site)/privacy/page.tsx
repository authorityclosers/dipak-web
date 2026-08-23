import type { Metadata } from "next";
import { LegalPageLayout, privacyPolicyContent } from "@/features/legal";

export const metadata: Metadata = {
  title: `${privacyPolicyContent.title} — Dipak Vishwakarma`,
  description: privacyPolicyContent.metaDescription,
  alternates: {
    canonical: "https://dipakvishwakarma.com/privacy",
  },
  openGraph: {
    title: `${privacyPolicyContent.title} — Dipak Vishwakarma`,
    description: privacyPolicyContent.metaDescription,
    url: "https://dipakvishwakarma.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <LegalPageLayout document={privacyPolicyContent} indexNumber="01" />;
}
