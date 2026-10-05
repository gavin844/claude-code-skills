---
name: prove-the-checker
description: Every guard, validator, audit or harness must be proven against a known-bad case AND a known-good case before its output is trusted. Load before writing or believing any checker - a contrast audit, a line-band guard, a UI harness, a lint rule, a fraud filter.
---

# Prove the checker

A checker with false results is worse than no checker, because it trains everyone to
ignore it. Four of mine reported the opposite of the truth, confidently.

## The incidents

- **`ui_check.js` tested dark mode by removing `data-theme`** and trusting
  `prefers-color-scheme`. Playwright defaults to light, so both passes rendered light and
  it declared a working dark mode broken. Reported twice before it was caught.
- **Hover measured with a synthetic `mouseover`.** A dispatched event cannot trigger CSS
  `:hover`. It reported "hover missing on 12/12" on a page where every button had hover
  styles.
- **The line-band guard keyed on market alone** and quarantined 77,900 valid soccer
  totals. Re-keyed to (sport, market) it found 8,868 genuinely bad rows. The first version
  would have been switched off, taking the real 8,868 with it.
- **`batchFrequency` counted the candidate's own document**, so the authenticity report
  printed "1 other resume used it too" about a phrase nobody else used. A false statement
  inside an accusation.

## The rule

Before a checker's output is allowed to influence a decision, it passes two fixtures:

1. **A known-bad case it must catch.** Plant the defect deliberately. Three fabricated
   resumes in a batch of twenty real ones. A control with no hover rule. A row with a
   line that genuinely cannot exist.
2. **A known-good case it must not flag.** The seventeen clean resumes. The page where
   every button does have hover. The 77,900 rows that were fine.

If either fixture fails, the checker is broken. Fix the checker before looking at its
findings, and never triage the findings of an unproven checker.

## Specific traps that have already bitten

- **Emulate the environment, do not remove it.** For themes, emulate `colorScheme`
  explicitly for each of the three states: stamped dark, stamped light, and unstamped.
  Deleting an attribute tests the harness default, not the page.
- **Use a real pointer, or read the stylesheet.** Never a synthetic event for anything the
  browser computes from real input.
- **Key the guard on everything that changes the valid range.** A threshold that is
  correct for one sport is nonsense for another.
- **Composite before measuring.** `bg-white/60` over a dark ground is a mid grey that
  fails against both light and dark text. Measuring the declared colour misses it, and
  the alpha variant is its own class.
- **Count exclusive of self.** Any "how many others" figure derived from a total must
  subtract the subject.

## Report honestly

When a checker has not been proven, say the finding is unverified rather than presenting
it as measured. A finding stated with false confidence has cost more time here than a
finding not stated at all.

## Related

`verification-before-completion`, `fail-loud`, `web-app-baseline` (the theme and hover
notes), `locate-before-you-guard`.
