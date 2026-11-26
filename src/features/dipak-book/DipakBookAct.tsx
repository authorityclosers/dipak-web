import React from "react";
import { bookContent } from "./book.content";
import type { BookContent } from "./book.types";
import styles from "./dipak-book-act.module.css";

interface DipakBookActProps {
  content?: BookContent;
  className?: string;
}

export function DipakBookAct({ content = bookContent, className }: DipakBookActProps) {
  return (
    <section
      id="book"
      className={`${styles.bookSection} ${className || ""}`}
      aria-labelledby="book-heading"
      data-story-book="true"
    >
      <div className={styles.bookContainer}>
        <div className={styles.coverColumn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.cover.src}
            srcSet={content.cover.srcSet}
            sizes="(max-width: 860px) 62vw, 22rem"
            width={content.cover.width}
            height={content.cover.height}
            alt={content.cover.alt}
            className={styles.cover}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={styles.copyColumn}>
          <div className={styles.sectionIndex}>
            <span>{content.sectionNumber}</span>
            <span aria-hidden="true">/</span>
            <span>{content.sectionTitle}</span>
          </div>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="book-heading" className={styles.title}>
            {content.title}
            <span className={styles.period}>.</span>
          </h2>
          <p className={styles.subtitle}>{content.subtitle}</p>

          <p className={styles.body}>{content.description}</p>
          <p className={styles.question}>{content.question}</p>

          <p className={styles.label}>{content.insideLabel}</p>
          <ul className={styles.inside}>
            {content.inside.map((item) => (
              <li key={item.title}>
                <span className={styles.insideTitle}>{item.title}</span>
                <span className={styles.insideBody}>{item.body}</span>
              </li>
            ))}
          </ul>

          <div className={styles.guide}>
            <p className={styles.label}>{content.guideLabel}</p>
            <p className={styles.body}>{content.guide}</p>
          </div>

          <div className={styles.ctaRow}>
            {content.buyCta && (
              <a
                href={content.buyCta.href}
                className={styles.primaryButton}
                data-ac-event={content.buyCta.event}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{content.buyCta.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
            <a
              href={content.secondaryCta.href}
              className={content.buyCta ? styles.secondaryButton : styles.primaryButton}
              data-ac-event={content.secondaryCta.event}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{content.secondaryCta.label}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
