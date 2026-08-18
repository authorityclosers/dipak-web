# Desktop 25-Cell Audit

Reference: `references/desktop-25-cell-overlay.png`.

The page viewport was divided into a 5×5 matrix after removing browser chrome. The cells are used as a visual QA coordinate system.

| Cell | Current read | Finalization instruction |
|---|---|---|
| D01-01 | Empty upper-left canvas | Good negative space, but it currently feels disconnected because the section index sits too low. Pull the index upward into this zone. |
| D01-02 | Mostly empty | Preserve emptiness; do not add decoration. This is breathing room for the title/index relationship. |
| D01-03 | Gold horizontal rule begins crossing toward title | **Primary defect.** The upper gold rule must not pass through the headline glyphs. Remove it from this y-position. |
| D01-04 | `THE CERTAINTY` first line | Title is strong, but too close to the top edge and visually bisected by the rule. Lower 18–32px and reduce scale ~6–10%. |
| D01-05 | Right half of title | Right alignment is too close to edge. Give 4.5–5.5vw right breathing room. |
| D02-01 | `02 / THE PERSON` | Too vertically detached from the title. Move it up to align with the title's top third. Make `02 /` gold and `THE PERSON` dark/neutral. |
| D02-02 | Empty header field | Keep mostly empty. This space is the bridge between index and title; do not fill it with a new image. |
| D02-03 | Empty / title edge | Use this as the optical buffer around title. |
| D02-04 | `BUILDER™` line | Split `BUILDER`, `™`, and punctuation into separate spans. The trademark should be a true superscript, not a full-size glyph. |
| D02-05 | Headline dot + right edge | Make the period/dot the existing warm gold accent. Current black dot reads like a random bullet. |
| D03-01 | Founder line | Attractive type choice. Keep copy. Make it a stronger identity lockup with a 20–28px gold dash/underline, not the redundant second line doing all the work. |
| D03-02 | `Strategic Sales Enablement` + whitespace | This line is not part of the verified short-bio copy supplied in the walkthrough. Remove unless Dipak explicitly supplied/approved it. This simplifies the left block. |
| D03-03 | Gap between identity and bio | Slightly too wide. Bring bio 40–70px left or constrain overall grid to a clear 5/7 column split. |
| D03-04 | Bio first half | Copy is good. Increase body contrast slightly and use 31–34em max measure. |
| D03-05 | Bio continuation | Right edge is okay, but avoid the paragraph stretching beyond ~68 characters per line. |
| D04-01 | First metric `11+` | Good scale; align its top to the other metrics through a shared baseline. Add a tiny gold proof tick above or beside label only if needed. |
| D04-02 | Empty metric column space | Current distribution feels under-structured. Use a strict three-column proof grid rather than free positioning. |
| D04-03 | `₹9+ CRORE` | Most visually unbalanced metric. Separate numeric value and unit: large `₹9+`, smaller `CRORE` suffix at ~0.44–0.52em. This also solves mobile clipping. |
| D04-04 | Gap between middle/right stats | Keep breathing room, but add a subtle 1px separator only if the three cells still feel disconnected after grid normalization. |
| D04-05 | `940+` | Good. Match numeral cap-height to `11+`, not to the oversized middle metric. |
| D05-01 | `FEATURED IN →` | Too weak and too close to lower edge. Turn into a deliberate rail label with 13–14px tracked sans + 24px rule/arrow. |
| D05-02 | Empty bottom-left | Fine if rail becomes structured; otherwise reads unfinished. |
| D05-03 | Medium/Dailyhunt start | Names are floating. Convert each item to icon + wordmark in an equal-cell rail. |
| D05-04 | YouTube/Podcast | Same issue. Use monochrome marks; no platform brand colors in this section. |
| D05-05 | LinkedIn / edge | Needs right padding equal to title right inset. Do not let the last brand touch the viewport edge. |

## Desktop composition target

Use a 12-column editorial grid inside:

```css
padding-inline: clamp(32px, 5vw, 96px);
padding-block: clamp(28px, 4.2vh, 64px);
```

Suggested row model:

```text
ROW A — section index + title
ROW B — single structural rule
ROW C — founder lockup + bio
ROW D — proof metrics
ROW E — Featured In trust rail
```

The page should no longer have a decorative rule floating *through* row A.

### Target headline

```text
                         THE CERTAINTY
                         BUILDER™.
```

Do not radically rewrite. Improve typography:
- size: `clamp(4.6rem, 7.2vw, 8.4rem)`
- line-height: `0.84–0.90`
- tracking: roughly `-0.035em`
- max width: ~6 columns
- right inset: same as page grid
- `™`: `0.22–0.28em`, superscript
- period: warm gold, small and deliberate

### Structural line

Keep **one** primary horizontal gold rule directly under the index/title header row.

If a secondary hairline is required elsewhere, make it neutral `rgba(17,17,15,.10)`, not gold.
