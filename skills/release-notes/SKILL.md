---
name: release-notes
description: When the user wants a human-readable changelog or release notes from shipped work. Use when he says "write release notes," "changelog," "what shipped," "summarize this branch/PR for release," or wants a plain-language summary of what changed for a project. Turns git history, a branch, or a set of PRs into notes that read like a product update, not a commit log.
metadata:
  version: 1.0.0
---

# Release Notes

Turn shipped work into notes a non-engineer can read: what changed, why it matters, what
to do about it. Works from a branch, a range of commits, or a set of merged PRs.

## When to use
The user wants to know or communicate what shipped: a project update for himself, a note
for a colleague or a client, or user-facing release notes.

## Inputs
- The repo and the range: a branch vs main, "since last release," or specific PRs.
- Read the diff and commit messages (git), and any linked Linear/Jira issues if connected,
  to recover the WHY behind each change, not just the what.

## How to build them
1. Group changes by theme, not by commit. A reader cares about features and fixes, not
   individual commits.
2. For each item, write one line in plain product language: the change and why it matters.
   Translate file/function names into features (the standing rule: features, not
   plumbing).
3. Separate into **New**, **Improved**, **Fixed**, and **Behind the scenes** (infra/refactor
   that has no user-facing effect but is worth noting).
4. Lead with what a person would notice. Bury the plumbing at the bottom or drop it.

## Output
```
## <Project> - <date>

**New**
- <feature>: <what it does for the user>

**Improved**
- <change>: <the before/after in one line>

**Fixed**
- <bug>: <what was broken, now works>

**Behind the scenes**
- <infra/refactor>, if worth a mention
```

## Rules
- House writing rules: no em/en dashes, no AI-tell triads, no hedge words,
  active voice, one idea per line.
- Claim only what actually shipped. If it's on a branch and not merged/deployed, say so.
- Never invent a change that isn't in the diff. If the WHY isn't recoverable, describe the
  what plainly rather than guessing intent.
