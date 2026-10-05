---
name: locate-before-you-guard
description: Find the line that produced the wrong output before adding a check that would have caught it. A guard is not a diagnosis, and a guard that reads as correct hides the cause it failed to fix. Use whenever tempted to add a cap, assert, retry, or validation in response to a bad result.
---

# Locate before you guard

**Adding a guard is not finding a bug.** It is a bet that you know where the bug is.
When the bet is wrong, the guard looks right, the symptom comes back, and the next
person reads the guard as proof the case was handled.

## The three-strikeout-props bug, twice

**2026-08-19.** The user received a card of three strikeout props at $20 each. Diagnosis
at the time: lock mode had no per-market ceiling. Fix: `MAX_PER_MARKET = 2`, applied
in every mode, with a careful comment about why concentration in one model is the
risk. It read as correct.

**2026-08-21.** The user: *"I'm still not understanding why there are three first five
baseball bets."* Same shape, ceiling in place, ceiling not violated.

The actual defect was four lines away and had been there the whole time:

```python
def _try_fill(cap):
    counts = {}          # <- EMPTY on every call
```

The variety ladder calls `_try_fill(cap=1)` and then `_try_fill(cap=2)`. The second
pass starts counting from zero, so it can add two *more* of a market the first pass
already used. **The ceiling was never the problem. The counter had no memory.**

Two days of a wrong card, because a plausible fix was shipped instead of a located
one. Worse: the ceiling made the code look like it had been handled, so nobody
re-opened it until the user asked again.

## The discipline

**1. Reproduce the wrong output.** Not a similar case, the actual one. Print the
intermediate values on the real input.

**2. Point at the line.** Say, out loud, *"the defect is at file:line, and it
produces the wrong value because X."* If you cannot finish that sentence, you have
not found it, and whatever you are about to add is a guess.

**3. Prove the mechanism, by breaking it deliberately.** Set the suspect to an absurd
value and confirm the symptom moves. If the symptom does not move, that line is not
the cause, no matter how suspicious it looks. This one experiment is faster than any
amount of reading, and it is what finally found the counter.

**4. Then add the guard.** Guards are still worth having, as the thing that catches
the *next* variant. They just are not the fix.

## Tells that you are guarding, not fixing

- "Let me add a check for that" before you can name the line.
- The same symptom has appeared before and there is already a guard for it.
- Your fix is a bigger number, a smaller number, or a retry.
- You cannot say what the wrong intermediate value was.
- The guard would also have "fixed" three other unrelated symptoms.

## When a guard IS the right answer

When the input is genuinely outside your control: hostile data, a flaky network, a
third-party shape change. Then the guard is the whole point, and it should be loud.
The distinction is whether the wrongness originated **inside** your code (find it) or
**outside** it (guard it).

## Related

`systematic-debugging` covers root-cause-before-fix in general. This is the narrower
trap of a fix that PASSES because it is a plausible constraint, and therefore
survives review while the defect keeps shipping.
