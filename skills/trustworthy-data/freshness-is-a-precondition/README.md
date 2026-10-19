# freshness-is-a-precondition

**Check the age of cached data, prices and stats before acting on them.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Trustworthy data](../) group. The skill itself is [`SKILL.md`](SKILL.md), 830 words. This page is the summary; the file is what the agent reads.

## What it does

The most frequent failure in a week of work: a two-day-old capture built a card on games already finished, a stale reference price manufactured edge out of elapsed time. "Stale data does not look stale." Every input carries an age checked at the point of use, unknown age is stale, and stale means refuse loudly rather than warn and continue. Freshness of a file is not freshness of its content.

## When the agent loads it

Treat the age of every input as part of its validity. Use whenever reading cached files, scraped captures, stored prices, stats, or history that a later step will act on. Prevents confident output computed from stale data.

## Inside the skill

- What actually went wrong
- The rule
- Freshness of a FILE is not freshness of its CONTENT
- Freshness of the ROW is not freshness of the FETCH
- When a cache poisons the future
- The question to ask, every time
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/trustworthy-data/freshness-is-a-precondition ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/freshness-is-a-precondition
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/trustworthy-data/freshness-is-a-precondition/SKILL.md -o ~/.claude/skills/freshness-is-a-precondition/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\freshness-is-a-precondition`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
