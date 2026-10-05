# locate-before-you-guard

**Find the line that produced the wrong output before adding a check that would have caught it. A guard is not a diagnosis, and a guard that reads as correct hides the cause it failed to fix. Use whenever tempted to add a cap, assert, retry, or validation in response to a bad result.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 533 words. This page is the summary; the file is what the agent reads.

## What it does

A card showed three of one prop type; the fix was a per-market ceiling. Two days later the same card came back, ceiling intact, because the real defect was a counter four lines away that reset on every call. Reproduce the exact wrong output, point at the line, and prove the mechanism by breaking it deliberately before adding any cap, assert or retry. A guard catches the next variant; it is not the fix.

## Inside the skill

Sections of `SKILL.md`:

- The three-strikeout-props bug, twice
- The discipline
- Tells that you are guarding, not fixing
- When a guard IS the right answer
- Related

## When the agent should load it

Find the line that produced the wrong output before adding a check that would have caught it. A guard is not a diagnosis, and a guard that reads as correct hides the cause it failed to fix. Use whenever tempted to add a cap, assert, retry, or validation in response to a bad result.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-19, 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/locate-before-you-guard ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/locate-before-you-guard
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/locate-before-you-guard/SKILL.md -o ~/.claude/skills/locate-before-you-guard/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\locate-before-you-guard`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
