---
name: user-state-is-sacred
description: Anything the user explicitly decided is a fact about the world, not data your code owns. Never let a regeneration delete, overwrite, or transplant it. Use whenever a rebuild, re-render, re-sync or re-record replaces rows the user has touched.
---

# User state is sacred

**Your output is a suggestion. Their decision is a fact.** Regenerating the first
must never disturb the second.

## What this cost, 2026-08-21

The user placed three real bets off the morning card and skipped the parlay. Three
afternoon rebuilds later:

- All three bets were **deleted**. `_record` cleared every pending row and
  re-inserted the new card, and his were not in it.
- Two plays he had never seen were marked **taken**, because newly recorded rows
  defaulted to `taken=1`.
- The day's exposure read **$0 against $40 of real money.**

Nothing errored. The ledger was confidently, quietly wrong, which is worse than a
crash: a crash gets investigated.

The same shape had already happened twice that week. His un-check of a parlay kept
reverting on every re-send, and a "fix" was written that only re-applied the OFF
flag, which broke the moment the default became OFF and the flag worth keeping was
the ON.

## The three rules

**1. A user decision is never the default.** If a row can carry "the user chose
this", it starts as *not chosen*. The user's rule, in his words: *"don't add it to any
record or profit unless I click 'I took it'."* A system that assumes consent is
claiming something untrue about a person.

**2. Never delete a row the user has touched.** Scope every destructive rewrite to
the untouched ones:

```sql
DELETE FROM bets WHERE card_date=? AND status='pending' AND IFNULL(taken,0)=0
```

A recommendation is replaced freely. A confirmation outlives any regeneration,
including one that no longer contains it.

**3. Preserve by IDENTITY, never by position.** Read the decisions back keyed on
what the thing *is* (market + selection + line; not slot 1, 2, 3), and re-apply in
**both** directions. Position-keyed preservation is how a decision gets transplanted
onto a different object, which is the failure that had the system asserting he bet
Toronto +197.

```python
prev = {(kind, market, sel, line): taken for ... }   # identity
# ... rebuild ...
for key, was in prev.items():
    if was is not None:
        set_taken(key, was)                          # both directions
```

## Where else this lives

Not a betting problem. The same shape appears in:

- a board rebuild that clears cards the user dragged or dismissed
- a re-scaffold that overwrites a file the user hand-edited
- a re-sync that resets a toggle, a mute, a "don't show me this again"
- a re-render that loses their scroll position, filter, or selection
- a re-import that discards their manual categorisation

## The question

Before any code that regenerates a collection:

> **Which of these rows did the user put their hand on, and does my rewrite know?**

If the answer is "the rewrite treats them all the same", the user's work is one run
away from being erased. And you will not find out from an exception. You will find
out when they tell you the number is wrong.
