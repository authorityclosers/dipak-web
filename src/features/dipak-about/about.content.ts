export interface JourneyStage {
  index: string;
  numeral: string;
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
    chapter: "01 — ABOUT",
    headlineLine1: "I STUDY HOW",
    headlineLine2People: "PEOPLE",
    headlineLine2Decide: "decide.",
    thesis:
      "For more than a decade, I’ve been studying what happens in the few critical seconds between hesitation and commitment.",
    leadQuote:
      "What interests me is not pressure or hype. It is certainty — what creates it, what destroys it, and how buyers make confident high-stakes decisions.",
    portraitCaption: "Dipak Vishwakarma · Founder, Authority Closers",
    identityRail: [
      { role: "Founder", entity: "Authority Closers" },
      { role: "Creator", entity: "The Certainty Builder™" },
      { role: "Focus", entity: "High-Ticket Sales Psychology" },
    ],
    actions: {
      primary: { label: "Explore Philosophy ↓", href: "#philosophy" },
      secondary: { label: "Private Advisory →", href: "/connect" },
    },
  },

  story: {
    index: "02",
    label: "My Story",
    headline: "The Work Behind The Certainty Builder™",
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
    label: "Evolution",
    headlineLine1: "From Selling to",
    headlineLine2: "Systems.",
    subhead:
      "A decade of commercial evolution—from closing high-stakes deals on the frontline to codifying institutional sales engineering.",
    stages: [
      {
        index: "01",
        numeral: "01",
        phase: "Phase 01 · Ground Realities",
        title: "Frontline Closing & Objections",
        focus: "High-Stakes Conversations & Buyer Resistance",
        body: "Handling thousands of live B2B sales conversations firsthand. Learning the raw psychology of commitment, hesitation, and the fatal gap between polite interest and real buying certainty.",
        takeaway: "Pressure creates friction; only genuine clarity creates irreversible buying momentum.",
      },
      {
        index: "02",
        numeral: "02",
        phase: "Phase 02 · Pre-Call Psychology",
        title: "Strategic Market Positioning",
        focus: "Demand Generation & Pre-Call Authority",
        body: "Discovering that the hardest sales conversations are caused long before the call begins. Mastering buyer expectations, authority framing, and inbound positioning.",
        takeaway: "A sales conversation is won or lost by the authority established before discovery.",
      },
      {
        index: "03",
        numeral: "03",
        phase: "Phase 03 · Commercial Scale",
        title: "Entrepreneurship & Systems",
        focus: "Unit Economics & Team Infrastructure",
        body: "Building revenue teams, launching proprietary offers, and engineering commercial infrastructure. Experiencing firsthand the fragility of relying on hero individuals instead of engineered systems.",
        takeaway: "Individual talent cannot scale; documented frameworks and commercial systems do.",
      },
      {
        index: "04",
        numeral: "04",
        phase: "Phase 04 · Codification",
        title: "Sales Advisory & Deal Architecture",
        focus: "Consultative Playbooks & Diagnosis",
        body: "Translating a decade of closing intuition into structured, transferable playbooks. Coaching founders and enterprise revenue teams to diagnose context with surgical precision.",
        takeaway: "True mastery is not reciting scripts—it is diagnosing buyer context with surgical precision.",
      },
      {
        index: "05",
        numeral: "05",
        phase: "Phase 05 · The Institutional Era",
        title: "Authority Closers™ Ecosystem",
        focus: "Deliberate Practice Labs & Certainty Architecture",
        body: "Building an institutional ecosystem dedicated to simulated roleplay environments, call diagnostics, and sales engineering. Turning high-ticket selling from an unpredictable art into a repeatable discipline.",
        takeaway: "Continuous feedback loops, deliberate practice, and certainty architecture beat theory every time.",
      },
    ] as (JourneyStage & { focus: string })[],
  },

  philosophy: {
    index: "04",
    label: "Philosophy",
    headlineLine1: "Four Ideas I Keep",
    headlineLine2: "Returning To.",
    subhead:
      "The core cognitive principles that govern every high-ticket consultative conversation.",
    footnote:
      "These are not tactical scripts. They are foundational laws of human decision-making.",
    entries: [
      {
        index: "01",
        category: "CORE PREMISE",
        statementPrefix: "Sales is the transfer of",
        accentWord: "certainty.",
        elaboration:
          "A buyer moves forward when risk ambiguity decreases and confidence in the projected outcome increases. You cannot transfer what you do not deeply embody.",
        implication:
          "If the closer carries 90% certainty, the buyer feels 45%. Certainty must be total internally before it can be transferred externally.",
      },
      {
        index: "02",
        category: "BUYER PSYCHOLOGY",
        statementPrefix: "Trust is the absence of",
        accentWord: "doubt.",
        elaboration:
          "Trust is not manufactured by charisma or enthusiasm alone. It compounds when the buyer feels thoroughly understood and every unspoken doubt is brought to light and resolved.",
        implication:
          "Doubt is never passive. Any unvoiced hesitation or unresolved risk defaults to a silent 'No' the moment the meeting ends.",
      },
      {
        index: "03",
        category: "CONSULTATIVE LEVERAGE",
        statementPrefix: "Curiosity builds",
        accentWord: "trust.",
        elaboration:
          "The depth of a sales conversation depends entirely on the precision of your questions. Shallow questions get defensive answers; insightful questions reveal the real decision.",
        implication:
          "Whoever asks the most diagnostic, uncovering questions naturally commands the authentic authority and frame of the dialogue.",
      },
      {
        index: "04",
        category: "DEAL ARCHITECTURE",
        statementPrefix: "Negotiation is a symptom. Value is the",
        accentWord: "cure.",
        elaboration:
          "Price resistance rarely indicates a lack of budget. It reveals that strategic differentiation, ROI relevance, or outcome certainty was never established early in discovery.",
        implication:
          "When economic value and outcome certainty are undeniable, commercial terms become an implementation detail rather than a battle.",
      },
    ],
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
