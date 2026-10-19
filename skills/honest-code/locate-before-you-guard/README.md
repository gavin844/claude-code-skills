# locate-before-you-guard

**Find the line that produced the wrong output before adding a check that would hide it.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Honest code](../) group. The skill itself is [`SKILL.md`](SKILL.md), 534 words. This page is the summary; the file is what the agent reads.

## What it does

A card showed three of one prop type; the fix was a per-market ceiling. Two days later the same card came back, ceiling intact, because the real defect was a counter four lines away that reset on every call. Reproduce the exact wrong output, point at the line, and prove the mechanism by breaking it deliberately before adding any cap, assert or retry. A guard catches the next variant; it is not the fix.

## When the agent loads it

Find the line that produced the wrong output before adding a check that would have caught it. A guard is not a diagnosis, and a guard that reads as correct hides the cause it failed to fix. Use whenever tempted to add a cap, assert, retry, or validation in response to a bad result.

## Inside the skill

- The three-strikeout-props bug, twice
- The discipline
- Tells that you are guarding, not fixing
- When a guard IS the right answer
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/honest-code/locate-before-you-guard ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/locate-before-you-guard
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/honest-code/locate-before-you-guard/SKILL.md -o ~/.claude/skills/locate-before-you-guard/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\locate-before-you-guard`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
