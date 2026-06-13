---
name: "字向每人"
description: "An immersive dyslexia awareness experience. The Ink and Amber Observatory — deep ink frame, single amber lamp, every section a quiet observation."
colors:
  amber-lamp: "oklch(0.72 0.14 70)"
  amber-lamp-deep: "oklch(0.55 0.14 70)"
  deep-ink: "oklch(0.15 0.02 250)"
  paper: "oklch(0.97 0.012 80)"
  quiet-ink: "oklch(0.92 0.01 90)"
  ink-deep: "oklch(0.25 0.04 50)"
  ink-plate: "oklch(0.20 0.025 250)"
  paper-card: "oklch(0.99 0.005 80)"
  ink-edge: "oklch(0.30 0.03 245)"
  paper-edge: "oklch(0.88 0.02 75)"
  quiet-fog: "oklch(0.60 0.03 240)"
  paper-fog: "oklch(0.50 0.03 60)"
  warm-sodium: "oklch(0.65 0.18 25)"
  ember: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Noto Serif SC, STSong, SimSun, serif"
    fontWeight: 700
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    lineHeight: 1.3
    letterSpacing: "normal"
  headline:
    fontFamily: "Noto Serif SC, STSong, SimSun, serif"
    fontWeight: 700
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    lineHeight: 1.3
  title:
    fontFamily: "Noto Serif SC, STSong, SimSun, serif"
    fontWeight: 500
    fontSize: "1.25rem"
    lineHeight: 1.4
  body:
    fontFamily: "Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontWeight: 300
    fontSize: "1rem"
    lineHeight: 1.8
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 500
    fontSize: "0.875rem"
    letterSpacing: "0.2em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
spacing:
  container-max: "1280px"
  section-y: "clamp(5rem, 8vw, 8rem)"
  container-x: "clamp(1rem, 4vw, 2rem)"
  card-padding: "1.5rem"
  card-padding-lg: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.amber-lamp}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "36px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.amber-lamp}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "32px"
  card:
    backgroundColor: "{colors.ink-plate}"
    rounded: "{rounded.md}"
    padding: "{spacing.card-padding}"
  card-lg:
    backgroundColor: "{colors.ink-plate}"
    rounded: "{rounded.md}"
    padding: "{spacing.card-padding-lg}"
  slider-thumb:
    backgroundColor: "{colors.amber-lamp}"
    size: "12px"
  nav-active-pill:
    backgroundColor: "{colors.amber-lamp}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.lg}"
---

# Design System: 字向每人

## 1. Overview

**Creative North Star: "The Ink and Amber Observatory"**

字向每人 is not a website *about* dyslexia. It is an observatory where visitors stand inside the experience and look out. The structural frame is deep ink blue: cold, vast, like a chamber at night. The single saturated color, amber, behaves as a lamp: a beam that swings to where the visitor's attention needs to land. Each section is one observation through that lamp — confusion, mechanism, recognition, action — and the layout rewards the visitor who follows the beam rather than scanning for cards.

The voice is restrained and powerful, like a documentary narrator who trusts the audience to receive difficult information without melodrama. From PRODUCT.md: "克制中的温度" — restraint that carries warmth. Warmth arrives only through the amber lamp and through typography that takes Chinese characters seriously as physical objects. The cold structural frame is what makes the warm moments land harder; warmth in the body background would dilute both.

This system explicitly rejects the SaaS landing-page scaffold (hero → features → pricing → CTA), gradient text as a design element, glassmorphism as decoration, the hero-metric template (big number + small label + gradient accent), identical icon-card grids, and the 55–95% AI landing-page grammar of tiny tracked uppercase eyebrows over every section heading. It also rejects generic charity/disability awareness aesthetics (stock photography over warm-toned backgrounds, inspirational quotes), clinical medical reference sites (WebMD-style data-first coldness), and "warm educational magazine" minimalism that mistakes restraint for emotional stakes.

**Key Characteristics:**

- OKLCH-only color tokens across light + dark themes; both share the same accent, the same hue families, the same role system.
- Two-color identity: Deep Ink (background) + Amber Lamp (single signature accent). No third saturated hue. The lamp is the only voice allowed to be loud.
- Display = Noto Serif SC, body = Noto Sans SC, English labels + numbers = Space Grotesk. Three families, three jobs.
- Section-as-emotional-moment. Each section earns its place as a narrative beat, not a feature slot. No FAQ, no glossary, no bullet-pointed facts unless dramatic enough to earn it.
- The dyslexia simulator is the climax, not an accessibility feature. Opt-in only; never automatic.
- Flat by default; surfaces gain a single amber glow on hover or focus, never ambient noise.

