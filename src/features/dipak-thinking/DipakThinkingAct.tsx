import Link from "next/link";
import type { ThinkingContent, FeaturedArticle } from "./thinking.types";
import { thinkingContent } from "./thinking.content";
import styles from "./dipak-thinking-act.module.css";

interface DipakThinkingActProps {
  content?: ThinkingContent;
  /** Real published articles, injected by the page from the article store. */
  articles?: FeaturedArticle[];
  className?: string;
}

/** Read times under three minutes say more about length than value; hide them. */
function meaningfulReadTime(readTime: string): string | null {
  const minutes = Number.parseInt(readTime, 10);
  if (Number.isNaN(minutes) || minutes < 3) return null;
  return `${minutes} min read`;
}

export function DipakThinkingAct({
  content = thinkingContent,
  articles,
  className,
}: DipakThinkingActProps) {
  const essays = articles?.length ? articles : content.articles;
  const featuredVideo = content.featuredVideo;

  return (
    <section
      id="thinking"
      className={`${styles.section} ${className || ""}`}
      aria-labelledby="thinking-heading"
      data-story-act6="true"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>{content.sectionNumber}</span>
              {content.sectionTitle}
            </p>
            <h2 id="thinking-heading" className={styles.headline}>
              Latest <em>thinking</em>
            </h2>
          </div>
          <p className={styles.note}>{content.supportingNote}</p>
        </header>

        <div className={styles.layout}>
          {featuredVideo?.youtubeUrl ? (
            <a
              href={featuredVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoPlate}
              aria-label={`Watch masterclass: ${featuredVideo.title}`}
              data-ac-event="public.home.featured_video_clicked"
              data-story-act6-video="true"
            >
              <span className={styles.videoFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/optimized/video-plate-1600-v1.webp"
                  srcSet="/optimized/video-plate-960-v1.webp 960w, /optimized/video-plate-1600-v1.webp 1600w"
                  sizes="(max-width: 900px) 100vw, 44vw"
                  alt=""
                  width={1600}
                  height={1067}
                  loading="lazy"
                  decoding="async"
                  className={`editorialGrade ${styles.videoImg}`}
                />
                <span className={styles.playButton} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
              </span>
              <span className={styles.videoMeta}>
                <span className={styles.videoKicker}>
                  {content.videoSectionHeading} · {featuredVideo.duration}
                </span>
                <span className={styles.videoTitle}>{featuredVideo.title}</span>
                {featuredVideo.summary ? (
                  <span className={styles.videoSummary}>{featuredVideo.summary}</span>
                ) : null}
              </span>
            </a>
          ) : null}

          <div className={styles.essays} data-story-act6-articles="true">
            <span className={styles.essaysLabel}>{content.articleSectionHeading}</span>
            <ul className={styles.essayList} aria-label="Essays">
              {essays.map((essay) => {
                const readTime = meaningfulReadTime(essay.readTime);
                return (
                  <li key={essay.id}>
                    <Link
                      href={essay.url ?? "/articles"}
                      className={styles.essayRow}
                      data-story-act6-essay-row="true"
                      data-ac-event="public.home.article_clicked"
                    >
                      <span className={styles.essayIndex}>{essay.number}</span>
                      <span className={styles.essayBody}>
                        <span className={styles.essayCategory}>
                          {essay.category}
                          {readTime ? ` · ${readTime}` : ""}
                        </span>
                        <h3 className={styles.essayTitle}>{essay.title}</h3>
                        {essay.abstract ? (
                          <span className={styles.essayAbstract}>{essay.abstract}</span>
                        ) : null}
                      </span>
                      <span className={styles.essayArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link className={styles.allLink} href="/articles">
              {content.articlesCtaText}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
