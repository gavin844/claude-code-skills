---
name: web-app-baseline
description: The 20 checks every web app must pass before it is called done, plus the measurement commands that prove it. Use whenever building, styling, theming or shipping any rendered surface - a page, a dashboard, an artifact, a landing page. Load BEFORE writing UI, not after the user finds the bug. Pairs with website-craft (the 30 vibecoded tells and its detector).
---

# Web app baseline

> **Companion skill: [[website-craft]].** This file asks *is it finished and
> correct*. That one asks *does it look machine-generated*, carries the user's 30
> tells, and ships a runnable detector. A surface needs both; passing all 20 here
> and still looking generated is a real and common outcome.

**The user should never have to ask for these again.** He listed them once, I wrote them
into a project rules file, and that file was referenced by nothing, so
it loaded on no project and changed nothing. A standard that does not load is a
document, and this is the `wire-the-knob` failure in its purest form.

This is a skill so it applies everywhere, on every repo.

---

## The 20

### Structure and entry points

1. **Custom 404.** Not the framework default. Says what happened, links to a real
   starting point. Next.js: `app/not-found.tsx`.
2. **Custom error state.** An uncaught render error shows a designed page with a way
   to recover, never a stack trace or a blank screen. `app/error.tsx`.
3. **Loading states.** Any route that fetches shows a skeleton, never a dead white
   screen. Buttons that trigger work show a pending label and disable.
4. **Empty states.** Every list, table and dashboard tile says something useful with
   no data. "No candidates yet" plus the action that creates one, never a bare box
   and never an invented number.
5. **A real title per route.** Never one app-wide title repeated. Client components
   cannot export metadata, so the section `layout.tsx` carries it.
6. **Meta description and Open Graph, INCLUDING the image.** Declaring `openGraph`
   with no image file means every link he sends arrives as bare text. Next.js:
   `app/opengraph-image.tsx` generates it at the edge, so there is no binary to keep
   in sync with the brand.
7. **Favicon and app icon** at every size, plus `apple-touch-icon`.

### Behaviour

8. **Every interactive element has hover, focus, active and disabled states.** A
   control that looks identical before and after a pointer reaches it is broken even
   when the href works.
9. **Keyboard reachable.** Tab order follows visual order, focus always visible.
   `:focus-visible`, never `outline: none`.
10. **Forms validate before submitting**, and say what is wrong next to the wrong
    field, in words a person can act on.
11. **Destructive actions confirm**, and the confirm names the specific thing.
12. **No dead ends.** Every screen has a way forward and a way back. Also: no `href`
    of `#`, and no tap target under 44px on anything reachable from a phone.

### Correctness

13. **Responsive from 360px up.** No horizontal body scroll at any width. Wide
    content scrolls inside its own container.
14. **Contrast passes AA** on the COMPOSITED colour, 4.5:1 body and 3:1 large.
15. **Images have alt text**, decorative ones `alt=""`, nothing depends on colour
    alone.
16. **No console errors** on any route in a production build.
17. **No placeholder content.** No lorem, no "Coming soon", no dummy rows presented
    as real data.

### Proof

18. **Every claim in the UI is true.** If a panel says "runs automatically", the job
    exists and is enabled. A dashboard here once asserted "fully automatic" about
    disabled tasks, and badged a "Play of the Day" on a day the engine printed NO
    LOCK.
19. **Actually deployed, and verified at the public URL.** Pushed is not shipped.
20. **Clean URLs.** Short, guessable, no personal names, no build hashes, no
    `-git-branch-username` suffixes.

---

## Themes: the part that keeps biting

A viewer is in one of **three** states, not two. An explicit choice stamps
`data-theme="dark"` or `"light"`; the default stamps **nothing**, and there only
`prefers-color-scheme` decides. So:

- bare `:root` carries the **complete** light palette
- `@media (prefers-color-scheme: dark)` redefines the variables only, guarded
  `:root:not([data-theme="light"])`
- `:root[data-theme="dark"]` redefines them again so the toggle wins both ways

**Never define a colour solely inside a media or `[data-theme]` block.** It will not
apply in the unstamped state, which is where most viewers are.

**`body` must set an explicit background from a variable.** A transparent body borrows
the host's ground. This shipped: `<body className="bg-gray-50">` painted over a full
dark palette underneath and none of it was ever visible.

**Re-pick the accent for dark, do not reuse it.** A colour chosen to carry on paper
goes muddy on a dark ground. A forest green measured 2.1:1 and had to become a sage.

**Text on the accent must flip with the accent.** White-on-accent works when the
accent is dark; in dark mode the accent is lifted for legibility, so white-on-accent
fell to 2.24:1. Use an `--on-accent` variable.

**Composite before measuring.** `bg-white/60` over a dark ground composites to a mid
grey that fails against BOTH the light and dark text on it. Mapping `.bg-white`
misses it: the alpha variant is its own class and the slash needs escaping.

---

## Measure it, do not look at it

    node tools/ui_check.js <url> <tag>    # both themes, composited contrast,
                                          # invisible text, overflow, console errors
    node tools/ux_audit.js <url> <tag>    # tap sizes, accessible names, dead links,
                                          # keyboard reach, real hover

(Two Playwright harnesses from the workspace's `tools/` directory; not included in this
repo. The comments list what each one measures.)

Both are read-only by construction: mutating endpoints are aborted at the network
layer, because an earlier screenshot script matched a control by text, caught the
neighbouring "+ I took it" buttons, and marked bets as placed that the user had not
placed.

**Two harness bugs worth knowing, because both reported the opposite of the truth:**

- It tested "dark" by REMOVING `data-theme` and trusting `prefers-color-scheme`, but
  Playwright defaults to light, so both passes rendered light and it called a
  working dark mode broken. Emulate `colorScheme`.
- It measured hover by dispatching a synthetic `mouseover`, which **cannot** trigger
  CSS `:hover`. It reported "hover missing on 12/12" on a page where every button
  had hover styles. Use a real pointer, or read the stylesheets.

A check with false positives is worse than no check: it trains everyone to ignore it.
The first line-band guard flagged 77,900 valid soccer rows and had to be rewritten.

---

## Order of work

1. Load this file and the project's house style rules, if it has any, before
   writing UI.
2. Build.
3. Run both harnesses on every surface, in both themes.
4. Fix what they find.
5. Only then say it is done; see `verification-before-completion`.
