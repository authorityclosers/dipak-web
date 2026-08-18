import { test, expect } from "@playwright/test";

const TARGET_VIEWPORTS = [
  { name: "mobile-360x800", width: 360, height: 800, isMobile: true },
  { name: "mobile-375x667", width: 375, height: 667, isMobile: true },
  { name: "mobile-390x844", width: 390, height: 844, isMobile: true },
  { name: "mobile-412x915", width: 412, height: 915, isMobile: true },
  { name: "mobile-430x932", width: 430, height: 932, isMobile: true },
  { name: "tablet-768x1024", width: 768, height: 1024, isMobile: false },
  { name: "laptop-1366x768", width: 1366, height: 768, isMobile: false },
  { name: "desktop-1440x900", width: 1440, height: 900, isMobile: false },
  { name: "desktop-1536x864", width: 1536, height: 864, isMobile: false },
  { name: "desktop-1920x1080", width: 1920, height: 1080, isMobile: false },
];

test.describe("Hero Surface Geometry & Responsive Fit", () => {
  for (const vp of TARGET_VIEWPORTS) {
    test(`hero fits ${vp.name} (${vp.width}x${vp.height}) with zero overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);

      const hero = page.locator("#hero");
      await expect(hero).toBeVisible();

      // 1. Assert hero height matches viewport exactly (no secondary scrolling)
      const heroBox = await hero.boundingBox();
      expect(heroBox).not.toBeNull();
      expect(heroBox!.height).toBeLessThanOrEqual(vp.height + 1);

      // 2. Assert zero horizontal overflow
      const dimensions = await page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBe(dimensions.viewportWidth);
      expect(dimensions.bodyScrollWidth).toBe(dimensions.viewportWidth);

      // 3. Assert critical content elements are visible
      await expect(page.locator("#hero-heading")).toBeVisible();
      await expect(page.locator("a[data-ac-event='public.dipak_hero.primary_cta_clicked']")).toBeVisible();
      await expect(page.locator("blockquote")).toBeVisible();

      // 4. On mobile: test absolute visual stage geometry & tight vertical rhythm
      if (vp.isMobile) {
        const metrics = await page.evaluate(() => {
          const vh = window.innerHeight;
          const stage = document.querySelector("[data-hero-visual-stage]")?.getBoundingClientRect();
          const halo = document.querySelector("[class*='halo']")?.getBoundingClientRect();
          const headline = document.querySelector("#hero-heading")?.getBoundingClientRect();
          const quote = document.querySelector("blockquote")?.getBoundingClientRect();
          const primaryCta = document.querySelector("a[data-ac-event='public.dipak_hero.primary_cta_clicked']")?.getBoundingClientRect();

          const visualTop = halo ? Math.min(stage?.top ?? vh, halo.top) : (stage?.top ?? 0);

          return {
            stageTopRatio: stage ? stage.top / vh : 0,
            stageBottomRatio: stage ? stage.bottom / vh : 0,
            stageHeightRatio: stage ? stage.height / vh : 0,
            headlineBottomRatio: headline ? headline.bottom / vh : 0,
            quoteBottomRatio: quote ? quote.bottom / vh : 0,
            primaryCtaBottomRatio: primaryCta ? primaryCta.bottom / vh : 0,
            gapQuoteToVisual: quote ? (visualTop - quote.bottom) : 0,
          };
        });

        // Visual stage bottom must anchor near bottom of viewport (>= 0.90)
        expect(metrics.stageBottomRatio).toBeGreaterThanOrEqual(0.90);

        // Headline, CTAs, and Quote must all finish comfortably in upper/mid viewport
        expect(metrics.headlineBottomRatio).toBeLessThan(0.48);
        expect(metrics.primaryCtaBottomRatio).toBeLessThan(0.68);
        expect(metrics.quoteBottomRatio).toBeLessThan(0.78);

        // Blank gap between quote and visual activity must be tightly controlled (<= 45px)
        expect(metrics.gapQuoteToVisual).toBeLessThanOrEqual(45);
      }
    });
  }
});

test.describe("Mobile Navigation Drawer Interaction", () => {
  test("hamburger menu opens drawer, locks scroll, and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const hamburger = page.locator("button[aria-controls='mobile-primary-navigation']");
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    // Click hamburger to open
    await hamburger.click();
    await expect(hamburger).toHaveAttribute("aria-expanded", "true");

    const drawer = page.locator("#mobile-primary-navigation");
    await expect(drawer).toBeVisible();

    // Assert body scroll is locked
    const isScrollLocked = await page.evaluate(() => document.body.style.overflow === "hidden");
    expect(isScrollLocked).toBe(true);

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    // Assert body scroll is restored
    const isScrollRestored = await page.evaluate(() => document.body.style.overflow !== "hidden");
    expect(isScrollRestored).toBe(true);
  });
});
