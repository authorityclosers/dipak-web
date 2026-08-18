import { test, expect } from "@playwright/test";

test.describe("Act 2 — The Certainty Builder Story & Layout", () => {
  test("desktop story assembles Act 2 with verified credentials", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Initial Act 1 is visible
    const hero = page.locator('[data-story-act1="true"]');
    await expect(hero).toBeVisible();

    // Scroll to Act 2 readable hold state
    const maxScroll = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight
    );
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(maxScroll * 0.7));
    await page.waitForTimeout(600);

    // Act 2 Identity Section is visible
    const identity = page.locator('[data-story-act2="true"]');
    await expect(identity).toBeVisible();

    // Verified headline and subhead
    await expect(page.locator("text=THE CERTAINTY")).toBeVisible();
    await expect(page.locator("text=BUILDER™.")).toBeVisible();
    await expect(
      page.locator("text=Founder of Authority Closers.")
    ).toBeVisible();

    // Verified stats exist in DOM
    await expect(page.getByText("11+", { exact: true })).toBeVisible();
    await expect(page.getByText("₹9+ CRORE", { exact: true })).toBeVisible();
    await expect(page.getByText("940+", { exact: true })).toBeVisible();

    // Zero horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test("mobile displays Act 2 in clean sequential document flow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Scroll to Identity section
    await page.evaluate(() =>
      document.getElementById("identity")?.scrollIntoView()
    );
    await page.waitForTimeout(600);

    const identity = page.locator('[data-story-act2="true"]');
    await expect(identity).toBeVisible();

    await expect(page.locator("text=THE CERTAINTY")).toBeVisible();
    await expect(page.locator("text=11+")).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
