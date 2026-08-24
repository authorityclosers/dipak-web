export interface JourneyStage {
  index: string;
  phase: string;
  title: string;
  body: string;
  takeaway: string;
}

export interface PhilosophyEntry {
  index: string;
  tag: string;
  statement: string;
  elaboration: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export const aboutContent = {
  hero: {
    eyebrow: "About Dipak Vishwakarma",
    sectionIndex: "01",
    headlineWord1: "I STUDY HOW",
    headlineWord2: "PEOPLE DECIDE.",
    leadQuote: "What interests me is not pressure or hype. It is certainty: what creates it, what destroys it, and how people make confident high-stakes decisions.",
    body: [
      "Dipak Vishwakarma is a High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers.",
      "For more than a decade, he has worked across consultative sales, buyer psychology, and deal architecture, helping founders and sales teams eliminate buyer hesitation, master objection handling, and close high-value enterprise clients.",
      "Instead of manipulative closing lines, Dipak focuses on diagnosing uncertainty, asking high-leverage questions, and empowering buyers to understand their own decisions.",
    ],
    stats: [
      { label: "Years in Consultative Sales", value: "10+" },
      { label: "Founder", value: "Authority Closers" },
      { label: "Methodology", value: "The Certainty Builder™" },
    ],
  },

  story: {
    index: "02",
    label: "My Story",
    headline: "The work behind The Certainty Builder™",
    quote: "People rarely need more pressure. They need more clarity.",
    paragraphs: [
      "My career has been shaped by one recurring question: why do some conversations create trust while others create resistance?",
      "Years of selling, training teams, working with businesses, and building systems kept bringing me back to the same fundamental reality: objections are not battles to win—they are signals of unresolved buyer uncertainty.",
      "Instead of memorizing aggressive closing scripts, I focused on asking better questions. Instead of trying to control the buyer, I focused on helping the buyer understand the decision.",
      "Over time, those field-tested ideas became frameworks, repeatable training systems, and eventually the operating philosophy behind Authority Closers.",
    ],
  },

  journey: {
    index: "03",
    label: "Journey",
    headline: "From Selling to Systems",
    subhead: "The five evolutionary phases that turned frontline closing experience into a scalable advisory framework.",
    stages: [
      {
        index: "01",
        phase: "Phase 01 · Ground Realities",
        title: "Frontline Sales",
        body: "Learning the raw reality of high-stakes customer conversations, fear of commitment, buyer objections, and how real trust is forged.",
        takeaway: "Lesson: Pressure creates resistance; clarity creates momentum.",
      },
      {
        index: "02",
        phase: "Phase 02 · Positioning & Demand",
        title: "Strategic Marketing",
        body: "Understanding market positioning, demand generation, and how expectations are shaped long before the first sales conversation begins.",
        takeaway: "Lesson: The sales call starts the moment the prospect discovers your brand.",
      },
      {
        index: "03",
        phase: "Phase 03 · Scaling Infrastructure",
        title: "Entrepreneurship",
        body: "Building teams, scalable offers, and commercial systems—learning firsthand that revenue growth becomes fragile when reliant on hero individuals.",
        takeaway: "Lesson: Systems and frameworks must survive individual talent.",
      },
      {
        index: "04",
        phase: "Phase 04 · Codification",
        title: "Sales Coaching & Advisory",
        body: "Translating years of closing intuition into structured, transferable playbooks that founders and sales teams can practice, master, and repeat.",
        takeaway: "Lesson: True mastery is not a script—it is diagnosing context.",
      },
      {
        index: "05",
        phase: "Phase 05 · The Platform Era",
        title: "Authority Closers",
        body: "Building an institutional company dedicated to sales education, deliberate practice, data-driven feedback, and technology-assisted skill mastery.",
        takeaway: "Lesson: Continuous feedback loops beat theoretical training every time.",
      },
    ] as JourneyStage[],
  },

  philosophy: {
    index: "04",
    label: "My Philosophy",
    headline: "Four Ideas I Keep Returning To",
    subhead: "The core cognitive principles that govern every high-ticket consultative conversation.",
    entries: [
      {
        index: "01",
        tag: "Core Premise",
        statement: "Sales is the transfer of certainty.",
        elaboration:
          "A buyer moves forward when risk ambiguity decreases and confidence in the projected outcome increases. You cannot give what you do not embody.",
      },
      {
        index: "02",
        tag: "Buyer Psychology",
        statement: "Trust is the absence of doubt.",
        elaboration:
          "Trust is not manufactured by charisma alone. It compounds when the buyer feels thoroughly understood and every unspoken doubt is brought to light and resolved.",
      },
      {
        index: "03",
        tag: "Consultative Leverage",
        statement: "Curiosity builds trust.",
        elaboration:
          "The depth of a sales conversation depends entirely on the precision of your questions. Shallow questions get defensive answers; insightful questions reveal the real decision.",
      },
      {
        index: "04",
        tag: "Deal Architecture",
        statement: "Negotiation is a symptom. Value is the cure.",
        elaboration:
          "Price pressure rarely indicates a tight budget. It reveals that relevance, ROI differentiation, or certainty was never established early in discovery.",
      },
    ] as PhilosophyEntry[],
  },

  principles: {
    index: "05",
    label: "Operating Principles",
    headline: "How I Work & Teach",
    items: [
      "Understand before you explain.",
      "Diagnose deeply before you prescribe.",
      "Never use aggressive pressure to mask weak value.",
      "Make complex decisions simple to navigate.",
      "Teach enduring principles, not fragile dependency.",
      "Build sales systems that survive individual talent.",
      "Use technology to sharpen practice and feedback—not replace human judgment.",
      "Treat trust as the direct outcome of clarity, consistency, and relevance.",
    ],
  },

  missionVision: {
    index: "06",
    label: "Mission & Vision",
    headline: "Where This Is Going",
    subhead: "The long-term commitments driving the Authority Closers ecosystem.",
    mission: {
      tag: "The Mission",
      headline: "Build a better way to learn sales.",
      body: "To help sales professionals, closers, and B2B founders become exceptional thinkers, active listeners, and consultative communicators by eliminating manipulation and architecting authentic certainty.",
    },
    vision: {
      tag: "The Vision",
      headline: "The Future of Sales Mastery & Practice.",
      body: "Building a world-class ecosystem where revenue teams don't just passively consume sales theory. They practice in simulated environments, receive objective feedback, and master high-stakes deal execution.",
    },
  },

  faq: {
    index: "07",
    label: "FAQ",
    headline: "Frequently Asked Questions",
    entries: [
      {
        question: "What does Dipak Vishwakarma specialize in?",
        answer:
          "Dipak specializes in high-ticket B2B sales coaching, buyer psychology, objection elimination, and consultative deal architecture. He advises founders and sales teams on transforming unpredictable pitching into systematic, repeatable certainty.",
      },
      {
        question: "What is The Certainty Builder™?",
        answer:
          "The Certainty Builder™ is Dipak’s core methodology based on a proven principle: buyers don't buy products or promises—they buy certainty. When uncertainty drops below the perceived cost of inaction, decisions happen naturally.",
      },
      {
        question: "What is Authority Closers?",
        answer:
          "Authority Closers is a sales education and performance ecosystem founded by Dipak Vishwakarma, focused on deliberate practice, call diagnostics, and modern sales engineering.",
      },
      {
        question: "What topics does Dipak speak and keynote on?",
        answer:
          "High-ticket consultative sales, buyer decision psychology, founder-led revenue velocity, strategic communication, personal branding in the age of AI, and executive stage leverage.",
      },
    ] as FaqEntry[],
  },

  cta: {
    primary: {
      label: "Book Executive Advisory",
      href: "/connect",
      text: "Ready to eliminate pipeline doubt and scale high-ticket deal closing in your business?",
    },
    secondary: {
      label: "Explore Authority Closers",
      href: "https://authorityclosers.com",
      text: "Discover the training frameworks, community, and resources built for serious sales professionals.",
    },
  },
};
