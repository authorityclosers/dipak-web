import { expect, test } from "@playwright/test";

const SITE_ORIGIN = "https://dipakvishwakarma.com";

test("homepage gives a clear, consistent identity to search engines", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Dipak Vishwakarma | High-Ticket Sales Coach");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    SITE_ORIGIN,
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("body")).toContainText(
    "High-ticket sales coach Dipak Vishwakarma, founder of Authority Closers",
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const graph = jsonLd.map((source) => JSON.parse(source) as {
    "@graph"?: Array<Record<string, unknown>>;
  });
  const nodes = graph.flatMap((schema) => schema["@graph"] ?? []);
  const person = nodes.find((node) => node["@id"] === `${SITE_ORIGIN}/#person`);
  const organization = nodes.find(
    (node) => node["@id"] === "https://authorityclosers.com/#organization",
  );
  const website = nodes.find((node) => node["@type"] === "WebSite");

  expect(person).toMatchObject({
    name: "Dipak Vishwakarma",
    jobTitle: "High-Ticket Sales Coach and Founder of Authority Closers",
    worksFor: { "@id": "https://authorityclosers.com/#organization" },
  });
  expect(organization).toMatchObject({ name: "Authority Closers" });
  expect(website).toMatchObject({
    url: SITE_ORIGIN,
    publisher: { "@id": `${SITE_ORIGIN}/#person` },
  });
});

test("edited article has no draft notes and its structured data matches the page", async ({ page }) => {
  await page.goto("/articles/the-architecture-of-high-ticket-sales");

  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("The previous version explained buyer psychology");
  expect(bodyText).not.toContain("The upgraded version should make the reader experience");
  expect(bodyText).not.toContain("This one has huge upside");

  const headline = (await page.locator("h1").innerText()).trim();
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const schemas = jsonLd.map((source) => JSON.parse(source) as {
    "@graph"?: Array<Record<string, unknown>>;
  });
  const article = schemas
    .flatMap((schema) => schema["@graph"] ?? [])
    .find((node) => node["@type"] === "Article");
  const breadcrumbs = schemas
    .flatMap((schema) => schema["@graph"] ?? [])
    .find((node) => node["@type"] === "BreadcrumbList");

  expect(headline).toBe("The Architecture of High-Ticket Sales");
  expect(article).toMatchObject({
    headline,
    datePublished: "2026-08-11",
    dateModified: "2026-09-25",
    author: { "@id": `${SITE_ORIGIN}/#person` },
    mainEntityOfPage: {
      "@id": `${SITE_ORIGIN}/articles/the-architecture-of-high-ticket-sales`,
    },
  });
  expect(breadcrumbs?.itemListElement).toHaveLength(3);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${SITE_ORIGIN}/articles/the-architecture-of-high-ticket-sales`,
  );
});

test("sitemap only lists canonical, useful public pages and every entry resolves", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect(xml).toContain("<urlset");

  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls.length).toBeGreaterThan(10);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toContain(SITE_ORIGIN);
  expect(urls).toContain(`${SITE_ORIGIN}/about`);
  expect(urls).toContain(`${SITE_ORIGIN}/articles/the-architecture-of-high-ticket-sales`);
  expect(urls.every((url) => url.startsWith(`${SITE_ORIGIN}/`) || url === SITE_ORIGIN)).toBe(true);
  expect(urls.some((url) => /\/(videos|privacy|terms|cookies|disclaimer)(\/|$)/.test(url))).toBe(
    false,
  );

  const statuses = await Promise.all(
    urls.map(async (url) => {
      const path = new URL(url).pathname;
      return (await request.get(path)).status();
    }),
  );
  expect(statuses.every((status) => status === 200)).toBe(true);
});

test("empty video listing stays crawlable but out of search results and sitemap", async ({
  request,
}) => {
  const response = await request.get("/videos");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toMatch(/<meta[^>]+name="robots"[^>]+content="noindex, follow"/i);
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).not.toContain(`${SITE_ORIGIN}/videos`);
});

test("www permanently redirects to the apex domain and security headers are present", async ({
  request,
}) => {
  const response = await request.get("/about?source=seo-check", {
    headers: { host: "www.dipakvishwakarma.com" },
    maxRedirects: 0,
  });

  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(
    `${SITE_ORIGIN}/about?source=seo-check`,
  );

  const home = await request.get("/");
  expect(home.headers()["strict-transport-security"]).toBe("max-age=31536000");
  expect(home.headers()["x-frame-options"]).toBe("DENY");
});

for (const viewport of [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`homepage layout fits ${viewport.width}×${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({ path: testInfo.outputPath("homepage.png") });
  });
}
