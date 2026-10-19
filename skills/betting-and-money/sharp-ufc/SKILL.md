---
name: sharp-ufc
description: Analyze a UFC or MMA card the user sends and give an honest read on who to back, priced against their sportsbook. Use for "who do you got", "UFC card", "fight night", "who wins this fight", "MMA picks", "break down this card", or when the user pastes or screenshots a fight card. A manual, research-driven path with no fabricated records. Recommend-only, never places a bet.
---

# UFC: the manual read

## The sample data

- **Sportsbook:** the fictional **ExampleBook** at `examplebook.test`; its martial-arts
  section supplies prices. Replace with your book.
- **Bankroll:** a sample **$1,000 bankroll, 1 unit = $10**.
- **Fighters and prices:** whatever card the user sends. Nothing here is a real record.

Automated fighter and result feeds are fragile (public sports APIs block or change
without notice), so treat this as a manual path: **prices can be automatic, fighter
research is manual.** If your book capture already holds the martial-arts board, pull
the card from there rather than asking the user to retype it. Capture files may be
supersets that also contain other sports; filter to the bouts first.

Everything in `sharp` still applies. **Never place a bet. No fabricated records.**

## The one rule about facts

**Do not invent fight records, finish rates, reach numbers, or camp news.** If a number
is not known with confidence, look it up (web search works for records and recent
results) or say plainly that it is unknown and reason from what IS known. A confidently
wrong "he's 4-1 in his last five" is far worse than "I don't have his recent record,
here's the stylistic read".

When the user sends a screenshot, read the fighters and prices off it and confirm the
matchups back before analysing, so a misread name never becomes a pick.

## What predicts MMA outcomes

Roughly by how much they matter, and none of it replaces looking up the actual fighters:

1. **Style matchup beats records.** A wrestler with real top control against a striker
   with poor takedown defence is the most reliable edge in the sport. Records flatter
   fighters who have been matched softly.
2. **Takedown defence** is the highest-leverage single stat. A striker who cannot stay
   upright loses rounds he "wins" on the feet.
3. **Cardio and pace, especially in round 3.** Fighters who fade are systematically
   overpriced by markets that anchor on round-1 highlights.
4. **Age and mileage.** Decline is sharp and tends to arrive in the mid-thirties, earlier
   for damage-heavy styles.
5. **Layoff and short notice.** A short-notice replacement is a live underdog mainly when
   their style is low-prep (grappler, pressure fighter).
6. **Weight-cut history.** A missed weight or a brutal cut is a real, checkable negative.
7. **Judging tendencies** matter for close decisions. Cage control and forward pressure
   win scorecards more often than volume from the back foot.

## How to price a fight

- Convert the book's price to implied probability, de-vig the two-way, and compare to
  your own honest estimate. Call an edge only when your number clears the de-vigged fair
  price by a **meaningful** margin (sample: 5%+). Fights are high variance and this read
  is judgment, not a fitted model.
- **Underdogs are where MMA value tends to live.** Heavy favourites (-300 and beyond) are
  rarely worth it: one punch ends any fight, so the tail risk is large relative to the payout.
- **Prop markets are often softer than the moneyline.** Method of victory, round betting
  and over/under rounds are where a soft book misprices. If a fighter finishes constantly
  and the moneyline is expensive, "wins inside the distance" can be the better expression
  of the same opinion.
- **Size as parlay legs or small single units (sample: 0.5u to 1u), never as headline
  locks.** MMA has no backtest in this system, so it cannot earn lock status under the
  confidence gate.

## What to hand back

For each fight: the pick, the price, an honest confidence, the one-line stylistic reason,
and the specific way it loses. Flag any fight where the honest answer is "no bet". A
12-fight card should not produce 12 picks; two or three real opinions is a good night.

If the user wants a read tracked, record it as a paper bet so it grades like everything
else (only after the official result is final) rather than living only in chat.

## Related skills

- `sharp`: the confidence gate and the honesty rules this inherits.
- `sharp-book-scraping`: pulling the martial-arts board from the book.
- `correlated-exposure`: do not stack several legs that all depend on one fighter.
