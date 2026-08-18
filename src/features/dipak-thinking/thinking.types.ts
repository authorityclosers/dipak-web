export interface FeaturedVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  youtubeUrl: string;
}

export interface FeaturedArticle {
  id: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  url?: string;
}

export interface ThinkingContent {
  sectionNumber: string;
  sectionTitle: string;
  videoSectionHeading: string;
  articleSectionHeading: string;
  featuredVideo: FeaturedVideo;
  articles: FeaturedArticle[];
  videosCtaText: string;
  articlesCtaText: string;
}
