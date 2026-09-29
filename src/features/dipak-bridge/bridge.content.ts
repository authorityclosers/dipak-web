import type { BridgeContent } from "./bridge.types";

export const bridgeContent: BridgeContent = {
  sectionNumber: "06",
  sectionTitle: "Next step",
  eyebrow: "The sales enablement ecosystem",
  headlineWord1: "Authority",
  headlineWord2: "Closers",
  bodyParagraph:
    "Where personal methodology becomes scalable sales systems, buyer psychology frameworks, and elite sales team enablement.",
  ctas: [
    {
      label: "Explore Authority Closers",
      href: "https://authorityclosers.com",
      primary: true,
      event: "cta_explore_authority_closers",
    },
    {
      label: "Read my story",
      href: "/about",
      primary: false,
      event: "cta_read_story_bridge",
    },
  ],
};
