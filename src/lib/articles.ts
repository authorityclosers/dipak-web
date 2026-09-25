import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Unified article store.
 *
 * All content lives in `src/content/articles/` — what was previously the
 * "blog" collection has been merged here. The /blog route 301-redirects to
 * /articles so old indexed URLs preserve SEO equity.
 *
 * Publishing: drop a `.md` file into `src/content/articles/`, commit, push.
 */

const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

export const ARTICLE_CATEGORIES = [
  "Sales",
  "Buyer Psychology",
  "Communication",
  "Personal Branding",
  "AI",
  "Entrepreneurship",
  "Startups",
  "Public Speaking",
  "High-Ticket Sales",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface ArticleMeta {
  slug: string;
  title: string;
  displayTitle: string;
  excerpt: string;
  category: string;
  /** ISO date string, e.g. "2026-08-18". */
  date: string;
  /** ISO date string for meaningful editorial revisions. */
  updatedAt?: string;
  readTime: string;
  series?: string;
  featured?: boolean;
  draft?: boolean;
  coverImage: string;
  /** Tags (previously blog-only). Kept for compatibility. */
  tags?: string[];
}

export interface Article extends ArticleMeta {
  html: string;
}

export function getDisplayTitle(title: string): string {
  return title.replace(/^Dipak Vishwakarma on\s+/i, "").trim();
}

const DEFAULT_COVER_IMAGES: Record<string, string> = {
  "the-silent-sales-pipeline-killer": "/media/04_dsc07013.webp",
  "why-the-best-salespeople-talk-less": "/media/08_img_1624.webp",
  "3-questions-founders-avoid-asking": "/media/11__dsc7249.webp",
  "the-architecture-of-high-ticket-sales": "/media/05_dsc06990.webp",
  "buyer-psychology-undecided-mind": "/media/01_dsc06974.webp",
  "personal-branding-in-the-age-of-ai": "/media/03_dsc06998.webp",
  "public-speaking-as-business-leverage": "/media/06_dsc04024.webp",
  "ai-and-the-future-of-sales": "/media/12_dsc04050.webp",
  "the-buyer-doesnt-need-to-like-you": "/media/04_dsc07013.webp",
  "the-true-meaning-of-communication": "/media/08_img_1624.webp",
  "trust-is-the-absence-of-doubt": "/media/05_dsc06990.webp",
  "why-buyers-dont-say-no": "/media/01_dsc06974.webp",
  "how-to-create-certainty": "/media/11__dsc7249.webp",
};

function estimateReadTime(body: string): string {
  const visibleText = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~`]/g, " ");
  const words = visibleText.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return `${Math.max(1, Math.ceil(words / 200))} MIN READ`;
}

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") return raw.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function readArticleFile(dir: string, fileName: string): Article | null {
  const slug = fileName.replace(/\.md$/, "");
  const filePath = path.join(dir, fileName);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title) return null;

  // Support both 'date' and 'publishedAt' frontmatter keys
  const dateStr = String(data.date || data.publishedAt || "");
  if (!dateStr) return null;
  const updatedAt = String(data.updatedAt || "");

  // Support both 'category' (articles) and 'topic' (old blog) frontmatter
  const category = String(data.category || data.topic || "Sales");
  const title = String(data.title);
  const displayTitle = getDisplayTitle(title);
  const coverImage = String(data.coverImage || DEFAULT_COVER_IMAGES[slug] || "/media/01_dsc06974.webp");

  return {
    slug,
    title,
    displayTitle,
    excerpt: String(data.excerpt ?? ""),
    category,
    date: dateStr,
    updatedAt: updatedAt || undefined,
    readTime: estimateReadTime(content),
    series: data.series ? String(data.series) : undefined,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    coverImage,
    tags: parseTags(data.tags),
    html: marked.parse(content, { async: false }),
  };
}

/** All published articles, newest first. Drafts excluded. */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readArticleFile(ARTICLES_DIR, file))
    .filter((a): a is Article => a !== null && !a.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/[\s_]+/g, "-");

  // Try clean slug first, then raw slug
  for (const s of [cleanSlug, slug]) {
    const file = path.join(ARTICLES_DIR, `${s}.md`);
    if (fs.existsSync(file)) {
      const article = readArticleFile(ARTICLES_DIR, `${s}.md`);
      return article && !article.draft ? article : null;
    }
  }
  return null;
}

export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getActiveCategories(articles: Article[]): string[] {
  const present = new Set(articles.map((a) => a.category));
  return ARTICLE_CATEGORIES.filter((c) => present.has(c));
}

export { formatArticleDate } from "./dates";

