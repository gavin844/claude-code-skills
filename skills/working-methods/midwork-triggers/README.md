# midwork-triggers

**Load the right skill from what the agent is about to do mid-task, not only from the words of the request.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Working methods](../) group. The skill itself is [`SKILL.md`](SKILL.md), 661 words. This page is the summary; the file is what the agent reads.

## What it does

On one day the agent broke seven things, and every one had a skill written for it that never loaded: the router fires on what the user types, and the decisions happened hours later. This is a table keyed on what the agent is about to do: add a guard, explain a zero, regenerate something, say done, rank a list. Each row names the skill and the failure that earned it.

## When the agent loads it

Load the skill that matches the situation you are IN, not the words the user used. Use when about to add a guard, automate a browser, ship a UI change, add a constant, or explain a zero. The router fires on the user's prompt; these failures happen hours later inside the work.

## Inside the skill

- The table
- Two habits that would have caught most of it
- What this is not

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/working-methods/midwork-triggers ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/midwork-triggers
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/working-methods/midwork-triggers/SKILL.md -o ~/.claude/skills/midwork-triggers/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\midwork-triggers`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
