# discovery-call-prep

**A one-page brief before a prospect call: who is in the room, where the deal stands, the angle and the opening question.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Client work](../) group. The skill itself is [`SKILL.md`](SKILL.md), 667 words. This page is the summary; the file is what the agent reads.

## What it does

Produces a one-page pre-call brief: who the company is, who is in the room, where the deal stands in your CRM, their likely AI pains, your best angle and opening question, and any watch-outs from past conversations. Use it before a prospect or client call when you want to walk in prepared without doing the digging yourself. It pulls from whatever is connected (calendar, CRM, meeting notes, web) and never invents data it cannot find.

## When the agent loads it

Produces a one-page pre-call brief covering the company, who is in the room, their likely AI pains, and your angle, pulled from the CRM, calendar, past meeting notes, and web research. Load when the user says "prep me for my call with X," "I have a call with [company] tomorrow," "pre-call brief," "who am I meeting," or names a company before a meeting.

## Inside the skill

- The sample company
- Purpose
- When to use
- Inputs to gather
- Output: the brief
- Example (sample data)
- Writing rules
- Rules
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/client-work/discovery-call-prep ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/discovery-call-prep
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/client-work/discovery-call-prep/SKILL.md -o ~/.claude/skills/discovery-call-prep/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\discovery-call-prep`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [blueprint-builder](../../client-work/blueprint-builder) (Client work)
- [client-follow-up](../../client-work/client-follow-up) (Client work)
- [sow-scoping](../../client-work/sow-scoping) (Client work)
- [demo-script](../../client-work/demo-script) (Client work)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
