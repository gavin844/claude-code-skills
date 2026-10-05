# done-means-proven

**Use before telling the user anything is done, fixed, working, shipped, deployed, or passing, and use at the start of any multi-step task to state what finished will look like. Defines what counts as evidence for a web page, a script, a scheduled job, a document, and a data change. Enforced by the done gate hook.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 747 words. This page is the summary; the file is what the agent reads.

## What it does

From the user: "You've done about maybe 70% of it. I tell you to fix it, and you say you're done." The missing 30% is always somewhere the agent did not look, so evidence must come from outside the work: a screenshot looked at, a job that fired on its own schedule, a deploy fetched at the public URL. "Unverifiable is a legitimate outcome. Unverified and unmentioned is not."

## Inside the skill

Sections of `SKILL.md`:

- The rule
- State the finish line first
- What counts as evidence
- The loop
- What to say when it is not proven
- The gate

## When the agent should load it

Use before telling the user anything is done, fixed, working, shipped, deployed, or passing, and use at the start of any multi-step task to state what finished will look like. Defines what counts as evidence for a web page, a script, a scheduled job, a document, and a data change. Enforced by the done gate hook.

Dates recorded inside the skill, each one an incident it was written from: 2026-09-18.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/done-means-proven ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/done-means-proven
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/done-means-proven/SKILL.md -o ~/.claude/skills/done-means-proven/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\done-means-proven`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
