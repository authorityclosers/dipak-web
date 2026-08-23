"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TopicsContent } from "./topics.types";
import { topicsContent } from "./topics.content";
import styles from "./dipak-topics-act.module.css";

interface DipakTopicsActProps {
  content?: TopicsContent;
  className?: string;
}

export function DipakTopicsAct({
  content = topicsContent,
  className,
}: DipakTopicsActProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // IntersectionObserver to sync active image on natural scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          rootMargin: "-25% 0px -25% 0px",
          threshold: 0.3,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [content.topics]);

  const activeTopic = content.topics[activeIndex] || content.topics[0];

  return (
    <section
      id="topics"
      className={`${styles.topicsSection} ${className || ""}`}
      aria-labelledby="topics-heading"
      data-story-act5="true"
    >
      <div className={styles.atmosphereLayer} aria-hidden="true" />
      <div className={styles.ensoEcho} aria-hidden="true" />

      <div className={styles.topicsContainer}>
        {/* Header Row */}
        <header className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <div className={styles.sectionIndex} data-story-act5-index="true">
              <span>{content.sectionNumber}</span>
              <span aria-hidden="true">/</span>
              <span>{content.sectionTitle}</span>
            </div>

            <h2 id="topics-heading" className={styles.headline}>
              <span>{content.headlineWord1}</span>{" "}
              <span>
                {content.headlineWord2}
                <span className={styles.goldPeriod}>.</span>
              </span>
            </h2>
          </div>

          <div className={styles.headerMeta}>
            <span className={styles.metaLabel}>{content.metaLabel}</span>
            <p className={styles.supportingNote} data-story-act5-note="true">
              {content.supportingNote}
            </p>
          </div>
        </header>

        {/* Split Editorial Interactive Ledger + Sticky Visual Stage */}
        <div className={styles.splitLayout}>
          {/* Left Column: Interactive Topic Ledger List */}
          <div
            className={styles.ledgerList}
            aria-label="Topics ledger"
            data-story-act5-ledger="true"
          >
            {content.topics.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <Link
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href || "/articles"}
                  className={`${styles.ledgerItem} ${isActive ? styles.ledgerItemActive : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  data-story-act5-item="true"
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className={styles.itemIndicator} aria-hidden="true" />

                  <div className={styles.itemHeader}>
                    <span className={styles.itemNumber}>[{item.number}]</span>
                    <span className={styles.itemTag}>{item.tag}</span>
                  </div>

                  <div className={styles.itemBody}>
                    <div className={styles.itemTitleRow}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <span className={styles.itemArrow} aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </div>

                  {/* Mobile Compact Visual Fallback */}
                  {item.image ? (
                    <div className={styles.mobileThumbFrame}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1023px) 100vw, 400px"
                        className={styles.mobileThumbImg}
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* Right Column: Sticky Cinematic Image Stage (Desktop >= 1024px) */}
          <aside className={styles.stickyStageColumn} aria-hidden="true">
            <div className={styles.stickyStageInner}>
              <div className={styles.previewCanvas}>
                {content.topics.map((item, index) => {
                  const isCurrent = index === activeIndex;

                  return (
                    <div
                      key={item.id}
                      className={`${styles.imageSlide} ${isCurrent ? styles.imageSlideActive : ""}`}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          priority={index === 0}
                          sizes="(min-width: 1024px) 45vw, 600px"
                          quality={90}
                          className={styles.slideImage}
                        />
                      ) : null}
                      <div className={styles.slideGradient} />
                    </div>
                  );
                })}

                {/* Overlaid Context Floating Badge */}
                <div className={styles.canvasBadge}>
                  <span className={styles.badgeNumber}>
                    {activeTopic.number} / {String(content.topics.length).padStart(2, "0")}
                  </span>
                  <span className={styles.badgeDivider}>·</span>
                  <span className={styles.badgeTag}>{activeTopic.tag}</span>
                </div>

                {/* Overlaid Title Glass Bar */}
                <div className={styles.canvasCaption}>
                  <p className={styles.captionCategory}>DEEP EXPLORATION</p>
                  <h4 className={styles.captionTitle}>{activeTopic.title}</h4>
                  <Link href={activeTopic.href || "/articles"} className={styles.captionLink}>
                    <span>Read Framework</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
