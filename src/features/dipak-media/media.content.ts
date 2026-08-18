/**
 * Videos + Resources content.
 * Copy transcribed from the handoff pack sections "VIDEOS / YOUTUBE" and
 * "RESOURCES / LEAD MAGNETS".
 */

export interface VideoEntry {
  id: string;
  title: string;
  /** YouTube video id — the page builds the watch/thumbnail URLs from it. */
  youtubeId: string;
  category: string;
  duration: string;
}

export interface VideoRail {
  id: string;
  label: string;
  note: string;
  videos: VideoEntry[];
}

/**
 * Dipak's YouTube channel URL.
 *
 * Left null deliberately: the copy master's CONTENT SAFETY flags list media
 * handles as unverified, and AGENTS.md forbids hard-coding a dead destination
 * to make a button clickable. Set this to the real channel URL and every
 * "Watch on YouTube" affordance across the site activates at once.
 */
export const youtubeChannelUrl: string | null = null;

/**
 * Video rails render from this structure.
 *
 * Populate `videos` with real YouTube ids and the grids, thumbnails, and
 * watch links all light up with no component changes. Until then each rail
 * renders its designed empty state rather than fabricated placeholder videos.
 */
export const videoRails: VideoRail[] = [
  {
    id: "latest",
    label: "Latest",
    note: "Short lessons, long-form breakdowns and real conversations about sales, buyer psychology, communication and business.",
    videos: [],
  },
  {
    id: "favourite-lines",
    label: "My Favourite Lines in Sales",
    note: "The specific phrasings that change how a conversation moves — and why they work.",
    videos: [],
  },
  {
    id: "shorts",
    label: "Shorts",
    note: "Single ideas, condensed.",
    videos: [],
  },
];

export interface LeadMagnet {
  index: string;
  title: string;
  description: string;
  ctaLabel: string;
  /** Contact-form topic this resource request maps to. */
  topic: string;
}

/**
 * Lead magnets.
 *
 * The copy master states: "Final downloadable files and exact promises must
 * be approved before publishing." So each CTA routes to the contact form with
 * the request pre-selected, rather than linking a download that does not
 * exist yet. Swap `topic` for a real file path once the assets are approved.
 */
export const leadMagnets: LeadMagnet[] = [
  {
    index: "01",
    title: "Certainty Checklist",
    description:
      "A simple conversation checklist for identifying uncertainty before asking for a decision.",
    ctaLabel: "Request the Checklist",
    topic: "Certainty Checklist",
  },
  {
    index: "02",
    title: "Buyer Psychology Question Bank",
    description:
      "Questions designed to improve discovery, context and buyer understanding.",
    ctaLabel: "Request the Question Bank",
    topic: "Buyer Psychology Question Bank",
  },
  {
    index: "03",
    title: "Objection Diagnosis Sheet",
    description:
      "A framework for separating surface objections from the actual uncertainty behind them.",
    ctaLabel: "Request the Sheet",
    topic: "Objection Diagnosis Sheet",
  },
  {
    index: "04",
    title: "High-Ticket Conversation Review",
    description:
      "A self-review worksheet for evaluating discovery, trust, value, communication and next-step clarity.",
    ctaLabel: "Request the Review Framework",
    topic: "High-Ticket Conversation Review",
  },
];

/** Signature content properties — copy master section 08. */
export const signatureProperties = [
  "Buyer Psychology Files™",
  "Objection Clinic™",
  "Authority Conversations™",
  "Decision Momentum™",
  "Trust Engineering™",
  "Certainty Framework™",
];
