# Visual Audit & 10x Redesign Plan — dipakvishwakarma.com

Audited 2026-09-29 against the local build (`next dev`, commit `a4e01ff`).
Evidence: 130+ Playwright captures at 390×844, 768×1024, 1440×900 and 1920×1080, a
scroll filmstrip of the pinned homepage story, mobile drawers, the contact wizard, and
the preloader frame. Capture scripts live in `output/audit/` (`capture.mjs`,
`capture2.mjs`, `sheets.mjs`) and can be re-run against any branch for before/after.

---

## 1. Executive summary

The site has strong raw material (a genuinely good hero portrait, real copy, a clear
brand idea: *certainty*) and a sophisticated engineering base (7-act GSAP story,
CSS Modules, art-directed LCP). What holds it back visually is not craft in any one
component but **lack of a single design system**: two competing brand languages, one
overused accent colour, six button styles, four card idioms, ~15 labelling devices,
and the same six photographs recycled across every page. The result reads as a
"template-with-effects" rather than a distinctive personal-authority publication.

The 10x lift comes from five moves, in priority order:

1. **One design system** (type scale, colour roles, spacing, buttons, cards, eyebrows)
   applied everywhere, replacing per-page invention.
2. **A real typographic voice.** Retire all-caps Montserrat 900 as the only headline
   register; introduce a display serif (client sign-off) or at minimum a mixed-case,
   tighter Montserrat with real hierarchy.
3. **Photography as the hero, not the filler.** 8 curated, consistently graded images,
   each used once; remove the recycled event snapshots and the ghosted manifesto image.
4. **Homepage choreography that respects scroll.** Keep the story, cut the dead holds,
   replace the page-flip gimmick, merge Acts 2+3, delete the marquee, and add a
   persistent header so users are never stranded 12,000px down with no nav.
5. **Inner-page condensation.** About and Videos carry the most visual debt (redundant
   nested cards; three identical empty states). Condense, don't decorate.

Estimated effort: **~18–22 working days** across five phases (§6), with a
client decision gate after Phase 1.

---

## 2. What is working (keep)

- **Hero composition (desktop).** B&W seated portrait + grey ensō brush + left brush
  accent is distinctive and calm. Keep the composition; fix details (§3.2).
- **Articles hub structure.** Search, filter pills, one flagship card, 6-up grid,
  numbered list. This is the best-organised page on the site and should become the
  reference for the rest.
- **Article reading template.** ~62ch measure, generous leading, red bullets, author
  card. Good bones.
- **Contact page.** Cleanest inner page. The 3-step wizard modal is well built on both
  desktop and mobile.
- **Footer.** Four-column ledger is clear; keep it (fix the off-brand green dot).
- **Engineering hygiene.** Content contracts, `data-ac-event` telemetry, reduced-motion
  handling, art-directed responsive portrait, zero console errors at all breakpoints.

---

## 3. Findings

Severity: **P0** = bug / broken experience, **P1** = clearly hurts perceived quality,
**P2** = polish.

### 3.1 Global / brand system

