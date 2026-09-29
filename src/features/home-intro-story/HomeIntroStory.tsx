"use client";

import { useRef } from "react";
import { DipakHero, dipakHeroContent } from "@/features/dipak-hero";
import { DipakIdentityAct, identityContent } from "@/features/dipak-identity";
import { DipakMissionAct, missionContent } from "@/features/dipak-mission";
import { DipakTopicsAct, topicsContent } from "@/features/dipak-topics";
import { DipakThinkingAct, thinkingContent } from "@/features/dipak-thinking";
import { DipakBridgeAct, bridgeContent } from "@/features/dipak-bridge";
import type { FeaturedArticle } from "@/features/dipak-thinking/thinking.types";
import { useHomeIntroTimeline } from "./useHomeIntroTimeline";
import styles from "./home-intro-story.module.css";

interface HomeIntroStoryProps {
  /** Real published articles, read server-side and passed down for Act 5. */
  latestArticles?: FeaturedArticle[];
}

/**
 * The homepage story.
 *
 * Acts 1–3 (Hero → The person → The manifesto) share one pinned stage and a
 * single scroll-scrubbed timeline. Acts 4–6 follow in natural document flow.
 */
export function HomeIntroStory({ latestArticles }: HomeIntroStoryProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useHomeIntroTimeline({ shellRef, stageRef });

  return (
    <div className={styles.masterStoryWrapper}>
      <div ref={shellRef} className={styles.storyShell} data-story-shell="true">
        <div ref={stageRef} className={styles.storyStage}>
          <div className={styles.act1Wrapper} data-story-act1-wrapper="true">
            <DipakHero content={dipakHeroContent} />
          </div>

          <div className={styles.act2Wrapper} data-story-act2-wrapper="true">
            <DipakIdentityAct content={identityContent} />
          </div>

          <div className={styles.act3Wrapper} data-story-act3-wrapper="true">
            <DipakMissionAct content={missionContent} />
          </div>
        </div>
      </div>

      <div className={styles.actSectionWrapper}>
        <DipakTopicsAct content={topicsContent} />
      </div>

      <div className={styles.actSectionWrapper}>
        <DipakThinkingAct content={thinkingContent} articles={latestArticles} />
      </div>

      <div className={styles.actSectionWrapper}>
        <DipakBridgeAct content={bridgeContent} />
      </div>
    </div>
  );
}
