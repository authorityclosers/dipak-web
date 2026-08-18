# Playwright Acceptance

The existing 28 passing tests are useful, but a passing suite did not catch the visible clipping shown in the recording.

Add content-specific assertions.

## Horizontal overflow

```ts
expect(
  await page.evaluate(() => document.documentElement.scrollWidth)
).toBe(
  await page.evaluate(() => document.documentElement.clientWidth)
);
```

Run for every mobile target.

## Metric bounding boxes

At 390 / 412 / 440 widths:

- each metric right <= viewport width - page padding
- `₹9+ CRORE` cell width <= its grid track
- third metric begins on a new row and spans both tracks

## Featured rail

Every media item:
- `left >= pagePadding`
- `right <= viewportWidth - pagePadding`

## Title collision

At Act 2 hold, get `getBoundingClientRect()` for:
- structural gold rule
- title

Assert vertical non-intersection:

```text
rule.bottom <= title.top
OR
rule.top >= title.bottom + desiredGap
```

The preferred design is the rule below the title header row.

## Transition anti-ghost test

At progress ~25–45%, screenshot the story stage.

Visual acceptance:
- no whole-screen pale wash
- no duplicated semi-transparent title
- portrait is not a low-opacity ghost
- background remains same ivory

## Screenshot baselines

Desktop:
- 1366×768
- 1440×900
- 1920×1080

Mobile:
- 390×844
- 412×915
- 440×956

States:
- hero hold
- transition 20%
- transition 40%
- Act 2 enter
- Act 2 hold
- media rail visible
