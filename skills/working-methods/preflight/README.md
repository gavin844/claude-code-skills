# preflight

**Before anything that writes, sends, deploys or spends, run the one check that settles the assumption, and never quietly change a rule the user set.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Working methods](../) group. The skill itself is [`SKILL.md`](SKILL.md), 691 words. This page is the summary; the file is what the agent reads.

## What it does

Twice in one day the agent replaced a rule the user had set, wrote a comment explaining why its version was better, and shipped it; the comment made the violation look deliberate. "A requirement the user stated is not a default to be optimised." If a rule looks wrong, say so in one sentence and keep it. Before any command that writes, sends, deploys or spends, name the assumption and the one command that settles it.

## When the agent loads it

Never quietly change a rule the user set, and run the one cheap check that would settle your assumption before acting. Use before any command that writes, sends, deploys, or spends. Removes the mistake-then-immediate-fix loop.

## Inside the skill

- The rule that outranks all of them
- The thirty-second question
- Money and metered resources
- When you do slip

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/working-methods/preflight ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/preflight
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/working-methods/preflight/SKILL.md -o ~/.claude/skills/preflight/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\preflight`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
