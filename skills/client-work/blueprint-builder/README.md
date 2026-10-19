# blueprint-builder

**A tailored top-of-funnel Opportunity Blueprint that shows a prospect where AI can move their business.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Client work](../) group. The skill itself is [`SKILL.md`](SKILL.md), 761 words. This page is the summary; the file is what the agent reads.

## What it does

Produces an Opportunity Blueprint: a tailored top-of-funnel document that shows a prospect where AI can move their business, with three to five opportunity areas, a use-case portfolio rated by impact and effort, and a workshop as the next step. Use it when a new lead or form submission comes in and you want a credible, researched read to earn the first meeting. It never states a price and always produces a draft for internal review.

## When the agent loads it

Builds an Opportunity Blueprint, the tailored top-of-funnel document that shows a prospect where AI can move their business and earns the first meeting. Load when the user says "build a blueprint," "opportunity blueprint," "top-of-funnel doc for [company]," "make the blueprint for this form submission," or a new lead needs a tailored read.

## Inside the skill

- The sample company
- What the Blueprint is
- When to use
- Inputs
- Structure
- Example (sample data)
- Writing rules
- Quality bar
- Delivery
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/client-work/blueprint-builder ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/blueprint-builder
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/client-work/blueprint-builder/SKILL.md -o ~/.claude/skills/blueprint-builder/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\blueprint-builder`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [discovery-call-prep](../../client-work/discovery-call-prep) (Client work)
- [sow-scoping](../../client-work/sow-scoping) (Client work)
- [client-follow-up](../../client-work/client-follow-up) (Client work)
- [demo-script](../../client-work/demo-script) (Client work)
- [short](../../working-methods/short) (Working methods)

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