## 2. Colors: The Ink and Amber Palette

The system holds two color stories at once. The light theme is a quiet reading desk (warm paper, deep ink type). The dark theme is the same desk after dusk (deep ink surface, amber lamp). Both themes carry the same Amber Lamp as their only saturated accent, and both themes keep every other hue inside the deep-ink / quiet-paper tonal family.

### Primary

- **Amber Lamp** (`oklch(0.72 0.14 70)` dark / `oklch(0.55 0.14 70)` light): The single signature accent. Used for: primary buttons, the simulator active state, focus rings, slider thumbs, the active nav pill, the typewriter cursor, in-text emphasis spans, and divider glows. ≤10% of any given surface, by doctrine. Brightness varies by theme (lighter against deep ink, deeper against paper) so contrast holds ≥4.5:1 in both directions.
- **Warm Sodium** (`oklch(0.65 0.18 25)`, hard-coded inline): The secondary warm. Used inline for the Hero "不一样" emphasis and the Action gallery's data numbers. Shares the lamp's warmth but shifts toward sodium-orange to distinguish narrative emphasis from action affordance. Promotes to a semantic token in future work.

### Neutral

- **Deep Ink** (`oklch(0.15 0.02 250)`, dark bg): The structural frame. A near-black with a quiet blue undertone, chosen over neutral gray to read as "after-dark chamber" rather than "dark mode UI."
- **Paper** (`oklch(0.97 0.012 80)`, light bg): A near-white warm-tinted surface. The tint is toward the brand's own hue family (the same family as Amber Lamp), not toward generic warmth — it reads as the paper side of the observatory, not as a beige SaaS landing page.
- **Quiet Ink** (`oklch(0.92 0.01 90)`, dark fg): Off-white foreground, gently warm-tinted. The voice the page speaks in after dark.
- **Ink Deep** (`oklch(0.25 0.04 50)`, light fg): Near-black warm-tinted foreground. The voice the page speaks in during the day.
- **Ink Plate** (`oklch(0.20 0.025 250)`) / **Paper Card** (`oklch(0.99 0.005 80)`): The elevated surface — one tonal step off the page. Used for resource cards, simulator panel, typography adjuster, About mission card.
- **Ink Edge** (`oklch(0.30 0.03 245)`) / **Paper Edge** (`oklch(0.88 0.02 75)`): 1px borders. Always tonal, never pure black or white. Cards use these as their default structural cue instead of shadow.
- **Quiet Fog** (`oklch(0.60 0.03 240)` dark) / **Paper Fog** (`oklch(0.50 0.03 60)` light): The muted-foreground family. Captions, secondary metadata, footer columns. Bumped to L 0.60+ to clear the 4.5:1 contrast floor against the background — never a soft "for elegance" gray.

### Destructive

- **Ember** (`oklch(0.577 0.245 27.325)` light / `oklch(0.65 0.18 25)` dark): Reserved for genuine errors and the `[待补：...]` placeholder markers. The placeholder use is a deliberate affordance — the amber-ember tells the author "this needs you" without screaming.

### Named Rules

**The Amber Lamp Rule.** The signature accent appears on ≤10% of any given screen. Its rarity is the point; if amber is everywhere, it is nowhere.

**The Frame Rule.** The background carries the structural cold. Warmth arrives only through the amber lamp and through typography; never through body-bg tinting. The warm-tinted paper is the only exception, and it stays close to white (L 0.97, chroma 0.012) so it reads as the same chamber after sunrise, not as a different page.

**The Single Light Source Rule.** When a glow or shadow appears, its color is amber — never gray. The world has one warm light source. Multiple shadows of different temperatures read as UI noise.

## 3. Typography

**Display Font:** Noto Serif SC (with STSong, SimSun serif fallback). Weight 700 at hero, 500 at title. Carries Chinese character weight without decoration.

**Body Font:** Noto Sans SC (with PingFang SC, Microsoft YaHei sans fallback). Weight 300 default. A neutral vessel for prose; lightness is intentional, not thinness.

**Label Font:** Space Grotesk (sans, weights 400–700). Used only for English kicker labels (`DYSLEXIA AWARENESS`, `SOCIAL RESOURCES`, `ABOUT US`), data numbers in Hero, and the `SCROLL` cue. Never for body prose, never for Chinese.

