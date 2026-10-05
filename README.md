# Claude Code skills

A skill is a folder holding a `SKILL.md`: markdown instructions that
[Claude Code](https://claude.com/claude-code) loads when it is in a particular
situation, so a lesson learned once does not have to be relearned every session. Some
also carry a script.

These 24 were learned from shipping real systems through 2026. Most exist because
something broke quietly and the mistake only surfaced when a person looked at the
result. Each file records what went wrong, the rule that came out of it, and how to
recognise the moment it applies again.

## Install

Copy any folder into your skills directory:

```
cp -r skills/fail-loud ~/.claude/skills/
```

Claude Code picks it up on the next session. Every skill folder has its own page with what it does, when it fires, the install commands and its files; [skills/](skills/) is the index. Skills with `user-invocable: true` in
their `SKILL.md` header (`website-craft` and `web-motion-3d`) can also be called
directly, for example `/website-craft detect src`.

A few skills mention helper tools from their home workspace (`ui_check.js`,
`ux_audit.js`, `done_gate.py`). Those are not included; the skills stand without
them.

## Working methods

How the agent behaves across a session: when to act, when to ask, what to say, and
what counts as finished.

**[short](skills/short)**
Born from a complaint that every reply ended in a wall of text the reader skipped.
Hard word caps: 60 for an answer, 100 for a finished task, 150 for a long session.
The first sentence is the answer; process narration, recaps and praise go. Bad news
stays at full strength: "shorten the framing, never the fact." Always on.

**[just-keep-working](skills/just-keep-working)**
One session produced six variants of "want me to fix that?" about reversible tasks
the agent had already diagnosed. If the fix is reversible, do it and report one line:
"a question is a cost" paid by the person with less context. Still ask for money
moving, anything a third party sees, destroying data, changing a rule the user set,
or a genuine fork.

**[correction-to-rule](skills/correction-to-rule)**
A correction fixed in place dies with the session, and the user pays for it again
next week. Fires on "again", "I told you", "you keep", or a repeated instruction.
Name the real cause (wrong process, missing context, weak rule, unreachable rule,
unreliable code), write the fix in the smallest durable place (a hook, a skill body,
a memory file), then re-run the task that failed.

**[midwork-triggers](skills/midwork-triggers)**
On one day the agent broke seven things, and every one had a skill written for it
that never loaded: the router fires on what the user types, and the decisions
happened hours later. This is a table keyed on what the agent is about to do: add a
guard, explain a zero, regenerate something, say done, rank a list. Each row names
the skill and the failure that earned it.

**[preflight](skills/preflight)**
Twice in one day the agent replaced a rule the user had set, wrote a comment
explaining why its version was better, and shipped it; the comment made the
violation look deliberate. "A requirement the user stated is not a default to be
optimised." If a rule looks wrong, say so in one sentence and keep it. Before any
command that writes, sends, deploys or spends, name the assumption and the one
command that settles it.

**[user-state-is-sacred](skills/user-state-is-sacred)**
The user placed three real bets off a morning card. Three rebuilds later all three
were deleted, two plays he had never seen were marked taken, and nothing errored.
Three rules: a user decision is never the default, never delete a row the user has
touched, preserve by identity rather than position. Load before any rebuild, re-sync
or re-import that replaces rows a person may have edited.

**[done-means-proven](skills/done-means-proven)**
From the user: "You've done about maybe 70% of it. I tell you to fix it, and you say
you're done." The missing 30% is always somewhere the agent did not look, so evidence
must come from outside the work: a screenshot looked at, a job that fired on its own
schedule, a deploy fetched at the public URL. "Unverifiable is a legitimate outcome.
Unverified and unmentioned is not."

**[release-notes](skills/release-notes)**
Turns a branch, a commit range or a set of PRs into notes a non-engineer can read:
grouped by theme, file names translated into features, sorted into New, Improved,
Fixed and Behind the scenes. Claim only what shipped, and when the reason for a
change cannot be recovered from the diff, describe the what rather than guess the
why. Use when asked for a changelog or "what shipped".

**[creative-mode](skills/creative-mode)**
Written because the default agent is "too literal and too safe": it picks the
obvious option and ships a tidy increment. This mode
treats the instruction as the floor, generates six to ten different directions before
choosing, and picks "the boldest idea that is still real and shippable now." The
honesty floor stays: no invented data, no fabricated results.

## Engineering discipline

Rules for code and data, each from a bug that returned a plausible answer instead of
crashing.

**[authoring-code-safely](skills/authoring-code-safely)**
In one session, heredocs turned `"\n"` into literal newlines, `python -c` mangled a
regex escape, and an unquoted heredoc let the shell run backticked names as commands,
deleting text from four files while this very skill was being written. Source files
are written with Write and Edit, never through bash string surgery.

**[fail-loud](skills/fail-loud)**
"The expensive bugs are not the ones that crash. They are the ones that return a
plausible answer." Patterns from one week: an `except: pass` that turned a model
blend into a silent no-op, an `if x:` that discarded a legitimate zero, a lookup
returning `None` that left records permanently ungradeable. After any `except`,
`.get()` or truthiness check: "if this silently did nothing, would I be able to
tell?"

**[locate-before-you-guard](skills/locate-before-you-guard)**
A card showed three of one prop type; the fix was a per-market ceiling. Two days
later the same card came back, ceiling intact, because the real defect was a counter
four lines away that reset on every call. Reproduce the exact wrong output, point at
the line, and prove the mechanism by breaking it deliberately before adding any cap,
assert or retry. A guard catches the next variant; it is not the fix.

**[prove-the-checker](skills/prove-the-checker)**
Four checkers reported the opposite of the truth: a UI harness that tested dark mode
by removing the attribute, a hover test using a synthetic
event that cannot trigger CSS `:hover`, a guard that quarantined 77,900 valid rows.
Before its output influences a decision, a checker must pass a planted known-bad case
and a known-good case. "A checker with false results is worse than no checker."

**[save-the-script](skills/save-the-script)**
A markdown-to-document converter was written from scratch three times and thrown away
each time. A regenerated script "comes back slightly different every time", so output
drifts. Before writing, search the skills, tools and scratch directories for the
verb. After it works, give it arguments instead of hardcoded values, a header naming
the incident that produced it, and a home the next session will find.

**[wire-the-knob](skills/wire-the-knob)**
A parlay edge threshold sat in config and was read by zero lines of code for two
days, while parlays went 1W-10L on real money. When you
write a config value or gating constant, grep for it in the same turn; if the only
hit is the config file, wire it or delete it. Then set it to an absurd value once and
watch for a change.

**[one-writer-per-record](skills/one-writer-per-record)**
A scheduled watcher rebuilt the daily card and deleted the one a human had built
minutes earlier. A screenshot script matched buttons by visible
text and marked bets as placed. Every piece of durable state gets one named writer:
if a scheduler writes it, a human must not, and the reverse. Browser tools against
live systems block writes at the network layer, because "intent is not enforcement."

**[version-your-definitions](skills/version-your-definitions)**
A lines-of-code counter changed its exclusion list, and the next delta subtracted a
new-rules total from an old-rules basis, reporting negative work. "A metric is a
number plus the rule that produced it." Stamp the definition version beside stored
values, refuse to compare across a mismatch, and retire old data rather than relabel
it. Use before editing any filter, threshold or formula behind a tracked number.

**[freshness-is-a-precondition](skills/freshness-is-a-precondition)**
The most frequent failure in a week of work: a two-day-old capture built a card on
games already finished, a stale reference price manufactured edge out of elapsed
time. "Stale data does not look stale." Every input carries an age checked at the
point of use, unknown age is stale, and stale means refuse loudly rather than warn
and continue. Freshness of a file is not freshness of its content.

**[correlated-exposure](skills/correlated-exposure)**
A cap of two per market passed a card holding three picks that were one opinion about
the first five innings of a baseball game. Three tickets, one bet. The fix was
grouping by what decides the outcome, not a smaller number. Same shape: tests sharing
one fixture, retries against one dead resolver. "What single thing, if it were wrong,
would take all of these down together?"

**[enumerate-before-ranking](skills/enumerate-before-ranking)**
Ten markets had fresh prices; the card considered three. A whole market with 188
captured props was missing from the ingest loop, and nothing errored. "Picking the
best of what loaded is not picking the best." Count the universe from the sources,
compare it to what reached the ranking, and report the gap before the winner. Use
before choosing from any pool that could be quietly short.

**[money-is-read-never-derived](skills/money-is-read-never-derived)**
"Every money bug in this project came from computing a figure that could have been
read." A bankroll rebuilt from settled bets drifted from the account; two histories
disagreed by $7.23 and neither could arbitrate. Name the system of record beside the
code, read rather than reconstruct, surface the delta when derivation is unavoidable,
never invent a number, never settle while the event is live.

## Web apps

What a shipped surface has to pass, and how to keep it from looking generated.

**[web-app-baseline](skills/web-app-baseline)**
The user listed these once; they went into a rules file nothing referenced, so they
loaded nowhere. Now a skill, so it applies everywhere. Twenty checks: custom 404 and
error pages, loading and empty states, a title and Open Graph image per route,
keyboard reach, 360px responsiveness, AA contrast on composited colours, every UI
claim true, verified at the public URL. Covers the three theme states (dark, light,
unstamped) that kept biting.

**[website-craft](skills/website-craft)**
"All 30 of these are things that make a website obviously vibecoded." The 30 tells,
each with an instead: harsh gradients, the default icon set, pure white, three
feature cards in a row, the three default fonts, em dashes, fake testimonials, three
pricing tiers. The detector needs only Node:
`node skills/website-craft/scripts/detect.mjs <dir> [--json] [--only id,id] [--severity high]`
prints `file:line` per finding and exits 1 on any HIGH, so it gates a deploy. LOOK
items go to a human because "no regex can decide this."

**[web-motion-3d](skills/web-motion-3d)**
Motion is a tell when generic and an asset when it shows the product doing something;
3D is a tell when it is a blob and an asset when it is a real object. The pipeline:
Jitter to dotLottie via `@lottiefiles/dotlottie-react`, React Three Fiber with the
Canvas dynamic-imported and `dpr` capped, Vectary and its free-tier limits. Threlte
is Svelte-only, so nobody reaches for it in Next.js. "If you cannot say what
the motion tells the user, do not add it."

## How these were made

Gavin Long wrote these with Claude Code while building production systems through
2026: an internal business development system on a real sales pipeline, a Slack-based
operations assistant, a sports analytics engine, several deployed web apps,
and research bots. Each skill started as a correction or a failure in that work and
was written down so the next session would not repeat it.

The agent authored the text at Gavin's direction. The published copies are scrubbed
of client and colleague details; the dates, numbers and failures are as they
happened.

## License

MIT. See `LICENSE`.
