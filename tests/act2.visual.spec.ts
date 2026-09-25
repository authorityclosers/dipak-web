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
    const act2ScrollPosition = await page
      .locator("[data-story-shell]")
      .evaluate((shell) => {
        const shellTop = shell.getBoundingClientRect().top + window.scrollY;
        const scrollRange = shell.getBoundingClientRect().height - window.innerHeight;
        return shellTop + scrollRange * 0.17;
      });
    await page.evaluate((y) => window.scrollTo(0, y), act2ScrollPosition);

    // Act 2 Identity Section is visible
    const identity = page.locator('[data-story-act2="true"]');
    await expect(identity).toBeVisible();

    // Verified headline and subhead
    await expect(identity.getByText("THE CERTAINTY", { exact: true })).toBeVisible();
    await expect(identity.getByText("BUILDER™.", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Founder of Authority Closers.",
      }),
    ).toBeVisible();

    // Verified stats exist in DOM
    const stats = identity.locator('[data-story-act2-stats="true"]');
    await expect(stats).toContainText("11+");
    await expect(stats).toContainText("YEARS OF EXPERIENCE");
    await expect(stats).toContainText("₹9+");
    await expect(stats).toContainText("CRORE");
    await expect(stats).toContainText("REVENUE GENERATED");
    await expect(stats).toContainText("940+");
    await expect(stats).toContainText("TRAINED SALES PROFESSIONALS");

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

    await expect(identity.getByText("THE CERTAINTY", { exact: true })).toBeVisible();
    await expect(identity.getByText("11+", { exact: true })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
