export interface IdentityMetric {
  main: string;
  suffix?: string;
  label: string;
  sublabel?: string;
}

export interface MediaChannel {
  label: string;
  iconType: "medium" | "dailyhunt" | "youtube" | "podcast" | "linkedin";
}

export interface IdentityContent {
  sectionNumber: string;
  sectionTitle: string;
  headlinePart1: string;
  headlineWord2: string;
  roleSubhead: string;
  bioParagraph: string;
  metrics: IdentityMetric[];
  previewRailLabel: string;
  previewChannels: MediaChannel[];
}
