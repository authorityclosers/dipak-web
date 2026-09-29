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
}

/**
 * One scrubbed timeline for the three pinned acts.
 *
 *   0.00 → 0.32  Cover lift: hero copy rises and fades, the portrait settles
 *                back and dims, "The person" slides up over it.
 *   0.32 → 0.52  The person holds while its inner elements settle.
 *   0.52 → 0.78  The person releases upward; the manifesto fades in from a
 *                gentle scale and its lines rise into place.
 *   0.78 → 1.00  The manifesto holds. It stays fully visible so the topics
 *                section scrolls over it in normal document flow.
 *
 * Below 901px the CSS lays the acts out in natural flow and this hook does
 * nothing. Reduced-motion users get the same static layout on desktop.
 */
export function useHomeIntroTimeline({ shellRef, stageRef }: UseHomeIntroTimelineProps) {
  useLayoutEffect(() => {
    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      shell.dataset.storyStatic = "true";
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const act1Copy = stage.querySelector("[data-story-copy-col]");
      const act1Portrait = stage.querySelector("[data-story-portrait-root]");
      const act1Accent = stage.querySelector("[data-story-left-accent]");
      const act2 = stage.querySelector("[data-story-act2-wrapper]");
      const act2Reveals = stage.querySelectorAll("[data-story-act2-reveal]");
      const act3 = stage.querySelector("[data-story-act3-wrapper]");
      const act3Lines = stage.querySelectorAll("[data-story-act3-line]");
      const act3Tenets = stage.querySelector("[data-story-act3-tenets]");
      const act3Media = stage.querySelector("[data-story-act3-media]");

      if (!act2 || !act3) return;

      gsap.set(act2, { yPercent: 100 });
      gsap.set(act2Reveals, { y: 36, autoAlpha: 0 });
      gsap.set(act3, { autoAlpha: 0 });
      if (act3Media) gsap.set(act3Media, { scale: 1.06 });
      gsap.set(act3Lines, { yPercent: 110 });
      if (act3Tenets) gsap.set(act3Tenets, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Beat 1 — cover lift
      if (act1Copy) {
        tl.to(act1Copy, { y: -70, autoAlpha: 0, duration: 0.22, ease: "power2.in" }, 0);
      }
      if (act1Accent) {
        tl.to(act1Accent, { autoAlpha: 0, duration: 0.2 }, 0);
      }
      if (act1Portrait) {
        tl.to(
          act1Portrait,
          { scale: 1.05, autoAlpha: 0.3, duration: 0.32, ease: "power1.inOut" },
          0,
        );
      }
      tl.to(act2, { yPercent: 0, duration: 0.32, ease: "power3.out" }, 0);
      tl.to(
        act2Reveals,
        { y: 0, autoAlpha: 1, duration: 0.16, stagger: 0.025, ease: "power2.out" },
        0.16,
      );

      // Hold — 0.32 → 0.52

      // Beat 2 — the person releases, the manifesto arrives
      tl.to(act2, { y: -80, autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.52);
      tl.to(act3, { autoAlpha: 1, duration: 0.22, ease: "power2.out" }, 0.54);
      if (act3Media) {
        tl.to(act3Media, { scale: 1, duration: 0.4, ease: "power2.out" }, 0.54);
      }
      tl.to(
        act3Lines,
        { yPercent: 0, duration: 0.18, stagger: 0.05, ease: "power3.out" },
        0.6,
      );
      if (act3Tenets) {
        tl.to(act3Tenets, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.74);
      }

      // Hold — the manifesto stays until the pin releases.
      tl.to({}, { duration: 0.14 }, 0.86);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [shellRef, stageRef]);
}
