import type { TopicsContent } from "./topics.types";

/**
 * "What I think about" — the core subjects explored by Dipak Vishwakarma.
 * All hrefs point to canonical /articles/* routes. Each subject has its own
 * photograph, produced by scripts/prepare-home-images.mjs.
 */
export const topicsContent: TopicsContent = {
  sectionNumber: "04",
  sectionTitle: "Subjects",
  headlineWord1: "What I",
  headlineWord2: "think about",
  metaLabel: "Advisory & keynotes",
  supportingNote:
    "The ideas, systems and questions I spend most of my time exploring.",
  topics: [
    {
      id: "buyer-psychology",
      number: "01",
      tag: "Cognitive dynamics",
      title: "Buyer psychology",
      description:
        "Why people hesitate, what creates trust, and how decisions are actually made.",
      image: "/optimized/topic-buyer-psychology-1280-v1.webp",
      href: "/articles/buyer-psychology-undecided-mind",
    },
    {
      id: "high-ticket-sales",
      number: "02",
      tag: "Systems architecture",
      title: "High-ticket sales",
      description:
        "How to lead complex conversations without pressure, scripts or manipulation.",
      image: "/optimized/topic-high-ticket-sales-1280-v1.webp",
      href: "/articles/the-architecture-of-high-ticket-sales",
    },
    {
      id: "communication",
      number: "03",
      tag: "Language & framing",
      title: "Communication",
      description:
        "Questions, listening, framing and the language that changes how people understand value.",
      image: "/optimized/topic-communication-1280-v1.webp",
      href: "/articles/the-true-meaning-of-communication",
    },
    {
      id: "personal-branding",
      number: "04",
      tag: "Intellectual equity",
      title: "Personal branding",
      description:
        "How expertise becomes authority, and how authority compounds over time.",
      image: "/optimized/topic-personal-branding-1280-v1.webp",
      href: "/articles/personal-branding-in-the-age-of-ai",
    },
    {
      id: "ai",
      number: "05",
      tag: "Applied intelligence",
      title: "AI & sales engineering",
      description:
        "How AI can improve learning, practice, feedback and decision-making without replacing human judgment.",
      image: "/optimized/topic-ai-1280-v1.webp",
      href: "/articles/ai-and-the-future-of-sales",
    },
    {
      id: "startups",
      number: "06",
      tag: "Founder-led growth",
      title: "Startups & deal velocity",
      description:
        "Sales systems, founder-led growth and the transition from instinct to repeatability.",
      image: "/optimized/topic-startups-1280-v1.webp",
      href: "/articles/3-questions-founders-avoid-asking",
    },
    {
      id: "public-speaking",
      number: "07",
      tag: "Stage craft",
      title: "Public speaking & leverage",
      description:
        "Communicating ideas with clarity, structure and conviction to influence multiple decision-makers.",
      image: "/optimized/topic-public-speaking-1280-v1.webp",
      href: "/articles/public-speaking-as-business-leverage",
    },
  ],
};
