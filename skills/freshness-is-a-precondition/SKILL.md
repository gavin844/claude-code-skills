---
name: freshness-is-a-precondition
description: Treat the age of every input as part of its validity. Use whenever reading cached files, scraped captures, stored prices, stats, or history that a later step will act on. Prevents confident output computed from stale data.
---

# Freshness is a precondition

**Stale data does not look stale. A number computed from a day-old input is
indistinguishable from a correct one, right up to the point it costs something.**

This was the single most frequent failure across a week of work: six separate
incidents, all the same shape.

## What actually went wrong

| Input | How stale | What it produced |
|---|---|---|
| scraped board capture | 2 days | an entire betting card built on games that had already finished |
| pitcher season ERA | ~1 season | Scherzer at 6.59 when his last 3 starts were 2.20; two of three picks were -EV artefacts |
| reference prices from a sharper market | 23 hours | a "fair value" anchor de-vigged against live prices, manufacturing edge out of elapsed time |
| intel file | 19 hours | zero pitchers matched, the best market silently contributed nothing |
| prop page captures | overnight | the readiness check read yesterday's depth and would have declared the board ready before the book posted a line |
| LOC history | 2 days | a dashboard reading −2,976,118 lines |
| game rows | 3-6 days | today's fresh prices attached to games from Aug 15, then discarded as "already started" |

Every one of these was silent. Not one raised an error.

## The rule

**Every cached or fetched input carries an age, and the age is checked at the point of
use, not at the point of fetch.**

```python
def _fresh(path, hours):
    """Age is part of validity. An unreadable timestamp is NOT freshness."""
    try:
        return (time.time() - path.stat().st_mtime) / 3600 <= hours
    except Exception:
        return False        # unknown age is stale, never fresh
```

Three properties that matter:

1. **Unknown age is stale.** An exception, a null timestamp, a missing file: all stale.
   Defaulting to "fresh" on a parse failure is how the silent ones get through.
2. **The window belongs to the data, not the code.** A live price is stale in hours; a
   season stat is fine for a day; a park factor is fine for a year. Pick per input and
   write down why.
3. **Stale means REFUSE, loudly.** Not "warn and continue". If a step cannot run on
   fresh data, it must say what was stale and stop, and the caller must survive that:
   *"engine A is offline because the reference is 23h old"* is a correct outcome, not a
   degraded one.

## Freshness of a FILE is not freshness of its CONTENT

The trap I fell into twice. A capture written 8 minutes ago, fully loaded at 836KB, and
carrying two rows of actual data. The file was fresh. The content was not there yet.

**Check the thing you need, not the container.** Count the rows. Measure the depth.
`file exists and is recent` is the weakest possible test.

## Freshness of the ROW is not freshness of the FETCH

A "latest price per game" query returns the newest row for EVERY game, including games
from last week. The row is the latest; it is not current. Filter on the *event's* time,
not the record's:

```sql
WHERE g.start_time > datetime('now')     -- the game has not happened
```

## When a cache poisons the future

A bad value written into a history file is wrong for every later day, not just its own.
Two guards, both cheap:

- **At write:** refuse to record a value implausibly far from the last one. Better to
  skip a day than corrupt the series.
- **At read:** clamp. If a derived delta is a third of the total, the BASIS is wrong,
  not the world. Fall back to an independent source and say so.

## The question to ask, every time

Before using any value that came from disk, an API, or a previous step:

> **How old is this, and what would I do differently if it were wrong?**

If the answer to the second half is "quite a lot", check the first half before you act.

## Related skills

Checked 2026-08-21 against the ~100 skills installed here and the public collections
before writing this one, after the user asked whether well-made skills already existed.
They did for two of the six I drafted, and those were folded into the existing skills
rather than duplicated:

- `verification-before-completion` - proving a claim before making it. Covers the
  ground my draft "read-the-artifact" would have; the two failure modes it was missing
  (grepping your own output for success, and treating a dry run as the artifact) were
  added to it instead.
- `systematic-debugging` - root cause before fixes.
- `karpathy-guidelines` - surfacing assumptions, surgical changes.
- `ponytail` - whether the thing needs to exist at all. Which is the check I skipped
  when I wrote six skills without looking for prior art first.

Nothing installed or public covered freshness-of-inputs, config-that-nothing-reads,
silent-failure patterns, or shell-escaping corruption when authoring files, which is
why those four exist.
