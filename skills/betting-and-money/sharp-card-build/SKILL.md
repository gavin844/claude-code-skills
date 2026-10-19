---
name: sharp-card-build
description: The daily step-by-step for building a recommend-only betting card across every sport you follow. Use for "start building the card", "build today's card", "make the card", "morning card", or any request to produce the day's plays. Runs the captures, ingests every sport's board, builds distinct-prop straights plus a 2-leg and a 3-leg parlay, runs the freshness and started-game checks, and delivers the card to the user for review. Never places a bet.
---

# Building the card: the daily run

## The sample data

- **Sportsbook:** the fictional **ExampleBook** at `examplebook.test`. Replace with the
  book whose board and prop menus you capture.
- **Bankroll:** a sample **$1,000 bankroll, 1 unit = $10**, with the guardrails from `sharp`.
- **Sports:** MLB, NFL, college football, soccer and UFC as examples. Keep yours.
- **Card shape:** a sample of 3 straights, one 2-leg parlay and one 3-leg parlay, plus a
  value list. Set your own shape and treat it as a rule.
- **Delivery:** "send the card to the user" means whatever channel you use (a chat
  message, an email draft, a PDF in a folder). Nothing goes anywhere public.
- **Tools:** named generically ("your odds-capture script", "your card builder").

Read `sharp` first for the money philosophy and the confidence gate. This is the
step-by-step. Budget real time for it (half an hour is reasonable): the value is in
research across every sport and every prop menu, not a two-minute pull of one league.

## The one rule

SHARP never places, submits, or confirms a bet. Every output is a recommendation the
user may place by hand. Any book or exchange access is read-only.

## Order of operations

Wrap these in one morning command once they work, and run them individually when
debugging. The order matters: game rows must exist before book prices can attach.

1. **Intelligence.** Bank pitcher and team stats, recent form, expected stats and park
   factors. Without this the F5 and strikeout models return nothing.
2. **Sharp market ingest, per sport.** Pull the low-hold reference market and, critically,
   the game rows carrying `start_time`. Soccer fans out across several leagues; pulling
   only one leaves most captured matchups with nothing to price against.
3. **Capture your book's prop pages** (see `sharp-book-scraping`). Needs a live login;
   never force-kill the browser.
4. **Capture the per-league boards** for every non-MLB sport, verifying each page
   actually changed before saving it.
5. **Ingest the captures:** the main board, NRFI/YRFI, each model's prop ingest
   (team-to-score-first, F5, strikeouts), and every non-MLB league board.
6. **Run the gates:** freshness, started-game drop, the robustness sweep, the pricing
   sanity check and the regression tests. The sanity check must report zero.
7. **Build the card:** edges, confidence gate, card, record every pick as a paper bet.
8. **Deliver** the card to the user for review.

## What the card must contain (sample shape)

- **3 straights**, each a different prop and **one per game**. If a sport you focus on
  has nothing above its bar, its slot releases to the general pool. Never forced, always
  announced.
- **One 2-leg parlay and one 3-leg parlay** when the pool can fill them with distinct
  plays that clear the parlay leg floor. If it cannot, skip the parlay and print why.
  If you choose to always show a 2-leg, any leg below the EV floor must print its real
  near-zero EV, never be dressed up; the price gate, distinct games and distinct props
  never relax.
- Every leg a different prop within its parlay, and **no play repeats anywhere on the
  card**.
- **The value list:** the "pick more" surface. Reliability-ranked, capped (sample: 14),
  flagged `outlier`, `unproven` or `next best`, stored outside the bets ledger.
- **Every line names its market in caps.** A line reading "Team +130" with no market can
  be placed as a moneyline when it was meant as first-to-score. This is not cosmetic.
- **Payouts in your book's convention** (profit vs total return), so the card matches
  the slip. Show stakes in units and in sample dollars (1u = $10).
- **Rank by win probability** when the user asks for the best play; edge only decides
  admission.

## Non-negotiable checks before sending

- **No pick on a game that has started.** A hard drop step enforces it and prints how
  many candidates it removed. If it drops everything, the captures are stale, not the slate.
- **Refuse captures older than a max age** (sample: 14 hours). A stale capture
  re-ingested with a fresh timestamp can produce an entire card of finished games.
- **Verify any pick above about 3% edge against the player's game log.** Veto only.
- **"No bet" is a valid, frequent answer.** Never pad the card.

## Where the edge usually is

Measure your own book before believing this, but the common pattern is that a retail
book is soft on NICHE PROPS and efficient on main lines (soccer three-way moneylines,
college totals, NFL sides). Hunt the prop menus per sport rather than more moneyline
boards.

Only backtest-PROVEN markets may headline. Dampened markets can appear in the value list
but never as a straight lock. Do not promote a market without a backtest.

## Related skills

- `sharp`: the methodology, gates and failure modes behind every step here.
- `sharp-book-scraping`: steps 3 and 4.
- `sharp-ufc`: fight cards, which have no backtest and stay out of the locks.
- `freshness-is-a-precondition`: the capture-age and started-game checks.
- `correlated-exposure`: one straight per game, distinct legs.
