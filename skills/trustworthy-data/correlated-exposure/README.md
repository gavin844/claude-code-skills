# correlated-exposure

**Group by what decides the outcome, not by the label, so an "at most N" limit catches hidden overlap.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Trustworthy data](../) group. The skill itself is [`SKILL.md`](SKILL.md), 442 words. This page is the summary; the file is what the agent reads.

## What it does

A cap of two per market passed a card holding three picks that were one opinion about the first five innings of a baseball game. Three tickets, one bet. The fix was grouping by what decides the outcome, not a smaller number. Same shape: tests sharing one fixture, retries against one dead resolver. "What single thing, if it were wrong, would take all of these down together?"

## When the agent loads it

A limit that counts by name misses things that share a cause. Group by what decides the outcome, not by how the source labels it. Use for concentration caps, diversification, retries, test coverage, and any "at most N of these" rule.

## Inside the skill

- The 2026-08-21 card
- Group by what decides the outcome
- The same shape elsewhere
- The question

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/trustworthy-data/correlated-exposure ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/correlated-exposure
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/trustworthy-data/correlated-exposure/SKILL.md -o ~/.claude/skills/correlated-exposure/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\correlated-exposure`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
