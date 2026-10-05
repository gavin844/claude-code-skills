---
name: save-the-script
description: Use when writing a script, or when about to write one that resembles something written before, or when the user says reuse, do not rewrite, regenerate, you wrote this before, or every time you. Turns a working one-off into a tool a future session runs instead of reinventing. Also use before writing any throwaway in a scratch directory.
metadata:
  version: 1.0.0
---

# Save the script

The user, 2026-09-18: "I build out so much code, but you need to actually figure... you
need to be able to resort to that code and not have to run it all again." Partly a
time cost, partly a context cost: the same code regenerated is paid for twice.

Anthropic's skills team describes the same practice as saving a script inside the skill
as **a tool for its future self**. Developers have called it don't repeat yourself for
forty years. The AI-specific version is worse than the classic one, because a
regenerated script is not just wasted work: it comes back **slightly different every
time**, so the output drifts and nobody can tell whether the change was intentional.

## The rule

**Before writing a script, look for it. After writing one that worked, save it.**

Neither half is optional. The first half is one search. The second half is thirty
seconds. The alternative has already cost this workspace a markdown-to-Google-Docs
converter three times over.

## Before you write

1. Search `~/.claude/skills/*/scripts/` and the project's `tools/` and `scripts/`
   directories for the verb you are about to implement (render, screenshot, convert,
   scrape, diff, post, upload).
2. Search the current session's scratchpad. A script written earlier in the same
   conversation is the one most often rewritten.
3. If something close exists, **run it and read its output** before deciding it does
   not fit. "Close enough with a flag added" beats a fresh file almost every time.

## After it works

A script earns a permanent home when **any** of these is true:

- it will plausibly run again, even once
- it took more than about ten minutes to get right
- getting it wrong is expensive or invisible (anything touching money, a deploy, a
  scheduled task, or a surface the user looks at)
- it encodes a fact that was hard to learn (an API's exact request shape, a file
  format's quirk, a timezone rule)

Then:

1. **Put it where it will be found.** A tool used across projects goes in
   the workspace's shared `tools/` directory. A tool that belongs to one skill goes in
   `~/.claude/skills/<skill>/scripts/`. A tool that belongs to one project goes in
   that project's `tools/` or `scripts/`.
2. **Give it arguments instead of hardcoded values.** The one-off had a document id
   and a file path baked in; the tool takes them. This is the single change that
   decides whether it is ever reused.
3. **Write the header the way this workspace writes headers**: what it is for, the
   incident that produced it, and the trap that will bite the next person. A tool
   without that header gets rewritten by someone who did not trust it.
4. **Point the skill at it.** If a skill would use this script, name the script in the
   skill body so a future session runs it rather than reasoning its way to a new one.
5. **Prove it once more after the move.** Paths change when a file moves. A tool that
   worked in the scratchpad and fails in `tools/` is worse than no tool.

## What not to save

Genuinely single-use code: a one-line query to answer a question that is now answered,
an exploratory print, a migration that has already run and cannot run again. Saving
these is how a `tools/` directory becomes a junk drawer nobody searches, which causes
the exact rewriting this skill exists to prevent.

The test: **would a future session, not knowing this conversation, be glad to find it?**

## Worked example, from this workspace

`tools/md_to_gdoc.py` renders markdown into a Google Doc. It was written from scratch
three times for three different documents and thrown away in a scratch folder each
time. On the third time it became a tool: `--create` for a new document, `--doc` for an
existing one, tables shaded, status words coloured. Writing it as a tool also forced a
test on a throwaway document first, which caught a bug all three earlier versions would
have shipped: the Docs API rejects a table style request that carries both a start
location and a range.

That is the second, quieter payoff. A script you intend to keep gets tested. A script
you intend to delete gets hoped over.
