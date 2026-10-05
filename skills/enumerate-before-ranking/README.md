# enumerate-before-ranking

**List the whole option set before picking from it. Ranking a subset you happened to load is not selection, it is accident. Use before choosing a best candidate, and whenever the pool comes from a file list, glob, or pipeline step that could quietly be short.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 462 words. This page is the summary; the file is what the agent reads.

## What it does

Ten markets had fresh prices; the card considered three. A whole market with 188 captured props was missing from the ingest loop, and nothing errored. "Picking the best of what loaded is not picking the best." Count the universe from the sources, compare it to what reached the ranking, and report the gap before the winner. Use before choosing from any pool that could be quietly short.

## Inside the skill

Sections of `SKILL.md`:

- 2026-08-21
- The rule
- Where the pool goes quietly short
- The question

## When the agent should load it

List the whole option set before picking from it. Ranking a subset you happened to load is not selection, it is accident. Use before choosing a best candidate, and whenever the pool comes from a file list, glob, or pipeline step that could quietly be short.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/enumerate-before-ranking ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/enumerate-before-ranking
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/enumerate-before-ranking/SKILL.md -o ~/.claude/skills/enumerate-before-ranking/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\enumerate-before-ranking`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
