import type { Metadata } from "next";
import Link from "next/link";
import {
  videoRails,
  youtubeChannelUrl,
  signatureProperties,
} from "@/features/dipak-media/media.content";
import { PageHero, SectionHeader, Reveal } from "@/features/editorial";
import editorial from "@/features/editorial/editorial.module.css";
import styles from "./videos.module.css";
import { SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Videos by Dipak Vishwakarma — Founder of Authority Closers | Keynotes & Sales Breakdowns",
  description:
    "Keynotes, sales breakdowns, and practical lessons on buyer psychology from Dipak Vishwakarma, Founder of Authority Closers & High-Ticket Sales Expert.",
  alternates: {
    canonical: `${SITE_URL}/videos`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function VideosPage() {
  const railsWithVideos = videoRails.filter((rail) => rail.videos.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Videos"
        index="01"
        headline="Watch the latest"
        body={[
          "Conversations, breakdowns and practical lessons on how buyers think and how better sales conversations are built.",
        ]}
        aside={
          <figure className={styles.heroMediaPlate}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/optimized/videos-hero-1600-v1.webp"
              srcSet="/optimized/videos-hero-960-v1.webp 960w, /optimized/videos-hero-1600-v1.webp 1600w"
              sizes="(max-width: 900px) 90vw, 36vw"
              alt="Dipak Vishwakarma speaking on stage"
              width={1600}
              height={1067}
              className={`editorialGrade ${styles.heroMediaImage}`}
            />
            <figcaption className={styles.heroMediaCaption}>
              Keynote · Festival of Startups
            </figcaption>
          </figure>
        }
      />

      {railsWithVideos.length > 0 ? (
        railsWithVideos.map((rail, railIndex) => (
          <section
            key={rail.id}
            id={rail.id}
            className={`${editorial.section} ${railIndex % 2 === 1 ? editorial.sectionSunken : ""}`}
            aria-labelledby={`${rail.id}-heading`}
          >
            <div className={editorial.container}>
              <SectionHeader
                index={String(railIndex + 2).padStart(2, "0")}
                label="Videos"
                headline={rail.label}
                note={rail.note}
                headingId={`${rail.id}-heading`}
              />

              <ul className={styles.videoGrid}>
                {rail.videos.map((video, index) => (
                  <Reveal as="li" key={video.id} index={index}>
                    <a
                      className={styles.videoCard}
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ac-event="public.videos.video_clicked"
                    >
                      <span className={styles.thumbFrame}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={styles.thumb}
                          src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt=""
                          width={480}
                          height={360}
                          loading="lazy"
                        />
                        <span className={styles.playToken} aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5.5v13l11-6.5z" />
                          </svg>
                        </span>
                      </span>
                      <span className={styles.videoMeta}>
                        {video.category} · {video.duration}
                      </span>
                      <h3 className={styles.videoTitle}>{video.title}</h3>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        ))
      ) : (
        <section className={editorial.section} aria-labelledby="channel-heading">
          <div className={editorial.container}>
            <SectionHeader
              index="02"
              label="Channel"
              headline="New breakdowns are published on YouTube first"
              note="The three rails below this page will fill as each series goes live: Latest, My favourite lines in sales, and Shorts."
              headingId="channel-heading"
            />

            <Reveal>
              <div className={styles.channelCard}>
                <div className={styles.channelCopy}>
                  <p className={styles.channelLede}>
                    Until then, the essays cover the same ground in depth: buyer psychology,
                    objection diagnosis and the language that creates certainty.
                  </p>
                  <div className={editorial.ctaRow}>
                    {youtubeChannelUrl ? (
                      <a
                        className={editorial.ctaPrimary}
                        href={youtubeChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch on YouTube <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                    <Link className={editorial.ctaSecondary} href="/articles">
                      Read the essays <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <ul className={styles.railList} aria-label="Planned series">
                  {videoRails.map((rail, index) => (
                    <li key={rail.id} className={styles.railItem}>
                      <span className={styles.railIndex}>{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <span className={styles.railLabel}>{rail.label}</span>
                        <span className={styles.railNote}>{rail.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section
        className={`${editorial.section} ${editorial.sectionDark}`}
        aria-labelledby="signature-heading"
      >
        <div className={editorial.container}>
          <SectionHeader
            index="03"
            label="Signature content"
            headline="Signature properties"
            note="Different formats. One purpose: understand the buyer better and create more certainty."
            inverted
            headingId="signature-heading"
          />

          <ul className={styles.propertyList}>
            {signatureProperties.map((property, index) => (
              <Reveal as="li" key={property} index={index} className={styles.propertyItem}>
                <span className={styles.propertyIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.propertyName}>{property}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
