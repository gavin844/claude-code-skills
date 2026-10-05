# freshness-is-a-precondition

**Treat the age of every input as part of its validity. Use whenever reading cached files, scraped captures, stored prices, stats, or history that a later step will act on. Prevents confident output computed from stale data.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 830 words. This page is the summary; the file is what the agent reads.

## What it does

The most frequent failure in a week of work: a two-day-old capture built a card on games already finished, a stale reference price manufactured edge out of elapsed time. "Stale data does not look stale." Every input carries an age checked at the point of use, unknown age is stale, and stale means refuse loudly rather than warn and continue. Freshness of a file is not freshness of its content.

## Inside the skill

Sections of `SKILL.md`:

- What actually went wrong
- The rule
- Freshness of a FILE is not freshness of its CONTENT
- Freshness of the ROW is not freshness of the FETCH
- When a cache poisons the future
- The question to ask, every time
- Related skills

## When the agent should load it

Treat the age of every input as part of its validity. Use whenever reading cached files, scraped captures, stored prices, stats, or history that a later step will act on. Prevents confident output computed from stale data.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/freshness-is-a-precondition ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/freshness-is-a-precondition
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/freshness-is-a-precondition/SKILL.md -o ~/.claude/skills/freshness-is-a-precondition/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\freshness-is-a-precondition`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
