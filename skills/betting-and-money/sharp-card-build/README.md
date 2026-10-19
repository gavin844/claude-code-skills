# sharp-card-build

**The daily routine that turns captured lines into a short card of straights and parlays, recommend-only.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Betting and money](../) group. The skill itself is [`SKILL.md`](SKILL.md), 831 words. This page is the summary; the file is what the agent reads.

## What it does

The daily run that turns raw captures into a betting card for the user to review. It orders the ingests so game rows exist before prices attach, refuses stale captures and started games, runs the robustness and sanity gates, and builds distinct straights and parlays with no play repeated. Nothing is ever placed; "no bet" is a normal result.

## When the agent loads it

The daily step-by-step for building a recommend-only betting card across every sport you follow. Use for "start building the card", "build today's card", "make the card", "morning card", or any request to produce the day's plays. Runs the captures, ingests every sport's board, builds distinct-prop straights plus a 2-leg and a 3-leg parlay, runs the freshness and started-game checks, and delivers the card to the user for review. Never places a bet.

## Inside the skill

- The sample data
- The one rule
- Order of operations
- What the card must contain (sample shape)
- Non-negotiable checks before sending
- Where the edge usually is
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/betting-and-money/sharp-card-build ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/sharp-card-build
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/betting-and-money/sharp-card-build/SKILL.md -o ~/.claude/skills/sharp-card-build/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\sharp-card-build`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [sharp](../../betting-and-money/sharp) (Betting and money)
- [sharp-book-scraping](../../betting-and-money/sharp-book-scraping) (Betting and money)
- [sharp-ufc](../../betting-and-money/sharp-ufc) (Betting and money)
- [freshness-is-a-precondition](../../trustworthy-data/freshness-is-a-precondition) (Trustworthy data)
- [correlated-exposure](../../trustworthy-data/correlated-exposure) (Trustworthy data)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
