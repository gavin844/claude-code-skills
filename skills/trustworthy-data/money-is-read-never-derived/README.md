# money-is-read-never-derived

**Read balances and profit from the system of record, never recompute them from history.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Trustworthy data](../) group. The skill itself is [`SKILL.md`](SKILL.md), 456 words. This page is the summary; the file is what the agent reads.

## What it does

"Every money bug in this project came from computing a figure that could have been read." A bankroll rebuilt from settled bets drifted from the account; two histories disagreed by $7.23 and neither could arbitrate. Name the system of record beside the code, read rather than reconstruct, surface the delta when derivation is unavoidable, never invent a number, never settle while the event is live.

## When the agent loads it

Any balance, bankroll, profit or spend figure must be read from the system of record, never recomputed from history. Load before touching bankroll, P&L, capitalized profit, casino ledgers, spend meters, or any number the user will compare against a real account.

## Inside the skill

- The incidents
- The rules
- The check before you say a money number out loud
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/trustworthy-data/money-is-read-never-derived ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/money-is-read-never-derived
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/trustworthy-data/money-is-read-never-derived/SKILL.md -o ~/.claude/skills/money-is-read-never-derived/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\money-is-read-never-derived`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [fail-loud](../../honest-code/fail-loud) (Honest code)
- [freshness-is-a-precondition](../../trustworthy-data/freshness-is-a-precondition) (Trustworthy data)
- [user-state-is-sacred](../../trustworthy-data/user-state-is-sacred) (Trustworthy data)
- [one-writer-per-record](../../trustworthy-data/one-writer-per-record) (Trustworthy data)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
