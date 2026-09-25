import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDirectory = path.join(root, "public", "optimized");
const images = [
  ["public/hero/dipak-seated-armchair.webp", "dipak-desktop-384-v1.webp", 384, 78],
  ["public/hero/dipak-seated-armchair.webp", "dipak-desktop-640-v1.webp", 640, 78],
  ["public/hero/dipak-seated-mobile.webp", "dipak-mobile-384-v1.webp", 384, 78],
  ["public/hero/dipak-seated-mobile.webp", "dipak-mobile-640-v1.webp", 640, 78],
  ["public/hero/enso-brush-master.webp", "enso-768-v1.webp", 768, 75],
  ["public/media/05_dsc06990.webp", "05_dsc06990-768-v1.webp", 768, 78],
  ["public/media/04_dsc07013.webp", "04_dsc07013-768-v1.webp", 768, 78],
  ["public/media/08_img_1624.webp", "08_img_1624-768-v1.webp", 768, 78],
  ["public/media/01_dsc06974.webp", "01_dsc06974-768-v1.webp", 768, 78],
  ["public/media/03_dsc06998.webp", "03_dsc06998-768-v1.webp", 768, 78],
  ["public/media/11__dsc7249.webp", "11__dsc7249-768-v1.webp", 768, 78],
  ["public/media/06_dsc04024.webp", "06_dsc04024-768-v1.webp", 768, 78],
  ["public/media/15_authority_closers_png__1_.webp", "15_authority_closers_png__1_-768-v1.webp", 768, 78],
  [
    "public/media/02_screenshot_2026-07-29_at_4.45.57_pm__1_.webp",
    "mission-background-768-v1.webp",
    768,
    78,
  ],
];

await mkdir(outputDirectory, { recursive: true });

for (const [source, filename, width, quality] of images) {
  const sourcePath = path.join(root, source);
  const destinationPath = path.join(outputDirectory, filename);
  const result = await sharp(sourcePath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(destinationPath);

  console.log(
    `[home-images] ${filename}: ${result.width}x${result.height}, ${result.size} bytes`,
  );
}
