import type { ThinkingContent } from "./thinking.types";

/**
 * Static fallback for the "Latest thinking" act.
 *
 * The homepage injects real published articles from the file-backed store, so
 * `articles` here is only used if that list is empty (e.g. every post is a
 * draft). Keeping it empty means no fabricated essays can reach production.
 */
export const thinkingContent: ThinkingContent = {
  sectionNumber: "05",
  sectionTitle: "Latest thinking",
  metaLabel: "Publications & media",
  supportingNote:
    "Essays, video breakdowns and frameworks on buyer psychology and closing.",
  videoSectionHeading: "Featured masterclass",
  articleSectionHeading: "Essays",

  /**
   * `youtubeUrl` currently points at the channel. Replace it with a specific
   * video URL to turn this plate into a direct watch link, or unset it to hide
   * the block entirely.
   */
  featuredVideo: {
    id: "v1",
    title: "How to build unshakable certainty in high-ticket sales",
    category: "Sales strategy",
    duration: "14 min",
    youtubeUrl: "https://www.youtube.com/@DipakVishwakarma",
    summary:
      "A complete breakdown of certainty transfer, buyer friction elimination, and closing mechanics in high-ticket transactions.",
  },

  articles: [],

  videosCtaText: "Watch all videos",
  articlesCtaText: "Explore all articles",
};
