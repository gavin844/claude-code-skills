# client-follow-up

**A meeting transcript becomes a follow-up email draft and a table of next actions with owners and dates.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Client work](../) group. The skill itself is [`SKILL.md`](SKILL.md), 667 words. This page is the summary; the file is what the agent reads.

## What it does

Turns a meeting transcript or notes into a short follow-up email and a table of next actions with owners and due dates. Use it right after a client or prospect meeting so the recap goes out while the conversation is fresh and nothing promised on the call gets dropped. It drafts only: the email lands as a draft for you to review and send.

## When the agent loads it

After a client or prospect meeting, turns the transcript or notes into a crisp follow-up email plus a list of concrete next actions with owners and dates. Load when the user says "write the follow-up," "draft a recap email," "follow up with [company]," or a meeting has just ended.

## Inside the skill

- The sample company
- Purpose
- When to use
- Inputs
- Steps
- Email structure
- Action list format
- Example opening (sample data)
- Writing rules
- Rules
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/client-work/client-follow-up ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/client-follow-up
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/client-work/client-follow-up/SKILL.md -o ~/.claude/skills/client-follow-up/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\client-follow-up`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [discovery-call-prep](../../client-work/discovery-call-prep) (Client work)
- [sow-scoping](../../client-work/sow-scoping) (Client work)
- [blueprint-builder](../../client-work/blueprint-builder) (Client work)
- [demo-script](../../client-work/demo-script) (Client work)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
