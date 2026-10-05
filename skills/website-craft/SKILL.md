---
name: website-craft
description: The 30 tells that make a site look vibecoded, with a runnable detector, plus the design tools worth reaching for (Magic MCP, Vectary, Threlte / React Three Fiber, Jitter). Use whenever building, restyling, reviewing or shipping any website, landing page, dashboard or app surface. Load BEFORE writing UI. Pairs with web-app-baseline (the 20 correctness checks); this skill is about whether it looks machine-made, that one is about whether it is finished.
user-invocable: true
argument-hint: "[detect <dir> | fix <id> | tools]"
---

# Website craft: do not ship a site that looks generated

The user, 2026-09-06: *"All 30 of these are things that make a website obviously
vibecoded, and that cant be the case for these websites."*

Two axes, two skills, and they do not overlap:

| | asks | skill |
|---|---|---|
| **Correctness** | is it finished and does it work | [[web-app-baseline]], the 20 |
| **Craft** | does it look like a person designed it | **this one**, the 30 |

A site can pass all 20 and still be instantly recognisable as generated. That is
what this skill is for.

---

## Run the detector first

```bash
node ~/.claude/skills/website-craft/scripts/detect.mjs <dir> [--json] [--only id,id] [--severity high]
```

It walks the tree, skips `node_modules`/`.next`/`public`, and prints `file:line`
per finding grouped by rule. Exit code 1 when anything HIGH is present, so it
gates a deploy.

Three severities, and the third is the honest one:

- **HIGH**: reads as machine-made on sight. Fix before ship.
- **MED**: contributes to the look. Fix when touching that surface.
- **LOOK**: *no regex can decide this.* Whether a testimonial is real, whether a
  demo exists, whether pricing matches what you sell. The detector points at the
  place; a human decides. It never auto-fails these, because a detector that
  pretends to judge them is lying and a lying detector gets switched off.

**Aggregate rules only fire when they saturate.** One `bg-white` card is a choice;
223 of them is the tell. `pure-white`, `uniform-radius`, `pastel` and `em-dash`
carry thresholds so a single deliberate use is not a finding.

---

## The 30

Numbers are the user's, in his order. "Instead" is the move, not just the ban.

### Colour and surface
1. **Harsh gradients**: two saturated stops from different hue families. *Instead:* single-hue ramp, near-tone shift, or flat fill.
2. **Lucide icons**: the default AI icon set. *Instead:* a set with a POV (Phosphor, Remix), or draw the handful you need.
3. **Pure white background**: `#fff` is the default nobody chose. *Instead:* warm or cool it (`#FAFAF8`, `#FCFCFD`) so the page has a temperature.
4. **Rainbow coloring**: 3+ hue families in one element. *Instead:* one accent, earn the second.
5. **Drop shadows**: generic elevation. *Instead:* hairline border, background step, or spacing.
6. **Purple and black** (20): the house palette of generated UI. *Instead:* a palette tied to the actual brand.
7. **Neon colors** (29): saturated cyan/lime/fuchsia. *Instead:* drop the chroma or change the hue.
8. **Basic pastel colors** (30): `-50`/`-100` on every chip. *Instead:* tint **plus** matching darker text, or go solid.

### Layout
9. **3 feature cards in a row** (6): the canonical AI landing block. *Instead:* break symmetry with different weights, a list, or prose that earns the space.
10. **Bento grids** (13): mixed-span mosaic for its own sake. *Instead:* the layout the content asked for.
11. **Colored left stripe** (11): thick accent border down a card edge. *Instead:* carry the accent in the type.
12. **Soft corner radius** (19): one `rounded-xl` on everything flattens hierarchy. *Instead:* vary radius by element weight, or commit to sharp.
13. **Radial orbs** (22): blurred circle behind the hero. *Instead:* delete it; let layout carry depth.
14. **Dot grids** (23): the default "techy" texture. *Instead:* flat ground or real material.
15. **Liquid glass** (8): `backdrop-blur` over translucent fill. *Instead:* opaque surface with real hierarchy.
16. **Terminal window** (14): traffic-light dots, fake `$` prompt. *Instead:* show the real product.

