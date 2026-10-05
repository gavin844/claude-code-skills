---
name: one-writer-per-record
description: Any file, DB row or KV key that both a scheduled task and an interactive session can write needs exactly one owner, or it gets destroyed. Load before adding a cron job, a watcher, a screenshot script, or any second process that touches state a human is also editing.
---

# One writer per record

Two processes wrote the same record and the record lost. This has happened here twice,
both times silently, both times costing the user real state.

## What happened, so the rule is not abstract

**The card.** A scheduled props watcher ran on a timer and rebuilt the daily card with an
older builder. The user's card, built minutes earlier from the terminal, was deleted. Two
writers, no owner, last write wins, and the loser was the one a human had checked.

**The take buttons.** A screenshot script matched controls by visible text, caught the
neighbouring `+ I took it` buttons, and marked three straights and a parlay as placed.
Fourteen rows had to be reverted. A read-only tool mutated the ledger because nobody had
declared it read-only in a way the code enforced.

Both were confident and silent. Neither raised an error.

## The rule

For every piece of durable state, name the single writer. Write it down next to the
state, not in your head.

- **If a scheduler writes it, a human must not**, and the interactive path either reads
  it or asks the owner to rebuild. The user rebuilds cards from the terminal, so the
  terminal is the owner and the watcher was deleted rather than fixed.
- **If a human writes it, no timer may.** A timer that "keeps it fresh" is a timer that
  overwrites a decision.
- **If both genuinely must write**, they need a lock plus a compare-and-set on a version
  column, and the loser has to fail loudly rather than retry into a clobber.

## Enforce read-only at the layer that cannot be bypassed

Intent is not enforcement. `ui_check.js` and `ux_audit.js` now abort mutating requests
**at the network layer**, because "I will only click safe things" is a promise the next
selector change breaks. Anything that drives a browser or an API on the user's live systems
blocks writes at the transport, not in the click logic.

## Before adding any second process, answer these

1. What durable state does it touch? Name the file, table, or key.
2. Who else writes that state? Check the scheduler list, not just the repo.
3. If the answer is "someone else does", stop. Change the design or delete the other one.
4. Can it be read-only? Then make it structurally read-only, not politely read-only.
5. Does it commit? SQLite `kv_set` staged without a `commit()` and the dashboard could
   not see a lock the builder had printed. A write nobody can read is also a lost write.

## Related

`user-state-is-sacred` (never silently change something the user set), `fail-loud`,
`verification-before-completion`.
