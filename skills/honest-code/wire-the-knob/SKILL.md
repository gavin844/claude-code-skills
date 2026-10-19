---
name: wire-the-knob
description: When you add a config value, threshold, or flag, prove some code reads it before claiming it does anything. Use whenever writing to a config file or introducing a constant that is meant to gate or size behaviour. Prevents settings that look like controls but are comments.
---

# Wire the knob

**A threshold nothing reads is worse than no threshold: it looks like a control, it
gets cited in explanations, and it changes nothing.**

## What actually went wrong

- **`min_edge_parlay_leg: 0.052`**: set with a careful written justification (a parlay
  multiplies model error, so a leg must survive being wrong by the amount the models are
  measured to be wrong by). Referenced by **zero lines of code** for two days. Parlay
  legs only ever needed `edge > 0`. Parlays went **1W-10L** on real money, and the
  losing leg the day I found it was at +3.18%, under the bar that was supposed to
  exclude it. I had even quoted the number back while explaining the losses.
- **`weekly_stop_loss: 55`**: the actual downside protection, in the config, read by
  nothing. Meanwhile a turnover cap (which is volume, not risk) was doing all the
  limiting: $148 of turnover blocked a card while a realised −$37 went unchecked.

Both were mine, both were confidently documented, and both were fiction.

## The rule

The moment you write a value into a config file, or define a constant meant to gate or
size something, do this **in the same turn**:

```
grep -rn "the_setting_name" <source dirs>
```

If the only hit is the config file itself, the setting does nothing. Either wire it or
delete it. Do not leave it there "for later". Later it will be quoted as a reason.

## Then make it self-checking

One grep protects you once. A test protects you forever. Add the setting to a list that
something actually asserts:

```python
# every value here is meant to gate or size behaviour; a name absent from every
# module means the number in config is decoration
watched = ["min_edge_parlay_leg", "weekly_stop_loss", "min_edge_straight", ...]
missing = [k for k in watched if k not in all_source_text]
```

This is cheap and it catches the next one. It caught nothing on the day I wrote it,
because I had just fixed both, which is exactly when to add it.

## The same bug in other clothes

Watch for these, they are the same failure:

- **A schema default that does not apply.** `ALTER TABLE` does not change the default on
  a column that already exists. I changed `taken` to default 1, every new row still
  landed 0, and the bankroll stopped moving for winning bets. Set the value
  **explicitly** in the INSERT; do not rely on a default you edited.
- **A guard that warns and then proceeds.** A `--dry-run` that prints "this would cost
  26 credits" and then spends them is not a guard. Make it `return`.
- **A throttle cancelled downstream.** Halving a stake and then applying a `max(stake,
  floor)` puts it straight back. The control existed, ran, and did nothing.
- **A cap applied to one path.** Capping straights but not parlay legs let one market
  take four of five card slots. If a limit is about a resource, apply it everywhere that
  resource is spent.

## The test that matters

For any control you add, ask: **what observable thing changes if I set this to an absurd
value?** Set it to that absurd value once and watch the behaviour change. If nothing
changes, it is not wired. That single experiment is faster than any amount of reading.

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
