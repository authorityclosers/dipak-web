import type { IdentityContent } from "./identity.types";

/**
 * Act 2 — The person. Portrait, positioning, proof, and the "featured in"
 * strip (formerly a separate act). Channel hrefs stay unset until the real
 * profile URLs are verified; unlinked entries render as plain wordmarks.
 */
export const identityContent: IdentityContent = {
  sectionNumber: "02",
  sectionTitle: "The person",
  headlinePart1: "The Certainty",
  headlineWord2: "Builder",
  roleSubhead: "Founder of Authority Closers.",
  bioParagraph:
    "With over 11 years in sales, marketing, and entrepreneurship, Dipak has generated ₹9+ crore in revenue, trained 940+ sales professionals, and worked closely with startups, SMEs, and real estate businesses to build scalable sales systems. His strength is simplifying complex sales strategy into practical frameworks teams can use immediately.",
  metrics: [
    { main: "11+", label: "Years in sales" },
    { main: "₹9", suffix: "Cr+", label: "Revenue generated" },
    { main: "940+", label: "Professionals trained" },
  ],
  previewRailLabel: "Featured in",
  previewChannels: [
    { label: "Medium", iconType: "medium" },
    { label: "Dailyhunt", iconType: "dailyhunt" },
    { label: "YouTube", iconType: "youtube" },
    { label: "Podcasts", iconType: "podcast" },
    { label: "LinkedIn", iconType: "linkedin" },
  ],
  portrait: {
    src: "/optimized/person-1600-v1.webp",
    alt: "Dipak Vishwakarma at his desk, Founder of Authority Closers",
    caption: "Dipak Vishwakarma · Pune, India",
  },
};
