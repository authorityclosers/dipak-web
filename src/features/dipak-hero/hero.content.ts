import type { HeroContent } from "./hero.types";

export const dipakHeroContent: HeroContent = {
  brandFirstLine: "DIPAK",
  brandSecondLine: "VISHWAKARMA",
  navLinks: [
    { label: "Home", href: "/", active: true },
    { label: "About", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Videos", href: "/videos" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
  kicker: "Dipak Vishwakarma",
  headlinePart1: "Sales Is",
  headlinePart2: "The Transfer Of",
  headlinePart3: "Certainty",
  supportingCopy:
    "High-ticket sales coach Dipak Vishwakarma, founder of Authority Closers, writes about buyer psychology and confident decisions.",
  quote: "Curiosity Builds Trust.",
  portrait: "/hero/dipak-seated-armchair.webp",
  portraitAlt: "Dipak Vishwakarma — Founder of Authority Closers | High-Ticket Sales Expert",
  ctas: [
    {
      label: "Read My Story",
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
