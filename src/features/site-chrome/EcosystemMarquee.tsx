import React from "react";
import styles from "./site-chrome.module.css";

const ECOSYSTEM_ENTITIES = [
  { name: "AUTHORITY CLOSERS™", category: "Revenue Infrastructure", symbol: "✦" },
  { name: "MEDIUM EDITORIAL", category: "Thought Leadership", symbol: "●" },
  { name: "DAILYHUNT", category: "Syndicated Column", symbol: "■" },
  { name: "YOUTUBE MASTERCLASSES", category: "Sales Engineering", symbol: "▶" },
  { name: "FOUNDER PODCASTS", category: "Executive Dialogue", symbol: "◆" },
  { name: "LINKEDIN NETWORK", category: "Daily Insights", symbol: "▲" },
  { name: "NAYA GROWTH", category: "Strategic Ventures", symbol: "✦" },
  { name: "CERTAINTY BLUEPRINT", category: "Sales Methodology", symbol: "●" },
];

export function EcosystemMarquee() {
  return (
    <section className={styles.marqueeSection} aria-label="Ecosystem and Publications Marquee">
      <div className={styles.marqueeHeader}>
        <div className={styles.marqueeKickerRow}>
          <span className={styles.marqueePulseDot} aria-hidden="true" />
          <span className={styles.marqueeKicker}>STRATEGIC IMPACT · PLATFORMS & VENTURE FOOTPRINT</span>
        </div>
        <p className={styles.marqueeSubhead}>
          Empowering enterprise founders, closers, and high-ticket sales engines worldwide.
        </p>
      </div>

      <div className={styles.marqueeTrackWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {/* Double track for seamless infinite loop */}
          {[...ECOSYSTEM_ENTITIES, ...ECOSYSTEM_ENTITIES].map((item, idx) => (
            <div key={`${item.name}-${idx}`} className={styles.marqueeCard}>
              <span className={styles.marqueeCardSymbol}>{item.symbol}</span>
              <div className={styles.marqueeCardContent}>
                <span className={styles.marqueeCardName}>{item.name}</span>
                <span className={styles.marqueeCardCategory}>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.marqueeMetricsRow}>
        <span className={styles.marqueeMetricPill}>
          <strong className={styles.metricBold}>₹9+ CRORE</strong> REVENUE GENERATED
        </span>
        <span className={styles.marqueeMetricDivider}>·</span>
        <span className={styles.marqueeMetricPill}>
          <strong className={styles.metricBold}>940+</strong> PROFESSIONALS TRAINED
        </span>
        <span className={styles.marqueeMetricDivider}>·</span>
        <span className={styles.marqueeMetricPill}>
          <strong className={styles.metricBold}>11+ YEARS</strong> SALES LEADERSHIP
        </span>
      </div>
    </section>
  );
}
