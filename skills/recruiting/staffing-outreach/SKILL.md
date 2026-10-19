---
name: staffing-outreach
description: Write cold outreach to staffing agencies and in-house recruiting teams, the buyers for an AI resume-screening product, leading with their real pain (a pile of applicants nobody has dispositioned). Use when the user says "write outreach to a staffing agency", "cold email a recruiter", "prospect this agency", "draft a sequence for recruiting buyers", or names an agency and asks how to open the conversation.
---

# Staffing outreach

## The sample data

Everything below runs on made-up examples. Replace these to make it yours:

| Placeholder | What it stands for |
|---|---|
| **Shortlist** | Your product: an AI resume-screening tool that scores candidates against a role's must-haves |
| **Ridgeline Staffing** | The prospect: a mid-size IT staffing agency in Austin, TX |
| **Priya Shah** | The recruiter lead you are writing to |
| **Senior Data Engineer** | A role the prospect is plausibly filling right now |
| **XXX** | Any price. Never put a real number in cold outreach |

## Who the buyer is

Two buyers, one pain:

- **Staffing agencies** (commercial, IT, healthcare, light industrial). Recruiters are paid on placements, and every hour spent reading resumes that were never a fit is an hour not spent on the phone with a candidate who is.
- **In-house recruiting teams.** Fewer reqs, more applicants per req, and a hiring manager asking why the shortlist is late.

The pain both share: **applicants who never get dispositioned.** A req goes live, hundreds of resumes arrive, the recruiter reads the first few dozen, finds enough to submit, and the rest sit untouched. Good candidates are buried in that untouched pile, and every one of them is an applicant who never hears back.

Lead with that pile. Do not lead with "AI".

## Before writing a word

1. **Find one real, current signal about the prospect.** Open reqs on their job board, a recent post from the recruiter lead, a new client vertical, a hiring push. For Ridgeline Staffing: they have several open data roles listed at once.
2. **Name the role the pain is worst on.** High-volume, keyword-noisy roles are where the untouched pile is biggest. "Senior Data Engineer" pulls hundreds of resumes that mention Python and SQL and lack the must-haves.
3. **Decide the one ask.** A short call, or (stronger) an offer to run one of their real batches and send back the ranked result. See `resume-batch-run`.

If you cannot find a real signal, say so and write a version without one. Never invent a detail about the prospect.

## The first email

Structure, in order:

1. **Subject:** short, lowercase-feeling, about their req, not your product. Example: `the data engineer pile`
2. **Line one:** their situation, specific. "Ridgeline has a handful of data engineering roles open at once."
3. **Line two:** the pain, in their words. "Roles like that pull hundreds of applicants, and most of the pile never gets read past the first page."
4. **Line three:** what Shortlist does, one sentence, concrete. "Shortlist reads every resume against the role's must-haves and hands back a ranked list with the reason for each score."
5. **The ask:** low effort for them. "Send me one req and the resumes, and I'll send back the ranked shortlist so you can judge it against your own picks."
6. **Sign-off:** name only. No signature block essay.

Under 120 words. No attachments on the first touch.

### Sample

> Subject: the data engineer pile
>
> Hi Priya,
>
> Ridgeline has several data engineering roles open at once. Roles like Senior Data Engineer pull hundreds of applicants, and most of that pile never gets read past the first few dozen.
>
> Shortlist reads every resume against the role's must-haves and returns a ranked list with the reason behind each score, so the strong candidate on page nine gets seen.
>
> Want to test it on one live req? Send the job description and the resumes, and I'll send back the ranked shortlist for you to check against your own picks.
>
> [name]

## Follow-ups

- **Touch 2 (3 to 4 business days later):** one new angle, not "bumping this". Example: the candidate experience side, every untouched applicant is someone who never hears back, and that reflects on the agency's client.
- **Touch 3 (a week later):** the offer only, two sentences. "Still happy to run one req for you. Send the JD and resumes whenever it's useful."
- **Stop after three.** No breakup email guilt.

## Rules

- **Pain first, product second, AI last.** Recruiters are pitched AI tools weekly. The untouched pile is what they recognise.
- **No claims you cannot back.** No accuracy percentages, no "saves 20 hours a week", no customer logos you do not have. If there are no results yet, offer to produce one on their data instead.
- **No pricing.** If the draft needs a number, use XXX and flag it for the user.
- **Never imply the tool makes the hire.** The recruiter decides. Shortlist sorts the pile and shows its reasoning.
- **Drafts only.** Write the email; the user reviews and sends it.
- **Plain voice.** No em dashes, no "I hope this finds you well", no stacked adjectives.

## Output

For each prospect, return:

1. The signal you used, with where you found it
2. Subject line plus two alternates
3. The first email
4. Touches 2 and 3
5. Anything you could not verify, listed plainly

## Related skills

- `resume-batch-run` for delivering the batch the outreach offers
- `job-posting-grader` for the employer-side view of the same hiring problem
