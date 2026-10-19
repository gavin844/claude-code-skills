# user-state-is-sacred

**Anything a person decided by hand survives every rebuild, re-sync and regeneration.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Trustworthy data](../) group. The skill itself is [`SKILL.md`](SKILL.md), 496 words. This page is the summary; the file is what the agent reads.

## What it does

The user placed three real bets off a morning card. Three rebuilds later all three were deleted, two plays he had never seen were marked taken, and nothing errored. Three rules: a user decision is never the default, never delete a row the user has touched, preserve by identity rather than position. Load before any rebuild, re-sync or re-import that replaces rows a person may have edited.

## When the agent loads it

Anything the user explicitly decided is a fact about the world, not data your code owns. Never let a regeneration delete, overwrite, or transplant it. Use whenever a rebuild, re-render, re-sync or re-record replaces rows the user has touched.

## Inside the skill

- What this cost, 2026-08-21
- The three rules
- Where else this lives
- The question

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/trustworthy-data/user-state-is-sacred ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/user-state-is-sacred
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/trustworthy-data/user-state-is-sacred/SKILL.md -o ~/.claude/skills/user-state-is-sacred/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\user-state-is-sacred`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
