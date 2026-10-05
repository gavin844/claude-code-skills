# one-writer-per-record

**Any file, DB row or KV key that both a scheduled task and an interactive session can write needs exactly one owner, or it gets destroyed. Load before adding a cron job, a watcher, a screenshot script, or any second process that touches state a human is also editing.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 439 words. This page is the summary; the file is what the agent reads.

## What it does

A scheduled watcher rebuilt the daily card and deleted the one a human had built minutes earlier. A screenshot script matched buttons by visible text and marked bets as placed. Every piece of durable state gets one named writer: if a scheduler writes it, a human must not, and the reverse. Browser tools against live systems block writes at the network layer, because "intent is not enforcement."

## Inside the skill

Sections of `SKILL.md`:

- What happened, so the rule is not abstract
- The rule
- Enforce read-only at the layer that cannot be bypassed
- Before adding any second process, answer these
- Related

## When the agent should load it

Any file, DB row or KV key that both a scheduled task and an interactive session can write needs exactly one owner, or it gets destroyed. Load before adding a cron job, a watcher, a screenshot script, or any second process that touches state a human is also editing.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/one-writer-per-record ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/one-writer-per-record
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/one-writer-per-record/SKILL.md -o ~/.claude/skills/one-writer-per-record/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\one-writer-per-record`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
