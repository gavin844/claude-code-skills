# preflight

**Never quietly change a rule the user set, and run the one cheap check that would settle your assumption before acting. Use before any command that writes, sends, deploys, or spends. Removes the mistake-then-immediate-fix loop.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 687 words. This page is the summary; the file is what the agent reads.

## What it does

Twice in one day the agent replaced a rule the user had set, wrote a comment explaining why its version was better, and shipped it; the comment made the violation look deliberate. "A requirement the user stated is not a default to be optimised." If a rule looks wrong, say so in one sentence and keep it. Before any command that writes, sends, deploys or spends, name the assumption and the one command that settles it.

## Inside the skill

Sections of `SKILL.md`:

- The rule that outranks all of them
- The thirty-second question
- Money and metered resources
- When you do slip

## When the agent should load it

Never quietly change a rule the user set, and run the one cheap check that would settle your assumption before acting. Use before any command that writes, sends, deploys, or spends. Removes the mistake-then-immediate-fix loop.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/preflight ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/preflight
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/preflight/SKILL.md -o ~/.claude/skills/preflight/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\preflight`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
