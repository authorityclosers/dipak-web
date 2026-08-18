# Final Act 2 Design Direction

## 1. Keep the concept; sharpen the editorial system

Do not add cards, glassmorphism, gradients, or new photography.

The finished Act 2 should feel like a **printed authority spread that happens to move**.

### Palette

- canvas: existing ivory
- primary: near-black
- gold: existing warm brand gold
- secondary copy: dark neutral, not low-contrast gray
- hairlines: neutral black at ~8–12% alpha

## 2. Recompose the title/header

Current issue: the title behaves like an independent poster pasted in the upper-right while the index floats lower-left.

Final:
- index and title share one header row
- title is slightly smaller and lower
- one structural rule sits **under** that row
- no line through text

## 3. Improve `THE CERTAINTY BUILDER™.` without changing copy

Markup:

```tsx
<h2 className={styles.identityTitle}>
  <span>THE CERTAINTY</span>
  <span>
    BUILDER<span className={styles.tm}>™</span>
    <span className={styles.goldPeriod}>.</span>
  </span>
</h2>
```

The trademark must not share the full display size.

## 4. Founder lockup

Keep:

`Founder of Authority Closers.`

Recommended treatment:
- italic serif 30–40px desktop
- 22–28px mobile
- 26px gold dash beneath or beside
- no decorative quote marks
- remove `STRATEGIC SALES ENABLEMENT` unless client-supplied/approved

This gives the line more dignity while remaining minimal.

## 5. Bio

Do not rewrite.

Design:
- width ~31–34em
- desktop ~18–20px
- line-height 1.48–1.58
- mobile ~15–16px
- body color should be visually one step lighter than headline, not three steps lighter

## 6. Proof row

Make the three metrics feel like one system.

DOM model:

```ts
[
 { main: '11+', suffix: null, label: 'YEARS OF EXPERIENCE' },
 { main: '₹9+', suffix: 'CRORE', label: 'REVENUE GENERATED' },
 { main: '940+', suffix: null, label: 'SALES PROFESSIONALS TRAINED' }
]
```

All `main` values share the same font size.

`CRORE` is a suffix, not part of the primary numeric scale.

Desktop: 3 equal columns.
Mobile: 2 columns + third spans full width.

## 7. One subtle natural-media addition

Only if the section still feels too sterile after layout fixes:

Reuse the **existing authentic natural-media hero asset**, not a new smudge file.

Crop only a fragment:
- desktop: far-right edge behind/after the title, opacity 0.035–0.055
- mobile: upper-right edge or between bio/proof, opacity 0.025–0.045

It must be nearly subliminal.

Do not add a second full Ensō.
Do not add random brush blocks.
Do not use blend modes that alter the ivory canvas.

## 8. Featured In becomes a trust rail

Desktop:

```text
FEATURED IN  ──  [icon] Medium | [icon] Dailyhunt | [icon] YouTube | [icon] Podcast | [icon] LinkedIn
```

Use monochrome icons/marks.

Implementation source preference:
- Simple Icons for brand marks that exist there (e.g. Medium, YouTube, LinkedIn).
- Generic podcast glyph for `Podcast` unless there is a specific podcast platform.
- Dailyhunt: use an official monochrome Dailyhunt mark only if a verified source asset is available; otherwise keep its typographic name rather than inventing a fake icon.

Never use the platform brand colors here. The section should remain black/ivory/gold.
