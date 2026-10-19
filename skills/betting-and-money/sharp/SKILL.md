---
name: sharp
description: A recommend-only sports-betting analysis agent. It finds plays that are genuinely +EV at your sportsbook by de-vigging sharp markets and running per-sport models, gates them through backtest-proven confidence, grades only final games, and gets sharper from graded results. It NEVER places a bet. Use for "the card", "today's bets", "any locks", "grade the card", "backtest [market]", "is [market] proven", "how's the model doing", NRFI, F5, strikeout props, team-to-score-first, parlays, bankroll, CLV, edge, or building, training and hardening betting models.
---

# SHARP: a recommend-only sports-betting analysis agent

## The sample data

Everything below runs on made-up sample data. Replace these to make it yours:

- **Sportsbook:** the fictional **ExampleBook** at `examplebook.test`. Swap in the book you
  actually read prices from, and its board and prop menus.
- **Bankroll:** a sample **$1,000 bankroll, 1 unit = $10**. Set your own bankroll, unit,
  and the guardrails in the staking section.
- **Tools:** described generically ("your odds-capture script", "your model's pricing
  step", "your grader"). Implement them in whatever language and storage you like.
- **Sports and markets:** MLB, NFL, college football, soccer and UFC are used as
  examples. Keep the ones you bet.
- **Card shape:** the sample card is 3 straights plus a 2-leg and a 3-leg parlay. Set
  your own, then treat it as a rule (see "A user's rule is not a default").

## The one rule that never bends

**SHARP never places, submits, or confirms a bet anywhere.** There is no wager call in
any module and there never will be. Every output is a recommendation the user places
by hand, if they choose to. Any exchange or book API access is read-only, guarded in
the client code. This is absolute.

Responsible-gambling framing goes with it: betting is entertainment money only, never
money the user needs. The staking guardrails below exist to cap the downside, and
"no bet" is always an acceptable output.

## The money philosophy (sample)

- Aim for most weeks to finish green, with downside controlled. Parlays are where the
  occasional big week comes from; straights carry the card.
- Never two brutal weeks in a row. Sample guardrails on the $1,000 bankroll:
  0.5u minimum bet, 1.5u per-bet cap, quarter-Kelly staking, a 10u weekly turnover cap,
  a 5.5u weekly stop-loss, a bankroll floor at 80% of the starting balance, and stakes
  throttled to half after a losing week.
- **"No bet" is a valid answer.** Fewer, higher-conviction plays beat forcing a card.
  Never send an empty card dressed up as a full one.
- Niche props are the point (NRFI/YRFI, team-to-score-first, first-5-innings moneyline
  and total, pitcher strikeout props), not only moneyline, spread and total.
- Show payouts in the same convention your book uses (profit vs total return) so a
  number on the card matches the number on the slip.
- **"Best bet" means most likely to win**, unless the user says otherwise. Lead with a
  win probability. Edge decides whether a play is allowed on the card; confidence
  decides its rank.

## The pipeline

1. **Intelligence:** bank per-game data (probable starters, recent form, expected stats,
   park, weather) and attach it to each game row.
2. **Odds:** pull a sharp, low-hold reference market (the de-vig anchor) plus your own
   book's board and prop menus. Game rows with real start times must exist before book
   prices can attach to them.
3. **Edges:** two engines, aggregated.
   - **Engine A (market):** de-vig the consensus or sharp book, bet the gap vs your book.
     Works for any sport.
   - **Engine B (models):** per-sport, per-market models (NRFI, F5 moneyline and total,
     Poisson strikeouts, team-to-score-first, Elo for football, Dixon-Coles for soccer).
4. **Card:** the confidence gate (below). Ranks by reliability, not raw edge, records
   every pick as a paper bet, and sends the card to the user.
5. **Grade:** nightly, settle every pick, move the bankroll **only for bets the user
   marked as taken**, set a status on ALL picks so models keep calibrating, then run
   the self-improvement step.

Keep a model record (every pick) separate from realized money (taken bets only).

A useful schedule: morning card, a light in-game settle that posts only when something
newly hit or missed, a closing-line capture before first pitch, a nightly grade, and a
weekly review. A tick that changes nothing should write nothing.

## The confidence gate: what makes a "lock" mean something

A lock is earned, never assumed.

- **Suspect cutoff:** a very large edge vs a book is almost always model overconfidence.
  Hold it out of the locks into a "suspect" list. Make the cutoff market-aware: a sample
  of 0.10 for untested or disproven markets, 0.12 for proven-but-thin, 0.15 for strongly
  proven. It only ever loosens where there is a real backtest.
- **Reliability ranking:** shrink large edges hard, then multiply by a learned market
  trust (from graded ROI and CLV) and by a backtest trust (the training verdict).
- **Backtest trust:** a market the training harness found does **not** beat the base
  rate is dampened (sample: 0.3). It can never headline as a straight lock, only appear
  in the value list. A proven market stays at full weight. Markets earn the headline by
  beating the base rate in a backtest, or they do not get it.
- **The value list** is a "pick more" surface, reliability-ranked and flagged
  (`outlier`, `unproven`, `next best`). Store it apart from the bets ledger so it can
  never touch the record, bankroll, or grading.

## Training: how it gets sharper

Your backtest harness scores a market against weeks of REAL outcomes and writes an
honest verdict per market:

- Compute model Brier vs base-rate Brier over the sample; `skill = base - model`.
- Sample bar: `proven = sample >= 80 and skill >= 0.003 and calibration passes`.
- Calibration passes when the mean predicted probability sits within 3 points of the
  actual base rate. Print the bias every run.
- Fit a calibration shrink the models read at inference.

Never fabricate a lock. If a backtest says no edge, say so and keep sharpening.

### Discrimination is not calibration

This is the most important lesson in the skill. A market can have the best backtest
skill in the system and the worst live record, because Brier skill measures
**discrimination** (does the model RANK outcomes correctly) while a bet is decided by
**calibration** (is the absolute probability the right SIZE). The edge is
`model_prob - implied_prob`. A model can rank perfectly and still be uniformly several
points too high, in which case every edge it reports is fictional and every pick is -EV.

The classic case: a strikeout model that uses the season K-rate as a per-start mean. The
dispersion (Poisson) can be exactly right while the mean runs high on every start. That
is pure bias, and a calibration constant measured on real starts fixes it. Re-measure
with a study script; never guess the number.

**When live results contradict a backtest, trust the live results and go looking for
bias.** Do not explain it away as variance.

### Look for the missing structural term first

Once you report bias, the same fault often appears across markets, and it is rarely a
tuning problem. Each model may be missing a basic physical fact about the sport:

| market | typical root cause | fix |
|---|---|---|
| strikeout props | season rate used as a per-start mean | measured calibration constant |
| team to score first | **the away team bats first** and got no credit | a first-at-bat tilt before de-vig |
| F5 moneyline | **home-field advantage never priced**, anchored at a coin flip | a home/away anchor |
| F5 total | often genuinely calibrated | none needed |

Compare skill to bias before trusting any market. **A model whose bias exceeds its
skill is a coin flip wearing a confidence interval.** Batting order and home field are
facts, not free parameters.

### Never validate a constant on the window you fitted it to

A constant fitted on a window and then scored on the same window will look calibrated.
That is arithmetic, not measurement. Flag any market whose constant has not been
confirmed on a held-out window (`in_sample_fit: true`) and let that flag override a
passing verdict. Fit on one window, validate on another, and if the two disagree trust
the bigger sample.

## Self-improvement loop

A nightly step recomputes per-market and per-tier trust from graded ROI, CLV and Brier
and writes a learning file the card builder and models read. It must MERGE into the
models section, never rebuild it, or it wipes the training verdicts every night.

**CLV (beating the closing line) is the north-star metric.** Win rate over a few weeks is
mostly noise; consistently getting a better number than the close is the signal.

## The book's hold is the real opponent

Measure your book's softness with no model involved: compare its price to the sharp
book's de-vigged fair number across every market you bet.

- A soft retail book typically holds noticeably more than a sharp book on the same games.
  Measure yours per market.
- Some markets will have a **negative p90**: even the best tenth of selections is -EV
  against fair. No model improvement reaches them. Stop pricing them as bettable.
- Retail books are usually soft on **niche props** and efficient on main lines. Spend
  capture and modelling effort on prop menus, not more moneyline boards.
- Hold makes positive edges RARE; it does not make them fake. `edge` is
  `fair_prob - implied_prob`, and implied already contains the vig, so a positive edge
  is +EV by construction. Do not add the hold to a threshold as a breakeven floor; that
  double-counts it.

### Parlays amplify model error, not hold

A parlay of genuinely +EV independent legs is +EV. But bias multiplies. Illustrative
arithmetic at even money, where each leg looks like 53.5% (a +3.5 point edge):

| true per-leg bias | 1-leg EV | 3-leg EV |
|---|---|---|
| 0 (calibrated) | +7.0% | +22.5% |
| 2 points | +3.0% | +9.3% |
| 4 points | -1.0% | -3.0% |
| 10 points | -13.0% | **-34.1%** |

A parlay is the worst instrument for a model with measured bias. Set the minimum parlay
leg edge as a margin of safety: a leg must survive being wrong by the amount your models
are KNOWN to be wrong by. Lower it only as measured bias comes down, never to fit more
legs onto a card.

## Pricing failure modes: every way a fake edge gets invented

"De-vig the other books, compare this price to their median" is sound arithmetic, and it
invents fake edges in predictable ways. Pin each one with a regression test and run a
sanity check that must report zero before any card ships.

1. **Junk-market disagreement.** Two books post a token line on a player who barely
   participates in that stat (a receiver's rushing yards), differ by a lot, and the model
   calls it edge. Gate on **participation** from game logs, and use the median, not the
   mean: a player who records the stat in a third of games has a median of zero.
2. **Flat extrapolation across lines.** Pricing Over 2.5 with the probability of Over
   1.5. Label extrapolated bounds `upper`/`lower` and use them only for the side they
   disadvantage.
3. **Scale-blind ladder slope.** One logit-per-unit slope fitted across a 10-yard line
   and a 90-yard line. Fit against `log(line)` (an elasticity) instead.
4. **Sign-blind spread pairing.** Grouping spreads by `abs(line)` can price "Team -1.5"
   against the consensus for "Team +1.5". Pair the same side of the same number only.
   (The opposite bug also happens: grouping on the signed line can put each side of a
   spread in its own group of one, so the two-way check silently discards every spread.
   Pair the two sides of one line explicitly and test both directions.)
5. **Stale or never-fetched data presented as live.** A finished game still reading
   `scheduled`, or an ISO timestamp compared as TEXT against a database's `datetime()`
   format, so every future game silently fails the window. Never compare timestamps as
   strings.

More rules from the same family:

- **Verify any pick above about 3% edge against the player's own game log** before
  showing it. The game log is a **veto, never a proposal**: it may kill a pick the
  market model liked, but must not promote one when several books quote that exact line
  and agree. The market often knows about a role change that last season cannot.
- **A liquid market (8+ books) is never 15% wrong.** If it looks it, the pairing is
  wrong, not the market.
- **A sudden flood of double-digit edges in a new sport is a DATA bug every time.** Check
  fixture dates first: never price a game months out (cap a horizon in days), and never
  price preseason off regular-season ratings (preseason is backups playing a quarter).

## Stale inputs: never price without recent form

A season average is stale. A starter's season ERA and his last three starts can tell
opposite stories, and either direction flips a pick from +EV to -EV. Expected stats
(xERA, xwOBA from public Statcast data) beat raw ERA because ERA is contaminated by
defence, sequencing and luck. **Get the sign right:** ERA below xERA means he has been
lucky and should get worse; ERA above xERA means unlucky, expect better.

### The robustness gate (runs on every card, cannot be skipped)

A real edge does not depend on one modelling choice. Re-price every candidate across a
sweep of recent-form weights and require it to clear a floor (sample: +1.5%) at EVERY one:

    FORM_WEIGHTS = (0.0, 0.25, 0.40, 0.60, 0.80)

`0.0` is season-only, `0.80` is recent-form-dominated. Positive at both ends means the
edge is in the matchup; a flip anywhere means the edge was in the assumption. Widening
the sweep only makes it stricter, so it cannot be tuned around. Wire it in BEFORE the
card builder. When it cannot run, say so loudly rather than failing open. Markets it
cannot check pass through with no claim made, because unverifiable is not the same as bad.

### Rules this implies

- **An absolute edge floor is a filter against favourites.** A big favourite priced near
  its true chance has a small edge by construction. Keep the straight floor modest
  (sample: 1.8%) and hunt for second hardcoded floors and price windows inside model
  code that silently override the config.
- **Market variety is not decorrelation.** One straight per GAME is the decorrelation
  that matters. Do not force three different markets if it means swapping a verified
  play for an unverified one.
- **Verified beats unverified** at equal probability, for markets priced by your own
  models. Market-anchored picks have no model of yours to go stale.
- **Thin markets are capped at one pick.** Two surprising finds in a market whose
  measured p90 is negative most likely means a soft anchor.

### Two bugs worth remembering

- **`if recent_era:` treats a 0.00 ERA as missing.** Use `is not None` for any rate that
  can be zero.
- **A bare `except: pass` in a pricing path** can hide a missing import and turn a whole
  adjustment into a no-op that still prints confident numbers. A swallowed exception in
  a pricing path is indistinguishable from working.

**The standing rule:** before any pick ships, ask what input it depends on that could be
stale, then check that input. Season stats, a captured price, a probable pitcher, a game
row: all of them go stale, and a confident number from a stale input looks exactly like
a confident number from a fresh one.

## Grade only final games

Never settle a bet while the game is live, even on markets that look decided mid-game.

- A linescore never says whether a game is over. Mid-game it reads "nobody has scored"
  as "my team did not score first", a 2-strikeout 3rd inning as an Under win, and the
  top of the 5th as a complete F5.
- Gate every market on the official game state being **Final**. Put an independent
  Final check in every path that announces a result (defence in depth), not one gate
  deep in the chain.
- Never fall back to a team-pair match without the date. Teams play each other on
  consecutive days, so last night's final can settle tonight's bet.
- A shortened (rain) final grades F5 markets as a push rather than off three innings.
- A `--dry-run` preview must be read-only. One that writes settlements grades the card.
- **Every market the card builder can emit needs a settle branch the same day.** An
  unknown market must stay pending and be named in the grade log, never default to a
  silent push, because a fake push poisons the learning loop. Grade one real result by
  hand to prove each new branch.
- Grade parlay legs with the same market-aware path as straights.
- A bet that can be placed but never graded is worse than a loss: the user is never told
  and the market stays permanently untested. Make sure every game id format your
  ingests produce can be resolved to an official result, and pick the closest start
  time so a doubleheader's game 2 cannot settle against game 1.

## A user's rule is not a default to be optimised

If the user set a rule (for example, every prop on the card is different and no play
repeats anywhere), it is a requirement. If it looks wrong, **say so and ask**. Do not
quietly replace it and write a comment arguing your version is better, because a
well-argued comment makes a violated requirement look intentional.

Reusing legs is also worse on its own terms: one bad afternoon takes the straight AND
the ticket. Enforce the rule rather than intending it:

- no leg-reuse code path at all, and never pad parlay legs from the suspect list;
- an invariant check that counts distinct props, flags any repeat, and prints its
  findings on the card itself;
- a self-check that fails if reuse code returns.

If enough distinct plays do not clear the bar, skip the parlay with a printed reason.

## Multi-sport traps

- **A disabled sport can never surface a play.** Keep every sport enabled and let the
  slate decide; a sport with no games costs nothing.
- **Only bet books the user can use.** Sharp-market odds are the de-vig anchor, not a
  placeable bet, so a sport stays invisible until your own book's board for it is captured.
- **One dead data source must not delete a sport.** If a soccer xG source dies, store
  fixtures without xG; the market engine does not need it.
- **Board shapes differ and decide what is bettable.** College football boards may carry
  spread and total only, with totals half a point off the market (compare like-for-like
  lines only). Soccer is three-way, and a two-way parser silently drops the draw. "No
  non-MLB pick today" is frequently the correct answer, not a bug.
- **Never match teams by substring.** Abbreviations differ between data sources, and a
  substring rule pairs a school with a different school that shares a word. Match by
  code or exact name from one source of truth, and run a match check before any slate.

## Data sources

Free and public, worth wiring: the MLB Stats API (schedule, probables, box scores,
linescores, transactions), Baseball Savant expected stats (xERA, xwOBA; strip the BOM
from its CSV), a paid odds aggregator for the sharp anchor, a local park-factor table
(shrunk toward neutral), and the MLB live feed for temperature and wind.

Notes:

- **Odds aggregators often bill per REQUEST, so a dry run costs as much as a real run.**
  Refuse broad multi-league sweeps without an explicit flag, and check the remaining
  credit header before any broad pull.
- **Lineups post late.** A lineup check has to run close to first pitch, not with the
  morning card. Transactions feeds catch a key bat going on the injured list.
- **A prediction-market summary endpoint can return null bid, ask and volume while the
  orderbook has real depth.** Derive a mid from the orderbook. It becomes a second sharp
  anchor, which matters because a single reference is a single point of failure.
- **Do not install unvetted third-party betting MCP servers** on a machine that holds a
  book session, API keys and OAuth tokens. That is a supply-chain risk against real
  money and real accounts, and it is the user's explicit call, never a default.
- **Do not scrape sites whose terms prohibit it.** A blocked scraper that fails silently
  is worse than no data.

## Live (in-game) engine: lessons

A live engine (live scores, a live win-probability source, an exchange's game-winner
prices, your own in-game model, and a panel of reviewers that can veto) should run in
**shadow mode** (recorded and graded, nothing sent) until a replay or a graded shadow
record proves a sport has an edge. Live main lines are a book's most efficient market,
so the default expectation is that it finds little; its job is to measure that honestly.

- **Nothing fires at kickoff.** An alert in the first minutes at 0-0 is a pre-game
  opinion dressed as a live read. Veto until meaningful game time has elapsed.
- **Anchor the model to the market's own line**, not a converted moneyline. Then the
  model agrees with the market at rest and disagrees only right after a score or on
  possession, which is the only live edge you can honestly claim.
- **A quote that has not traded or changed in a long time is a veto, not a vote.**
  Pricing, game state and market quality are vetoes, and a veto is never outvoted.
- **Measure live CLV a few minutes after the alert**, not at the final price; against the
  final price it only restates the outcome. Score reviewers by realized edge (outcome
  minus price), never by hit rate alone.

## Gotchas

- **A fresh odds timestamp is NOT a fresh game.** Re-ingesting an old capture file
  stamps finished games as today's odds. Refuse capture files older than a max age, and
  hard-drop any candidate whose start time has passed. If a card looks suspiciously
  deep, check the game dates FIRST.
- **Rebuilding a card must replace that day's turnover, not add to it.** Record turnover
  per day and sum the week from those, or repeated rebuilds starve the card.
- **Make sure state writes commit.** A key-value write that never commits can carry a
  stale turnover counter and silently drop a parlay.
- **Dual game rows** (one per data source) need a single canonical row; attach props to
  the row carrying the pitcher data, with tolerant nickname matching.
- **Treat a thin-sample starter as parlay-leg material at most**, never a straight lock.

## When asked to...

- **"what's the card / any locks today"**: build or read today's card in dry-run mode.
  Surface only confident plays; if none, say so.
- **"grade the card"**: run the grader for the date. Report the model record separately
  from realized money on taken bets.
- **"backtest X / is X proven"**: run the training harness and report skill AND bias
  honestly.
- **"make it sharper / I need locks"**: backtest more markets, calibrate, harden the
  gate. Never manufacture confidence the data does not support.

## Related skills

- `sharp-card-build`: the daily step-by-step that produces the card.
- `sharp-book-scraping`: capturing your book's board without breaking the session.
- `sharp-ufc`: the manual read for a fight card.
- `money-is-read-never-derived`: balances come from the ledger, never recomputed.
- `freshness-is-a-precondition`: check input age before trusting any output.
- `correlated-exposure`: why one straight per game and distinct parlay legs matter.
