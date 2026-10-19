# sharp-ufc

**Read a UFC card fight by fight and say who to back and why, recommend-only.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Betting and money](../) group. The skill itself is [`SKILL.md`](SKILL.md), 691 words. This page is the summary; the file is what the agent reads.

## What it does

A manual, research-driven read on a UFC or MMA card the user sends, priced against their sportsbook. It ranks what actually predicts fights, refuses to invent records or stats, de-vigs the price before calling any edge, and hands back the pick, the price, an honest confidence and the way it loses. Fights stay out of the headline locks because they have no backtest.

## When the agent loads it

Analyze a UFC or MMA card the user sends and give an honest read on who to back, priced against their sportsbook. Use for "who do you got", "UFC card", "fight night", "who wins this fight", "MMA picks", "break down this card", or when the user pastes or screenshots a fight card. A manual, research-driven path with no fabricated records. Recommend-only, never places a bet.

## Inside the skill

- The sample data
- The one rule about facts
- What predicts MMA outcomes
- How to price a fight
- What to hand back
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/betting-and-money/sharp-ufc ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/sharp-ufc
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/betting-and-money/sharp-ufc/SKILL.md -o ~/.claude/skills/sharp-ufc/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\sharp-ufc`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [sharp](../../betting-and-money/sharp) (Betting and money)
- [sharp-book-scraping](../../betting-and-money/sharp-book-scraping) (Betting and money)
- [correlated-exposure](../../trustworthy-data/correlated-exposure) (Trustworthy data)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
