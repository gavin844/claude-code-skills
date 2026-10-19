# done-means-proven

**Nothing is called done without evidence from outside the work: a screenshot looked at, a job that fired, a live URL fetched.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Working methods](../) group. The skill itself is [`SKILL.md`](SKILL.md), 749 words. This page is the summary; the file is what the agent reads.

## What it does

From the user: "You've done about maybe 70% of it. I tell you to fix it, and you say you're done." The missing 30% is always somewhere the agent did not look, so evidence must come from outside the work: a screenshot looked at, a job that fired on its own schedule, a deploy fetched at the public URL. "Unverifiable is a legitimate outcome. Unverified and unmentioned is not."

## When the agent loads it

Use before telling the user anything is done, fixed, working, shipped, deployed, or passing, and use at the start of any multi-step task to state what finished will look like. Defines what counts as evidence for a web page, a script, a scheduled job, a document, and a data change. Enforced by the done gate hook.

## Inside the skill

- The rule
- State the finish line first
- What counts as evidence
- The loop
- What to say when it is not proven
- The gate

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/working-methods/done-means-proven ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/done-means-proven
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/working-methods/done-means-proven/SKILL.md -o ~/.claude/skills/done-means-proven/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\done-means-proven`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
