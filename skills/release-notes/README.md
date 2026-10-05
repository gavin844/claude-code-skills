# release-notes

**When the user wants a human-readable changelog or release notes from shipped work. Use when he says "write release notes," "changelog," "what shipped," "summarize this branch/PR for release," or wants a plain-language summary of what changed for a project. Turns git history, a branch, or a set of PRs into notes that read like a product update, not a commit log.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 300 words. This page is the summary; the file is what the agent reads.

## What it does

Turns a branch, a commit range or a set of PRs into notes a non-engineer can read: grouped by theme, file names translated into features, sorted into New, Improved, Fixed and Behind the scenes. Claim only what shipped, and when the reason for a change cannot be recovered from the diff, describe the what rather than guess the why. Use when asked for a changelog or "what shipped".

## Inside the skill

Sections of `SKILL.md`:

- When to use
- Inputs
- How to build them
- Output
- <Project> - <date>
- Rules

## When the agent should load it

When the user wants a human-readable changelog or release notes from shipped work. Use when he says "write release notes," "changelog," "what shipped," "summarize this branch/PR for release," or wants a plain-language summary of what changed for a project. Turns git history, a branch, or a set of PRs into notes that read like a product update, not a commit log.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/release-notes ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/release-notes
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/release-notes/SKILL.md -o ~/.claude/skills/release-notes/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\release-notes`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
