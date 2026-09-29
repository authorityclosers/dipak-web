import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Image pipeline.
 *
 * Every photograph the site renders is produced here from a curated shortlist
 * of originals in public/media. Each image is used on exactly one surface, and
 * each is emitted at the widths that surface needs. Anything not in this list
 * is never referenced by the site.
 */
const root = process.cwd();
const outputDirectory = path.join(root, "public", "optimized");

/** [source, outputBaseName, widths, quality, trimLetterbox?] — trim removes black
 *  bars baked into screen-recorded frames before resizing. */
const images = [
  // Hero (art-directed, existing)
  ["public/hero/dipak-seated-armchair.webp", "dipak-desktop", [384, 640, 960], 78],
  ["public/hero/dipak-seated-mobile.webp", "dipak-mobile", [384, 640], 78],
  ["public/hero/enso-brush-master.webp", "enso", [768], 75],

  // Homepage acts
  ["public/media/01_dsc06974.webp", "person", [768, 1200, 1600], 78],
  ["public/media/screenshot_2026-07-29_at_4.45.57_pm__1_.png", "manifesto", [1280, 1920, 2560], 74],
  ["public/media/12_dsc04050.webp", "video-plate", [960, 1600], 76],
  ["public/media/08_img_1624.webp", "bridge-team", [960, 1600], 76],

  // Topics (one distinct frame per subject)
  ["public/media/05_dsc06990.webp", "topic-buyer-psychology", [768, 1280], 76],
  ["public/media/screenshot_2026-07-29_at_5.59.46_pm.png", "topic-high-ticket-sales", [768, 1280], 76],
  ["public/media/07_dsc_0053.webp", "topic-communication", [768, 1280], 76],
  ["public/media/11__dsc7249.webp", "topic-personal-branding", [768, 1280], 76],
  ["public/media/screenshot_2026-07-29_at_5.54.39_pm.png", "topic-ai", [768, 1280], 76],
  ["public/media/img-20221220-wa0015.jpg", "topic-startups", [768, 1280], 76],
  ["public/media/dsc04016.jpg", "topic-public-speaking", [768, 1280], 76],

  // Inner page heroes
  ["public/media/dsc06816.jpeg", "about-portrait", [768, 1200, 1600], 78],
  ["public/media/dsc04017.jpg", "videos-hero", [960, 1600], 76],
  ["public/media/04_dsc07013.webp", "resources-hero", [960, 1600], 76],
  ["public/media/img_8683.jpg.jpeg", "now-hero", [960, 1600], 76],
  ["public/media/dipak-vishwakarma-portrait-connect.webp", "contact-portrait", [480, 800], 80],

  // Article covers (one per essay)
  ["public/media/screenshot_2026-07-29_at_5.33.05_pm.png", "cover-the-silent-sales-pipeline-killer", [768, 1280], 74],
  ["public/media/screenshot_2026-08-08_at_10.27.01_pm.png", "cover-why-the-best-salespeople-talk-less", [768, 1280], 74, true],
  ["public/media/screenshot_2026-08-08_at_10.22.35_pm.png", "cover-3-questions-founders-avoid-asking", [768, 1280], 74, true],
  ["public/media/screenshot_2026-07-29_at_5.41.42_pm.png", "cover-the-architecture-of-high-ticket-sales", [768, 1280], 74],
  ["public/media/screenshot_2026-08-08_at_1.02.20_am.png", "cover-buyer-psychology-undecided-mind", [768, 1011], 74],
  ["public/media/screenshot_2026-07-29_at_4.51.59_pm.png", "cover-personal-branding-in-the-age-of-ai", [768, 1280], 74],
  ["public/media/img-20221220-wa0018.jpg", "cover-public-speaking-as-business-leverage", [768, 1280], 74],
  ["public/media/dsc06994.jpeg", "cover-ai-and-the-future-of-sales", [768, 1280], 74],
  ["public/media/screenshot_2026-08-08_at_10.32.36_pm.png", "cover-the-buyer-doesnt-need-to-like-you", [768, 1280], 74, true],
  ["public/media/screenshot_2026-08-08_at_10.25.47_pm.png", "cover-the-true-meaning-of-communication", [768, 1280], 74, true],
  ["public/media/screenshot_2026-07-29_at_5.21.38_pm.png", "cover-trust-is-the-absence-of-doubt", [768, 1280], 74],
  ["public/media/screenshot_2026-08-08_at_10.36.09_pm.png", "cover-why-buyers-dont-say-no", [768, 1280], 74, true],
  ["public/media/screenshot_2026-08-08_at_10.40.16_pm.png", "cover-how-to-create-certainty", [768, 1280], 74, true],
];

await mkdir(outputDirectory, { recursive: true });

for (const [source, base, widths, quality, trim] of images) {
  const sourcePath = path.join(root, source);
  for (const width of widths) {
    const filename = `${base}-${width}-v1.webp`;
    const destinationPath = path.join(outputDirectory, filename);
    let pipeline = sharp(sourcePath).rotate();
    if (trim) pipeline = pipeline.trim({ threshold: 40 });
    const result = await pipeline
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(destinationPath);

    console.log(
      `[images] ${filename}: ${result.width}x${result.height}, ${result.size} bytes`,
    );
  }
}
