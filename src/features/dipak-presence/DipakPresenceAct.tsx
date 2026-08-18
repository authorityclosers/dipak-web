import React from "react";
import { presenceContent } from "./presence.content";
import type { PresenceContent } from "./presence.types";
import styles from "./dipak-presence-act.module.css";

interface DipakPresenceActProps {
  content?: PresenceContent;
  className?: string;
}

/**
 * Pixel-precise vector glyphs for each media platform
 */
const PLATFORM_ICONS: Record<string, React.ReactElement> = {
  medium: (
    <svg className={styles.svgIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
  dailyhunt: (
    <svg className={styles.svgIcon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="12"
        y="15.8"
        textAnchor="middle"
        fontSize="9.2"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="-0.3px"
        fill="currentColor"
      >
        DH
      </text>
    </svg>
  ),
  youtube: (
    <svg className={styles.svgIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  podcast: (
    <svg
      className={styles.svgIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a3.2 3.2 0 0 0-3.2 3.2v6.6a3.2 3.2 0 0 0 6.4 0V5.2A3.2 3.2 0 0 0 12 2Z" fill="currentColor" />
      <path d="M19 10.5v1.5a7 7 0 0 1-14 0v-1.5" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  linkedin: (
    <svg className={styles.svgIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
};

export function DipakPresenceAct({
  content = presenceContent,
  className,
}: DipakPresenceActProps) {
  return (
    <section
      id="presence"
      className={`${styles.presenceSection} ${className || ""}`}
      aria-labelledby="presence-heading"
      data-story-act3="true"
    >
      <div className={styles.atmosphereLayer} aria-hidden="true" />

      {/* The Broader Envelope Security Certificate Frame */}
      <div className={styles.ticketFrameRoot} data-story-act3-ticket="true">
        {/* Subtle, Sophisticated Sunset Aurora Texture (Restricted to Top-Left/Center Crest) */}
        <div className={styles.auroraBackground} aria-hidden="true">
          <div className={styles.auroraAmberBlob} />
          <div className={styles.auroraCoralBlob} />
          <div className={styles.auroraRoseBlob} />
          <div className={styles.auroraTextureOverlay} />
        </div>

        {/* 4 Precise Geometric Scallop Corner Cuts */}
        <div className={styles.scallopTL} data-story-act3-scallop="true" aria-hidden="true" />
        <div className={styles.scallopTR} data-story-act3-scallop="true" aria-hidden="true" />
        <div className={styles.scallopBL} data-story-act3-scallop="true" aria-hidden="true" />
        <div className={styles.scallopBR} data-story-act3-scallop="true" aria-hidden="true" />

        {/* 4 Outer Corner Geometric 8-Point Diamond Florets */}
        <div className={styles.cornerStarTL} data-story-act3-floret="true" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <polygon points="8,1 10,6 15,8 10,10 8,15 6,10 1,8 6,6" fill="#C59B27" />
            <polygon points="8,4 9,7 12,8 9,9 8,12 7,9 4,8 7,7" fill="#FAF6EE" />
          </svg>
        </div>
        <div className={styles.cornerStarTR} data-story-act3-floret="true" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <polygon points="8,1 10,6 15,8 10,10 8,15 6,10 1,8 6,6" fill="#C59B27" />
            <polygon points="8,4 9,7 12,8 9,9 8,12 7,9 4,8 7,7" fill="#FAF6EE" />
          </svg>
        </div>
        <div className={styles.cornerStarBL} data-story-act3-floret="true" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <polygon points="8,1 10,6 15,8 10,10 8,15 6,10 1,8 6,6" fill="#C59B27" />
            <polygon points="8,4 9,7 12,8 9,9 8,12 7,9 4,8 7,7" fill="#FAF6EE" />
          </svg>
        </div>
        <div className={styles.cornerStarBR} data-story-act3-floret="true" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <polygon points="8,1 10,6 15,8 10,10 8,15 6,10 1,8 6,6" fill="#C59B27" />
            <polygon points="8,4 9,7 12,8 9,9 8,12 7,9 4,8 7,7" fill="#FAF6EE" />
          </svg>
        </div>

        {/* Inner Engraved Certificate Border */}
        <div className={styles.innerEngravedBorder} aria-hidden="true" />

        {/* Header Inside Envelope Card */}
        <header className={styles.ticketHeaderRow}>
          <div className={styles.titleBlock}>
            <div className={styles.sectionIndex} data-story-act3-index="true">
              <span>{content.sectionNumber}</span>
              <span aria-hidden="true">/</span>
              <span>{content.sectionTitle}</span>
            </div>

            <h2 id="presence-heading" className={styles.headline}>
              <span className={styles.headlineMask}>
                <span className={styles.headlineLine} data-story-act3-headline="true">
                  {content.headlineWord1}
                </span>
              </span>{" "}
              <span className={styles.headlineMask}>
                <span className={styles.headlineLine} data-story-act3-headline="true">
                  {content.headlineWord2}
                  <span className={styles.goldPeriod}>.</span>
                </span>
              </span>
            </h2>
          </div>

          <div className={styles.headerMeta}>
            <div className={styles.metaHeadingRow}>
              <span className={styles.metaLabel} data-story-act3-meta-label="true">
                {content.metaLabel}
              </span>
              <span
                className={styles.metaDividerStar}
                data-story-act3-meta-star="true"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
            <p className={styles.supportingNote} data-story-act3-note="true">
              {content.supportingNote}
            </p>
          </div>
        </header>

        {/* Mathematically Precise Geometric Coordinate Separator Axis */}
        <div
          className={styles.centerDividerAxis}
          data-story-act3-axis="true"
          aria-hidden="true"
        >
          <svg
            className={styles.geometricSeparatorSvg}
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Left Baseline Hairline */}
            <line x1="0" y1="12" x2="435" y2="12" stroke="#C59B27" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Left Geometric Filigree S-Curve */}
            <path
              d="M 435 12 C 452 12, 466 5.5, 478 9 C 488 11.5, 494 12, 500 12"
              stroke="#C59B27"
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />
            
            {/* Center Sacred Geometry 8-Point Diamond Star */}
            <g data-story-act3-axis-floret="true">
              <polygon points="500,2 506,12 500,22 494,12" fill="#C59B27" />
              <polygon points="500,5 504,12 500,19 496,12" fill="#FAF6EE" />
              <polygon points="500,7 502.5,12 500,17 497.5,12" fill="#C59B27" />
            </g>

            {/* Right Geometric Filigree S-Curve */}
            <path
              d="M 500 12 C 506 12, 512 11.5, 522 9 C 534 5.5, 548 12, 565 12"
              stroke="#C59B27"
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />

            {/* Right Baseline Hairline */}
            <line x1="565" y1="12" x2="1000" y2="12" stroke="#C59B27" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Bottom 5-Column Platform Signatures Grid */}
        <ul
          className={styles.platformsGrid}
          aria-label="Media publications and channels"
          data-story-act3-grid="true"
        >
          {content.signatures.map((signature, idx) => {
            const body = (
              <>
                <div className={styles.iconBadge} data-story-act3-badge="true">
                  {PLATFORM_ICONS[signature.iconType]}
                </div>
                <h3 className={styles.platformTitle} data-story-act3-item-title="true">
                  {signature.name}
                </h3>
                <p className={styles.platformCaption}>{signature.sublabel}</p>
              </>
            );

            return (
              <li
                key={signature.id}
                className={styles.platformColumn}
                data-story-act3-item="true"
              >
                {signature.href ? (
                  <a
                    className={styles.platformLink}
                    href={signature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ac-event="public.home.presence_platform_clicked"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}

                {/* Vertical Divider with Geometric Diamond Star Pip */}
                {idx < content.signatures.length - 1 && (
                  <div className={styles.columnDivider} aria-hidden="true">
                    <span className={styles.dividerStarPip}>✦</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
