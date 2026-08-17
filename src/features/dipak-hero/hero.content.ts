import portraitArmchair from "./assets/dipak-seated-armchair.png";
import type { HeroContent } from "./hero.types";

export const dipakHeroContent: HeroContent = {
  brandFirstLine: "DIPAK",
  brandSecondLine: "VISHWAKARMA",
  navLinks: [
    { label: "Home", href: "#", active: true },
    { label: "About", href: "#about" },
    { label: "Articles", href: "#articles" },
    { label: "Videos", href: "#videos" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
  ],
  kicker: "Founder. Strategist. Communicator.",
  headlinePart1: "Sales Is",
  headlinePart2: "The Transfer Of",
  headlinePart3: "Certainty",
  supportingCopy:
    "Thoughts on sales, communication, trust, and personal branding for people building meaningful authority.",
  quote: "Curiosity Builds Trust.",
  portrait: portraitArmchair,
  portraitAlt: "Dipak Vishwakarma seated in armchair",
  ctas: [
    {
      label: "Read My Story",
      href: "#story",
      event: "public.dipak_hero.primary_cta_clicked",
      kind: "primary",
    },
    {
      label: "Explore Authority Closers",
      href: "#authority-closers",
      event: "public.dipak_hero.secondary_cta_clicked",
      kind: "secondary",
    },
  ],
};
