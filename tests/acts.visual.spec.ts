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
      page.getByRole("heading", {
        level: 1,
        name: /Sales is the transfer of certainty/i,
      }),
    ).toBeVisible();

    // Act 2: Identity
    const identity = page.locator('[data-story-act2="true"]');
    await expect(identity).toBeAttached();

    // "Featured in" strip now lives inside Act 2
    await expect(identity.locator("text=Medium")).toBeAttached();
    await expect(identity.locator("text=Dailyhunt")).toBeAttached();
    await expect(identity.locator("text=LinkedIn")).toBeAttached();

    // Act 4: Mission
    const mission = page.locator('[data-story-act3="true"]');
    await expect(mission).toBeAttached();
    const missionQuote = mission.locator("h2");
    await expect(missionQuote).toContainText("transfer of certainty");

    // Act 5: Topics
    const topics = page.locator('[data-story-act5="true"]');
    await expect(topics).toBeAttached();
    await expect(topics.getByRole("heading", { level: 2 })).toBeAttached();
    await expect(
      topics.getByRole("link", { name: /Founder-led growth/ }),
    ).toContainText("Sales systems, founder-led growth");
    await expect(
      topics.getByRole("link", { name: /Cognitive dynamics/ }),
    ).toBeAttached();

    // Act 6: Thinking
    const thinking = page.locator('[data-story-act6="true"]');
    await expect(thinking).toBeAttached();
    await expect(
      thinking.getByRole("heading", { level: 2 }),
    ).toContainText("Latest thinking");
    await expect(thinking).toContainText("Essays");

    // Act 7: Bridge
    const bridge = page.locator('[data-story-act7="true"]');
    await expect(bridge).toBeAttached();
    await expect(
      bridge.getByRole("link", { name: /Explore Authority Closers/ }),
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
