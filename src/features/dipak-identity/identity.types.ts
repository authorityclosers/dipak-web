export interface IdentityMetric {
  main: string;
  suffix?: string;
  label: string;
}

export interface MediaChannel {
  label: string;
  iconType: "medium" | "dailyhunt" | "youtube" | "podcast" | "linkedin";
  /** Omitted until the real profile URL is verified. */
  href?: string;
}

export interface IdentityPortrait {
  src: string;
  alt: string;
  caption: string;
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
  portrait: IdentityPortrait;
}
