# 04 — QA / Playwright Specification

The current test suite is not sufficient even though it sounds like a visual suite.

## Current blind spots

### 1. `toBeVisible()` is not "inside the viewport"

A portrait or CTA can be visible in DOM terms while sitting below the first viewport.

Use bounding-box intersection checks.

### 2. The second CTA is not asserted

Assert both primary and secondary actions.

### 3. The mobile gap test measures halo top

Current logic:

```ts
visualTop = Math.min(stage.top, halo.top)
```

A nearly invisible halo can make the test pass while the portrait begins ~185px later.

Measure meaningful portrait visual geometry.

### 4. The 768px case is classified as non-mobile in test data

CSS uses:

```css
@media (max-width: 768px)
```

but test data marks `768x1024` as `isMobile: false`.

Fix the classification.

### 5. There are no actual screenshot assertions

Add `toHaveScreenshot`.

A geometry suite alone cannot catch:

- ghost silhouette in mask
- rectangular alpha contamination
- ring drift
- wrong color/contrast
- faint dead zone
- bad crop

---

# Required viewport matrix

```text
359x807   (exact supplied capture)
360x800
375x667
390x844
412x915
430x932
768x1024
1366x768
1440x900
1536x864
1920x1080
2560x1440
```

At least one mobile viewport at deviceScaleFactor 2.

---

# Add data hooks

```tsx
data-hero-composition
data-hero-portrait
data-hero-halo
data-hero-quote
```

This avoids brittle `[class*='halo']` queries.

---

# Correct first-viewport assertions

Example helper:

```ts
async function expectInsideViewport(locator, page) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();

  const vp = page.viewportSize()!;
  expect(box!.bottom).toBeGreaterThan(0);
  expect(box!.top).toBeLessThan(vp.height);
  expect(box!.right).toBeGreaterThan(0);
  expect(box!.left).toBeLessThan(vp.width);
}
```

For critical elements, also require full containment when appropriate.

---

# Mobile visual bounds

Do not use the transparent `<img>` box alone if it contains transparent top padding.

The asset script should output the alpha-content bounding box:

```json
{
  "mobilePortraitAlphaBox": [x, y, w, h]
}
```

At runtime/tests, compute visible subject top:

```text
visibleTop
= compositionTop
+ alphaBoxYRatio * renderedCompositionHeight
```

Then assert:

```text
visible subject top <= quote bottom + 55px
```

Target preferred:

```text
25–50px
```

not ~180px.

---

# Registration assertion

Because halo and portrait are bound to one root, the test can compare CSS variables / normalized coordinates against generated composition metadata.

For example:

```ts
const actual = await page.evaluate(() => {
  const root = document.querySelector("[data-hero-composition]")!;
  const halo = document.querySelector("[data-hero-halo]")!;
  const rr = root.getBoundingClientRect();
  const hr = halo.getBoundingClientRect();

  return {
    u: (hr.left - rr.left) / rr.width,
    v: (hr.top - rr.top) / rr.height,
    sw: hr.width / rr.width,
    sh: hr.height / rr.height
  };
});
```

Compare with generated metadata within a small tolerance.

This directly detects breakpoint drift.

---

# Screenshot assertions

After fonts and images decode:

```ts
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(
    [...document.images].map(img =>
      img.complete ? Promise.resolve() : img.decode().catch(() => {})
    )
  );
});
```

Then:

```ts
await expect(page.locator("#hero")).toHaveScreenshot(
  `${name}.png`,
  {
    animations: "disabled",
    maxDiffPixelRatio: 0.005
  }
);
```

Create baselines only after design sign-off.

---

# Mask QC tests

## Left brush

Currently remove it.

If reintroduced:

- alpha border mostly zero
- no connected opaque rectangle near container dimensions
- no component with near-rectangular fill ratio > threshold
- no large plateau of alpha=255 unless visually intended

## Ensō

- border alpha = 0 except intentionally cropped output
- no foreign letter-like component
- no rectangular canvas alpha
- no human-shaped missing region from screenshot occlusion
- dominant ring geometry continuous except intentional Ensō break
- source is original brush asset, not screenshots

---

# Visual regression ledger

For each target viewport record:

- portrait visible top
- face visibility
- hand visibility
- quote bottom
- subject top
- gap quote→subject
- composition root width/height
- halo normalized u/v/sw/sh
- horizontal overflow
- hero height
- screenshot pass/fail

Do not declare completion from `npm run build` alone.

---

# Acceptance criteria

## Desktop

- no gray rectangle at left
- no ghost/person-shaped hole in halo
- ring visually belongs to Dipak
- portrait + halo maintain exact relative registration at 1366, 1440, 1536, 1920 and 2560 widths
- no mask shift when viewport height changes
- no hamburger while full desktop nav is shown

## Mobile

- no large dead area after quote
- face appears in first viewport with meaningful scale
- hands visible
- portrait begins roughly 25–55px after quote visual boundary
- halo acts as bridge, not a substitute for the portrait
- no horizontal scroll
- both CTAs visible
- mobile menu works
- same composition relationship at 359, 360, 375, 390, 412, 430 widths

## Motion

- intro < ~1.1s
- no scroll lock
- no layout shift
- reduced-motion clean
- no rotation or theatrical brush gimmick
