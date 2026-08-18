export interface MediaSignature {
  id: string;
  name: string;
  sublabel: string;
  category: string;
  iconType: "medium" | "dailyhunt" | "youtube" | "podcast" | "linkedin";
  href?: string;
}

export interface PresenceContent {
  sectionNumber: string;
  sectionTitle: string;
  headlineWord1: string;
  headlineWord2: string;
  supportingNote: string;
  signatures: MediaSignature[];
}
