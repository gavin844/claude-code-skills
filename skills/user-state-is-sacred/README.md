# user-state-is-sacred

**Anything the user explicitly decided is a fact about the world, not data your code owns. Never let a regeneration delete, overwrite, or transplant it. Use whenever a rebuild, re-render, re-sync or re-record replaces rows the user has touched.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 492 words. This page is the summary; the file is what the agent reads.

## What it does

The user placed three real bets off a morning card. Three rebuilds later all three were deleted, two plays he had never seen were marked taken, and nothing errored. Three rules: a user decision is never the default, never delete a row the user has touched, preserve by identity rather than position. Load before any rebuild, re-sync or re-import that replaces rows a person may have edited.

## Inside the skill

Sections of `SKILL.md`:

- What this cost, 2026-08-21
- The three rules
- Where else this lives
- The question

## When the agent should load it

Anything the user explicitly decided is a fact about the world, not data your code owns. Never let a regeneration delete, overwrite, or transplant it. Use whenever a rebuild, re-render, re-sync or re-record replaces rows the user has touched.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/user-state-is-sacred ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/user-state-is-sacred
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/user-state-is-sacred/SKILL.md -o ~/.claude/skills/user-state-is-sacred/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\user-state-is-sacred`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
