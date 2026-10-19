# sharp-book-scraping

**Read a sportsbook's lines with Playwright without killing the session or reporting a capture that did not happen.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Betting and money](../) group. The skill itself is [`SKILL.md`](SKILL.md), 558 words. This page is the summary; the file is what the agent reads.

## What it does

Hard-won rules for capturing a sportsbook's board and prop menus with Playwright without logging the user out or saving the same page five times. It covers clean browser shutdown, one context per profile, fingerprinting the page you actually landed on, and parsing board shapes that differ by sport, such as three-way soccer markets where the draw is easy to lose. It is read-only and never touches the bet slip.

## When the agent loads it

How to reliably capture a sportsbook's board and prop menus with Playwright without destroying the user's logged-in session or reporting fake success. Use for "capture the board", "scrape my book", "get the soccer lines", "the scraper is broken", or any work on a book-capture script. Read-only recon; it never touches the bet slip and never places a wager.

## Inside the skill

- The sample data
- Rules that come from real damage
- How a typical book nav works
- Board shapes differ by sport, and this decides what is bettable
- Hygiene
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/betting-and-money/sharp-book-scraping ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/sharp-book-scraping
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/betting-and-money/sharp-book-scraping/SKILL.md -o ~/.claude/skills/sharp-book-scraping/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\sharp-book-scraping`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [sharp](../../betting-and-money/sharp) (Betting and money)
- [sharp-card-build](../../betting-and-money/sharp-card-build) (Betting and money)
- [freshness-is-a-precondition](../../trustworthy-data/freshness-is-a-precondition) (Trustworthy data)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
