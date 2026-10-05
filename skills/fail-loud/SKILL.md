---
name: fail-loud
description: Make failures visible instead of silent. Use when writing exception handling, truthiness checks, resource lifecycles, or any lookup that can return nothing. Prevents bugs that present as working code.
---

# Fail loud

**The expensive bugs are not the ones that crash. They are the ones that return a
plausible answer.** A crash costs a turn. A silent wrong answer costs whatever was
decided on it.

Each pattern below is one I shipped this week.

## 1. Never `except: pass` in a data path

```python
try:
    ids = _starter_ids(day)      # needs `requests`
except Exception:
    pass                         # <- swallowed a NameError: requests not imported
```

The recent-form blend became a **no-op that still printed confident, unchanged
numbers**. It looked exactly like working code. I only found it because a probability I
expected to move did not.

```python
except Exception as e:           # noqa: BLE001
    print(f"[ttsf] recent-form blend unavailable: {e}")
```

If a failure is genuinely acceptable, say so out loud, once, with the reason. If it is
not acceptable, let it raise. `pass` is neither.

## 2. `if x:` is not `if x is not None:`

```python
if h3:                    # 0.0 is a VALID recent ERA
    era = blend(season, h3)
```

A pitcher with three scoreless starts had his form silently ignored, and I only noticed
because two runs of the "same" analysis disagreed. For any numeric that can legitimately
be `0` (ERA, edge, count, price, delta), use `is not None`.

Same family: `x or default` discards a legitimate `0`, `""`, `[]`, and `False`.

## 3. A lookup that finds nothing must not look like one that found something

```python
def game_pk(gid):
    if gid.startswith("mlb-"):
        return gid.split("-")[-1]
    return None            # every hash-form id, silently unresolvable
```

Every bet on a game whose id came from the other ingest path became **permanently
ungradeable**: never settled, never reported, never fed back into the model. No error
anywhere. Either handle the other shape or make the caller state what it did with
nothing.

## 4. Resources: write then commit, and do not use what you closed

- **`kv_set` without a transaction never persisted.** Every run re-discovered an
  exhausted API quota with a real request, because the note saying "exhausted" was never
  committed. Check whether your helper commits; if not, wrap it.
- **Building a payload dict after `con.close()`** threw `Cannot operate on a closed
  database`. Compute values while the resource is open; assemble afterwards.

## 5. Do not hardcode a list where a glob is correct

```python
PROP_PAGES = ["book_mlb_player_props.html", ...]     # three naming schemes exist
```

The readiness check read **17** rows while **246** sat in files whose names were not in
the list, and blocked a good card. Twice, because I fixed the list rather than the
approach. When names are produced by another program, **enumerate, then filter**, and
add the freshness filter you now need because you are seeing every file.

## 6. A display label is not a key

```python
m = models.get(_MODEL_KEY.get(_mkt(c)))   # _mkt returns "1ST TEAM TO SCORE"
```

Returned `{}` for every market, so a bias correction ran on nothing and reported
success. Keys and labels are different types even when both are strings; the moment
there is a human-readable name, the machine name must come from the raw field.

## The habit

After writing any `except`, any `if <numeric>`, any `.get()`, any lookup that can miss:

> **If this silently did nothing, would I be able to tell?**

If not, add the print, or the raise, or the `is not None`. The check costs one line. The
bug it hides costs a day and, here, real money.

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
