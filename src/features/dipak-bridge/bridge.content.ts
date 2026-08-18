import type { BridgeContent } from "./bridge.types";

export const bridgeContent: BridgeContent = {
  sectionNumber: "07",
  sectionTitle: "NEXT STEP",
  eyebrow: "THE SALES ENABLEMENT ECOSYSTEM",
  headlineWord1: "AUTHORITY",
  headlineWord2: "CLOSERS",
  bodyParagraph:
    "Where personal methodology transforms into scalable sales systems, high-converting buyer psychology frameworks, and elite sales team enablement.",
  ctas: [
    {
      label: "Explore Authority Closers",
      href: "https://authorityclosers.com",
      primary: true,
      event: "cta_explore_authority_closers",
    },
    {
      label: "Read My Story",
      href: "/about",
      primary: false,
      event: "cta_read_story_bridge",
    },
  ],
};
