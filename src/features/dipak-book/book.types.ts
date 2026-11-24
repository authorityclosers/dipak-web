export interface BookCta {
  label: string;
  href: string;
  event: string;
}

export interface BookContent {
  sectionNumber: string;
  sectionTitle: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  hook: string;
  hookEmphasis: string;
  problem: string;
  question: string;
  insideLabel: string;
  inside: { title: string; body: string }[];
  guideLabel: string;
  guide: string;
  cover: { src: string; srcSet: string; width: number; height: number; alt: string };
  buyCta: BookCta | null;
  secondaryCta: BookCta;
}
