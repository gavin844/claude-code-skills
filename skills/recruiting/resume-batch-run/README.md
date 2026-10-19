# resume-batch-run

**Run a client's batch of resumes through an AI screener, tier the candidates, and give a reason for every score.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Recruiting](../) group. The skill itself is [`SKILL.md`](SKILL.md), 784 words. This page is the summary; the file is what the agent reads.

## What it does

A step by step procedure for running a client's batch of resumes through any AI resume-screening tool. It turns the job description into must-haves, accounts for every file in the zip, scores each resume on what the document shows, and tiers candidates into A, B and C with the agreed top slice flagged for interview. The deliverable gives the recruiter a reason for every score, lists anything that could not be scored, and leaves the hiring decision with the human.

## When the agent loads it

SOP for running a client's batch of resumes through an AI resume-screening tool. Receive the job description plus a zip of resumes, score resume-only against the role's must-haves, and deliver a ranked A/B/C shortlist with the top slice flagged for interview. Use when the user says "run this batch", "score these resumes", "the client sent a zip", "build the shortlist for this req", or hands over a JD and a folder of resumes.

## Inside the skill

- The sample data
- Inputs
- Steps
- Deliverable
- Rules
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/recruiting/resume-batch-run ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/resume-batch-run
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/recruiting/resume-batch-run/SKILL.md -o ~/.claude/skills/resume-batch-run/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\resume-batch-run`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [staffing-outreach](../../recruiting/staffing-outreach) (Recruiting)
- [job-posting-grader](../../recruiting/job-posting-grader) (Recruiting)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
