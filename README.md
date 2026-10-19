# Claude Code skills

A skill is a folder holding a `SKILL.md`: markdown instructions that
[Claude Code](https://claude.com/claude-code) loads when it is in a particular
situation, so a lesson learned once does not have to be relearned every session. Some
also carry a script.

These 37 were written while shipping real systems through 2026, in seven groups. The
first four groups are rules: most exist because something broke quietly and the mistake
only surfaced when a person looked at the result, so each records what went wrong, the
rule that came out of it, and how to recognise the moment it applies again. The last three
are working playbooks for a consultancy, a recruiting product and a betting analyst. They
ship with sample companies and sample numbers in place of the real ones; each says what
to replace to make it yours.

## Install

Copy any skill folder into your skills directory:

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/honest-code/fail-loud ~/.claude/skills/
```

Claude Code picks it up on the next session. The group folder is only for browsing; the
skill folder goes straight into `~/.claude/skills/`. Every skill has its own page with
what it does, when it loads, what is inside, and its install commands.

A few skills mention helper tools from their home workspace (`ui_check.js`,
`ux_audit.js`, `done_gate.py`). Those are not included; the skills stand without them.

## [Working methods](skills/working-methods)

How the agent behaves across a session: when to act, when to ask, what to say, and what counts as finished.

| Skill | What it does |
|---|---|
| [short](skills/working-methods/short) | Hard word caps on every reply: the answer first, no narration, no recaps. |
| [just-keep-working](skills/working-methods/just-keep-working) | When the next step is obvious and reversible, do it and report, instead of asking permission. |
| [correction-to-rule](skills/working-methods/correction-to-rule) | Turn a user's correction into a durable rule so the same mistake does not come back next session. |
| [midwork-triggers](skills/working-methods/midwork-triggers) | Load the right skill from what the agent is about to do mid-task, not only from the words of the request. |
| [preflight](skills/working-methods/preflight) | Before anything that writes, sends, deploys or spends, run the one check that settles the assumption, and never quietly change a rule the user set. |
| [done-means-proven](skills/working-methods/done-means-proven) | Nothing is called done without evidence from outside the work: a screenshot looked at, a job that fired, a live URL fetched. |
| [creative-mode](skills/working-methods/creative-mode) | On a request for creativity, diverge widely before converging, and aim for a bold, shippable leap over a safe tweak. |

## [Honest code](skills/honest-code)

Code that tells the truth about itself: failures that show, checks that are proven, settings that are wired, scripts that are kept.

| Skill | What it does |
|---|---|
| [authoring-code-safely](skills/honest-code/authoring-code-safely) | Write code with the file tools, never through shell string surgery, so escaping cannot corrupt the file. |
| [fail-loud](skills/honest-code/fail-loud) | Make failures visible instead of swallowed, so broken code cannot pass for working code. |
| [locate-before-you-guard](skills/honest-code/locate-before-you-guard) | Find the line that produced the wrong output before adding a check that would hide it. |
| [prove-the-checker](skills/honest-code/prove-the-checker) | Test every validator against a known-bad and a known-good case before trusting what it says. |
| [wire-the-knob](skills/honest-code/wire-the-knob) | Prove some code reads a new setting before claiming the setting changes anything. |
| [save-the-script](skills/honest-code/save-the-script) | Turn a working one-off script into a kept tool instead of rewriting it next time. |

## [Trustworthy data](skills/trustworthy-data)

Numbers and records a person can rely on: fresh inputs, money read from the source, user decisions that survive a rebuild.

| Skill | What it does |
|---|---|
| [user-state-is-sacred](skills/trustworthy-data/user-state-is-sacred) | Anything a person decided by hand survives every rebuild, re-sync and regeneration. |
| [one-writer-per-record](skills/trustworthy-data/one-writer-per-record) | A record that a scheduled job and a live session can both write gets exactly one owner. |
| [freshness-is-a-precondition](skills/trustworthy-data/freshness-is-a-precondition) | Check the age of cached data, prices and stats before acting on them. |
| [money-is-read-never-derived](skills/trustworthy-data/money-is-read-never-derived) | Read balances and profit from the system of record, never recompute them from history. |
| [version-your-definitions](skills/trustworthy-data/version-your-definitions) | Stamp a metric's definition next to its values, so numbers from different formulas are never compared. |
| [correlated-exposure](skills/trustworthy-data/correlated-exposure) | Group by what decides the outcome, not by the label, so an "at most N" limit catches hidden overlap. |
| [enumerate-before-ranking](skills/trustworthy-data/enumerate-before-ranking) | List the whole option set before picking the best, so the pick is not made from a partial list. |

## [Web apps](skills/web-apps)

Shipping a web surface that is finished, does not look generated, and moves well.

| Skill | What it does |
|---|---|
| [web-app-baseline](skills/web-apps/web-app-baseline) | The 20 checks every web app passes before it is called done, with the commands that prove them. |
| [website-craft](skills/web-apps/website-craft) | The 30 tells that make a site look machine-made, with a detector that finds them. |
| [web-motion-3d](skills/web-apps/web-motion-3d) | Real animation and 3D in a web app (Lottie, React Three Fiber, Vectary) without it reading as generated. |

## [Client work](skills/client-work)

A consultancy's sales and delivery documents, from the first call to the release notes. Ships with a sample company, Fieldstone AI, to replace with your own.

| Skill | What it does |
|---|---|
| [blueprint-builder](skills/client-work/blueprint-builder) | A tailored top-of-funnel Opportunity Blueprint that shows a prospect where AI can move their business. |
| [discovery-call-prep](skills/client-work/discovery-call-prep) | A one-page brief before a prospect call: who is in the room, where the deal stands, the angle and the opening question. |
| [client-follow-up](skills/client-work/client-follow-up) | A meeting transcript becomes a follow-up email draft and a table of next actions with owners and dates. |
| [sow-scoping](skills/client-work/sow-scoping) | Discovery notes become a Statement of Work draft with phases, deliverables, roles and assumptions, price left as XXX. |
| [demo-script](skills/client-work/demo-script) | A timed two-minute product demo: the hook, the one live wow moment, the proof and a single ask. |
| [release-notes](skills/client-work/release-notes) | Git history becomes release notes that read like a product update, not a commit log. |

## [Recruiting](skills/recruiting)

Screening resumes in batches, selling to staffing agencies, and grading job postings. Ships with sample data to replace with your own.

| Skill | What it does |
|---|---|
| [resume-batch-run](skills/recruiting/resume-batch-run) | Run a client's batch of resumes through an AI screener, tier the candidates, and give a reason for every score. |
| [staffing-outreach](skills/recruiting/staffing-outreach) | Cold outreach to staffing agencies that offers to rank one of their live batches, with two follow-ups. |
| [job-posting-grader](skills/recruiting/job-posting-grader) | Grade a job posting from the seeker's side, and keep a grader honest when it publishes about named companies. |

## [Betting and money](skills/betting-and-money)

A recommend-only sports betting analyst and a personal finance coach. Neither places a bet or a trade. Ships with a sample $1,000 bankroll.

| Skill | What it does |
|---|---|
| [sharp](skills/betting-and-money/sharp) | A recommend-only sports betting analyst: de-vig the market, price it, and gate every play on backtest-proven confidence. |
| [sharp-card-build](skills/betting-and-money/sharp-card-build) | The daily routine that turns captured lines into a short card of straights and parlays, recommend-only. |
| [sharp-book-scraping](skills/betting-and-money/sharp-book-scraping) | Read a sportsbook's lines with Playwright without killing the session or reporting a capture that did not happen. |
| [sharp-ufc](skills/betting-and-money/sharp-ufc) | Read a UFC card fight by fight and say who to back and why, recommend-only. |
| [financial-advisor](skills/betting-and-money/financial-advisor) | An educational personal-finance coach that learns from a ledger of past picks and lessons. Not financial advice. |

## How these were made

Gavin Long wrote these with Claude Code while building production systems through
2026: an internal business development system on a real sales pipeline, a Slack-based
operations assistant, a sports analytics engine, several deployed web apps, and research
bots. Each rule started as a correction or a failure in that work and was written down so
the next session would not repeat it.

The agent authored the text at Gavin's direction. The published copies are scrubbed of
client and colleague details; in the rule groups the dates, numbers and failures are as
they happened. The playbook groups run on made-up sample data.

## Keeping it consistent

Every README in this repo is generated. Edit a `SKILL.md` or `catalog.json`, then run
`python scripts/build_readmes.py`; `--check` fails if any page is out of date.

## License

MIT. See `LICENSE`.
