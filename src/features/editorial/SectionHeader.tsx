import styles from "./editorial.module.css";

interface SectionHeaderProps {
  index: string;
  label: string;
  headline: string;
  note?: string;
  /** Renders light-on-dark for obsidian sections. */
  inverted?: boolean;
  headingId?: string;
}

export function SectionHeader({
  index,
  label,
  headline,
  note,
  inverted = false,
  headingId,
}: SectionHeaderProps) {
  return (
    <header
      className={`${styles.sectionHeader} ${inverted ? styles.inverted : ""}`}
    >
      <div className={styles.sectionHeaderMain}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrowIndex}>{index}</span>
          <span className={styles.eyebrowSlash} aria-hidden="true">
            /
          </span>
          <span className={styles.eyebrow}>{label}</span>
        </div>

        <h2 id={headingId} className={styles.sectionHeadline}>
          {headline}
          <span className={styles.goldPeriod} aria-hidden="true">
            .
          </span>
        </h2>
      </div>

      {note ? <p className={styles.sectionNote}>{note}</p> : null}
    </header>
  );
}
