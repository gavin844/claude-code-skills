# just-keep-working

**Do the work instead of asking permission for it. Always on. When the next step is obvious and reversible, take it and report what happened. Reserve questions for choices only the user can make.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 627 words. This page is the summary; the file is what the agent reads.

## What it does

One session produced six variants of "want me to fix that?" about reversible tasks the agent had already diagnosed. If the fix is reversible, do it and report one line: "a question is a cost" paid by the person with less context. Still ask for money moving, anything a third party sees, destroying data, changing a rule the user set, or a genuine fork.

## Inside the skill

Sections of `SKILL.md`:

- The default
- Do it, do not ask
- Still ask, every time
- When it is genuinely ambiguous, pick and say so
- Report shape
- The one thing this does NOT license

## When the agent should load it

Do the work instead of asking permission for it. Always on. When the next step is obvious and reversible, take it and report what happened. Reserve questions for choices only the user can make.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-24.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/just-keep-working ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/just-keep-working
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/just-keep-working/SKILL.md -o ~/.claude/skills/just-keep-working/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\just-keep-working`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
