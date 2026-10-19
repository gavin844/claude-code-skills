# correction-to-rule

**Turn a user's correction into a durable rule so the same mistake does not come back next session.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Working methods](../) group. The skill itself is [`SKILL.md`](SKILL.md), 742 words. This page is the summary; the file is what the agent reads.

## What it does

A correction fixed in place dies with the session, and the user pays for it again next week. Fires on "again", "I told you", "you keep", or a repeated instruction. Name the real cause (wrong process, missing context, weak rule, unreachable rule, unreliable code), write the fix in the smallest durable place (a hook, a skill body, a memory file), then re-run the task that failed.

## When the agent loads it

Use the moment the user corrects something, pushes back, repeats an instruction, or says that is not what I meant, no I said, I told you, you keep, stop doing, or every time. Turns a correction into a durable change in the smallest place that will hold it, instead of a fix that lasts until the session ends.

## Inside the skill

- The four steps
- Do not
- The signal to watch for

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/working-methods/correction-to-rule ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/correction-to-rule
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/working-methods/correction-to-rule/SKILL.md -o ~/.claude/skills/correction-to-rule/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\correction-to-rule`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
