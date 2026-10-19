---
name: job-posting-grader
description: Grade a job posting for listing integrity (is it a live, current, original posting) and measure whether the employer replies to applicants. Load before building or changing a posting grader, its signals, its wording layer, its corpus of postings, or any public page that publishes findings about named employers. Use when the user says "grade this job posting", "is this listing stale", "has this job been reposted", "does this company ever reply", or "add a signal to the grader".
---

# Job posting grader

## The sample data

Everything below runs on made-up examples. Replace these to make it yours:

| Placeholder | What it stands for |
|---|---|
| **the grader** | Your tool: takes a job posting URL and returns a graded, sourced report |
| **Northgate Systems** | The example employer whose posting is being graded |
| **Senior Data Engineer** | The example posting |
| **XXX** | Any price |

A resume screener grades the candidate. The grader grades the employer.

## What it measures

Two engines.

**Engine A, listing integrity.** Is the posting real and current? Four signals, each a fact with a date and a source:

- **Listing age**, read from the employer's own hiring system, not from when you first noticed it.
- **Reposts**, matched by a stable requisition id and by a normalised hash of the posting body.
- **The same text under other employers**, with the shared wording quoted.
- **A missing pay range** where a state law requires one, with the statute cited.

**Engine B, response behaviour.** Will they reply? Median days to first response, the share of applications that never got a reply, and the stage where people stop hearing back. This needs application outcomes logged by users, so it is only as good as its sample; always show the sample size.

## The three rules that govern every change

Break any of these and the product stops being defensible. It publishes about named companies.

### 1. A signal that cannot be computed reports itself UNAVAILABLE, never clean

A board with no publish date produces "unknown", not "fresh". An empty corpus produces "no corpus to compare against", not "this text is unique". A missing input silently scored as good is how a checker starts lying.

The same rule refuses a date the source cannot support. If a board reports a first-published date older than the hiring system itself, rendering "open for thousands of days" would be a false statement about a named employer. Mark it unavailable.

### 2. Every statement is a measurement with its source, never a claim about intent

Put one function between the engine and every published sentence, have it throw on wording that crosses the line, and make it the only way to build a publishable finding. Do not add a bypass.

- Ships: "Live 187 days, since 2026-02-24, according to the employer's own hiring system."
- Ships: "Reposted 6 times, text unchanged."
- Refused: "ghost job", "fake", "scam", "never intended to hire", "probably", "avoid this company".

"Probably" is on the forbidden list on purpose. A hedge does not make an inference safe. It makes it look measured while staying unprovable. Keep the full reasoning in a written wording protocol next to the code.

### 3. Every control is tested on what it REFUSES

Not only on what it allows. The wording guard needs tests that feed it forbidden phrasing and expect a throw. A control tested only on the happy path is a control nobody has checked.

## Things learned the hard way

Real failure modes from building this. Do not rediscover them.

- **Placeholder requisition ids.** Some boards return the same filler string (for example "See Opening ID") as the requisition id on every posting. Trusting it groups every role under one requisition and reports each as reposted hundreds of times. Only accept a requisition id that looks like an identifier.
- **"Not found" that returns 200.** At least one hosted job-board API answers an unknown company slug with HTTP 200 and a body saying the request failed. That is a missing board, not an employer with no openings. Treat it as an error, or it poisons the corpus.
- **Pay range parsing order.** A range written as `$120k - $160k` can match the bare number "120" first, parse as one hundred and twenty dollars, fail the plausibility check, and make a compliant employer read as having no published range. Order the parser's alternatives so the suffixed form wins, and test this exact string.
- **Overlap coefficient, not Jaccard.** A short posting copied verbatim into the start of a long one is a real finding, and Jaccard similarity scores it near zero. Overlap coefficient catches it.
- **Escaped regex in generated code.** Writing `\b` through a script that patches source files can emit a literal backspace byte. The regex then matches nothing while looking correct. Use raw strings, then search the file for the backspace character.

## Grading a single posting

1. Resolve the URL to the employer's hiring system and fetch the posting from the source, not a job aggregator.
2. Compute each Engine A signal. Any that cannot be computed is UNAVAILABLE, with the reason.
3. Build every sentence through the wording guard.
4. If Engine B data exists for Northgate Systems, add it with the sample size at the same visual weight as the number.
5. Return the report: posting, date checked, each signal with its source, and what could not be measured.

## Data and security

The corpus of postings is public by design; employers publish it. The sensitive part is small: a user's application history and any connected mailbox. Encrypt those per tenant, bind the tenant id into the encryption so a row moved between tenants fails to decrypt, never store email bodies, and keep the audit log append-only. Write down what is not built yet rather than implying it is.

## Refused revenue

**Never sell employers a badge, a report about themselves, or a way to change a finding.** The moment an employer pays, every measurement is suspect, and the product's only asset is that a job seeker believes it. Employers get their data free, plus a route to correct a factual error. Write this into the privacy policy so it does not get revisited in a hard month.

## When building the public site

The highest-risk page is the per-employer record. Build it to be boring: every number with its sample size and date, no adjectives, a visible correction route, and the same "unavailable" honesty as the engine. Let a visitor grade a real posting without signing up.

## Related skills

- `resume-batch-run` for the candidate side of the same hiring process
- `staffing-outreach` for reaching the recruiters who post these roles