**Character:** Serif display carries emotional weight — the heading is the documentary narrator speaking. Sans body is the page's neutral vessel. Space Grotesk is the technical voice: it marks English and numbers as a different register from the Chinese prose. Three families, three registers, no overlap.

### Hierarchy

- **Display** (Noto Serif SC, 700, `clamp(2.25rem, 5vw, 4.5rem)`, line-height 1.3, letter-spacing normal): Hero h1 only. Cap ceiling at 4.5rem — heading voice, not shouting. Use `text-wrap: balance`.
- **Headline** (Noto Serif SC, 700, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.3): Section h2/h3. Use `text-wrap: balance`.
- **Title** (Noto Serif SC, 500, 1.25rem, line-height 1.4): Subsection h4 (simulator labels, About project mission). Semibold weight is enough — title hierarchy reads through size + family, not weight contrast.
- **Body** (Noto Sans SC, 300, 1rem, line-height 1.8, max-width 65ch): Default prose. Light weight (300) is the doctrine — heavier weights draw attention the prose hasn't earned. Headings carry weight; paragraphs carry breath.
- **Label** (Space Grotesk, 500, 0.875rem, letter-spacing 0.2–0.3em, uppercase): English kickers, data numbers, action labels, the `SCROLL` cue. One per section, used as a deliberate kicker — not as default grammar. Short (≤4 words).

### Named Rules

**The Quiet Body Rule.** Body weight stays at 300. Heavier weights draw attention that the prose hasn't earned. Headings carry weight; paragraphs carry breath.

**The Cold Display Rule.** Display headings never carry colored gradient text. Emphasis goes through solid color spans in Amber Lamp or Warm Sodium — never through `background-clip: text`. Weight + size + solid color is the entire emphasis vocabulary.

**The Three-Register Rule.** Chinese prose uses Noto Sans SC only. English/numeric callouts use Space Grotesk only. The two never mix inside a single sentence — Chinese in a Space Grotesk paragraph reads as costume, English in a Noto Sans paragraph reads as broken.

## 4. Elevation

Flat by default. Surfaces are distinguished by tonal layering (page → card) and a 1px Ink Edge border. Shadows do not exist at rest; they appear only as a response to state.

The single elevation event is the **Amber Lift**: a card hovered or focused gains `translateY(-4px)` plus a warm shadow `0 12px 40px oklch(0.72 0.14 70 / 0.15)`. The same shadow applies to focused primary buttons (`hover:shadow-lg shadow-primary/30`). The shadow is amber because the world has one warm light source, and that source is the lamp.

The Amber Glow utility (`box-shadow: 0 0 30px oklch(0.72 0.14 70 / 0.3), 0 0 60px oklch(0.72 0.14 70 / 0.1)`) is reserved for the active simulator state and the Hero SideRays light effect — never decorative, never ambient.

### Shadow Vocabulary

- **Amber Lift** (`box-shadow: 0 12px 40px oklch(0.72 0.14 70 / 0.15)` + `translateY(-4px)`): Card hover/focus. The only ambient-leaning shadow, and it carries the lamp's hue.
- **Amber Glow** (`box-shadow: 0 0 30px oklch(0.72 0.14 70 / 0.3), 0 0 60px oklch(0.72 0.14 70 / 0.1)`): Active simulator panel, hero SideRays bloom. Reserved.
- **Amber Button Shadow** (`box-shadow: 0 8px 24px oklch(0.72 0.14 70 / 0.3)`): Primary button hover. The lamp briefly focusing on the affordance.
- **Navbar Scroll Shadow** (`shadow-sm` on `<header>` after scrollY > 40): The only neutral shadow. Carries structural weight, not visual weight — used to lift the fixed nav off the page once content scrolls beneath.

### Named Rules

**The Flat Rest Rule.** Surfaces do not carry shadows at rest. If a shadow is visible without a state change, it is wrong.

**The Single Light Source Rule.** Every shadow or glow carries amber. Gray shadows are a different temperature and break the world; if the lamp is warm, the shadows it casts are warm.

## 5. Components

### Buttons

