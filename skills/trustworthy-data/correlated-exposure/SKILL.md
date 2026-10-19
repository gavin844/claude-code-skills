---
name: correlated-exposure
description: A limit that counts by name misses things that share a cause. Group by what decides the outcome, not by how the source labels it. Use for concentration caps, diversification, retries, test coverage, and any "at most N of these" rule.
---

# Correlated exposure

**A cap that counts labels does not cap risk.** Two names for one underlying cause
pass a limit of two, and then fail together.

## The 2026-08-21 card

The user: *"I'm still not understanding why there are three first five baseball bets as
our picks today."*

`MAX_PER_MARKET = 2` was in place and looked correct. The card had:

| pick | market | family |
|---|---|---|
| F5 total Under | `f5_total` | first five innings |
| F5 ML Toronto | `f5_ml` | first five innings |
| F5 ML Pittsburgh | `f5_ml` | first five innings |

Two `f5_ml` and one `f5_total` is "2 and 1" against a cap of 2. Every check passed.
And all three are one opinion about how the first six outs go: if the starters go
deep and quiet, the whole card loses at once. Three tickets, one bet.

The fix is not a smaller number. It is counting the right thing:

```python
MARKET_FAMILY = {
    "f5_ml": "first5", "f5_total": "first5",
    "nrfi": "firstinn", "yrfi": "firstinn", "ttsf": "firstinn",
    "h2h": "fullgame", "totals": "fullgame", "spreads": "fullgame",
}
def _family(m): return MARKET_FAMILY.get(m, m)   # standalone things are their own family
```

Then apply the cap to the family, **everywhere the cap is applied.** Missing one
path is its own bug: capping straights but not parlay legs is how one market took
four of five slots on an earlier card.

## Group by what decides the outcome

Not by how the source labels it. The sportsbook files `f5_ml` and `f5_total` separately
because they are separate tickets, not because they are separate risks. Ask: *what
single event moves all of these at once?*

## The same shape elsewhere

- **Tests.** Twelve tests that all import one fixture are one test with twelve
  names. Coverage counts files touched, not failure modes covered.
- **Retries.** Three retries against the same dead DNS resolver is one attempt.
  Today four RSS feeds "failed independently" and three shared one cause: the
  machine's network was not up at 06:30.
- **Sources.** Five headlines from five outlets syndicating one wire story is one
  data point, and averaging them manufactures false confidence.
- **Redundancy.** Two availability zones on one power feed. Two API keys on one
  exhausted account, which is exactly why the Odds API dying took every soccer
  result with it.
- **Suggestions.** Five recommendations all derived from one stale input.

## The question

Before trusting any "at most N" or "we have M independent X":

> **What single thing, if it were wrong, would take all of these down together?**

If there is such a thing, your real count is 1, whatever the limit says.
