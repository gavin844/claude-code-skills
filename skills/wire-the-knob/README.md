# wire-the-knob

**When you add a config value, threshold, or flag, prove some code reads it before claiming it does anything. Use whenever writing to a config file or introducing a constant that is meant to gate or size behaviour. Prevents settings that look like controls but are comments.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 706 words. This page is the summary; the file is what the agent reads.

## What it does

A parlay edge threshold sat in config and was read by zero lines of code for two days, while parlays went 1W-10L on real money. When you write a config value or gating constant, grep for it in the same turn; if the only hit is the config file, wire it or delete it. Then set it to an absurd value once and watch for a change.

## Inside the skill

Sections of `SKILL.md`:

- What actually went wrong
- The rule
- Then make it self-checking
- The same bug in other clothes
- The test that matters
- Related skills

## When the agent should load it

When you add a config value, threshold, or flag, prove some code reads it before claiming it does anything. Use whenever writing to a config file or introducing a constant that is meant to gate or size behaviour. Prevents settings that look like controls but are comments.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/wire-the-knob ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/wire-the-knob
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/wire-the-knob/SKILL.md -o ~/.claude/skills/wire-the-knob/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\wire-the-knob`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
