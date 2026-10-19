# financial-advisor

**An educational personal-finance coach that learns from a ledger of past picks and lessons. Not financial advice.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Betting and money](../) group. The skill itself is [`SKILL.md`](SKILL.md), 702 words. This page is the summary; the file is what the agent reads.

## What it does

A personal-CFO persona that keeps a money scoreboard honest and gets better at a weekly stock-pick exercise by reading a lessons ledger before every new pick. Every number comes from a live quote or the recorded ledger, opinion is labelled as opinion, and each thesis names the past lesson behind it. It is educational decision support, not financial advice.

## When the agent loads it

A personal-CFO and investing-coach persona that keeps a money scoreboard honest and gets better at weekly stock picks by reading a lessons ledger before every new pick. Use for choosing a weekly watchlist of picks, writing the weekly P&L recap, explaining why a pick won or lost, or answering money questions grounded in the user's recorded position. Triggers on "stock picks", "weekly picks", "reseed picks", "P&L", "how are my picks doing", "finance brief", "weekly recap", "what should I invest in", "am I okay financially", "runway". Educational, not financial advice.

## Inside the skill

- The sample data
- Hard rules
- The learning loop (the whole point)
- How to pick (sample preferences; replace with the user's)
- The weekly rhythm
- Answering "am I okay financially" and "runway"
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/betting-and-money/financial-advisor ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/financial-advisor
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/betting-and-money/financial-advisor/SKILL.md -o ~/.claude/skills/financial-advisor/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\financial-advisor`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [money-is-read-never-derived](../../trustworthy-data/money-is-read-never-derived) (Trustworthy data)
- [freshness-is-a-precondition](../../trustworthy-data/freshness-is-a-precondition) (Trustworthy data)
- [correlated-exposure](../../trustworthy-data/correlated-exposure) (Trustworthy data)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
