#!/usr/bin/env node
/**
 * detect.mjs: the 30 vibecoded tells, plus the structural checks from
 * web-app-baseline that a static scan can actually prove.
 *
 * The user, 2026-09-06: "All 30 of these are things that make a website obviously
 * vibecoded, and that cant be the case for these websites."
 *
 * WHY THIS IS A SCRIPT AND NOT A CHECKLIST. A checklist in a markdown file is a
 * document; it loads on no project and changes nothing (the same wire-the-knob
 * failure that put web-app-baseline into a skill in the first place). A detector
 * runs, prints file:line, and can gate a deploy.
 *
 * HONESTY ABOUT WHAT A GREP CAN KNOW. Three of the thirty are judgement calls no
 * regex settles: whether a testimonial is fake, whether a demo is real, whether a
 * claim is true. Those are reported as REVIEW items pointing at the exact places a
 * human has to look, never as pass/fail. A detector that pretends to decide them
 * would be lying, and a lying detector gets switched off.
 *
 * Usage:
 *   node detect.mjs <dir> [--json] [--only <id,id>] [--severity high|all]
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const roots = args.filter((a) => !a.startsWith("--"));
const JSON_OUT = args.includes("--json");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx > -1 ? new Set((args[onlyIdx + 1] || "").split(",")) : null;
const sevIdx = args.indexOf("--severity");
const SEVERITY = sevIdx > -1 ? args[sevIdx + 1] : "all";

if (!roots.length) {
  console.error("usage: node detect.mjs <dir> [--json] [--only id,id] [--severity high]");
  process.exit(64);
}

const SKIP_DIR = new Set([
  "node_modules", ".next", ".git", "dist", "build", ".vercel", "out",
  "coverage", ".turbo", "graphify-out", ".cache", "public",
]);
const CODE_EXT = new Set([".tsx", ".jsx", ".ts", ".js", ".css", ".scss", ".html", ".mdx", ".svelte", ".vue"]);

/**
 * A file whose strings a visitor can actually read.
 *
 * COPY RULES MUST NOT SCAN PROMPTS. A hiring app's API route files hold LLM
 * prompt templates and output sanitizers, so the em-dash rule scored 331 hits
 * whose top four were a prompt line reading `- No em dashes` (a prompt ENFORCING
 * this rule) and a `.replace(...)` call (the sanitizer that strips them). Flagging the
 * code that fixes a problem as the problem is how a detector loses its reader.
 */
function isUiFile(f) {
  if (!/\.(tsx|jsx|mdx|html|svelte|vue)$/.test(f)) return false;
  return !/[\\/](api|prompts?|server)[\\/]/.test(f);
}

/** Walk a directory, returning code files only. */
function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIR.has(e.name) && !e.name.startsWith(".")) walk(p, out);
    } else if (CODE_EXT.has(path.extname(e.name))) {
      out.push(p);
    }
  }
  return out;
}

// ── the rules ────────────────────────────────────────────────────────────────
// Each: id, title, why (what to do instead), sev, and either `line` (per-line
// regex) or `file` (whole-file function returning [{line, note}]).
//
// `sev` high = it reads as machine-made on sight. med = it contributes to the
// look. review = a human must judge; never auto-failed.

