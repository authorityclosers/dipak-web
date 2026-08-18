import type { PresenceContent } from "./presence.types";

export const presenceContent: PresenceContent = {
  sectionNumber: "03",
  sectionTitle: "PRESENCE",
  headlineWord1: "FEATURED",
  headlineWord2: "IN",
  supportingNote: "Ideas published, discussed, and referenced across digital platforms.",
  signatures: [
    {
      id: "medium",
      name: "Medium",
      sublabel: "Articles & Long-form Essays",
      category: "THINKING",
      iconType: "medium",
      href: "https://medium.com",
    },
    {
      id: "dailyhunt",
      name: "Dailyhunt",
      sublabel: "Published Columns & Synergies",
      category: "PUBLISHED",
      iconType: "dailyhunt",
    },
    {
      id: "youtube",
      name: "YouTube",
      sublabel: "Video Breakdowns & Sales Training",
      category: "EDUCATION",
      iconType: "youtube",
      href: "https://youtube.com",
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
      href: "https://linkedin.com",
    },
  ],
};