| # | Sev | Finding | Evidence |
|---|-----|---------|----------|
| G1 | P1 | **Two design languages.** `HANDOVER.md` mandates Playfair Display + Plus Jakarta Sans, obsidian/warm-paper/metallic-gold. The live code uses a "brand kit" of Montserrat + Poppins + signal red (#e83a12). Tokens are still named `--gold`, `--gold-rule`, `bridgeGoldRule`; the Authority Closers logo in Act 7 is gold on a red-accented site. | `globals.css:41-51`, `HANDOVER.md §1`, Act 7 capture |
| G2 | P1 | **Monotone typography.** Every H1/H2 is Montserrat 800–900, uppercase, with a red full stop (`FEATURED IN.`, `WHAT I THINK ABOUT.`, `LATEST THINKING.`, `AUTHORITY CLOSERS.`, `PRINCIPLES & FRAMEWORKS.`, `LATEST.`, `SHORTS.`). No display/body contrast, no italic register except the red italic quote. 11 font files load (6 Montserrat + 5 Poppins weights). | `layout.tsx:11-23`, all section captures |
| G3 | P1 | **Single accent does every job.** Signal red is used for eyebrows, numerals, links, CTAs, highlights, quotes, borders, dots and dividers. Soft sand and deep indigo (both in the brand kit) are barely used (9 references, mostly tints). Red therefore carries no meaning. | `globals.css:41-57` |
| G4 | P0 | **Red small text fails WCAG AA.** `#e83a12` on `#f7f7f5` is **3.88:1**. It is used for 11–13px mono eyebrows on every page (`02 / THE PERSON`, `OPERATING PHILOSOPHY`, `LAST UPDATED…`). `--accent-accessible` (#c23213, 5.21:1) exists but is only used on buttons. `--ink-faint` (#8a877d) is 3.35:1 and is used for captions. | computed |
| G5 | P1 | **Label noise.** Per viewport there are typically 5–8 metadata devices: `02 / THE PERSON`, `[01]`, `[ 01 / 04 ]`, `#01`, `[ FIG. 01 ]`, `03 / FLAGSHIP VENTURE`, `01 — ABOUT`, `STAGE 01 — INTENT`, `★ THE APEX`, pills, florets `✦`, diamonds `◇`. Hierarchy is drowned by ornament. | About, Home, Contact captures |
| G6 | P1 | **No component system.** At least six button styles (black rect + arrow, white outline + play circle, red uppercase small, red mono, underlined mono link, "READ ANALYSIS" black chip) and four card idioms (white with red left border, black glass, ticket frame with scallops, pill). | Home, About, Resources, Contact |
| G7 | P1 | **Photography.** 85 files in `public/media` (216 MB, mostly unused originals, screenshots, phone videos) but only ~7 distinct images are used, and they are recycled everywhere: the Hinglish "What's Your WHY?" stage banner appears in Videos hero, Topics 07, Latest Thinking featured plate and Articles #04. Mix of colour and B&W, DSLR and phone screenshots, no consistent grade. Act 2 ("The Person") has no photo of the person. | Topics, Thinking, Videos, Articles captures |
| G8 | P1 | **Two headers, two mobile menus.** Home uses the hero's in-stage header (relative, disappears after Act 1); inner pages use `SiteHeader` (fixed). The mobile drawers are visibly different (home: bold Poppins + CTA; inner: light Montserrat + hairlines). On the homepage there is **no navigation available after the first screen** (11,900 px on mobile). | `MobileNav.tsx`, `SiteHeader.tsx`, drawer captures |
| G9 | P1 | **Dark preloader flash.** Every homepage load shows a full-black brand card (~350–2500 ms) then hard-cuts to a cream page. A second, unused preloader (`site-preloader/`) is dead code. | preloader capture, `EditorialPreloader.tsx` |
| G10 | P2 | Off-brand details: Tailwind green `#22c55e` location dot; `unoptimized` signature PNG/WebP as logo at ~14vw; "▶" play icon on a CTA that opens a website; `.storyShell` comment says 320vh while HANDOVER says 380vh. | footer, hero |
| G11 | P2 | Third-party scripts (`api.nayagrowth.com` ×2) load in `<head>` on every page, contrary to AGENTS rule 6. Not visual, but affects LCP and the preloader timing. | `layout.tsx:93-103` |

### 3.2 Homepage (7-act story)

| # | Sev | Finding |
|---|-----|---------|
| H1 | P1 | **Page-flip transition shows a blank screen.** In the first ~120 px of scroll the hero is warped into a thin sliver at the left while Act 2 text is still masked; the viewer sees mostly empty cream. The 3D flip, sheen, spine shadow and "reverse folio seal" are ~250 lines of choreography for an effect nobody sees clearly. |
| H2 | P1 | **Dead scroll holds.** The pinned shell is 320vh (~2,900 px at 1440). The flip finishes by ~260 px; frames at 260, 400 and 560 px are identical (Act 2 hold), as are 900–1,350 (Act 3 hold). The story feels like slides with scroll-jacking rather than a continuous narrative. |
| H3 | P1 | **Act 2 is 60% empty.** Right-aligned headline with misaligned pink highlight boxes (box extends past "BUILDER"), a faint geometric watermark, then three metrics at the bottom. No portrait. |
| H4 | P1 | **Act 3 "Featured In" is a full screen for five unlinked logos** inside a ticket frame with corner florets and scallops. The platforms have no hrefs (deliberately unverified). This should be a strip, not an act. |
| H5 | P1 | **Act 4 manifesto ghost image.** The portrait is faded to ~12% and blurred; at first glance it looks like a rendering error. Mid-reveal frames (1,500 px) show the headline mask clipping glyphs. |
| H6 | P2 | **Act 5 topics.** The sticky image plate cycles through the recycled photos (office portrait → group photo → stage banner). Cards are fine but generic; on mobile all 7 render with full images (very tall). |
| H7 | P1 | **Act 6 featured video plate** overlays red mono text on the busiest photo on the site; low contrast. Article titles use the SEO `title` ("Dipak Vishwakarma on The Silent…") while the hub uses `displayTitle` ("The Silent Sales Pipeline Killer"). "1 MIN READ" on flagship essays undermines authority. |
| H8 | P1 | **Ecosystem marquee is filler.** Eight self-referential "entities" with random symbols (✦ ● ■ ▶ ◆ ▲), and the same three metrics (₹9+ Cr / 940+ / 11+ yrs) that already appear in Act 2 and in the bio paragraph. Third repetition on one page. |
| H9 | P2 | Hero: "Certainty" highlight smudge misaligned (starts left of the C) on 390 and 1920; 1920 leaves ~40% of the left column empty below the quote. |
| H10 | P1 | **Tablet hero (768).** ~250 px empty band between nav and headline, portrait cropped at the bottom, two CTAs at different widths. |

### 3.3 Inner pages

| Page | Sev | Finding |
|------|-----|---------|
| About | P1 | 8,863 px at 1440. Heavy redundancy: "Strategic Maturity Track" ladder duplicates the spine titles beside it; "Pillars of Decision Psychology" ledger duplicates the four manifesto cards beside it; every timeline node has a nested "THE CORE EPIPHANY" quote box; every manifesto card has a nested "STRATEGIC LAW" box. Card-in-card-in-card. Apex card is a third dark card style. |
| Articles | P0 | **Mobile: eyebrow clipped behind the fixed header** ("FRAMEWORKS" peeks out above the H1 at 390). |
| Articles | P2 | `PRINCIPLES & FRAMEWORKS.` in red 900 is the loudest element on the site. Card covers reuse the topics photos; category has no colour coding. |
| Article | P2 | Good template. Author card uses yet another card style (grey + red left border). Related-articles band is fine. |
| Videos | P0 | **Three identical "This rail is being filmed" empty states stacked** = page looks abandoned. Hero image is the stage banner again. |
| Resources | P1 | Unexplained thick grey bar above the grid; uppercase Montserrat titles; no imagery; mono underlined CTAs. Feels unfinished. |
| Contact | P2 | Authority Closers card appears twice on one screen (grid card 06 + aside 01). Colour portrait clashes with the B&W hero language. |
| Now | P1 | Portrait-orientation PNG screenshot letterboxed inside a black landscape frame (black bars). |
| Connect | P2 | Fine. Full site header is unnecessary on a link-in-bio page. |
| Legal | P2 | Fine. Sticky TOC works. |

---

## 4. Design direction: "Quiet authority"

The brand idea is *certainty*. Visually that means **fewer, larger, calmer moves**:
generous whitespace, one confident headline voice, one accent used only for action,
photography with a single grade, and motion that reveals rather than performs.

### 4.1 Typography

Recommended (needs Dipak's sign-off because it changes the brand kit):

- **Display:** a high-contrast editorial serif. Candidates: *Fraunces* (variable, opsz),
  *Instrument Serif*, or *Playfair Display* (already specified in HANDOVER). Mixed case,
  tight tracking (-0.02em), weights 400/500 + italic. Used for H1, H2, pull quotes and
  the manifesto.
- **Text/UI:** keep **Poppins** only if mandated; otherwise *Inter* / *Plus Jakarta
  Sans* at 400/500/600 for body, nav and labels.
- **Mono:** system mono, used **only** for section numbers and dates.

Constrained fallback (brand kit untouchable): Montserrat stays, but mixed-case,
weight 600–700 max, `letter-spacing: -0.02em`, sizes from a 1.25 modular scale, uppercase
reserved for eyebrows. This alone removes the "shouting" quality.

Scale (fluid, `clamp`): eyebrow 12 · body 17/18 · h3 24 · h2 40–56 · h1 56–88 ·
monument 88–140. Line-height 1.05 for display, 1.6 for body. Drop to **4 font files**.

### 4.2 Colour roles

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Canvas | `--canvas` | #f7f7f5 | page |
| Canvas warm | `--canvas-warm` | soft sand tint (#f1e9df) | alternate sections, cards |
| Ink | `--ink` | #0a0a0a | headlines |
| Ink body | `--ink-body` | #33312d (≥ 10:1) | body |
| Ink muted | `--ink-muted` | #5c5a53 (≥ 6:1) | captions, min 13px |
| Depth | `--indigo` | #241a4b | dark sections (replaces flat #080808), footer, Act 7 |
| Action | `--accent` | #c23213 on light, #e83a12 on dark | **buttons, links, active state only** |
| Action wash | `--accent-wash` | rgba(232,58,18,.08) | highlight marks, hover fills |

Rule: red never appears as decoration (no red eyebrows, numerals, dots, dividers,
florets). Eyebrows become `--ink-muted` small caps. Section numbers become `--ink-faint`
mono. This single rule changes the feel of every page.

### 4.3 Components (in `src/features/editorial`)

- **Button**: `primary` (ink fill, white text), `secondary` (1px ink outline),
  `tertiary` (text + arrow, underline on hover). One height (48px), one radius (2px), one
  icon style (→ / ↗). Delete all others.
- **Card**: one surface (`--canvas-soft`, 1px hairline, no shadow), one hover (hairline →
  ink). Variants only by content, never by border colour or background.
- **Eyebrow**: `<Eyebrow index="02">The person</Eyebrow>` → mono index + small-caps
  label, ink-muted. Remove brackets, slashes, florets, diamonds, stars.
- **SectionHeader**: eyebrow + serif H2 + optional lede, left aligned, max 3 lines. No
  red full stop.
- **Figure**: image + caption, one aspect ratio per context (3:4 portrait, 3:2
  landscape, 16:9 cinema), `sizes` set, warm-mono grade applied in the pipeline.
- **Metric**: number (serif, tabular) + label; used **once** per site (Act 2).

### 4.4 Photography & art direction

- Select **8 hero-grade images** from the 85 originals (the seated B&W portrait, the
  office desk portrait, the window portrait, the keynote wide, a hands/notebook detail,
  a team frame, two speaking frames). Each used once.
- One grade: warm monochrome (slight sepia lift on blacks) for editorial contexts;
  colour allowed only inside video thumbnails.
- Extend `scripts/prepare-home-images.mjs` to output every used image at 3 widths and 2
  crops; delete unused originals from `public/media` (saves ~200 MB in the Docker image).
- Give every article a `cover` in front-matter (or a generated typographic cover with
  the category tint) instead of recycled photos.

### 4.5 Motion

- Keep GSAP for the pinned story only. Everything else uses the existing `Reveal`
  (opacity + 24px, 600 ms, staggered 60 ms).
- Pinned story becomes **240vh** with continuous transitions (no holds > 20% of the
  timeline). Replace the page flip with a **cover lift**: hero copy fades up, portrait
  scales 1.0 → 1.06 and darkens, Act 2 slides up over it. No 3D, no sheen, no seal.
- Respect `prefers-reduced-motion` (already handled) and add a `data-story="static"`
  escape hatch for QA screenshots.

---

## 5. Page-by-page plan

### 5.1 Homepage

| Act | Now | Target |
|-----|-----|--------|
| 0 Preloader | Black card, 0.3–2.5 s, hard cut | Remove. If a handoff is wanted, a 250 ms cream fade with the signature only. Delete `site-preloader/`. |
| Header | In-stage, disappears | Shared `SiteHeader` on all pages; transparent over the hero, compact + hairline after 24 px. One mobile drawer. |
| 1 Hero | Good | Fix highlight alignment; replace "▶" icon; 1920: widen copy column to 40% and add a proof line under the quote (e.g. "940+ professionals trained · Founder, Authority Closers"). 768: switch to the mobile stack at ≤ 900 px. |
| 2 Identity + 3 Presence | Two full-screen acts | **Merge into one act**: left 5/12 portrait (office desk, warm mono), right: serif headline "The Certainty Builder", bio, three metrics, and a slim "Featured in" logo strip (5 mono-grey wordmarks, 40 px tall). Ticket frame, florets, scallops, watermark: removed. |
| 4 Manifesto | Ghosted image + red italic | Full-bleed window portrait at 100% (warm mono, darkened 35%), white serif quote 96–140 px, three tenets as a single line with · separators. |
| 5 Topics | 7 cards + sticky plate | Keep the split layout; cards lose the pill/bracket ornament; sticky plate shows a curated image per topic (no repeats) or a typographic tint card; mobile shows title + description only (no images). |
| 6 Latest thinking | Video plate + list | Featured video becomes a 16:9 real YouTube thumbnail with a play button (once a video id exists) or is hidden. Essays list uses `displayTitle`, serif titles, category as ink-muted text, read time only if ≥ 3 min. |
| 7 Bridge | Dark + group photo | Indigo section, Authority Closers wordmark recoloured to white, one primary + one tertiary CTA. Group photo removed or used at 100% as a split image. |
| Marquee | 8 entities + metrics | **Delete.** |
| Footer | OK | Indigo background, remove green dot, retire mono labels. |

### 5.2 About

- Cut from 7 sections to 5: Hero · Story · Evolution · Philosophy · FAQ + CTA
  (Principles and Mission/Vision fold into Philosophy as a single list).
- Evolution: a real vertical timeline with year/period, serif title, 2–3 lines of body.
  Remove the maturity ladder, the "core epiphany" boxes and the "focus" badges. Apex
  becomes the last node with a tertiary CTA, not a dark card.
- Philosophy: four statements as large serif lines with one paragraph each. Remove the
  pillars ledger, the counters and the "strategic law" boxes.
- Target length ≤ 5,500 px at 1440.

### 5.3 Articles & article

- Hub: H1 mixed-case serif in ink (no red word); pills stay; flagship card and grid keep
  layout but adopt the shared Card; covers from front-matter; category tint via
  `--canvas-warm` / indigo wash. **Fix the P0 mobile clip** (`padding-top` of the page
  hero must account for a two-line eyebrow, or move the eyebrow below the header
  spacer).
- Article: add an optional cover, drop mono author line to small caps, author card uses
  the shared Card. Reading progress hairline (2 px, ink) optional.

### 5.4 Videos, Resources, Now, Contact, Connect

- Videos: render only rails with content; if none, render one section with a YouTube
  channel embed or the six latest video ids, plus the signature properties. Never stack
  empty states.
- Resources: remove the grey bar; each resource gets a typographic cover tile (title set
  in serif on a sand tint) and a primary button; two-up grid with hairlines.
- Now: crop the image to 3:2 (or use a different image); remove the black frame.
- Contact: remove the duplicate Authority Closers card from the grid (keep the aside);
  portrait in warm mono to match.
- Connect: minimal header (signature + "Back to site"), keep the list.

---

## 6. Phased delivery

| Phase | Scope | Days | Gate |
|-------|-------|------|------|
| **0 — Fix & clean** | P0s: articles mobile clip, videos empty rails, red text contrast (switch eyebrows to ink-muted, buttons to `--accent-accessible`), Now letterbox, duplicate AC card, green dot, highlight alignment, remove preloader flash, delete `site-preloader/`, trim to 4 font files, purge unused `public/media`. | 1.5–2 | none |
| **1 — System** | Tokens (§4.1–4.2), `editorial` primitives (§4.3), shared header + single drawer, replace every button/card/eyebrow in the codebase. Ship behind no flag; it is a visual refactor. | 3–4 | **Client decision: serif display font yes/no.** Present a one-page type specimen (hero + About hero + article) in both options. |
| **2 — Homepage** | Merge Acts 2+3, manifesto full-bleed, cover-lift transition, 240vh shell, delete marquee, topics/thinking restyle, 768 hero fix. | 4–5 | Filmstrip review (0/15/30/45/60/75/100%) per the Act 2 process. |
| **3 — Inner pages** | About condensation, articles covers + hub polish, videos/resources/now/contact/connect per §5. | 3–4 | 25-cell screenshot grid at 390/768/1440/1920. |
| **4 — Photography** | Select and grade 8 images, extend the image pipeline, article covers. Can run in parallel with 2–3 once the shortlist is approved. | 2 | Client approves the 8-image shortlist. |
| **5 — QA & ship** | Lighthouse ≥ 95 perf/a11y on home + article, axe pass, contrast audit, reduced-motion pass, Playwright visual snapshots refreshed, `npm run check`. | 1–2 | Sign-off. |

Dependencies outside the codebase (unblock early):
- Real YouTube channel URL and ≥ 6 video ids (Videos page, Act 6).
- Verified profile URLs for Medium / Dailyhunt / Podcast (logo strip links).
- Font decision (Phase 1 gate) and photo shortlist approval (Phase 4 gate).
- Confirmation whether the NayaGrowth scripts must stay in `<head>`.

---

## 7. Acceptance criteria (definition of "10x")

- One headline typeface, one body typeface, ≤ 4 font files; no all-caps headline
  longer than one word.
- Red appears only on interactive elements; every text/background pair ≥ 4.5:1.
- Exactly one Button component (3 variants), one Card, one Eyebrow, one SectionHeader
  used across all routes; `grep` finds no page-local button CSS.
- No image used more than once site-wide; every image has a `sizes` attribute and a
  consistent grade; `public/media` ≤ 15 MB.
- Homepage pinned story ≤ 240vh with no identical consecutive filmstrip frames; header
  reachable at every scroll position on every route.
- About ≤ 5,500 px, homepage ≤ 8,000 px on mobile.
- No empty-state block stacked more than once on any page.
- 25-cell grid at 390/768/1440/1920 reviewed and archived per release, matching the
  Act 2 audit process.