- **Shape:** Restrained — `rounded-md` (6px). Not pill, not square.
- **Primary:** Amber Lamp background + Deep Ink foreground, 0.5rem × 1rem padding, h-9 (36px) by default. `cursor-pointer` enforced globally. On press: `transform: scale(0.97)` via the `.btn-press` utility. On hover: 90% opacity + Amber Button Shadow. On focus-visible: 3px ring in `ring-primary/50`.
- **Outline:** Transparent background + 1px border in Amber Lamp + Amber Lamp foreground. Used for simulator trigger ("开启模拟" / "恢复正常"). Hover: `bg-primary/10`.
- **Ghost / Link:** No background, foreground inherits, hover tints accent or underlines. Reserved for tertiary actions inside cards.
- **Disabled:** 50% opacity, no pointer events, focus ring suppressed.

### Cards / Containers

- **Corner Style:** `rounded-md` (6px) within the radius scale. Sharper than typical SaaS cards; the radius is enough to soften, not enough to read as playful.
- **Background:** `bg-card` (Ink Plate / Paper Card). One tonal step off the page.
- **Border:** 1px `border-border` (Ink Edge / Paper Edge). Default structural cue; the shadow is the response, not the default.
- **Internal Padding:** p-5 (compact: 1.25rem) for tight cards, p-6 (1.5rem) for default, p-8 (2rem) for breath (simulator panel, About mission).
- **Shadow Strategy:** None at rest. Amber Lift on hover/focus only.

### Inputs / Sliders

- **Style:** 1px tall horizontal track in `bg-border`, 12px circular thumb in Amber Lamp, no border-radius on track itself. Used for the dyslexia simulator intensity slider (20–100%) and the typography adjuster (fontSize 12–28px, letterSpacing 0–8px, lineHeight 1.2–3.0).
- **Focus:** Native browser focus on the range input; the amber thumb is the affordance. No custom focus ring.
- **Label:** 0.75rem Quiet Fog / Paper Fog, value rendered in Space Grotesk 0.75rem Amber Lamp when numeric.

### Navigation (GooeyNav)

- **Style:** Fixed `<header>`, transparent at top, `bg-background/92 backdrop-blur-xl border-b border-border shadow-sm` after `scrollY > 40`. Brand logo (32px webp) + Noto Serif SC wordmark on the left; desktop nav center; theme toggle + mobile hamburger on the right.
- **Active State:** SVG gooey-filter particle effect — fifteen particles burst from the previous link and converge onto the new one. The active label sits in a liquid Amber Lamp pill, matching the label color in Deep Ink.
- **Labels:** Noto Sans SC, 400, 0.875rem, color `text-muted-foreground` at rest, `text-foreground` when active.
- **Mobile:** Vertical stack below sm breakpoint; active row tints `text-primary bg-primary/8`.
- **Scroll-Aware:** The active link follows the section whose top edge crosses 100px below the viewport. Animation lock prevents flicker during transitions.

### Theme Toggle

- **Icon:** Sun (when dark) / Moon (when light), lucide-react, 16×16.
- **Style:** `p-2 text-muted-foreground hover:text-primary rounded-sm hover:bg-secondary transition-colors`.
- **aria-label:** "切换到日间模式" / "切换到夜间模式". The label changes with state.

### Signature Component: Dyslexia Simulator

- **Default State:** Clean prose in Noto Sans SC, weight 300, color `text-foreground/80`. Readable as any other paragraph.
- **Active State:** Per-character transforms — `translateY(±3px)` rotated `±4deg`, per-char blur `0–1.5px`, per-char opacity dipping to `0.7` — all scaled linearly by the intensity slider. Plus the `letterDance` CSS class: each character span animates with `2s ease-in-out infinite`, varying delay (0–0.6s) and duration (1.8–2.5s) per span index.
- **Trigger:** Outline button "开启模拟" / "恢复正常", `border-primary text-primary`, hover `bg-primary/10`. Plus `.btn-press`.
- **Intensity Slider:** 20–100%, primary thumb, value displayed in Space Grotesk 0.75rem Amber Lamp.
- **Opt-In Doctrine:** The simulator never activates automatically. A neurotypical visitor must explicitly click "开启模拟" to experience the disorientation. Default state is fully readable prose.

### Signature Component: Typography Adjuster

- **Shape:** Same card pattern as the simulator (bg-card, border, p-6 md:p-8).
- **Sliders:** Three columns on md+, stacked below. fontSize 12–28px, letterSpacing 0–8px, lineHeight 1.2–3.0.
- **Sample Text:** Real-world scenario paragraph about a child reading, set in Noto Sans SC 300. The sample is the message; the controls are the apparatus.
- **Purpose:** A second pass at the climax — "亲手调一调，感受文字的呼吸." Visitors see how typographic adjustments transform the same paragraph from fatiguing to readable.

