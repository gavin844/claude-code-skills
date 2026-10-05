# midwork-triggers

**Load the skill that matches the situation you are IN, not the words the user used. Use when about to add a guard, automate a browser, ship a UI change, add a constant, or explain a zero. The router fires on his prompt; these failures happen hours later inside the work.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 651 words. This page is the summary; the file is what the agent reads.

## What it does

On one day the agent broke seven things, and every one had a skill written for it that never loaded: the router fires on what the user types, and the decisions happened hours later. This is a table keyed on what the agent is about to do: add a guard, explain a zero, regenerate something, say done, rank a list. Each row names the skill and the failure that earned it.

## Inside the skill

Sections of `SKILL.md`:

- The table
- Two habits that would have caught most of it
- What this is not

## When the agent should load it

Load the skill that matches the situation you are IN, not the words the user used. Use when about to add a guard, automate a browser, ship a UI change, add a constant, or explain a zero. The router fires on his prompt; these failures happen hours later inside the work.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-30.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/midwork-triggers ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/midwork-triggers
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/midwork-triggers/SKILL.md -o ~/.claude/skills/midwork-triggers/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\midwork-triggers`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
