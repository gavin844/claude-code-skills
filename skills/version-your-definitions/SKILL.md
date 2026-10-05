---
name: version-your-definitions
description: When you change what a metric counts, every stored value of it becomes incomparable. Stamp the definition alongside the data and refuse to diff across versions. Use whenever editing an exclusion list, filter, threshold, or formula behind a tracked number.
---

# Version your definitions

**A metric is a number plus the rule that produced it.** Store only the number and
the next comparison silently measures your own edit.

## The LOC counter, 2026-08-21

The user: *"delete any fake lines of code, but obviously we're not going to have
negative lines of code."*

So the exclusion list changed: `logs` (40,352 lines of run output), dashboard state
JSON, generated intel, build caches all dropped; a client project added, having
never been counted. Roughly 16k off in one direction and 16k on in the other.

The history is a flat map:

```json
{ "2026-08-15": 602924, "2026-08-17": 628465 }
```

Nothing in there says *which rule produced 628465*. So the next delta subtracted a
v3 total from a v2 basis and reported **−449 lines**, presented as work the user had
done. Nobody deleted anything. The definition moved.

This was the second time. The **−2,976,118** the dashboard once showed came from the
same class: an entry counted while a directory of generated files was still included,
left sitting in the file, poisoning every later day.

## The fix

Stamp the rule, and refuse to compare across a mismatch:

```python
RULES_VERSION = "v3"    # bump on any change to PROJECT_DIRS, SRC_EXT, SKIP_DIRS, NOISE

def _prior_day():
    hist = load()
    if hist.get("_rules") != RULES_VERSION:
        print(f"[loc] history is {hist.get('_rules') or 'unstamped'}, "
              f"current is {RULES_VERSION}; not using it as a basis")
        return None                     # fall back to a same-rules source
    ...
```

A refused basis needs a fallback that measures the current definition directly. Here
that is `git_added_today()`.

### Adopting a new version retires the old data, it does not relabel it

My first attempt at this simply wrote the new stamp onto the existing file. That
relabelled v2 totals as v3 and made them look comparable. **Worse than the unstamped
state it replaced**, because it converted a detectable mismatch into a silent one.
Old values move to `_retired`: readable, never a basis.

## The same trap elsewhere

- **A calibration constant fitted on a window that then validates it.** Reports
  near-zero bias by arithmetic. `mlb_ttsf` claimed −0.29 points in sample and
  measured **−4.01** out of sample.
- **Renaming a metric's filter** and comparing to last month's dashboard.
- **Changing a test's assertions** and reporting the pass-rate trend.
- **Widening an error bucket** and announcing errors are up.
- **Adding a market to a P&L** and calling the difference performance.

## The question

Before editing any filter, exclusion, threshold, or formula behind a number you
track over time:

> **Does anything compare a stored value of this to a new one? If so, I have just
> made those two numbers different units.**

Either stamp the definition, or discard the history. Never diff across the change and
present the result as a trend.
