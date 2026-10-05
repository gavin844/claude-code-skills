---
name: enumerate-before-ranking
description: List the whole option set before picking from it. Ranking a subset you happened to load is not selection, it is accident. Use before choosing a best candidate, and whenever the pool comes from a file list, glob, or pipeline step that could quietly be short.
---

# Enumerate before ranking

**Picking the best of what loaded is not picking the best.** The ranking looks
rigorous either way, which is what makes this hard to notice.

## 2026-08-21

The user: *"have you gone to the prop builder and looked at everything like that? All
you're seeing is first five. I'm wondering: don't just pick the first bet you see."*

He was right, and the numbers were worse than his hunch:

| | |
|---|---|
| markets with fresh prices that day | **10** |
| markets the card actually considered | **3** |
| total-bases props sitting in an already-captured file | **188** |
| of those the model had ever seen | **0** |

`model_tbases` was simply missing from the ingest loop that carries `model_ttsf`,
`model_f5`, `model_kprops` and `model_hre`. Nothing errored. Its newest price was a
day old, so the market contributed nothing, and every card for days had been ranking
a pool that was quietly short by a whole market. The page had already been
downloaded. Nobody read it.

## The rule

**Count the universe first, then rank inside it.** Before selecting:

1. **Enumerate what exists.** Query the sources, not the pipeline's memory of them:
   `SELECT market, COUNT(*) FROM odds GROUP BY market` beats trusting the list of
   models you happen to call.
2. **Compare that count to what reached the ranking.** If 10 exist and 3 arrived, the
   gap IS the finding. Report it before reporting the winner.
3. **Say what you excluded and why.** "7 markets dropped: 4 stale, 2 unproven, 1 not
   ingested" is an answer. Silence about them is not.

## Where the pool goes quietly short

- **A hardcoded list where a glob belongs.** A prop-depth check read 17 rows while
  246 sat in files whose names were not on its list. Fixed twice by editing the list
  before the approach changed.
- **A step missing from a loop.** The tbases case. The loop looked complete.
- **A freshness filter you cannot see.** A market excluded for staleness looks
  identical to a market with no edge.
- **A glob that matches one of three naming schemes.** Three capture scripts, three
  schemes, and the fresh files were invisible.
- **Pagination that stops early.** Kalshi's sports markets returned 0 because the
  generic listing never reached them; querying the series directly returned 20.
- **A quota that silently zeroes a source.** `stored 0 odds rows` reads like a quiet
  day, not an exhausted key.

## The question

Before "here is the best option":

> **How many candidates existed, how many did I score, and can I name the
> difference?**

If those two numbers differ and you cannot explain the gap, you have not chosen
anything. You have reported the shape of your own pipeline.
