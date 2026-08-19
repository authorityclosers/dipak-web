/**
 * Unified, CMS-Agnostic Content Types
 *
 * Defines the strict contracts for both signature "Articles" (long-form IP/essays)
 * and continuous "Blogs" (timely commentary, breakdowns, field notes).
 *
 * These interfaces decouple the Next.js UI layer from the storage engine
 * (whether file-system markdown today, or Strapi / Sanity / Ghost / FastAPI later).
 */

export type ContentKind = "article" | "blog";

export interface BaseContentItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string: "2026-08-20" */
  publishedAt: string;
  /** Estimated or calculated read time, e.g. "5 MIN READ" */
  readTime: string;
  /** Rendered HTML body or rich text string */
  html: string;
  /** Optional cover image path or remote URL */
  coverImage?: string;
  /** Optional author attribution */
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  /** Publication state flag */
  draft?: boolean;
}

/**
 * Flagship Intellectual Property / Long-form Masterclass Essay
 */
export interface ArticleItem extends BaseContentItem {
  kind: "article";
  category: string;
  /** Signature series title, e.g. "Certainty Frameworks™" */
  series?: string;
  /** Featured on home / header slot */
  featured?: boolean;
}

/**
 * Continuous Post / Tactical Field Note
 */
export interface BlogPostItem extends BaseContentItem {
  kind: "blog";
  tags: string[];
  /** Optional topic / track */
  topic?: string;
}

/**
 * Canonical Content Adapter Interface
 * Any CMS provider (Local Filesystem, Strapi, Sanity, Headless Ghost, Authority Closers API)
 * must implement this contract.
 */
export interface ContentProvider {
  // Articles
  getArticles(): Promise<ArticleItem[]> | ArticleItem[];
  getArticleBySlug(slug: string): Promise<ArticleItem | null> | (ArticleItem | null);
  getArticleSlugs(): Promise<string[]> | string[];

  // Blogs
  getBlogPosts(): Promise<BlogPostItem[]> | BlogPostItem[];
  getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> | (BlogPostItem | null);
  getBlogPostSlugs(): Promise<string[]> | string[];
}
