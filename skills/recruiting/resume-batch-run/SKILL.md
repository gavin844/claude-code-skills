---
name: resume-batch-run
description: SOP for running a client's batch of resumes through an AI resume-screening tool. Receive the job description plus a zip of resumes, score resume-only against the role's must-haves, and deliver a ranked A/B/C shortlist with the top slice flagged for interview. Use when the user says "run this batch", "score these resumes", "the client sent a zip", "build the shortlist for this req", or hands over a JD and a folder of resumes.
---

# Resume batch run

## The sample data

Everything below runs on made-up examples. Replace these to make it yours:

| Placeholder | What it stands for |
|---|---|
| **Shortlist** | Your screening tool: scores each resume against the role's must-haves and explains the score |
| **Ridgeline Staffing** | The agency that sent the batch |
| **Priya Shah** | The recruiter lead who receives the result |
| **Copperleaf Logistics** | The agency's client, the actual employer |
| **Senior Data Engineer** | The role being filled |

## Inputs

You need both before starting. If either is missing, stop and ask for it.

1. **The job description** for Senior Data Engineer at Copperleaf Logistics, as the client wrote it.
2. **A zip of resumes.** PDF, DOCX or plain text. Expect duplicates, cover letters mixed in, scanned images, and files with no name in the filename.

Also confirm, if not stated: **how big the "flag for interview" slice should be.** Use what the client asked for. If they did not say, ask; do not pick a number for them.

## Steps

### 1. Turn the JD into must-haves

Read the job description and pull out two lists:

- **Must-haves:** the things a candidate cannot be hired without (for example: production data pipeline work, a named cloud platform, a minimum level of seniority).
- **Nice-to-haves:** things that separate two qualified candidates.

Show this list to the user before scoring. A wrong must-have poisons every score downstream, and this is the cheapest point to catch it. If the JD is vague, write the must-haves you inferred and mark them as inferred.

### 2. Unpack and clean the batch

- Extract the zip into its own empty working folder.
- Count files in and keep the number. Every resume in must be accounted for in the output.
- Pull text from each file. A file that yields no usable text (scanned image, corrupted, password protected) is listed as **unreadable**, never silently dropped and never scored as weak.
- De-duplicate: the same person submitted twice is one candidate, noted once.
- Set aside non-resumes (cover letters alone, blank pages) and list them.

### 3. Score resume-only

Run each resume through Shortlist against the must-haves.

- **Resume-only means resume-only.** Score what the document shows. No guessing from name, school prestige, photo, address, age signals or gaps. Those are not must-haves and must not move a score.
- Every score carries its reason: which must-haves were evidenced, which were missing, and the line in the resume that showed it.
- "Not mentioned" is not the same as "does not have". Mark it as not evidenced, so a recruiter can ask.

### 4. Tier into A / B / C

- **A:** meets every must-have with evidence in the resume.
- **B:** meets most must-haves; the gap is specific and named.
- **C:** missing one or more must-haves outright.

Within each tier, rank by strength of evidence and nice-to-haves. Flag the agreed top slice for interview.

### 5. Check before delivering

- Count in equals count out (scored + unreadable + duplicates + non-resumes).
- Read the top flagged resumes yourself against the JD. If one plainly does not fit, the must-haves are wrong; go back to step 1.
- Spot-check a few C-tier resumes. A strong candidate in C usually means a must-have was worded too narrowly.

## Deliverable

One document for the recruiter, in this order:

1. **Header:** role, client, date, resumes received, resumes scored.
2. **Flagged for interview:** name, tier, a one-line reason each.
3. **Full ranked list:** tier, rank, name, must-haves met and missed, the evidence line.
4. **Could not score:** unreadable files, duplicates, non-resumes, each with the reason.
5. **The must-haves used**, so the recruiter can see exactly what the ranking was measured against.

## Rules

- **The recruiter decides.** The shortlist is a ranked recommendation with reasons, not a hiring decision. Never write "reject" next to a candidate.
- **Capture feedback.** Ask the recruiter to mark each flagged candidate as a good or bad call. That feedback is how the must-haves and scoring get better on the next batch for this client.
- **Candidate data stays in the run.** Do not paste resumes into unrelated tools, do not reuse one client's candidates for another client, and delete the working folder when the client's retention terms say to.
- **No numbers you did not measure.** Do not claim time saved or accuracy. Report counts.
- **Draft first.** The user reviews the deliverable before it goes to Ridgeline Staffing.

## Related skills

- `staffing-outreach` for the outreach that offers this batch run
- `job-posting-grader` for grading the posting itself before the batch comes in
