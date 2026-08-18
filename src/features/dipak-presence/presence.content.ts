import type { PresenceContent } from "./presence.types";

/**
 * "Featured / Found On" proof rail.
 * Copy from the handoff pack, 01_COPY section 03.
 *
 * `href` is omitted on every entry deliberately. The previous values were
 * bare root domains (medium.com, youtube.com, linkedin.com) — not Dipak's
 * profiles — and the copy master flags media handles as unverified. Add each
 * real profile URL here and that platform becomes a working link on its own.
 */
export const presenceContent: PresenceContent = {
  sectionNumber: "03",
  sectionTitle: "Presence",
  headlineWord1: "FEATURED",
  headlineWord2: "IN",
  metaLabel: "Digital Signatures",
  supportingNote:
    "Ideas on sales, buyer psychology, certainty, communication, entrepreneurship and the systems behind better conversations.",
  signatures: [
    {
      id: "medium",
      name: "Medium",
      sublabel: "Articles & Long-form Essays",
      category: "THINKING",
      iconType: "medium",
    },
    {
      id: "dailyhunt",
      name: "Dailyhunt",
      sublabel: "Published Columns & Syndication",
      category: "PUBLISHED",
      iconType: "dailyhunt",
    },
    {
      id: "youtube",
      name: "YouTube",
      sublabel: "Video Breakdowns & Sales Training",
      category: "EDUCATION",
      iconType: "youtube",
    },
    {
      id: "podcast",
      name: "Podcast",
      sublabel: "In-depth Founder Conversations",
      category: "AUDIO",
      iconType: "podcast",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      sublabel: "Daily Strategic Insights & Frameworks",
      category: "AUTHORITY",
      iconType: "linkedin",
    },
  ],
};
