import type { TopicsContent } from "./topics.types";

/**
 * "What I Think About" — the core subjects explored by Dipak Vishwakarma.
 * All hrefs point to canonical /articles/* routes.
 */
export const topicsContent: TopicsContent = {
  sectionNumber: "05",
  sectionTitle: "Subjects",
  headlineWord1: "WHAT I",
  headlineWord2: "THINK ABOUT",
  metaLabel: "Advisory & Keynotes",
  supportingNote:
    "The ideas, systems and questions I spend most of my time exploring.",
  topics: [
    {
      id: "buyer-psychology",
      number: "01",
      tag: "Cognitive Dynamics",
      title: "Buyer Psychology",
      description:
        "Why people hesitate, what creates trust, and how decisions are actually made.",
      image: "/media/05_dsc06990.webp",
      href: "/articles/buyer-psychology-undecided-mind",
    },
    {
      id: "high-ticket-sales",
      number: "02",
      tag: "Systems Architecture",
      title: "High-Ticket Sales",
      description:
        "How to lead complex conversations without pressure, scripts or manipulation.",
      image: "/media/04_dsc07013.webp",
      href: "/articles/the-architecture-of-high-ticket-sales",
    },
    {
      id: "communication",
      number: "03",
      tag: "Language & Framing",
      title: "Communication",
      description:
        "Questions, listening, framing and the language that changes how people understand value.",
      image: "/media/08_img_1624.webp",
      href: "/articles/the-true-meaning-of-communication",
    },
    {
      id: "personal-branding",
      number: "04",
      tag: "Intellectual Equity",
      title: "Personal Branding",
      description:
        "How expertise becomes authority — and how authority compounds over time.",
      image: "/media/01_dsc06974.webp",
      href: "/articles/personal-branding-in-the-age-of-ai",
    },
    {
      id: "ai",
      number: "05",
      tag: "Applied Intelligence",
      title: "AI & Sales Engineering",
      description:
        "How AI can improve learning, practice, feedback and decision-making without replacing human judgment.",
      image: "/media/03_dsc06998.webp",
      href: "/articles/ai-and-the-future-of-sales",
    },
    {
      id: "startups",
      number: "06",
      tag: "Founder-Led Growth",
      title: "Startups & Deal Velocity",
      description:
        "Sales systems, founder-led growth and the transition from instinct to repeatability.",
      image: "/media/11__dsc7249.webp",
      href: "/articles/3-questions-founders-avoid-asking",
    },
    {
      id: "public-speaking",
      number: "07",
      tag: "Stage Craft",
      title: "Public Speaking & Leverage",
      description:
        "Communicating ideas with clarity, structure and conviction to influence multiple decision-makers.",
      image: "/media/06_dsc04024.webp",
      href: "/articles/public-speaking-as-business-leverage",
    },
  ],
};
