"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseHomeIntroTimelineProps {
  shellRef: RefObject<HTMLElement | null>;
  stageRef: RefObject<HTMLElement | null>;
  bridgeRuleRef: RefObject<HTMLElement | null>;
}

export function useHomeIntroTimeline({
  shellRef,
  stageRef,
  bridgeRuleRef,
}: UseHomeIntroTimelineProps) {
  useLayoutEffect(() => {
    const shell = shellRef.current;
    const stage = stageRef.current;
    const bridgeRule = bridgeRuleRef.current;

    if (!shell || !stage) return;

    const mm = gsap.matchMedia();

    // =========================================================================
    // 1. DESKTOP PINNED STORY CHOREOGRAPHY (>= 769px)
    // =========================================================================
    mm.add("(min-width: 769px)", () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set("[data-story-act2]", { autoAlpha: 1 });
        gsap.set(
          "[data-story-act2-index], [data-story-act2-headline], [data-story-act2-role], [data-story-act2-bio], [data-story-act2-stats], [data-story-act2-preview]",
          { opacity: 1, y: 0, yPercent: 0 }
        );
        return;
      }

      // Query DOM elements
      const heroHeader = stage.querySelector("[data-story-header]");
      const heroGoldRule = stage.querySelector("[data-story-gold-rule]");
      const heroHeadlineLines = stage.querySelectorAll(
        "[data-story-headline-line]"
      );
      const heroCopy = stage.querySelector("[data-story-copy]");
      const heroCtaRow = stage.querySelector("[data-story-cta-row]");
      const heroQuote = stage.querySelector("[data-story-quote]");
      const heroPortraitRoot = stage.querySelector(
        "[data-story-portrait-root]"
      );
      const heroLeftAccent = stage.querySelector(".leftBrushAccent");

      const act2Container = stage.querySelector("[data-story-act2]");
      const act2Index = stage.querySelector("[data-story-act2-index]");
      const act2HeadlineLines = stage.querySelectorAll(
        "[data-story-act2-headline]"
      );
      const act2StructuralRule = stage.querySelector("[data-story-act2-rule]");
      const act2Role = stage.querySelector("[data-story-act2-role]");
      const act2Bio = stage.querySelector("[data-story-act2-bio]");
      const act2Stats = stage.querySelectorAll(
        "[data-story-act2-stats] > div"
      );
      const act2Preview = stage.querySelector("[data-story-act2-preview]");

      // Initial States
      if (bridgeRule) {
        gsap.set(bridgeRule, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        });
      }

      gsap.set(act2Container, { autoAlpha: 0 });
      gsap.set(act2Index, { opacity: 0, y: -10 });
      gsap.set(act2HeadlineLines, { yPercent: 105, opacity: 0 });
      gsap.set(act2StructuralRule, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
      });
      gsap.set(act2Role, { opacity: 0, y: 14 });
      gsap.set(act2Bio, { opacity: 0, y: 16 });
      gsap.set(act2Stats, { opacity: 0, y: 20 });
      gsap.set(act2Preview, { opacity: 0, y: 16 });

      // Master 6-Beat Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Beat 1: SIGNAL (p = 0.00 -> 0.08) - Immediate response on first scroll
      tl.addLabel("SIGNAL", 0);
      if (heroGoldRule) {
        tl.to(
          heroGoldRule,
          {
            scaleX: 1.5,
            transformOrigin: "left center",
            duration: 0.35,
            ease: "power2.out",
          },
          "SIGNAL"
        );
      }
      if (heroPortraitRoot) {
        tl.to(
          heroPortraitRoot,
          {
            x: 6,
            scale: 0.992,
            duration: 0.35,
            ease: "power1.out",
          },
          "SIGNAL"
        );
      }

      // Beat 2: DECONSTRUCT (p = 0.08 -> 0.30) - Solid material exit through masks
      tl.addLabel("DECONSTRUCT", 0.35);
      if (heroHeadlineLines.length) {
        tl.to(
          heroHeadlineLines,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.65,
            stagger: 0.05,
            ease: "power2.inOut",
          },
          "DECONSTRUCT"
        );
      }
      if (heroCopy) {
        tl.to(
          heroCopy,
          {
            y: 18,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "DECONSTRUCT+=0.1"
        );
      }
      if (heroCtaRow) {
        tl.to(
          heroCtaRow,
          {
            y: 22,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "DECONSTRUCT+=0.12"
        );
      }
      if (heroQuote) {
        tl.to(
          heroQuote,
          {
            y: 14,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "DECONSTRUCT+=0.18"
        );
      }
      if (heroPortraitRoot) {
        tl.to(
          heroPortraitRoot,
          {
            x: 45,
            scale: 0.88,
            opacity: 0,
            duration: 0.75,
            ease: "power2.inOut",
          },
          "DECONSTRUCT+=0.05"
        );
      }
      if (heroLeftAccent) {
        tl.to(
          heroLeftAccent,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power1.inOut",
          },
          "DECONSTRUCT"
        );
      }
      if (heroHeader) {
        tl.to(
          heroHeader,
          {
            opacity: 0.15,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "DECONSTRUCT+=0.1"
        );
      }

      // Beat 3: BRIDGE (p = 0.22 -> 0.44) - Gold kicker rule expands into Act 2
      tl.addLabel("BRIDGE", 0.95);
      if (bridgeRule) {
        tl.to(
          bridgeRule,
          {
            scaleX: 1,
            opacity: 0.75,
            duration: 0.65,
            ease: "power2.inOut",
          },
          "BRIDGE"
        );
      }

      // Beat 4: ACT2_ENTER (p = 0.34 -> 0.62) - Typography and evidence assembly
      tl.addLabel("ACT2_ENTER", 1.45);
      tl.to(
        act2Container,
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: "none",
        },
        "ACT2_ENTER"
      );
      if (bridgeRule) {
        tl.to(
          bridgeRule,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
          },
          "ACT2_ENTER+=0.1"
        );
      }
      if (act2Index) {
        tl.to(
          act2Index,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "ACT2_ENTER+=0.05"
        );
      }
      if (act2HeadlineLines.length) {
        tl.to(
          act2HeadlineLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
          },
          "ACT2_ENTER+=0.08"
        );
      }
      if (act2StructuralRule) {
        tl.to(
          act2StructuralRule,
          {
            scaleX: 1,
            opacity: 0.45,
            duration: 0.55,
            ease: "power2.out",
          },
          "ACT2_ENTER+=0.12"
        );
      }
      if (act2Role) {
        tl.to(
          act2Role,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "ACT2_ENTER+=0.16"
        );
      }
      if (act2Bio) {
        tl.to(
          act2Bio,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "ACT2_ENTER+=0.2"
        );
      }
      if (act2Stats.length) {
        tl.to(
          act2Stats,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "ACT2_ENTER+=0.24"
        );
      }

      // Beat 5: ACT2_HOLD (p = 0.62 -> 0.86) - Dedicated Reading Hold
      tl.addLabel("ACT2_HOLD", 2.2);
      tl.to({}, { duration: 1.2 }, "ACT2_HOLD");

      // Beat 6: FEATURED_PREVIEW (p = 0.86 -> 1.00) - Media preview rail emerges
      tl.addLabel("FEATURED_PREVIEW", 3.4);
      if (act2Preview) {
        tl.to(
          act2Preview,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "FEATURED_PREVIEW"
        );
      }
    });

    // =========================================================================
    // 2. MOBILE SEQUENTIAL DOCUMENT FLOW (<= 768px)
    // =========================================================================
    mm.add("(max-width: 768px)", () => {
      const act2Container = stage.querySelector("[data-story-act2]");
      const act2Index = stage.querySelector("[data-story-act2-index]");
      const act2HeadlineLines = stage.querySelectorAll(
        "[data-story-act2-headline]"
      );
      const act2StructuralRule = stage.querySelector("[data-story-act2-rule]");
      const act2Role = stage.querySelector("[data-story-act2-role]");
      const act2Bio = stage.querySelector("[data-story-act2-bio]");
      const act2Stats = stage.querySelectorAll(
        "[data-story-act2-stats] > div"
      );
      const act2Preview = stage.querySelector("[data-story-act2-preview]");

      gsap.set(act2Container, { autoAlpha: 1 });
      gsap.set(act2Index, { opacity: 1, y: 0 });
      gsap.set(act2HeadlineLines, { yPercent: 0, opacity: 1 });
      gsap.set(act2StructuralRule, { scaleX: 1, opacity: 0.45 });
      gsap.set(act2Role, { opacity: 1, y: 0 });
      gsap.set(act2Bio, { opacity: 1, y: 0 });
      gsap.set(act2Stats, { opacity: 1, y: 0 });
      gsap.set(act2Preview, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, [shellRef, stageRef, bridgeRuleRef]);
}
