# money-is-read-never-derived

**Any balance, bankroll, profit or spend figure must be read from the system of record, never recomputed from history. Load before touching bankroll, P&L, capitalized profit, casino ledgers, spend meters, or any number the user will compare against a real account.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 453 words. This page is the summary; the file is what the agent reads.

## What it does

"Every money bug in this project came from computing a figure that could have been read." A bankroll rebuilt from settled bets drifted from the account; two histories disagreed by $7.23 and neither could arbitrate. Name the system of record beside the code, read rather than reconstruct, surface the delta when derivation is unavoidable, never invent a number, never settle while the event is live.

## Inside the skill

Sections of `SKILL.md`:

- The incidents
- The rules
- The check before you say a money number out loud
- Related

## When the agent should load it

Any balance, bankroll, profit or spend figure must be read from the system of record, never recomputed from history. Load before touching bankroll, P&L, capitalized profit, casino ledgers, spend meters, or any number the user will compare against a real account.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/money-is-read-never-derived ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/money-is-read-never-derived
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/money-is-read-never-derived/SKILL.md -o ~/.claude/skills/money-is-read-never-derived/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\money-is-read-never-derived`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
