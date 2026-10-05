# Claude Code skills

A set of skills for [Claude Code](https://claude.com/claude-code). A skill is a
folder holding a `SKILL.md`: markdown instructions the agent loads when it is in a
particular situation, so the same lesson does not have to be relearned in every
session. Some also carry a script.

These were learned from shipping real systems over 2026. Most of them exist because
something broke, quietly, and the fix turned out to be a working habit rather than a
line of code. Each file says what went wrong, what the rule is, and how to tell when
it applies.

## Install

Copy any folder into your skills directory:

```
cp -r skills/fail-loud ~/.claude/skills/
```

Claude Code picks it up on the next session. Skills marked `user-invocable` in their
front matter can also be called directly, for example `/website-craft detect src`.

A few skills mention helper tools from the workspace they came from (`ui_check.js`,
`ux_audit.js`, a `done_gate.py` hook). Those are not included; the skills stand on
their own without them. The `website-craft` detector is included at
`skills/website-craft/scripts/detect.mjs` and runs with Node alone.

## The skills

| Skill | What it is for |
|---|---|
| `authoring-code-safely` | Write and edit source files with Write/Edit, never through bash heredocs or `python -c` string surgery. Prevents escaping corruption that silently breaks the file you just wrote. |
| `correction-to-rule` | Turn a correction into a durable change in the smallest place that will hold it, instead of a fix that lasts until the session ends. |
| `correlated-exposure` | A limit that counts by name misses things that share a cause. Group by what decides the outcome, not by how the source labels it. |
| `creative-mode` | An operating-mode shift for when the work would be better as a leap than a tweak: diverge before converging, bias toward bold, real, shippable invention. |
| `done-means-proven` | Use before saying anything is done, fixed, working, shipped or passing. Defines what counts as evidence for a page, a script, a scheduled job, a document and a data change. |
| `enumerate-before-ranking` | List the whole option set before picking from it. Ranking a subset you happened to load is not selection, it is accident. |
| `fail-loud` | Make failures visible instead of silent. For exception handling, truthiness checks, resource lifecycles and any lookup that can return nothing. |
| `freshness-is-a-precondition` | Treat the age of every input as part of its validity. Prevents confident output computed from stale data. |
| `just-keep-working` | Do the work instead of asking permission for it. When the next step is obvious and reversible, take it and report what happened. |
| `locate-before-you-guard` | Find the line that produced the wrong output before adding a check that would have caught it. A guard is not a diagnosis. |
| `midwork-triggers` | Load the skill that matches the situation you are in, not the words the user typed. Keyed on what you are about to do. |
| `money-is-read-never-derived` | Any balance, profit or spend figure must be read from the system of record, never recomputed from history. |
| `one-writer-per-record` | Any file, row or key that both a scheduled task and an interactive session can write needs exactly one owner, or it gets destroyed. |
| `preflight` | Never quietly change a rule the user set, and run the one cheap check that would settle your assumption before acting. |
| `prove-the-checker` | Every guard, validator, audit or harness must be proven against a known-bad case and a known-good case before its output is trusted. |
| `release-notes` | Turn git history, a branch or a set of PRs into notes that read like a product update, not a commit log. |
| `save-the-script` | Turn a working one-off into a tool a future session runs instead of reinventing. Look for it before writing; save it after it works. |
| `short` | Hard word caps on every reply. Lead with the answer, cut process narration, no recaps. |
| `user-state-is-sacred` | Anything the user explicitly decided is a fact about the world, not data your code owns. Never let a regeneration delete, overwrite or transplant it. |
| `version-your-definitions` | When you change what a metric counts, every stored value becomes incomparable. Stamp the definition alongside the data and refuse to diff across versions. |
| `web-app-baseline` | The 20 checks every web app must pass before it is called done, plus the measurement approach that proves each one. |
| `web-motion-3d` | How to put real motion and real 3D into a web app without it reading as generated: Jitter to Lottie, Vectary, React Three Fiber. |
| `website-craft` | The 30 tells that make a site look vibecoded, with a runnable detector, plus the design tools worth reaching for. |
| `wire-the-knob` | When you add a config value, threshold or flag, prove some code reads it before claiming it does anything. |

Written by Gavin Long with Claude Code while building production systems.

MIT licensed. See `LICENSE`.
