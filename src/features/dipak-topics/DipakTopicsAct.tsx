"use client";

import { useEffect, useRef, useState } from "react";
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

  // Sync the sticky image with the row nearest the middle of the viewport.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveIndex(index);
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [content.topics]);

  const activeTopic = content.topics[activeIndex] || content.topics[0];

  return (
    <section
      id="topics"
      className={`${styles.section} ${className || ""}`}
      aria-labelledby="topics-heading"
      data-story-act5="true"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>{content.sectionNumber}</span>
              {content.sectionTitle}
            </p>
            <h2 id="topics-heading" className={styles.headline}>
              {content.headlineWord1} <em>{content.headlineWord2}</em>
            </h2>
          </div>
          <p className={styles.note}>{content.supportingNote}</p>
        </header>

        <div className={styles.split}>
          <div className={styles.list} aria-label="Subjects">
            {content.topics.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <Link
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href || "/articles"}
                  className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  data-story-act5-item="true"
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={styles.rowIndex}>{item.number}</span>
                  <span className={styles.rowBody}>
                    <span className={styles.rowTag}>{item.tag}</span>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                    <span className={styles.rowDescription}>{item.description}</span>
                  </span>
                  <span className={styles.rowArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <aside className={styles.stage} aria-hidden="true">
            <div className={styles.stageSticky}>
              <div className={styles.stageFrame}>
                {content.topics.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""}`}
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`editorialGrade ${styles.slideImg}`}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className={styles.stageCaption}>
                <span className={styles.stageIndex}>
                  {activeTopic.number} / {String(content.topics.length).padStart(2, "0")}
                </span>
                <span className={styles.stageTitle}>{activeTopic.title}</span>
                <Link href={activeTopic.href || "/articles"} className={styles.stageLink} tabIndex={-1}>
                  Read the framework <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
