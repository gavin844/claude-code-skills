# save-the-script

**Use when writing a script, or when about to write one that resembles something written before, or when the user says reuse, do not rewrite, regenerate, you wrote this before, or every time you. Turns a working one-off into a tool a future session runs instead of reinventing. Also use before writing any throwaway in a scratch directory.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 706 words. This page is the summary; the file is what the agent reads.

## What it does

A markdown-to-document converter was written from scratch three times and thrown away each time. A regenerated script "comes back slightly different every time", so output drifts. Before writing, search the skills, tools and scratch directories for the verb. After it works, give it arguments instead of hardcoded values, a header naming the incident that produced it, and a home the next session will find.

## Inside the skill

Sections of `SKILL.md`:

- The rule
- Before you write
- After it works
- What not to save
- Worked example, from this workspace

## When the agent should load it

Use when writing a script, or when about to write one that resembles something written before, or when the user says reuse, do not rewrite, regenerate, you wrote this before, or every time you. Turns a working one-off into a tool a future session runs instead of reinventing. Also use before writing any throwaway in a scratch directory.

Dates recorded inside the skill, each one an incident it was written from: 2026-09-18.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/save-the-script ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/save-the-script
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/save-the-script/SKILL.md -o ~/.claude/skills/save-the-script/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\save-the-script`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