const RULES = [
  {
    id: "harsh-gradient", n: 1, sev: "high",
    title: "Harsh gradient",
    why: "Two saturated stops from different hue families. Use a single-hue ramp, a near-tone shift, or a flat fill.",
    line: /(?:bg|from)-gradient|bg-gradient-to-[a-z]{1,2}\b|linear-gradient\(/i,
    refine: (l) => {
      // only flag when two *saturated* stops of different families collide
      const stops = [...l.matchAll(/(?:from|via|to)-([a-z]+)-(\d{3})/g)];
      if (stops.length < 2) return false;
      const fams = new Set(stops.filter(([, , w]) => +w >= 400).map(([, f]) => f));
      return fams.size >= 2;
    },
  },
  {
    id: "lucide", n: 2, sev: "high",
    title: "Lucide icons",
    why: "The default AI icon set. Use a set with a point of view (Phosphor, Remix, custom SVGs), or draw the few you need.",
    line: /from\s+["']lucide-react["']|from\s+["']lucide["']/,
  },
  {
    id: "pure-white", n: 3, sev: "high",
    title: "Pure white background",
    why: "#fff is the default nobody chose. Warm or cool it a few points (#FAFAF8, #FCFCFD) so the page has a temperature.",
    line: /(?:bg-white\b(?![/\s]*\d))|background(?:-color)?:\s*(?:#fff(?:fff)?\b|white\b)/i,
    refine: (l) => !/\/\d{1,3}\b/.test(l),  // bg-white/10 is a glass tint, rule 8
    aggregate: 20,   // one white card is fine; a white everything is the tell
  },
  {
    id: "rainbow", n: 4, sev: "high",
    title: "Rainbow coloring",
    why: "Three or more hue families in one element. Pick one accent and earn a second.",
    line: /(?:from|via|to)-[a-z]+-\d{3}/,
    refine: (l) => {
      const fams = new Set([...l.matchAll(/(?:from|via|to)-([a-z]+)-\d{3}/g)].map((m) => m[1]));
      return fams.size >= 3;
    },
  },
  {
    id: "drop-shadow", n: 5, sev: "med",
    title: "Drop shadow",
    why: "Generic elevation. Separate with a hairline border, a background step, or spacing before reaching for shadow.",
    line: /\bshadow-(?:md|lg|xl|2xl)\b|\bdrop-shadow-(?:md|lg|xl|2xl)\b|box-shadow:\s*0\s+\d/,
  },
  {
    id: "three-cards", n: 6, sev: "high",
    title: "Three feature cards in a row",
    why: "The canonical AI landing block. Break the symmetry: different sizes, a list, or prose that earns its space.",
    line: /grid-cols-3\b|md:grid-cols-3\b|lg:grid-cols-3\b/,
  },
  {
    id: "emoji", n: 7, sev: "high",
    title: "Emoji in the UI",
    why: "Emoji as iconography reads as a placeholder. Use real icons or nothing.",
    line: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u,
    refine: (l, f) => isUiFile(f) && !/^\s*(?:\/\/|\*|#)/.test(l),
  },
  {
    id: "liquid-glass", n: 8, sev: "high",
    title: "Liquid glass / frosted panel",
    why: "backdrop-blur over a translucent fill was 2024's default. Use an opaque surface with real hierarchy.",
    line: /backdrop-blur|backdrop-filter:\s*blur/,
  },
  {
    id: "em-dash", n: 9, sev: "high",
    title: "Em dash in copy",
    why: "The single clearest LLM tell in prose. Two sentences, a colon, or parentheses.",
    line: /[\u2014\u2013]/,
    refine: (l, f) => isUiFile(f)
      && !/^\s*(?:\/\/|\*)/.test(l)
      && !/\.replace\(|RegExp|\/g[,)]/.test(l),   // the sanitizer is the fix
    aggregate: 3,
  },
  {
    id: "default-font", n: 10, sev: "high",
    title: "Inter / Geist / Space Grotesk",
    why: "The three fonts every generated site ships. Pick a face with a voice and pair it deliberately.",
    line: /\b(?:Inter|Geist|Space[\s_-]?Grotesk)\b/i,
  },
  {
    id: "left-stripe", n: 11, sev: "high",
    title: "Colored left stripe",
    why: "A thick accent border down one edge of a card. Remove it, or carry the accent in the type.",
    line: /border-l-(?:2|4|8)\b|border-left:\s*(?:2|3|4|5|6|8)px/,
  },
  {
    id: "fake-testimonial", n: 12, sev: "review",
    title: "Testimonial: verify it is real",
    why: "Invented praise with a stock headshot is the fastest way to lose trust. Every quote needs a real, attributable person or it comes out.",
    line: /testimonial|"[^"]{20,}"\s*[,-]\s*(?:CEO|CTO|Founder|Director|Manager)\b/i,
  },
  {
    id: "bento", n: 13, sev: "med",
    title: "Bento grid",
    why: "Mixed-span tile mosaic. Use a layout the content asked for.",
    line: /bento|(?:col-span-2[\s\S]{0,80}row-span-2)|(?:row-span-2[\s\S]{0,80}col-span-2)/i,
  },
  {
    id: "terminal", n: 14, sev: "med",
    title: "Fake terminal window",
    why: "Traffic-light dots and a fake prompt. Show the real product instead.",
    line: /(?:bg-(?:red|yellow|green)-500[\s\S]{0,60}rounded-full[\s\S]{0,120}bg-(?:red|yellow|green)-500)|(?:\$\s+(?:npm|npx|yarn|pnpm|curl|git)\s)/,
  },
  {
    id: "not-x-but-y", n: 15, sev: "high",
    title: '"It\'s not X, it\'s Y"',
    why: "Say the thing directly.",
    line: /(?:it'?s|this is|that'?s)\s+not\s+(?:just\s+)?[\w\s]{2,28}[.,]?\s*(?:it'?s|it&apos;s)\s/i,
    refine: (l, f) => isUiFile(f),
  },
  {
    id: "check-bullets", n: 16, sev: "med",
    title: "Checkmark bullets",
    why: "Green ticks down a feature list. Plain list, or show the feature.",
    line: /[✓✔✅]|<Check(?:Circle|Circle2|Icon)?\b|"check(?:-circle)?"/,
  },
  {
    id: "three-tiers", n: 17, sev: "review",
    title: "Three pricing tiers: verify they match real packaging",
    why: "Good/Better/Best with a highlighted middle is the default shape. Price what you actually sell.",
    line: /(?:pricing|tier|plan)[\s\S]{0,200}(?:most\s+popular|recommended)/i,
  },
  {
    id: "no-demo", n: 18, sev: "review",
    title: "Product demo: verify one exists",
    why: "A marketing page with no video, screenshot, or interactive demo is asking for trust it has not earned.",
    file: (src, f) => {
      if (!/page\.(t|j)sx?$/.test(f)) return [];
      if (!/hero|landing|marketing/i.test(src) && !/^.*[\\/]app[\\/]page\./.test(f)) return [];
      const hasDemo = /<video|<Image|<img|\.mp4|\.webm|Demo|Screenshot|<canvas/i.test(src);
      return hasDemo ? [] : [{ line: 1, note: "no <video>, <Image>, or demo component on this page" }];
    },
  },
  {
    id: "uniform-radius", n: 19, sev: "med",
    title: "Soft corner radius everywhere",
    why: "One rounded-xl on every surface flattens hierarchy. Vary radius by element weight, or commit to sharp.",
    line: /rounded-(?:lg|xl|2xl|3xl)\b/,
    aggregate: 12,   // only reported when it saturates the codebase
  },
  {
    id: "purple-black", n: 20, sev: "high",
    title: "Purple and black",
    why: "The house palette of generated UI. Choose a palette tied to the brand.",
    line: /\b(?:purple|violet|indigo|fuchsia)-(?:4|5|6|7|8|9)\d{2}\b/,
  },
  {
    id: "no-skeleton", n: 21, sev: "high",
    title: "No skeleton loader",
    why: "A fetch with no skeleton is a white flash. Ship a skeleton that matches the real layout.",
    file: (src, f) => {
      if (!/\.(t|j)sx$/.test(f)) return [];
      const fetches = /useSWR|useQuery|fetch\(|await\s+get|loading|isLoading|isPending/.test(src);
      const skeleton = /skeleton|shimmer|animate-pulse|<Spinner|Loading\.\.\./i.test(src);
      // NEXT.JS PUTS THE SKELETON IN A SIBLING FILE, NOT IN THE PAGE. In the App
      // Router a route's pending UI is `loading.tsx` beside `page.tsx`, or in any
      // parent segment, and the framework wires it up as a Suspense boundary. A
      // per-file rule cannot see that, so it reported "no skeleton" on pages that
      // have one, and the only way to satisfy it was to put a spinner where the
      // framework does not want one. Checked against the filesystem rather than
      // guessed: a real loading file beside the page, or above it, answers it.
      if (fetches && !skeleton && /(^|[\\/])page\.(t|j)sx$/.test(f)) {
        let dir = path.dirname(f);
        for (let up = 0; up < 6; up += 1) {
          const has = ["loading.tsx", "loading.jsx", "loading.ts", "loading.js"]
            .some((n) => fs.existsSync(path.join(dir, n)));
          if (has) return [];
          const parent = path.dirname(dir);
          if (parent === dir) break;
          dir = parent;
        }
      }
      if (fetches && !skeleton) {
        const m = src.split("\n").findIndex((l) => /useSWR|useQuery|isLoading|isPending/.test(l));
        return [{ line: m + 1 || 1, note: "fetches data, no skeleton/pending UI found in this file" }];
      }
      return [];
    },
  },
  {
    id: "radial-orb", n: 22, sev: "high",
    title: "Radial orb / glow blob",
    why: "An absolutely-positioned blurred circle behind the hero. Delete it; let the layout carry the depth.",
    line: /blur-(?:2xl|3xl)\b|radial-gradient\(circle/,
  },
  {
    id: "dot-grid", n: 23, sev: "med",
    title: "Dot grid background",
    why: "The default 'techy' texture. Use a flat ground or real material.",
    line: /radial-gradient\([^)]*\)\s*(?:0\s+0\s*\/|;?\s*background-size)|bg-\[radial-gradient|dot-?(?:grid|pattern)/i,
  },
  {
    id: "sparkle", n: 24, sev: "high",
    title: "Sparkle icon",
    why: "The universal 'AI' sticker. If the feature is AI, say what it does.",
    line: /\bSparkles?\b|[✨✧]/,
  },
  {
    id: "animated-arrow", n: 25, sev: "med",
    title: "Arrow that slides on hover",
    why: "group-hover:translate-x on a chevron. Let the label do the work.",
    line: /group-hover:translate-x|hover:translate-x/,
  },
  {
    id: "no-tos", n: 26, sev: "high",
    title: "No terms of service",
    why: "A product taking signups needs terms. Add a real /terms route.",
    project: (files) => !files.some((f) => /[\\/](terms|tos|terms-of-service)[\\/]?(page|index)?\.(t|j)sx?$/i.test(f)),
  },
  {
    id: "no-privacy", n: 27, sev: "high",
    title: "No privacy policy",
    why: "Anything collecting a name or email needs one. Add a real /privacy route.",
    project: (files) => !files.some((f) => /[\\/]privacy(?:-policy)?[\\/]?(page|index)?\.(t|j)sx?$/i.test(f)),
  },
  {
    id: "hover-lift", n: 28, sev: "med",
    title: "Hover lift / scale animation",
    why: "Every card rising 2px on hover. Reserve motion for things that actually change.",
    line: /hover:scale-|hover:-translate-y|hover:shadow-(?:lg|xl|2xl)/,
  },
  {
    id: "neon", n: 29, sev: "high",
    title: "Neon color",
    why: "Saturated cyan/lime/fuchsia on dark. Lower the chroma or change the hue.",
    // emerald is NOT here on purpose. It is the conventional success colour, and
    // including it made 56 of a hiring app's status chips ("bg-emerald-50 text-emerald-900",
    // a hired badge) read as neon. A rule that flags the standard success chip
    // teaches the reader to skim past the rule.
    line: /\b(?:cyan|lime|fuchsia)-(?:400|500)\b|#(?:0ff|00ffff|0f0|00ff00|f0f|ff00ff)\b/i,
  },
  {
    id: "pastel", n: 30, sev: "med",
    title: "Basic pastel fills",
    why: "The -50/-100 tint on every status chip. Use tint plus a matching darker text, or a solid.",
    line: /\bbg-[a-z]+-(?:50|100)\b/,
    aggregate: 10,
  },
];

// ── structural checks carried over from web-app-baseline (the 20) ────────────
// Only the ones a static scan can actually prove. The rest stay in that skill,
// where they belong, because they need a running browser.
const STRUCTURAL = [
  { id: "no-404", title: "No custom 404", why: "Add app/not-found.tsx.",
    test: (files) => !files.some((f) => /not-found\.(t|j)sx?$/.test(f)) },
  { id: "no-error-boundary", title: "No error boundary page", why: "Add app/error.tsx.",
    test: (files) => !files.some((f) => /[\\/]error\.(t|j)sx?$/.test(f)) },
  { id: "no-loading", title: "No route loading state", why: "Add loading.tsx to fetching routes.",
    test: (files) => !files.some((f) => /[\\/]loading\.(t|j)sx?$/.test(f)) },
  { id: "no-og-image", title: "No Open Graph image", why: "Add opengraph-image or og:image metadata.",
    test: (files, srcs) => !files.some((f) => /opengraph-image|twitter-image/.test(f))
      && !srcs.some((s) => /openGraph|og:image/.test(s)) },
  { id: "no-favicon", title: "No favicon / app icon", why: "Add app/icon.png and apple-icon.png.",
    test: (files) => !files.some((f) => /(favicon\.ico|[\\/]icon\.(png|svg|tsx)|apple-icon)/.test(f)) },
];

// ── run ──────────────────────────────────────────────────────────────────────
const findings = [];
const counts = new Map();
let allFiles = [];
const allSrc = [];

for (const root of roots) {
  const files = walk(path.resolve(root));
  allFiles = allFiles.concat(files);

  for (const file of files) {
    let src;
    try {
      src = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    allSrc.push(src);
    const lines = src.split("\n");

    for (const rule of RULES) {
      if (ONLY && !ONLY.has(rule.id)) continue;
      if (rule.project) continue;

      if (rule.file) {
        for (const hit of rule.file(src, file)) {
          findings.push({ file, line: hit.line, rule, note: hit.note });
        }
        continue;
      }
      lines.forEach((text, i) => {
        if (!rule.line.test(text)) return;
        if (rule.refine && !rule.refine(text, file)) return;
        const rec = { file, line: i + 1, rule, note: text.trim().slice(0, 100) };
        if (rule.aggregate) {
          counts.set(rule.id, (counts.get(rule.id) || 0) + 1);
          if (!findings.some((f) => f.rule.id === rule.id)) findings.push(rec);
        } else {
          findings.push(rec);
        }
      });
    }
  }
}

// drop aggregate rules that never saturated
const kept = findings.filter((f) => {
  if (!f.rule.aggregate) return true;
  return (counts.get(f.rule.id) || 0) >= f.rule.aggregate;
});

// project-wide rules
for (const rule of RULES) {
  if (!rule.project) continue;
  if (ONLY && !ONLY.has(rule.id)) continue;
  if (rule.project(allFiles)) kept.push({ file: roots[0], line: 0, rule, note: "not found anywhere in the tree" });
}
for (const s of STRUCTURAL) {
  if (ONLY && !ONLY.has(s.id)) continue;
  if (s.test(allFiles, allSrc)) {
    kept.push({ file: roots[0], line: 0, note: "missing", rule: { ...s, sev: "high", n: "B" } });
  }
}

const order = { high: 0, med: 1, review: 2 };
const shown = kept
  .filter((f) => SEVERITY !== "high" || f.rule.sev === "high")
  .sort((a, b) => order[a.rule.sev] - order[b.rule.sev] || String(a.rule.n).localeCompare(String(b.rule.n)));

if (JSON_OUT) {
  console.log(JSON.stringify(
    shown.map((f) => ({
      id: f.rule.id, n: f.rule.n, sev: f.rule.sev, title: f.rule.title,
      file: f.file, line: f.line, note: f.note, why: f.rule.why,
    })), null, 2));
} else {
  const byRule = new Map();
  for (const f of shown) {
    if (!byRule.has(f.rule.id)) byRule.set(f.rule.id, []);
    byRule.get(f.rule.id).push(f);
  }
  const LABEL = { high: "HIGH", med: "MED ", review: "LOOK" };
  for (const [, group] of byRule) {
    const r = group[0].rule;
    const total = counts.get(r.id) || group.length;
    console.log(`\n[${LABEL[r.sev]}] ${r.n}. ${r.title}  (${total} hit${total === 1 ? "" : "s"})`);
    console.log(`       ${r.why}`);
    for (const f of group.slice(0, 4)) {
      const loc = f.line ? `${path.relative(process.cwd(), f.file)}:${f.line}` : path.relative(process.cwd(), f.file);
      console.log(`       ${loc}${f.note ? "  " + String(f.note).slice(0, 76) : ""}`);
    }
    if (group.length > 4) console.log(`       ...and ${group.length - 4} more`);
  }
  const h = shown.filter((f) => f.rule.sev === "high").length;
  const m = shown.filter((f) => f.rule.sev === "med").length;
  const rv = shown.filter((f) => f.rule.sev === "review").length;
  console.log(`\n${shown.length} finding(s) across ${byRule.size} rule(s): ${h} high, ${m} medium, ${rv} to review by hand.`);
  console.log(`Scanned ${allFiles.length} file(s).`);
}

process.exit(shown.some((f) => f.rule.sev === "high") ? 1 : 0);
