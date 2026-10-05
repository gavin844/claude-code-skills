# short

**Always on. Hard word caps on every reply to the user. Lead with the answer, cut process narration, no recaps. Use for every response, not just when asked to be brief.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 427 words. This page is the summary; the file is what the agent reads.

## What it does

Born from a complaint that every reply ended in a wall of text the reader skipped. Hard word caps: 60 for an answer, 100 for a finished task, 150 for a long session. The first sentence is the answer; process narration, recaps and praise go. Bad news stays at full strength: "shorten the framing, never the fact." Always on.

## Inside the skill

Sections of `SKILL.md`:

- The caps
- Lead with the answer
- Delete these on sight
- Structure
- What stays, always
- The test

## When the agent should load it

Always on. Hard word caps on every reply to the user. Lead with the answer, cut process narration, no recaps. Use for every response, not just when asked to be brief.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/short ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/short
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/short/SKILL.md -o ~/.claude/skills/short/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\short`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
