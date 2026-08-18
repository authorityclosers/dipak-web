# Mobile 25-Cell Audit

Reference: `references/mobile-25-cell-overlay.png`.

The recording shows the static mobile Act 2 direction is much better than the old stacked hero, but there are hard layout failures.

## Critical defects

1. `₹9+ CRORE` is clipped at the right edge.
2. Featured In items extend beyond the visible width.
3. The body copy is slightly too small/light relative to the large heading.
4. Large empty vertical gaps between bio → metrics and metrics → media are not consistently intentional.
5. The section has no visual echo of the hero after the transition, so it can feel like a separate document page.

| Cell | Current read | Finalization instruction |
|---|---|---|
| M01-01 | `02 / THE PERSON` | Good. Reduce letter spacing slightly on very narrow screens. |
| M01-02 | Index continuation | Keep. |
| M01-03 | Empty | Fine. |
| M01-04 | Empty | Fine. |
| M01-05 | Empty | Optional 3–5% opacity brush fragment can live at the extreme edge only. |
| M02-01 | Title starts | Strong. Keep 2-line title. |
| M02-02 | Title | Use ~44–54px depending on width, line-height ~0.86–0.90. |
| M02-03 | Title | Trademark must become small superscript. |
| M02-04 | Title edge | Maintain at least 18–22px safe inset. |
| M02-05 | Rule/edge | Structural rule should sit below title and never intersect glyphs. |
| M03-01 | Founder line | Good visual change of voice. Keep. |
| M03-02 | Founder line continuation | Remove redundant/unsupported subtitle if not approved. |
| M03-03 | Bio start | Increase text to at least ~15px and line-height ~1.48 if current computed size is smaller. |
| M03-04 | Bio | Keep measure near full width but within 20–22px page padding. |
| M03-05 | Bio edge | No overflow. |
| M04-01 | `11+` | Good. |
| M04-02 | first metric label | Good. |
| M04-03 | `₹9+` | Current grid allows content to overrun. Use `minmax(0,1fr)` and split suffix. |
| M04-04 | clipped `CRORE` | **Hard failure.** `CRORE` must be a small suffix or second line within the grid cell. |
| M04-05 | edge | No content should cross this boundary. Add `min-width:0` to metric cells. |
| M05-01 | `940+` / Featured label | Third metric should span both columns. This is a strong intentional layout, not a leftover wrap. |
| M05-02 | Featured label | Give 24–32px margin before rail. |
| M05-03 | Medium/Dailyhunt | Use icon + label grid, not loose inline text. |
| M05-04 | YouTube/Podcast | 2-column brand grid is safest; 3-column only above ~420px. |
| M05-05 | LinkedIn / edge | Current rail clips. Make LinkedIn fit its own cell; never horizontal-scroll this trust rail. |

## Mobile grid

```css
.metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(28px, 7vw, 44px) 18px;
}

.metric {
  min-width: 0;
}

.metric:nth-child(3) {
  grid-column: 1 / -1;
}
```

For `₹9+ CRORE`:

```tsx
<span className={styles.metricMain}>₹9+</span>
<span className={styles.metricSuffix}>CRORE</span>
```

Do not treat the whole string as one display-sized text node.

## Mobile media rail

Recommended:

```css
.mediaGrid {
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 18px;
}
```

At `min-width: 420px`, optionally use 3 columns.

The goal is zero clipping, not forcing five names onto one line.