### Signature Component: Typewriter Tagline

- **State Machine:** Three rotating lines from the `taglines` array. Type at 80ms/char, hold 2200ms, delete at 40ms/char, advance.
- **Cursor:** 2px solid Amber Lamp right border, `blink-cursor 1s step-end infinite`. The lamp blinks.
- **Placement:** Hero only, right-aligned under the h1. The tagline rotates between three voices — openness ("文字应该向每个人敞开"), recognition ("不是不努力，只是看见的世界不一样"), and tenderness ("理解，是给他们最温柔的礼物").

### Background Imagery

- Per-section background photos via CloudFront CDN, paired (dark + light variant). Sections overlay the image with `bg-background/94` to keep contrast readable while letting the photo bleed through faintly.
- Hero background uses a more saturated overlay (`0.55–0.88` alpha) to protect right-aligned heading text.
- 9 local JPG portraits in `client/public/famous-dyslexics/` for the Action section's CircularGallery.

## 6. Do's and Don'ts

### Do

- **Do** treat Chinese character forms as the primary visual medium. Use the simulator to make written language a physical substance — fragments, particles, blur, clarity transitions.
- **Do** keep Amber Lamp on ≤10% of any given screen. The lamp's rarity is its voice.
- **Do** use Noto Serif SC for headings, Noto Sans SC for Chinese body, Space Grotesk only for English/numeric labels. Three registers, three jobs.
- **Do** keep the simulator opt-in only. A neurotypical visitor must explicitly activate it. The default page is fully readable prose.
- **Do** test heading copy at every breakpoint. The viewport is part of the design; long display strings plus large clamp scales cause overflow.
- **Do** verify body text contrast ≥4.5:1 against its bg in both light and dark. Quiet Fog / Paper Fog muted-foreground tokens already clear the floor; new tokens must follow.
- **Do** use `text-wrap: balance` on h1–h3, `text-wrap: pretty` on long prose.
- **Do** ship every interactive element with a focus-visible state. The default `ring-primary/50 3px` ring is the minimum.
- **Do** cross-link a `prefers-reduced-motion` alternative for any animation. The `letterDance` and `clarify` keyframes must respect it.

### Don't

- **Don't** reach for SaaS landing-page scaffolding: no hero → features → pricing → CTA pattern. Sections are emotional beats, not slots.
- **Don't** use gradient text (`background-clip: text` + gradient background). Use solid color; emphasis via weight + size + solid spans only.
- **Don't** use glassmorphism or frosted-glass cards as decoration. The Navbar's `backdrop-blur-xl` is the existing structural exception; new surfaces do not extend the pattern.
- **Don't** repeat identical icon + heading + body card grids. Each card earns its own structure.
- **Don't** put tiny uppercase tracked eyebrows above every section heading. One deliberate English kicker per section is voice; repeating it across sections is AI grammar.
- **Don't** number sections (01 · 02 · 03) as default scaffolding. Numbers earn their place only when the sequence is the message (a real 3-step process, a typed timeline), not when "landing pages do this."
- **Don't** translate "warm" into a near-white cream body bg. Paper (L 0.97, chroma 0.012 toward the lamp's hue) is the only acceptable warm tint; warmer reads as cream/sand/parchment — the AI default.
- **Don't** use em dashes. Use commas, colons, semicolons, periods, parentheses.
- **Don't** use marketing buzzwords: streamline, empower, supercharge, leverage, unleash, transform, seamless, world-class, enterprise-grade, next-generation, cutting-edge, game-changer, mission-critical.
- **Don't** add new side-stripe borders (`border-left` or `border-right` > 1px as a colored accent). The Hero stat card uses `border-r-2 border-primary` as a pre-existing exception; new sections do not extend the pattern.
- **Don't** add `animate-bounce` or elastic easing. The Hero scroll cue uses `animate-bounce` as a pre-existing exception; new motion uses exponential ease-out (`cubic-bezier(0.23, 1, 0.32, 1)` or `ease-out-quart`).
- **Don't** use generic welcomes ("欢迎来到我们的网站") or CTA clichés ("点击了解更多"). Button labels are verb + object.
- **Don't** introduce new fonts beyond the three declared. Specifically don't reach for Inter, DM Sans, Space Mono, IBM Plex, Fraunces, Newsreader, Cormorant, Syne, or Outfit — all are saturated AI defaults.
- **Don't** auto-trigger the dyslexia simulator. A neurotypical visitor must always click to engage.