# Trustworthy data

Numbers and records a person can rely on: fresh inputs, money read from the source, user decisions that survive a rebuild.

| Skill | What it does |
|---|---|
| [user-state-is-sacred](user-state-is-sacred) | Anything a person decided by hand survives every rebuild, re-sync and regeneration. |
| [one-writer-per-record](one-writer-per-record) | A record that a scheduled job and a live session can both write gets exactly one owner. |
| [freshness-is-a-precondition](freshness-is-a-precondition) | Check the age of cached data, prices and stats before acting on them. |
| [money-is-read-never-derived](money-is-read-never-derived) | Read balances and profit from the system of record, never recompute them from history. |
| [version-your-definitions](version-your-definitions) | Stamp a metric's definition next to its values, so numbers from different formulas are never compared. |
| [correlated-exposure](correlated-exposure) | Group by what decides the outcome, not by the label, so an "at most N" limit catches hidden overlap. |
| [enumerate-before-ranking](enumerate-before-ranking) | List the whole option set before picking the best, so the pick is not made from a partial list. |

[All 37 skills](../../README.md)
