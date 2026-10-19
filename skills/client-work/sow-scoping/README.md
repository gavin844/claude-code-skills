# sow-scoping

**Discovery notes become a Statement of Work draft with phases, deliverables, roles and assumptions, price left as XXX.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Client work](../) group. The skill itself is [`SKILL.md`](SKILL.md), 732 words. This page is the summary; the file is what the agent reads.

## What it does

Turns discovery notes or a call transcript into a structured Statement of Work draft: context, objectives, approach, phases with weeks and deliverables, team roles, assumptions, and an investment line that always reads XXX. Use it after a discovery call or workshop when you need to show a client what the engagement would look like. The output is a draft for internal review, never sent to a client directly.

## When the agent loads it

Turns discovery notes into a structured Statement of Work draft with objectives, phases, deliverables, timeline, team, and an investment placeholder. Load when the user says "scope this," "draft a SOW," "statement of work," "turn these notes into a proposal," or "what would this engagement look like.

## Inside the skill

- The sample company
- Purpose
- When to use
- Inputs
- Structure of the SOW draft
- Example phase table (sample data)
- Writing rules
- Pre-send check
- Rules
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/client-work/sow-scoping ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/sow-scoping
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/client-work/sow-scoping/SKILL.md -o ~/.claude/skills/sow-scoping/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\sow-scoping`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [discovery-call-prep](../../client-work/discovery-call-prep) (Client work)
- [blueprint-builder](../../client-work/blueprint-builder) (Client work)
- [client-follow-up](../../client-work/client-follow-up) (Client work)
- [demo-script](../../client-work/demo-script) (Client work)
- [short](../../working-methods/short) (Working methods)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
