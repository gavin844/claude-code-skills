# job-posting-grader

**Grade a job posting from the seeker's side, and keep a grader honest when it publishes about named companies.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Recruiting](../) group. The skill itself is [`SKILL.md`](SKILL.md), 1,047 words. This page is the summary; the file is what the agent reads.

## What it does

Grades a job posting from the job seeker's side: how long it has been live according to the employer's own hiring system, whether it has been reposted, whether its text appears under other employers, and whether a legally required pay range is missing. It can also measure whether the employer replies to applicants at all. The skill carries the rules that keep a grader honest when it publishes about named companies: a signal that cannot be computed says so, every finding is a sourced measurement rather than a claim about intent, and every control is tested on what it refuses.

## When the agent loads it

Grade a job posting for listing integrity (is it a live, current, original posting) and measure whether the employer replies to applicants. Load before building or changing a posting grader, its signals, its wording layer, its corpus of postings, or any public page that publishes findings about named employers. Use when the user says "grade this job posting", "is this listing stale", "has this job been reposted", "does this company ever reply", or "add a signal to the grader".

## Inside the skill

- The sample data
- What it measures
- The three rules that govern every change
- Things learned the hard way
- Grading a single posting
- Data and security
- Refused revenue
- When building the public site
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/recruiting/job-posting-grader ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/job-posting-grader
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/recruiting/job-posting-grader/SKILL.md -o ~/.claude/skills/job-posting-grader/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\job-posting-grader`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [resume-batch-run](../../recruiting/resume-batch-run) (Recruiting)
- [staffing-outreach](../../recruiting/staffing-outreach) (Recruiting)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
