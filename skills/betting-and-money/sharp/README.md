# sharp

**A recommend-only sports betting analyst: de-vig the market, price it, and gate every play on backtest-proven confidence.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Betting and money](../) group. The skill itself is [`SKILL.md`](SKILL.md), 3,871 words. This page is the summary; the file is what the agent reads.

## What it does

A recommend-only sports-betting analysis agent that never places a bet. It de-vigs a sharp reference market, runs per-sport models, and only lets a market headline the card after a backtest proves it beats the base rate and is calibrated, not just skilled. It grades only final games, tracks closing-line value as its north star, and documents every way a fake edge has been invented so the checks catch them before a card ships.

## When the agent loads it

A recommend-only sports-betting analysis agent. It finds plays that are genuinely +EV at your sportsbook by de-vigging sharp markets and running per-sport models, gates them through backtest-proven confidence, grades only final games, and gets sharper from graded results. It NEVER places a bet. Use for "the card", "today's bets", "any locks", "grade the card", "backtest [market]", "is [market] proven", "how's the model doing", NRFI, F5, strikeout props, team-to-score-first, parlays, bankroll, CLV, edge, or building, training and hardening betting models.

## Inside the skill

- The sample data
- The one rule that never bends
- The money philosophy (sample)
- The pipeline
- The confidence gate: what makes a "lock" mean something
- Training: how it gets sharper
- Self-improvement loop
- The book's hold is the real opponent
- Pricing failure modes: every way a fake edge gets invented
- Stale inputs: never price without recent form
- Grade only final games
- A user's rule is not a default to be optimised
- Multi-sport traps
- Data sources
- Live (in-game) engine: lessons
- Gotchas
- When asked to...
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/betting-and-money/sharp ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/sharp
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/betting-and-money/sharp/SKILL.md -o ~/.claude/skills/sharp/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\sharp`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [sharp-card-build](../../betting-and-money/sharp-card-build) (Betting and money)
- [sharp-book-scraping](../../betting-and-money/sharp-book-scraping) (Betting and money)
- [sharp-ufc](../../betting-and-money/sharp-ufc) (Betting and money)
- [money-is-read-never-derived](../../trustworthy-data/money-is-read-never-derived) (Trustworthy data)
- [freshness-is-a-precondition](../../trustworthy-data/freshness-is-a-precondition) (Trustworthy data)
- [correlated-exposure](../../trustworthy-data/correlated-exposure) (Trustworthy data)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
