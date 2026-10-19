# demo-script

**A timed two-minute product demo: the hook, the one live wow moment, the proof and a single ask.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Client work](../) group. The skill itself is [`SKILL.md`](SKILL.md), 699 words. This page is the summary; the file is what the agent reads.

## What it does

Scripts a two-minute product demo for a prospect: a hook in their own words, the one wow moment shown live, a line of proof, and a single specific ask, timed beat by beat with a fallback if the live step fails. Use it when you have a prototype, MVP, or batch run to show and want the prospect to leave knowing what to say yes to.

## When the agent loads it

Scripts a tight two-minute product demo for a prospect: the hook, the one wow moment, and the ask, with no filler. Load when the user says "script a demo," "demo script for [company]," "how should I demo this," or has a prototype, MVP, or batch run to show a prospect.

## Inside the skill

- The sample company
- Purpose
- When to use
- Inputs
- Structure
- Steps
- Example (sample data)
- Writing rules
- Rules
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/client-work/demo-script ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/demo-script
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/client-work/demo-script/SKILL.md -o ~/.claude/skills/demo-script/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\demo-script`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [discovery-call-prep](../../client-work/discovery-call-prep) (Client work)
- [client-follow-up](../../client-work/client-follow-up) (Client work)
- [sow-scoping](../../client-work/sow-scoping) (Client work)
- [release-notes](../../client-work/release-notes) (Client work)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
