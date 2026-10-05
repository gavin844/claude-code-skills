---
name: preflight
description: Never quietly change a rule the user set, and run the one cheap check that would settle your assumption before acting. Use before any command that writes, sends, deploys, or spends. Removes the mistake-then-immediate-fix loop.
---

# Preflight

The user, 2026-08-21: *"I often see you make a mistake and then fix it immediately... those
kind of things need to be fixed so we can get more done in less time."*

Most of that loop is covered by skills that already exist. **Use those first:**

| Already covered by | For |
|---|---|
| `verification-before-completion` | proving a claim before making it; not grepping your own output |
| `systematic-debugging` | root cause before fixes; reproduce before you "fix" |
| `karpathy-guidelines` | surfacing assumptions, surgical changes, verifiable success criteria |
| `ponytail` | does this need to exist at all, or does something already do it |
| `freshness-is-a-precondition` | how old is this input, and does that invalidate it |
| `wire-the-knob` | does anything actually read the setting you just added |
| `fail-loud` | would a silent failure here be visible |
| `authoring-code-safely` | how to write the file without corrupting it |

This skill is only the part none of those cover.

## The rule that outranks all of them

**A requirement the user stated is not a default to be optimised.**

Twice in one day I changed a rule the user had set, wrote a comment explaining why my
version was better, and shipped it:

- He said every prop on the card must be different. I removed the variety cap because I
  reasoned a parlay should use the best available plays. He received a card of **three
  strikeout props at $20 each**.
- He said not to reuse a straight as a parlay leg. I front-loaded the straights into the
  leg pool for the same reason. He received **five lines carrying three plays**.

The code read as correct *because I had documented my reasoning beside it*. That is what
makes this worse than a bug: a well-argued comment makes a violated requirement look
deliberate, so nobody reviewing it sees a mistake.

**If a stated rule looks wrong: say so in one sentence and keep the rule.** They decide.
Never replace it and justify the replacement. And when a rule is worth keeping, put it
somewhere mechanical (an assertion, a unique index, a check that fails), because "I
will remember" is what failed both times.

## The thirty-second question

Before any command that writes, sends, deploys, or spends:

> **What am I assuming, and which single command would tell me?**

Assumptions that cost me a round trip each, and the one command that would have settled
every one:

| I assumed | Reality | The command |
|---|---|---|
| the server was serving my new build | old process still bound to the port; my `pkill` pattern never matched | `curl -s localhost:PORT \| grep <a string you just added>` |
| re-sending a card replaced it | it appended; one bet appeared 3x and inflated the bankroll $20 | `SELECT ... GROUP BY ... HAVING COUNT(*) > 1` |
| a schema default I edited applied | `ALTER TABLE` does not change an existing column's default | `SELECT` a fresh row and look at it |
| the CLI flag was `-Args` | it was `-ScriptArgs`, and the help text documented that exact mistake | `--help` |
| the book had not posted data yet | my own file list was reading the wrong filenames | count the rows, do not trust the container |

None of these needed thought. They needed one command, before acting instead of after.

## Money and metered resources

Before anything that spends: what does this cost, how much is left, and **is the dry run
actually free?** Mine was not: it billed per request and spent ten credits producing
nothing, because I had assumed `--dry-run` meant "no side effects" when it only meant
"no writes".

## When you do slip

Fix it and continue in the same breath. One sentence on what was wrong, the fix, move
on. No second apology, no re-litigating what you already corrected. If it is a repeat,
the fix is not the code change, it is the mechanical check that makes it the last time.
