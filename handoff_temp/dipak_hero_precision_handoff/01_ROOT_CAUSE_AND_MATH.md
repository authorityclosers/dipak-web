# 01 — Root Cause Analysis + Exact Geometry

## A. The desktop gray rectangle is mathematically proven to be the left brush mask

Current CSS at the baseline commit:

```css
.leftBrush {
  width: clamp(5.8rem, 9vw, 10.5rem);
  background: rgba(17, 17, 15, 0.20);
  mask-image: url("/hero/left-brush-mask.png");
}
```

At a 1920px-wide desktop:

- `9vw = 172.8px`
- `10.5rem = 168px`
- therefore the clamped width is **168px**

The supplied screenshot shows a hard rectangle ending at approximately x=168–170px.

Measured screenshot pixels:

- normal hero background: approximately `[244, 241, 234]`
- broken rectangle: approximately `[198, 196, 190]`
- mask paint color: `[17, 17, 15]`
- alpha: `0.20`

Normal alpha compositing predicts:

```text
0.80 * [244,241,234] + 0.20 * [17,17,15]
= [198.6,196.2,190.2]
```

Observed:

```text
[198,196,190]
```

That is essentially an exact match.

**Conclusion:** the rectangle is not a browser glitch, gradient problem, or portrait artifact. The `left-brush-mask.png` contains a fully/near-fully opaque rectangular alpha region. CSS masking is faithfully rendering the bad alpha.

### Action

Remove `.leftBrush` from production immediately. Do not keep it while debugging the hero. If it is ever reintroduced, rebuild its alpha from source and run structural alpha QC first.

---

## B. The current Ensō is not a clean source asset — it is reconstructed from screenshots

The current `scripts/prepare-hero-assets.py` does this:

```python
ref1_path = "...01_REFERENCE_Sales_Is_The_Transfer_Of_Certainty.png"
ref2_path = "...02_REFERENCE_Why_Should_You_Know_Dipak_Vishwakarma.png"
```

It then estimates darkness from those already-composited screenshots and tries to decide which pixels are "brush" vs "person".

Critically:

```python
if v1 < 0.20 and v2 < 0.20:
    ...
elif ...
else:
    brush_darkness[y, x] = 0.0
```

If both references contain a dark foreground subject at the same location, the output is forced to zero.

That creates **negative human-shaped holes / ghost silhouettes** in the halo. Those white cutouts are visible in both supplied screenshots.

This is an information-recovery problem:

> If the source screenshot has a person covering the brush, the hidden brush pixels do not exist in the screenshot. Thresholding cannot reconstruct them.

The current implementation also applies:

```python
inner_hole = smoothstep(120.0, 175.0, dist)
```

which deliberately removes central mask information.

### Action

Do not extract the production Ensō from screenshots.

Use the original `src/features/dipak-hero/assets/brush-halo.png` as the source and clean its background/foreign artifacts into a true alpha mask.

---

## C. There is also a coordinate bug inside the mask script

The code uses:

```python
cx_ref, cy_ref = 1185, 450
crop_radius = 460

y1 = max(0, cy_ref - crop_radius)
```

Since:

```text
450 - 460 = -10
```

`y1` becomes `0`.

Therefore the true local center is:

```text
cy_ref - y1 = 450
```

but the code later sets:

```python
local_cx, local_cy = crop_radius, crop_radius
# => local_cy = 460
```

That introduces a 10px vertical registration error before the mask is even resized.

This is not the largest problem, but it confirms the current pipeline is based on approximated geometry rather than a real transform.

---

## D. The ring is not actually fitted

The current script says "fitted ring parameters", but hardcodes:

```python
ring_radius = 290.0
inner_gate_dist = 60.0
outer_gate_dist = 160.0
```

These are manually chosen constants, not the result of RANSAC / least squares / Hough fitting.

The production pipeline must not call them "fitted" unless they are computed from the source.

---

## E. Why the mobile halo and portrait cannot align in the current CSS

Current mobile CSS:

```css
.mobilePortrait {
  width: min(92vw, 24rem);
  right: -8vw;
  bottom: -4rem;
}

.halo {
  width: min(104vw, 25rem);
  right: -13vw;
  top: -3.5rem;
}
```

These are two independent transforms.

At the supplied `359 × 807` viewport:

### Portrait

```text
width = 0.92 * 359 = 330.28px
```

Declared intrinsic mobile asset:

```text
1122 × 1041
aspect = 1122 / 1041 = 1.07781
```

Rendered portrait height:

```text
330.28 / 1.07781 ≈ 306.45px
```

### Visual stage

```text
46dvh = 0.46 * 807 = 371.22px
bottom = -0.75rem ≈ -12px
stage top ≈ 807 + 12 - 371.22 = 447.78px
```

The portrait is pushed **down** by `bottom: -4rem`:

```text
portrait local top
= stage height + 64 - portrait height
= 371.22 + 64 - 306.45
≈ 128.77px
```

So portrait element top is approximately:

```text
447.78 + 128.77 = 576.55px
```

This is why the person starts so late in the viewport.

### Halo

```text
width = 1.04 * 359 = 373.36px
top = -3.5rem = -56px
```

Halo top is approximately:

```text
447.78 - 56 = 391.78px
```

So the halo begins about **185px before the portrait**:

```text
576.55 - 391.78 ≈ 184.77px
```

Because the halo is intentionally faint (`rgba(..., 0.09)`), most of this area reads as empty whitespace.

That is the exact cause of the current mobile "dead zone".

---

## F. The current Playwright test hides this failure

The test calculates:

```ts
const visualTop = halo
  ? Math.min(stage?.top ?? vh, halo.top)
  : (stage?.top ?? 0);
```

Then it checks:

```ts
gapQuoteToVisual <= 45
```

Because `visualTop` is based on the halo top (~392px), the test passes even though the actual portrait does not appear until ~577px.

The test is measuring "the CSS rectangle of a nearly invisible halo", not meaningful visual content.

Also, `toBeVisible()` does **not** prove an element is inside the first viewport.

---

## G. Desktop has the same architectural problem in a different form

Current desktop:

```css
.halo {
  width: 100%;
  top: 0;
}

.portrait {
  width: auto;
  max-width: 100%;
  max-height: calc(...);
  object-fit: contain;
}
```

The halo is scaled by the **stage width**.

The portrait is scaled by whichever constraint wins between:

- `max-width`
- `max-height`
- intrinsic aspect ratio

Therefore the actual rendered portrait box can be narrower or shorter than the stage depending on viewport ratio, while the halo remains based on stage width.

This guarantees registration drift across laptop / desktop aspect ratios.

---

## H. The key rule

There must be exactly **one geometric transform** for the visual composition.

Not:

```text
portrait transform
+
halo transform
+
manual breakpoint offsets
```

but:

```text
composition transform
    ├── portrait in registered coordinates
    └── halo in registered coordinates
```

The next document defines that system.
