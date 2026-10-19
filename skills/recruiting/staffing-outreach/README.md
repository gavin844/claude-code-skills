# staffing-outreach

**Cold outreach to staffing agencies that offers to rank one of their live batches, with two follow-ups.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Recruiting](../) group. The skill itself is [`SKILL.md`](SKILL.md), 868 words. This page is the summary; the file is what the agent reads.

## What it does

Drafts cold outreach to staffing agencies and in-house recruiting teams for an AI resume-screening product. It opens with the buyer's real problem, the pile of applicants nobody ever reads, and turns the ask into a low-effort offer to rank one of their live batches. You get a sourced prospect signal, subject lines, a first email under 120 words and two follow-ups, all as drafts with no invented claims or pricing.

## When the agent loads it

Write cold outreach to staffing agencies and in-house recruiting teams, the buyers for an AI resume-screening product, leading with their real pain (a pile of applicants nobody has dispositioned). Use when the user says "write outreach to a staffing agency", "cold email a recruiter", "prospect this agency", "draft a sequence for recruiting buyers", or names an agency and asks how to open the conversation.

## Inside the skill

- The sample data
- Who the buyer is
- Before writing a word
- The first email
- Follow-ups
- Rules
- Output
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/recruiting/staffing-outreach ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/staffing-outreach
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/recruiting/staffing-outreach/SKILL.md -o ~/.claude/skills/staffing-outreach/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\staffing-outreach`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [resume-batch-run](../../recruiting/resume-batch-run) (Recruiting)
- [job-posting-grader](../../recruiting/job-posting-grader) (Recruiting)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
