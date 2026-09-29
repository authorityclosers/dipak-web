import type { MissionContent } from "./mission.types";

export const missionContent: MissionContent = {
  sectionNumber: "03",
  sectionTitle: "The manifesto",
  kicker: "Operating philosophy",
  headlineLine1: "Building certainty",
  headlineLine2: "through clarity",
  monumentalQuote: {
    prefix: "Sales is the",
    emphasis: "transfer of certainty",
    suffix: ".",
  },
  missionBody:
    "Transforming high-stakes selling from an unpredictable art into an engineered science rooted in human psychology, deep trust, and repeatable systems.",
  pillars: [
    {
      index: "01",
      tag: "The principle",
      statement: "Trust is the absence of doubt.",
      elaboration:
        "Buyer hesitation is never about price. It is the friction of unaddressed uncertainty in the buyer's mind.",
    },
    {
      index: "02",
      tag: "The practice",
      statement: "Curiosity builds trust.",
      elaboration:
        "Elite closing is not persuasion. It is rigorous diagnostic inquiry that uncovers the buyer's true reality.",
    },
    {
      index: "03",
      tag: "The architecture",
      statement: "Clarity creates velocity.",
      elaboration:
        "When strategy is codified into scalable execution, sales teams close with conviction and predictable precision.",
    },
  ],
};
