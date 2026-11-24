import type { BookContent } from "./book.types";

// Copy is Dipak's own, from the printed back cover of The Sales Team Trap
// (Book Cover Final Version, Pothi 6x9). StoryBrand order: the reader is the
// hero with a problem, Dipak is the guide, the three parts are the plan.
export const bookContent: BookContent = {
  sectionNumber: "07",
  sectionTitle: "THE BOOK",
  eyebrow: "A BOOK FOR BUSINESS OWNERS",
  title: "The Sales Team Trap",
  subtitle:
    "The hidden mistakes in hiring, training and managing sales teams that quietly drain your profits.",
  hook: "You built a sales team to grow your business.",
  hookEmphasis: "So why does so much still depend on you?",
  problem:
    "You hire, train and manage your sales team. Yet key results still depend on your constant involvement.",
  question: "What if the real problem isn’t your salespeople, but the system around them?",
  insideLabel: "INSIDE THE BOOK",
  inside: [
    { title: "Hiring", body: "How to go beyond interviews and identify real selling ability." },
    { title: "Training", body: "How to turn learning into consistent performance." },
    { title: "Management", body: "How to look beyond activity and focus on what truly drives results." },
  ],
  guideLabel: "YOUR GUIDE",
  guide:
    "With over 11 years of experience in sales and business consulting, Dipak Vishwakarma helps business owners build more effective sales teams with less founder dependency.",
  cover: {
    src: "/books/the-sales-team-trap-540.webp",
    srcSet:
      "/books/the-sales-team-trap-360.webp 360w, /books/the-sales-team-trap-540.webp 540w, /books/the-sales-team-trap-720.webp 720w",
    width: 540,
    height: 810,
    alt: "Cover of The Sales Team Trap by Dipak Vishwakarma. A business owner stands at the edge of a maze marked Hiring, Training and Management.",
  },
  // No purchase page exists yet. Set an approved URL here to show the button;
  // until then only the Sales X-Ray link shows (AGENTS.md rule 10: no dead CTAs).
  buyCta: null,
  secondaryCta: {
    label: "Put it to work with Sales X-Ray",
    href: "https://salesxray.in",
    event: "cta_book_sales_xray",
  },
};