### Type and copy
17. **Inter / Geist / Space Grotesk** (10): the three fonts every generated site ships. *Instead:* a face with a voice, paired deliberately.
18. **Em dashes** (9): the clearest LLM tell in prose. *Instead:* two sentences, a colon, or parentheses. (Same rule as the house writing rules.)
19. **"It's not X, it's Y"** (15). *Instead:* say the thing directly.
20. **Emojis** (7): emoji as iconography reads as placeholder. *Instead:* real icons, or nothing.
21. **Sparkle icons** (24): the universal "AI" sticker. *Instead:* if it is AI, say what it does.
22. **Checkmark bullets** (16): green ticks down a feature list. *Instead:* plain list, or show the feature working.

### Motion
23. **Hover animations** (28): every card lifting 2px. *Instead:* reserve motion for things that actually change.
24. **Animated arrows** (25): chevron sliding on hover. *Instead:* let the label do the work.

### Substance: the ones that are about honesty, not taste
25. **Fake testimonials** (12): invented praise with a stock headshot. **Every quote needs a real attributable person or it comes out.**
26. **No real product demos** (18): a page asking for trust it has not earned. Ship a video, a screenshot, or an interactive demo.
27. **3 pricing tiers** (17): Good/Better/Best with a highlighted middle. Price what you actually sell.
28. **No TOS** (26) / **29. No privacy policy** (27): anything taking a signup or an email needs both, as real routes.
30. **No skeleton loaders** (21): a fetch with no skeleton is a white flash. Ship one that matches the real layout.

    *Next.js App Router:* the skeleton belongs in `loading.tsx` beside `page.tsx`,
    not inside the page, and a parent segment's `loading.tsx` covers its children.
    The detector walks up the tree and stays quiet when it finds one, so it will
    NOT flag a page covered only by a distant ancestor. That is correct about the
    white flash and blind to the thing worth checking next: **a skeleton shaped
    like a different page is its own fault.** It makes the layout jump when the
    real content lands, and for the half second it is up it tells the reader they
    are somewhere they are not. Look at the skeleton beside the page it stands in
    for; no rule can do that part.

---

## Design tools wired up

The user asked for these on 2026-09-06. Only one is an MCP; the rest are resources.

| Tool | What it is | How to use it |
|---|---|---|
| **Magic UI** (magicui.design) | MCP, user scope, **connected 2026-09-06** (`npx -y @magicuidesign/mcp@latest`) | 150+ animated React/Tailwind/Motion components: text animations, beams, particles, backgrounds, marquees, docks, device mocks. This is the "Magic UI" the user asked for. Use it for motion and texture, then run the detector: several of its stock pieces (dot grids, bento, terminals, sparkles) ARE tells 13, 14, 21, 23. Pick the ones that fit the brief. |
| **Magic** (21st.dev) | MCP, project scope, connected | `mcp__magic__*`: a different product: generates whole components from a description. Good first draft of a layout; never ship its output unaudited. |
| **Vectary**, **Threlte / React Three Fiber**, **Jitter → Lottie** | 3D and motion pipeline | Full recipes, free-tier limits, account steps and the installed Lottie MCPs (`lottie-creator`, `lottiefiles`) live in **[[web-motion-3d]]**. Short version: Vectary free tier is private embeds only (public needs Pro), so prefer exporting GLB and rendering with React Three Fiber; Threlte is Svelte-only; Jitter has no API, export dotLottie and play it with `@lottiefiles/dotlottie-react`. |

Also already available: `chrome-devtools` MCP (measure the real rendered page),
`firecrawl` (pull a reference site), `impeccable` (58 complementary detector
rules; run it too, it catches easing, contrast and broken-image issues this
detector does not).

---

## Order of work

1. `detect.mjs` on the tree. Fix HIGH first, and read the LOOK items yourself.
2. `npx impeccable detect <dir>` for the overlapping craft rules.
3. [[web-app-baseline]] for the 20 correctness checks; a browser is required for
   most of them; a screenshot at 1280px and 390px catches the bulk.
4. Screenshot the result and look at it before saying it is done
   (look at it before shipping, every time).

## What this skill will not do

It will not tell you a design is good. It removes the tells that make a design
look unauthored; taste is still yours. When the brief calls for one of these
deliberately (a terminal window on a developer tool, a glass panel because the
brand is glass), the brief wins. Note the exception and move on.
