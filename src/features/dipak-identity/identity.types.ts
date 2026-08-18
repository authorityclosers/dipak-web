export interface IdentityStat {
  value: string;
  label: string;
  sublabel: string;
}

export interface IdentityContent {
  sectionNumber: string;
  sectionTitle: string;
  headlinePart1: string;
  headlinePart2: string;
  roleSubhead: string;
  bioParagraph: string;
  stats: IdentityStat[];
  previewRailLabel: string;
  previewChannels: string[];
}
