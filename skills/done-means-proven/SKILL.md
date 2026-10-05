---
name: done-means-proven
description: Use before telling the user anything is done, fixed, working, shipped, deployed, or passing, and use at the start of any multi-step task to state what finished will look like. Defines what counts as evidence for a web page, a script, a scheduled job, a document, and a data change. Enforced by the done gate hook.
metadata:
  version: 1.0.0
---

# Done means proven

The user, 2026-09-18: "I will tell you to do something, and you'll say you're done. You've
done about maybe 70% of it. I tell you to fix it, and you say you're done. I tell you to
fix it again, and you say you're done. You're never actually done."

He is describing a specific failure, not impatience. The work reaches the point where
**I cannot see anything else wrong from where I am standing**, and I report that as
finished. The missing 30% is always in a place I did not look: the rendered page, the
second run, the other screen size, the log after the job actually fired.

**The fix is not trying harder. It is looking somewhere I was not looking.**

## The rule

**Evidence comes from outside the work.** Re-reading my own output and finding it good
is not evidence, it is the same judgement that produced it. A screenshot, an exit code,
a fetched URL, a database row, a second model's opinion: those are from outside.

The user's first look should never be the first look. It should be the fourth.

## State the finish line first

Before a multi-step task, say in one sentence what finished looks like **and how it
will be checked**. Not "improve the page": *"the queue page renders at 390 and 1280 in
both themes with no horizontal scroll, checked by screenshot."* Everything after that
is measured against it, including by me.

## What counts as evidence

| What I made | What proves it | Not evidence |
| :- | :- | :- |
| **A web page or UI** | A screenshot at 390 and 1280, in light and dark, actually looked at. Contrast measured with colours composited, not assumed | "the CSS looks right" |
| **A script or tool** | Its own run, pasted, on a real input. Plus one known-bad input if it is a guard or checker | "it should work" |
| **A code change** | The project's own check passing, named and run. The done gate runs this whether or not I do | "types are fine" |
| **A scheduled job** | It fired **on its own schedule** at least once, exit code read, log tail read. A manual run proves the script, never the schedule | "the task is registered" |
| **A deploy** | The live URL fetched, and the deployment behind the public host confirmed to be the new one. A 200 is not proof: the old build also returns 200 | "it deployed" |
| **A document or message** | The live URL opened and read back. Structure verified, not assumed, because a converter that silently drops a table still reports success | "the markdown was right" |
| **A data change** | The row read back from the database, as the role that will actually read it | "the insert ran" |
| **Anything subjective** (copy, design, a pitch) | A second opinion from a different angle. A skeptical reader, a beginner, the actual audience. Take what recurs, ignore what does not | "I think it reads well" |

## The loop

1. Say what done looks like and how it will be checked.
2. Build it.
3. **Check it the way the table says**, before saying anything to the user.
4. Fix everything that check found.
5. Check again. This pass catches what the fixes broke.
6. Report, and say what was checked and how.

## What to say when it is not proven

Say so plainly, in the first line, and say which part. "The page renders correctly at
both widths. I could not verify the cron fires on schedule; that takes until 8:30
tomorrow." That is a complete answer. A confident "done" that turns out to be 70% costs
him three more messages and the trust that the next "done" is real.

**Unverifiable is a legitimate outcome. Unverified and unmentioned is not.**

## The gate

`done_gate.py`, a Stop hook (not included in this repo), runs a project's own check when
files were written and refuses to let the turn end while it fails. It covers types and
syntax for the projects listed in its `done-gate.json` config.

It is a floor, not a ceiling. It cannot see a broken layout, a cron that never fires, a
document that lost a table, or a sentence that is wrong. Everything in the table above
is still mine to do.
