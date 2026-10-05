# correlated-exposure

**A limit that counts by name misses things that share a cause. Group by what decides the outcome, not by how the source labels it. Use for concentration caps, diversification, retries, test coverage, and any "at most N of these" rule.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 442 words. This page is the summary; the file is what the agent reads.

## What it does

A cap of two per market passed a card holding three picks that were one opinion about the first five innings of a baseball game. Three tickets, one bet. The fix was grouping by what decides the outcome, not a smaller number. Same shape: tests sharing one fixture, retries against one dead resolver. "What single thing, if it were wrong, would take all of these down together?"

## Inside the skill

Sections of `SKILL.md`:

- The 2026-08-21 card
- Group by what decides the outcome
- The same shape elsewhere
- The question

## When the agent should load it

A limit that counts by name misses things that share a cause. Group by what decides the outcome, not by how the source labels it. Use for concentration caps, diversification, retries, test coverage, and any "at most N of these" rule.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/correlated-exposure ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/correlated-exposure
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/correlated-exposure/SKILL.md -o ~/.claude/skills/correlated-exposure/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\correlated-exposure`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
