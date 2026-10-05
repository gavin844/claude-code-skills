---
name: web-motion-3d
description: How to put real motion and real 3D into a web app without it reading as generated. Jitter to Lottie (dotlottie-react, the Lottie Creator and LottieFiles MCPs), Vectary embeds and their free-tier limits, and 3D in React via React Three Fiber (Threlte is the Svelte equivalent, not usable in Next.js). Load whenever a build calls for animation, a 3D object, a hero that moves, loading motion, or any "make it feel next-generation" ask. Pairs with website-craft (which motion is a tell) and web-app-baseline.
user-invocable: true
argument-hint: "[lottie | 3d | vectary | audit]"
---

# Web motion and 3D: the pieces the user asked for, wired and honest

The user, 2026-09-06: *"I want you to use Vectory Thredel and Jitter 2 so ... make sure
they're ready available skills."* Those are **Vectary**, **Threlte** and **Jitter**.
This skill is the readiness: what each one is, what is installed, what needs his
account, and the recipe that ships.

Two rules from [[website-craft]] frame all of it. Motion is a **tell** when it is
generic (hover lift, sliding arrows, tells 23 and 24) and an **asset** when it shows
the product doing something. 3D is a **tell** when it is a decorative blob (radial
orb, tell 22) and an **asset** when it is a real object the user can read. Every
recipe below is for the asset case. If you cannot say what the motion tells the
user, do not add it.

---

## 1 · Jitter → Lottie → the app  (motion)

**What Jitter is.** A browser motion tool (jitter.video). No API and no MCP. It
exports **Lottie**, **dotLottie**, WebM/ProRes, GIF, APNG, and it will copy any
easing curve as **CSS**. It has a **Figma plugin**: design the frames in Figma,
animate in Jitter, export.

**Status 2026-09-06:** The user has a Jitter account and the Jitter Figma plugin
installed. The LottieFiles Creator MCP was tried and dropped the same day
("forget about the lottie one, it just isn't"): its bridge needs a logged-in
Creator tab kept open, and he did not want that dependency. Both Lottie MCPs are
removed from the user config. **The motion pipeline is Jitter only:** design in
Figma, animate in Jitter, export dotLottie, play it in the app. Do not reinstall
the Lottie MCPs without asking him.

**The recipe that ships (React / Next.js):**

```bash
npm i @lottiefiles/dotlottie-react   # 0.19.x, dotLottie + Lottie JSON, small runtime
```

```tsx
"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Motion({ src, loop = false }: { src: string; loop?: boolean }) {
  // Respect the OS setting. A user who asked for less motion gets the last frame.
  const reduce = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <DotLottieReact src={src} autoplay={!reduce} loop={loop && !reduce}
      style={{ width: "100%", height: "100%" }} />
  );
}
```

Rules:
- **Export dotLottie (`.lottie`) not JSON** when the file has raster assets; it is
  zipped and a fraction of the size.
- **Motion has a job.** A transition that explains a state change (bet placed,
  card settled, edge found) is a job. A hero that wiggles is not.
- **`prefers-reduced-motion` is not optional.** It is one of the 20 in
  [[web-app-baseline]].
- Easing: Jitter's CSS export gives the exact curve. Use it on the *same* element
  in code so the design and the build agree.
- Never autoplay looping motion inside a table of numbers. It fights the reading.

---

## 2 · 3D in React: React Three Fiber  (not Threlte)

**Threlte is Svelte-only.** Verified against its installation docs 2026-09-06:
`npm install three @threlte/core`, with `@threlte/extras`, `rapier`, `theatre`,
`xr`, `flex`, `gltf`, `studio`. Nothing in it runs under React. **The apps this was
written for are Next.js**, so Threlte is the wrong tool for them, and the right
tool is the same idea for React:

```bash
npm i three @react-three/fiber @react-three/drei     # three 0.185, r3f 9.7, drei 10.7
```

```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);          // a REAL object exported from Vectary/Blender
  return <primitive object={scene} />;
}

export function Scene({ url }: { url: string }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 40 }}>
      <Suspense fallback={null}>
        <Model url={url} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
```

Rules:
- **Dynamic-import the Canvas** (`next/dynamic`, `ssr: false`) and lazy-load it
  below the fold. A 3D hero that blocks first paint fails the baseline.
- `dpr` capped at 1.5. Retina at 2x on a full-bleed canvas melts laptops.
- **Ship a poster image** for reduced-motion and for the loading state. No dead
  black rectangle.
- If Threlte's ecosystem is the draw (Theatre.js timelines, Rapier physics), the
  React equivalents are `@react-three/rapier` and Theatre.js's own React bindings.
- Use Threlte **only** on a Svelte project. Then it is excellent.

---

## 3 · Vectary  (3D design and embeds)

**What it is.** Browser-based 3D design at vectary.com, publishes a scene as a
**live embed** that behaves like a 3D CMS: edit the scene, every embed updates.
No MCP. Its **API** (message layer into the iframe: click and scroll listeners,
configurator state, data in and out) is **Business plan only**.

**Free tier, verified on the pricing page 2026-09-06:** 5 projects, *private*
share links and "embed in web platforms". **Public sharing and embedding require
Pro AI or Business**, and the un-branded viewer is Business. So on the free tier
an embed works while we build and demo; a public production page needs Pro.

**Needs the user:** account at https://www.vectary.com (email or Google). Start free;
upgrade to Pro only when a public page actually embeds a Vectary scene.

**Recipe:**
1. Design or import the object in Vectary (it accepts GLB/GLTF/OBJ/STEP).
2. Two ways out, choose by need:
   - **Embed** (`Share → Embed`) when the scene needs Vectary's viewer features
     (AR, hotspots, configurator). Paste the iframe; it is a live link.
   - **Export GLB** and render it with React Three Fiber (section 2) when we want
     full control, no third-party iframe, no plan dependency. **Prefer this for a
     data-heavy app**: one fewer external runtime on a page full of numbers.
3. Either way the object must be something real: a card, a chip, a stadium seat,
   a ticket. Not a floating gradient shape. That is tell 22 with more polygons.

---

## 4 · Before you ship any of it

Run in this order, every time:
1. `node ~/.claude/skills/website-craft/scripts/detect.mjs <dir>`. Motion and 3D
   are the two places tells 22 to 25 come back in.
2. A performance audit (chrome-devtools or PageSpeed Insights) on the route with the Canvas or the
   Lottie. Main-thread time and LCP are the numbers; a 3D hero that costs 2s of
   LCP is not "next generation", it is slow.
3. Toggle `prefers-reduced-motion` in DevTools and look at the page. It must still
   be complete.

## What this skill will not do

It will not make a design good. It gets the motion and 3D pipeline connected and
keeps the two failure modes (generic motion, decorative 3D) from sneaking back in.
Taste is still the brief's.
