/**
 * About page content.
 * Transcribed verbatim from the client handoff pack, 01_COPY section "ABOUT".
 * Do not edit copy here without a corresponding update to that master.
 */

export interface JourneyStage {
  index: string;
  title: string;
  body: string;
}

export interface PhilosophyEntry {
  statement: string;
  elaboration: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export const aboutContent = {
  hero: {
    eyebrow: "About Dipak",
    headline: "I study how people decide",
    body: [
      "I am Dipak Vishwakarma — entrepreneur, sales educator and Founder of Authority Closers.",
      "For more than a decade, I have worked across sales, marketing and entrepreneurship, helping teams and founders understand buyers, improve conversations and build systems that make growth more repeatable.",
      "What interests me most is not persuasion. It is certainty: what creates it, what destroys it and how better questions, better communication and real value can help people make stronger decisions.",
    ],
  },

  story: {
    index: "01",
    label: "My Story",
    headline: "The work behind The Certainty Builder™",
    paragraphs: [
      "My career has been shaped by one recurring question: why do some conversations create trust while others create resistance?",
      "Years of selling, training teams, working with businesses and building systems kept bringing me back to the same answer. People rarely need more pressure. They need more clarity.",
      "That idea changed how I approached sales. Instead of treating objections as battles to win, I started treating them as signals of unresolved uncertainty. Instead of memorising more closing lines, I focused on asking better questions. Instead of trying to control the buyer, I focused on helping the buyer understand the decision.",
      "Over time, those ideas became frameworks, training systems and eventually the philosophy behind Authority Closers.",
    ],
  },

  journey: {
    index: "02",
    label: "Journey",
    headline: "From selling to systems",
    stages: [
      {
        index: "01",
        title: "Sales",
        body: "Learning the reality of customer conversations, objections, trust and decision-making.",
      },
      {
        index: "02",
        title: "Marketing",
        body: "Understanding positioning, demand, communication and how expectations are created before a sales conversation begins.",
      },
      {
        index: "03",
        title: "Entrepreneurship",
        body: "Building teams, systems and offers — and learning that growth becomes fragile when everything depends on individual talent.",
      },
      {
        index: "04",
        title: "Training",
        body: "Turning experience into frameworks that other sales professionals can understand, practise and apply.",
      },
      {
        index: "05",
        title: "Authority Closers",
        body: "Building a company around education, deliberate practice, useful feedback and the long-term application of technology to sales skill development.",
      },
    ] as JourneyStage[],
  },

  philosophy: {
    index: "03",
    label: "My Philosophy",
    headline: "Four ideas I keep returning to",
    entries: [
      {
        statement: "Sales is the transfer of certainty.",
        elaboration:
          "A buyer moves when uncertainty decreases and confidence in the decision increases.",
      },
      {
        statement: "Trust is the absence of doubt.",
        elaboration:
          "Trust is not created by charisma alone. It grows when the buyer feels understood and the important uncertainties have been addressed.",
      },
      {
        statement: "Curiosity builds trust.",
        elaboration:
          "The quality of a sales conversation often depends on the quality of the questions.",
      },
      {
        statement: "Negotiation is a symptom. Value is the cure.",
        elaboration:
          "Price pressure frequently appears when value, relevance or certainty has not been established strongly enough.",
      },
    ] as PhilosophyEntry[],
  },

  principles: {
    index: "04",
    label: "My Principles",
    headline: "How I work",
    items: [
      "Understand before you explain.",
      "Diagnose before you prescribe.",
      "Never use pressure to hide weak value.",
      "Make complexity easier to understand.",
      "Teach principles, not dependency.",
      "Build systems that survive individual talent.",
      "Use technology to improve practice and feedback — not to remove human judgment.",
      "Treat trust as an outcome of clarity, consistency and relevance.",
    ],
  },

  missionVision: {
    index: "05",
    label: "Mission & Vision",
    mission: {
      headline: "Replace pressure with certainty.",
      body: "To help sales professionals become stronger thinkers, listeners and communicators by understanding buyer psychology and learning how to create clarity without manipulation.",
    },
    vision: {
      headline: "Build a better way to learn sales.",
      body: "My long-term vision is to build an ecosystem where people do not just consume sales content. They practise, receive feedback, improve measurable skills and become more capable in real conversations.",
    },
  },

  faq: {
    index: "06",
    label: "FAQ",
    headline: "Common questions",
    entries: [
      {
        question: "What does Dipak Vishwakarma do?",
        answer:
          "Dipak works across sales education, buyer psychology, communication and entrepreneurship. He is the Founder of Authority Closers and develops practical frameworks to help sales professionals improve high-ticket sales conversations.",
      },
      {
        question: "What is The Certainty Builder™?",
        answer:
          "The Certainty Builder™ is Dipak’s personal positioning around a central idea: people make decisions when uncertainty decreases and certainty increases.",
      },
      {
        question: "What is Authority Closers?",
        answer:
          "Authority Closers is a sales education, practice and technology company focused on helping people learn, apply, practise, receive feedback and improve.",
      },
      {
        question: "What topics does Dipak speak and write about?",
        answer:
          "Sales, buyer psychology, communication, personal branding, AI, entrepreneurship, startups and public speaking.",
      },
      {
        question: "How can I work with Dipak?",
        answer:
          "Use the contact page for speaking, collaborations, interviews or partnerships. For structured sales learning and training, visit Authority Closers.",
      },
    ] as FaqEntry[],
  },

  /**
   * Books & Inspirations is intentionally absent from this file.
   *
   * The copy master carries an explicit instruction for that section:
   * "Populate this section only with books, people and sources explicitly
   * confirmed by Dipak. Do not fabricate a reading list." Until those are
   * supplied, the section is not rendered at all rather than shipped empty.
   */

  cta: {
    primary: {
      text: "Want the frameworks? Explore my articles and videos.",
      label: "Explore Articles",
      href: "/articles",
    },
    secondary: {
      text: "Want structured sales learning and practice?",
      label: "Explore Authority Closers",
    },
  },
} as const;
