---
name: midwork-triggers
description: Load the skill that matches the situation you are IN, not the words the user used. Use when about to add a guard, automate a browser, ship a UI change, add a constant, or explain a zero. The router fires on his prompt; these failures happen hours later inside the work.
---

# Mid-work triggers

**The instructions already existed. On 2026-08-30 I broke seven things, and every one
had a skill written for it that I never loaded.**

That is not a gap in the library. It is a routing failure. The skill router fires on
what the user *types*, and it is good at that. But he does not type "I am about to add a
guard instead of finding the bug." That decision happens two hours into the work,
which is exactly when nothing is watching.

So this file is keyed on **what I am about to do**, not on what he said.

---

## The table

| The moment I notice myself... | Load | The 08-30 failure |
|---|---|---|
| about to add a cap, band, assert or retry because output looked wrong | `locate-before-you-guard` | Banded `model_game` and `model_f5` against mislabelled lines and called it fixed. The **writer** was still filing football totals as MLB, 5,104 rows a week. The guard read as a fix and hid the cause for another six hours. |
| explaining why something returned zero | `fail-loud` | "0 candidates" looks identical to "no edges today". College football needed FOUR fixes (mascots, short names, accents, a sort filing today's lines against next week) and every one presented as a quiet, plausible zero. |
| writing a script that opens a browser on his sportsbook or dashboard | `user-state-is-sacred` | A screenshot script matched "tap for legs" by text, caught the neighbouring **"+ I took it"** buttons, and marked three straights and a parlay as placed that he had not placed. His standing rule is that nothing enters the record until he clicks it. |
| about to regenerate, rebuild or re-render anything | `user-state-is-sacred` | A card rebuild replaced picks he had already bet. Two of those games had started, so the real wagers were unrecoverable from the card alone. |
| adding a constant, threshold or new module | `wire-the-knob` | Built `pending_slip.js` to read his bet slip, shipped it, and **nothing consumed the file**. The reader existed; the reconciliation did not. Half a feature reads as a whole one. |
| reading a cached file, capture, price or rating | `freshness-is-a-precondition` | Priced a card off odds captured ten days earlier and quoted an 18.5% edge on a line the board no longer showed. Separately: 12-day-old knowledge graph, stale intel silently dropping every strikeout prop. |
| about to say done, fixed, working, or verified | `verification-before-completion` | Shipped `var(--card,#fff)` after screenshotting **one** theme. The page defaults to dark. He opened it to white slabs on near-black and said it hurt to look at. |
| ranking, sorting or picking a top-N | `enumerate-before-ranking` | Sorted the card purely by grade and got five strikeout unders, then did the same to the value list and went 2-for-7 with half of it in one market. |

---

## Two habits that would have caught most of it

**Absence of an error is not evidence of correctness.** Six of the seven presented as
clean, confident output: a zero, a push, a green screenshot, a written file. Nothing
threw. The question to ask is not "did it fail?" but **"what would this look like if
it were broken?"**, and if the answer is "exactly like this", go check.

**When two sources disagree, name the authority before reconciling.** His sportsbook against
my ledger, the box score against my grade, the rendered page against my intent. Every
time I derived instead of read, the derived number was the wrong one. The book, the
box score, and the browser are facts. Everything I compute is an estimate of them.

---

## What this is not

Not a replacement for the router, which handles his prompts well. Not a checklist to
recite. The trigger column is the whole point: recognise the moment, load the one
file, move on.
