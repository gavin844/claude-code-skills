# version-your-definitions

**When you change what a metric counts, every stored value of it becomes incomparable. Stamp the definition alongside the data and refuse to diff across versions. Use whenever editing an exclusion list, filter, threshold, or formula behind a tracked number.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 464 words. This page is the summary; the file is what the agent reads.

## What it does

A lines-of-code counter changed its exclusion list, and the next delta subtracted a new-rules total from an old-rules basis, reporting negative work. "A metric is a number plus the rule that produced it." Stamp the definition version beside stored values, refuse to compare across a mismatch, and retire old data rather than relabel it. Use before editing any filter, threshold or formula behind a tracked number.

## Inside the skill

Sections of `SKILL.md`:

- The LOC counter, 2026-08-21
- The fix
- The same trap elsewhere
- The question

## When the agent should load it

When you change what a metric counts, every stored value of it becomes incomparable. Stamp the definition alongside the data and refuse to diff across versions. Use whenever editing an exclusion list, filter, threshold, or formula behind a tracked number.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-15, 2026-08-17, 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/version-your-definitions ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/version-your-definitions
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/version-your-definitions/SKILL.md -o ~/.claude/skills/version-your-definitions/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\version-your-definitions`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
