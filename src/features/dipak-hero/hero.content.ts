import type { HeroContent } from "./hero.types";

export const dipakHeroContent: HeroContent = {
  kicker: "Dipak Vishwakarma · The Certainty Builder™",
  headlinePart1: "Sales is",
  headlinePart2: "the transfer of",
  headlinePart3: "certainty",
  supportingCopy:
    "High-ticket sales coach and founder of Authority Closers. I write about buyer psychology, trust, and how people make confident decisions.",
  quote: "Curiosity builds trust.",
  portrait: "/hero/dipak-seated-armchair.webp",
  portraitAlt: "Dipak Vishwakarma — Founder of Authority Closers | High-Ticket Sales Expert",
  ctas: [
    {
      label: "Read my story",
      href: "/about",
      event: "public.dipak_hero.primary_cta_clicked",
      kind: "primary",
    },
    {
      label: "Explore Authority Closers",
      href: "https://authorityclosers.com",
      event: "public.dipak_hero.secondary_cta_clicked",
      kind: "secondary",
    },
  ],
};
