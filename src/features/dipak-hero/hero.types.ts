import type { StaticImageData } from "next/image";

export type HeroEventName =
  | "public.dipak_hero.primary_cta_clicked"
  | "public.dipak_hero.secondary_cta_clicked"
  | string;

export type HeroCta = {
  label: string;
  href?: string;
  event: HeroEventName;
  kind: "primary" | "secondary";
};

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type HeroContent = {
  brandFirstLine: string;
  brandSecondLine: string;
  navLinks: NavLink[];
  kicker: string;
  headlinePart1: string;
  headlinePart2: string;
  headlinePart3: string;
  supportingCopy: string;
  quote?: string;
  portrait: StaticImageData;
  portraitAlt: string;
  ctas: HeroCta[];
};
