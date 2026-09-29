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

export type HeroContent = {
  kicker: string;
  headlinePart1: string;
  headlinePart2: string;
  headlinePart3: string;
  supportingCopy: string;
  quote?: string;
  portrait: string;
  portraitAlt: string;
  ctas: HeroCta[];
};
