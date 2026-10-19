---
name: sharp-book-scraping
description: How to reliably capture a sportsbook's board and prop menus with Playwright without destroying the user's logged-in session or reporting fake success. Use for "capture the board", "scrape my book", "get the soccer lines", "the scraper is broken", or any work on a book-capture script. Read-only recon; it never touches the bet slip and never places a wager.
---

# Scraping the book

## The sample data

- **Sportsbook:** the fictional **ExampleBook** at `examplebook.test`. Replace with your
  own book's URL and its page structure.
- **Browser profile:** a persistent Playwright profile in a local secrets folder that
  is gitignored. Point it at your own.
- **Selectors:** the examples below (`.league-name`, league checkboxes, a REFRESH button)
  describe a common book layout. Inspect yours and substitute.

Check the book's terms of service before scraping it. This is read-only price capture
for the user's own analysis: it never logs in on anyone else's behalf, never touches
the bet slip, and never submits anything.

Browser scraping is core tooling, not a side trick. Use the Playwright and Chromium you
already have; most failures are behavioural, not missing installs.

## Rules that come from real damage

**Never force-kill a browser process.** Chromium flushes cookies to a persistent profile
only on CLEAN shutdown. Force-killing the node or chrome process can log the user out of
their book mid-session. Always end with `context.close()`.

**One context per profile.** A second `launchPersistentContext` on the same user-data-dir
blocks on the profile lock or corrupts it. Serialize captures.

**Verify the page you landed on, every time.** A run can log "captured five sections"
when all five files are the same page. Fingerprint with the board's own title element
(for example `.league-name`) and refuse to save when it has not changed. Do NOT
fingerprint with text that also appears in the navigation, or the guard matches the
nav and reports the same verdict no matter what happened.

**Do not fight the login.** When the book throttles or challenges an automated login,
stop and let the user log in by hand in the persistent profile, then capture in ONE
chain right after. Book sessions can expire within minutes.

## How a typical book nav works

- Top-level sport names are often **accordion headers**. Clicking one only expands a
  sublist; the board does not change.
- Leagues under them may each carry a checkbox. **Tick the checkbox, then click
  REFRESH.** Clicking the label text can no-op silently every time.
- Capture can be flaky per league from run to run. Coverage accumulates across runs;
  treat a skip as "not today", not as failure.
- Capture files that accumulate ticked leagues are SUPERSETS. Filter to the league you
  want before parsing.

## Board shapes differ by sport, and this decides what is bettable

- **MLB:** full prop menus. This is usually where the edge is.
- **College football:** may carry spread and total only, no moneyline. Cells parse as
  `['+7.5 -115', 'O 48 -115']`.
- **Soccer:** THREE-way. Cells often run `[handicap, moneyline, total]` per team row with
  the draw elsewhere in the block text (`Draw +365`). Use a dedicated three-way parser,
  never the two-row parser, or the draw is silently dropped and the market cannot de-vig
  to 100%. **A correct three-way parse sums to roughly 104 to 106% implied; around 83%
  means the draw is missing.**

## Hygiene

- Keep scraped HTML in a disposable temp folder that is gitignored and excluded from any
  repo metrics you track.
- Never commit the browser profile, cookies, or a captured page that shows account
  details.

## Related skills

- `sharp`: what the captured prices feed.
- `sharp-card-build`: where capture sits in the daily run.
- `freshness-is-a-precondition`: refuse old capture files rather than re-ingesting them.
