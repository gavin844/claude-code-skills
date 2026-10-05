---
name: money-is-read-never-derived
description: Any balance, bankroll, profit or spend figure must be read from the system of record, never recomputed from history. Load before touching bankroll, P&L, capitalized profit, casino ledgers, spend meters, or any number the user will compare against a real account.
---

# Money is read, never derived

Every money bug in this project came from computing a figure that could have been read.

## The incidents

- **Derived bankroll.** Bankroll was rebuilt by summing settled bets. It drifted from the
  book. The fix was `book_balance.py`: bankroll is `available + pending`, read from the
  book, full stop.
- **`capitalized_profit` reset every Monday.** The weekly bankroll reset was applied to a
  cumulative figure. The user: *"capitalized profit shouldnt reset, and i did not go
  negative yesterday."* A derived number inherited a rule that belonged to a different
  number.
- **The $7.23 gap.** The bets table said +$4.14, the book said −$3.09. Both were computed
  from different histories, so neither could arbitrate.
- **A half-line graded PUSH.** Feltner U3.5 settled as a push. A 3.5 line cannot push; the
  pitcher never started, so it was a void. The grader derived an outcome from a score
  instead of reading the market state.

Every one of these printed a plausible number. None raised an error.

## The rules

1. **Name the system of record** for each figure, in a comment next to the code that
   reads it. For bankroll it is the book. For casino P&L it is the transactions feed.
   For LLM spend it is the provider's own usage number if one exists.
2. **Read it. Do not reconstruct it.** If the source can be queried, querying is the
   implementation.
3. **When you must derive, reconcile.** Compute it, read the truth, compare, and surface
   the delta as its own visible figure. A silent difference becomes the $7.23 gap.
4. **A reset applies to one named field.** Never to a family of fields because they live
   in the same dict. Weekly reset touches bankroll; it does not touch cumulative profit.
5. **Never invent a number.** Not a placeholder, not an estimate presented as a figure,
   not a rounded guess. Missing data becomes a sentence, never a digit.
6. **Nothing enters a record without the user's action.** No bet, stake or result is written
   to any record or profit figure unless he clicked *I took it*. This is his rule and it
   is absolute.
7. **Never settle while the event is live.** Grading gates on the source declaring it
   final. A shortened final is a push only where the line allows a push at all.

## The check before you say a money number out loud

- Where did this come from, and is that the system of record?
- If I read it a second way, do the two agree? If I did not check, say so.
- Is any part of it estimated? Then it is labelled, or it is not shown.

## Related

`fail-loud`, `freshness-is-a-precondition`, `user-state-is-sacred`,
`one-writer-per-record`.
