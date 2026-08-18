# 07 — QA and Acceptance

## Visual targets

The current screenshots in `references/` are **failure references**, not target references.

### Brush quality acceptance

At 100% desktop zoom the brush must show:

- non-uniform width
- dry gaps
- visible bristle streak direction
- tapered/depleted end
- no repeated concentric tube bands
- no rectangular alpha boundary
- no human-shaped holes
- no hard digital outline

### Responsive acceptance

At all target viewports, measure brush relative to composition root, not window.

Viewports:

```text
359x807
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

## Required Playwright screenshot tests

Use `toHaveScreenshot()` after:

- fonts ready
- portrait decoded
- animation disabled or forced to final state

## Registration test

Read root and halo rects and compare normalized values:

```text
u  = (halo.left - root.left) / root.width
v  = (halo.top - root.top) / root.height
sw = halo.width / root.width
sh = halo.height / root.height
```

Compare to generated metadata with tight tolerance.

## Animation screenshot states

Capture at:

- 0%
- ~30%
- ~65%
- 100%

The moving reveal edge must not expose a circular artificial cap that is visually stronger than the underlying brush texture.

## Performance

Production hero should not continuously render a GPU scene if the only motion is an 820ms reveal.

After reveal:

- no active RAF from brush subsystem
- no canvas ticker
- no filter animation

If the optional runtime p5.brush mode is tested, measure it separately and keep static fallback.

## Final rule

Do not accept a technically passing test suite if the brush still reads as a gray vector ring.
