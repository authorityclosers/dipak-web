import { test, expect } from "@playwright/test";

test.describe("Homepage Master Story — Acts 1 to 7", () => {
  test("desktop renders all 7 acts with verified content and zero overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Act 1: Hero
    const hero = page.locator('[data-story-act1="true"]');
    await expect(hero).toBeVisible();
    await expect(
      page.locator("text=Sales Is The Transfer Of Certainty.")
    ).toBeVisible();

    // Act 2: Identity
    const identity = page.locator('[data-story-act2="true"]');
    await expect(identity).toBeAttached();

    // Act 3: Presence
    const presence = page.locator('[data-story-act3="true"]');
    await expect(presence).toBeAttached();
    await expect(presence.locator("text=FEATURED")).toBeAttached();
    await expect(presence.locator("text=Medium")).toBeAttached();
    await expect(presence.locator("text=Dailyhunt")).toBeAttached();
    await expect(presence.locator("text=LinkedIn")).toBeAttached();

    // Act 4: Mission
    const mission = page.locator('[data-story-act4="true"]');
    await expect(mission).toBeAttached();
    await expect(page.locator("text=BUILDING CERTAINTY")).toBeAttached();
    await expect(
      page.locator("text=Sales is the transfer of certainty.")
    ).toBeAttached();

    // Act 5: Topics
    const topics = page.locator('[data-story-act5="true"]');
    await expect(topics).toBeAttached();
    await expect(page.locator("text=WHAT I")).toBeAttached();
    await expect(page.locator("text=SALES SYSTEMS")).toBeAttached();
    await expect(page.locator("text=BUYER PSYCHOLOGY")).toBeAttached();

    // Act 6: Thinking
    const thinking = page.locator('[data-story-act6="true"]');
    await expect(thinking).toBeAttached();
    await expect(page.locator("text=LATEST VIDEOS")).toBeAttached();
    await expect(page.locator("text=LATEST ARTICLES")).toBeAttached();

    // Act 7: Bridge
    const bridge = page.locator('[data-story-act7="true"]');
    await expect(bridge).toBeAttached();
    await expect(page.locator("text=AUTHORITY")).toBeAttached();
    await expect(
      page.locator("text=Explore Authority Closers")
    ).toBeAttached();

    // Zero horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test("mobile renders all 7 acts in clean sequential flow with zero overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const sections = [
      "hero",
      "identity",
      "presence",
      "mission",
      "topics",
      "thinking",
      "authority-closers",
    ];

    for (const sectionId of sections) {
      const el = page.locator(`#${sectionId}`);
      await expect(el).toBeAttached();
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
