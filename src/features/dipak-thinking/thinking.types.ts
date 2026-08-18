export interface FeaturedVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  /** Empty/undefined hides the featured-video block entirely. */
  youtubeUrl?: string;
  summary?: string;
}

export interface FeaturedArticle {
  id: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  /** Signature content property, e.g. "Trust Engineering™". */
  series?: string;
  abstract?: string;
  /** Internal route to the published article. */
  url?: string;
}

export interface ThinkingContent {
  sectionNumber: string;
  sectionTitle: string;
  metaLabel: string;
  supportingNote: string;
  videoSectionHeading: string;
  articleSectionHeading: string;
  featuredVideo: FeaturedVideo;
  articles: FeaturedArticle[];
  videosCtaText: string;
  articlesCtaText: string;
}
