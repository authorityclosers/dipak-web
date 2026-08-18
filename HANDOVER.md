# Developer Handover Blueprint: Dipak Vishwakarma (`dipak-web`)

> **Repositories**:
> - Primary: [`https://github.com/authorityclosers/dipak-web`](https://github.com/authorityclosers/dipak-web)
> - Secondary / Mirror: [`https://github.com/nayagrowth/dipak-web`](https://github.com/nayagrowth/dipak-web)
>
> **Live Production**: [https://dipakvishwakarma.com](https://dipakvishwakarma.com)  
> **Tech Stack**: Next.js 15+ (App Router), CSS Modules, GSAP ScrollTrigger, Docker + Traefik CI/CD

---

## 1. Project Purpose & Design Philosophy

This project is a bespoke editorial narrative surface built for **Dipak Vishwakarma** (Founder of Authority Closers, High-Ticket Sales Architect).

### The Aesthetic Mandate
- **Tone**: High-end luxury editorial print meets Japanese *Enso* calligraphy and modern technical architecture (inspired by the design rigor of *Estate Autopilots*).
- **Color Palette**:
  - **Obsidian Ink** (`#11110f` / `#0e0d0c`) — Deep foundational contrast.
  - **Warm Paper Canvas** (`#f4f1ea`) — Tactile editorial background.
  - **Metallic Raw Gold** (`#c89545`, `#8f621f`, `#d8aa5a`) — Hairlines, datum lines, florets, and glowing accents.
  - **Muted Body** (`#4a473e`) — Refined editorial typography.
- **Typography Stack**:
  - **Serif**: `Playfair Display`, `Iowan Old Style`, Georgia (for monumental headlines, quotes, and essay titles).
  - **Sans**: `Plus Jakarta Sans`, Inter (for UI, labels, and body text).
  - **Mono**: `SF Mono`, `Cascadia Code` (for indices `01`, telemetry badges `[ 940+ CLOSERS ]`, and kicker metadata).

---

## 2. Hard Architectural Rules (`AGENTS.md`)

Before writing code, review and maintain these strict rules:

1. **Feature-Sliced Architecture**:
   - `src/app` only handles routing and page composition. **Zero** feature logic belongs in `src/app`.
   - All features live in `src/features/<feature-name>` (`dipak-hero`, `dipak-identity`, `dipak-presence`, `dipak-mission`, `dipak-topics`, `dipak-thinking`, `dipak-bridge`, `home-intro-story`).
2. **Server Components First**:
   - Every act component is a React Server Component (RSC) by default.
   - Only interaction/animation hooks (e.g., `useHomeIntroTimeline.ts`) use `"use client"`.
3. **Zero UI Bloat**:
   - **No Tailwind CSS**.
   - **No shadcn / Radix / Chakra**.
   - **No Framer Motion / GSAP React plugins / React-Spring**.
   - **No Lucide / FontAwesome / React-Icons**.
   - CSS Modules + semantic HTML + lightweight inline vector SVGs are sufficient and keep the bundle featherlight.
4. **Monorepo Portability Target**:
   - This repo will eventually be ported to `authority-closers/apps/dipak-web/`.
   - The entire `src/features/*` folder must move into the monorepo unchanged.

---

## 3. The 7-Act Story Architecture

The homepage is structured as a continuous 7-act cinematic narrative:

```
[ ACT 1: HERO / SIGNAL ]             ──┐
[ ACT 2: CERTAINTY BUILDER ]          │  Master Pinned Stage (380vh Scroll Shell)
[ ACT 3: FEATURED IN (TICKET) ]       │  Orchestrated by GSAP Timeline Scrub
[ ACT 4: THE MANIFESTO ]             ──┘
[ ACT 5: WHAT I TALK ABOUT (DOMAINS)] ──┐
[ ACT 6: LATEST THINKING (MEDIA) ]    │  Natural Document Flow Below Pin
[ ACT 7: AUTHORITY CLOSERS (BRIDGE) ] ──┘  Dedicated ScrollTrigger Reveals
```

### Breakdown of Each Act:

#### **Act 1: Hero (`src/features/dipak-hero/DipakHeroAct.tsx`)**
- Asymmetric editorial hero with natural-media Enso calligraphy, left brush accent, and LCP portrait.
- Uses Next.js `next/image` with `priority` and calculated `sizes` (Zero Layout Shift).
- On initial scroll, the headline deconstructs upward, the copy dissolves, and the portrait slides out.

#### **Act 2: Identity / The Certainty Builder (`src/features/dipak-identity/DipakIdentityAct.tsx`)**
- Commercial proof metrics (`940+ Closers Trained`, `₹9+ Crore Generated`, `88% Qualification Clarity`).
- Bio and executive advisory scope.

#### **Act 3: Presence / Featured In (`src/features/dipak-presence/DipakPresenceAct.tsx`)**
- **Architecture**: Full-screen luxury vintage ticket certificate / security bond frame with:
  - 4 curved cutout semicircle corner notches (`.scallopTL`, `.scallopTR`, `.scallopBL`, `.scallopBR`).
  - 4 golden corner florets (`✦`) and inner engraved hairline border.
  - Center gold axis with central diamond emblem.
  - 5 platform columns with authentic vector SVGs: **Medium, Dailyhunt, YouTube, Podcast, LinkedIn**.
- **Motion**: Unfolds with 3D perspective (`rotateX: 14deg -> 0deg`), draws its borders, corner florets spin in, and platform badges pop up. On scroll exit, it lifts and rolls away in 3D perspective.

#### **Act 4: The Manifesto (`src/features/dipak-mission/DipakMissionAct.tsx`)**
- Monumental horizontal quote sculpture: `“Sales is the transfer of certainty.”`
- Gold gradient text emphasis, center gold laser axis with diamond center accent, and operating tenets.

#### **Act 5: What I Talk About (`src/features/dipak-topics/DipakTopicsAct.tsx`)**
- Monumental 4-row architectural domain ledger:
  - `[01] High-Ticket Sales Systems` · `[ 940+ CLOSERS TRAINED ]`
  - `[02] Buyer Psychology & Certainty` · `[ TRUST IS ABSENCE OF DOUBT ]`
  - `[03] Founder Authority Architecture` · `[ THE CERTAINTY BUILDER™ ]`
  - `[04] High-Performance Sales Leadership` · `[ ₹9+ CRORE GENERATED ]`
- Golden hairline separators and hover slide glides.

#### **Act 6: Latest Thinking (`src/features/dipak-thinking/DipakThinkingAct.tsx`)**
- Expansive vertical editorial publication spread:
  - **Featured Video Masterclass**: Dark obsidian cinema plaque (`#181715`) with gold border, play button token, and 14-min breakdown.
  - **Long-Form Essays Ledger**: 3 cascading full-width essay rows with categories, abstracts, and read times.

#### **Act 7: Authority Closers Bridge (`src/features/dipak-bridge/DipakBridgeAct.tsx`)**
- High-contrast obsidian dark mode canvas (`#0e0d0c`) serving as the bridge to `authorityclosers.com`.
- Glowing metallic gold CTA (`Explore Authority Closers →`) and wireframe CTA (`Read My Story`).

---

## 4. Motion Architecture & Critical Pitfalls

### The Pinning Mechanics in `src/features/home-intro-story/useHomeIntroTimeline.ts`
- **One Master Pin for Acts 1–4**:
  - `storyShell` (`height: 380vh`) acts as the scroll track.
  - `stage` (`height: 100dvh; position: sticky / fixed`) is pinned by GSAP ScrollTrigger.
  - The timeline duration is `6.0s`, scrubbed by scroll:
    - `0.0 -> 1.0`: Act 1 Deconstruct
    - `1.0 -> 2.2`: Act 2 Reveal & Hold
    - `2.2 -> 3.9`: Act 3 Ticket 3D Assembly & Hold
    - `3.9 -> 6.0`: Act 3 3D Flyaway ➔ Act 4 Manifesto Reveal & Hold

### ⚠️ Critical Lessons & Gotchas (Do Not Repeat These Mistakes):
1. **Never Use Dual Back-to-Back Pinning**:
   - Pinning `stage` for Acts 1–4 and then attempting to pin `#topics` for Act 5 causes severe browser scroll jitter, blank frame flickering, and pin-spacer calculation collisions.
   - **Rule**: Keep Acts 1–4 pinned in the master shell; keep Acts 5–7 in natural vertical document flow with individual `ScrollTrigger` instances (`start: "top 80%"`).
2. **Ghost Bleed Prevention**:
   - When transitioning from Act 1 into Act 2/3/4, Act 1's wrapper must be explicitly hidden (`visibility: hidden; opacity: 0`) in the timeline. Otherwise, the hero image will show through semi-transparent backgrounds during subsequent acts.
3. **No Premature Outro Fading**:
   - Act 4 is the finale of the pinned shell. Do not fade Act 4 to `opacity: 0` before the pin spacer ends. Let Act 4 stay 100% visible so that Section 5 scrolls naturally over it in standard document flow.
4. **Responsive Mobile Flow (`<= 768px`)**:
   - On mobile screens, GSAP `matchMedia` disables pinning and resets all acts to natural sequential document flow (`position: relative; opacity: 1; visibility: visible;`).

---

## 5. Git & Deployment Pipeline

### Remotes
The repository is mirrored across two remotes:
- **`authorityclosers`** (Primary): `https://github.com/authorityclosers/dipak-web.git`
- **`origin`** (Secondary): `https://github.com/nayagrowth/dipak-web.git`

### CI/CD Workflow (`.github/workflows/deploy.yml`)
Every push to `main` executes:
1. **Validate**:
   - Node.js 22 setup ➔ `npm ci` ➔ `npm run lint` ➔ `npm run typecheck` ➔ `npm run build`.
2. **Deploy to Production (`nivi` host: `93.127.199.24`)**:
   - SSH connection using Ed25519 deployment key.
   - `rsync` source code to `/home/nivi/apps/dipak-web`.
   - `docker compose -f docker-compose.prod.yml build && docker compose -f docker-compose.prod.yml up -d --remove-orphans`.
   - Live endpoint polling: `curl https://dipakvishwakarma.com/api/health` until `HTTP 200 OK`.

### Production Routing (Traefik)
Configured in `docker-compose.prod.yml` to automatically handle SSL and routing for:
- `dipakvishwakarma.com` & `www.dipakvishwakarma.com`
- `deepakvishwakarma.com` & `www.deepakvishwakarma.com`

---

## 6. Daily Development Commands

```bash
# Start local development server (Turbopack)
npm run dev

# Run TypeScript compilation check
npm run typecheck

# Run ESLint validation
npm run lint

# Run full Next.js production build
npm run build

# Run Playwright visual regression tests
npm run test:e2e
```

---

## 7. Next Steps for Future Work

1. **Wire Live External Destinations**:
   - Update YouTube video URL to Dipak's real keynote/masterclass asset.
   - Connect Medium and Dailyhunt links to real publications.
   - Connect `Explore Authority Closers →` CTA to the production Authority Closers portal once live.
2. **Monorepo Migration**:
   - When the Authority Closers monorepo is initialized, copy `src/features/*` directly to `authority-closers/apps/dipak-web/`.
