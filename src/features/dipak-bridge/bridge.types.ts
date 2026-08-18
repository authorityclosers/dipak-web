export interface BridgeCta {
  label: string;
  href: string;
  primary?: boolean;
  event: string;
}

export interface BridgeContent {
  sectionNumber: string;
  sectionTitle: string;
  eyebrow: string;
  headlineWord1: string;
  headlineWord2: string;
  bodyParagraph: string;
  ctas: BridgeCta[];
}
