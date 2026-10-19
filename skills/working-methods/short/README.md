# short

**Hard word caps on every reply: the answer first, no narration, no recaps.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Working methods](../) group. The skill itself is [`SKILL.md`](SKILL.md), 441 words. This page is the summary; the file is what the agent reads.

## What it does

Born from a complaint that every reply ended in a wall of text the reader skipped. Hard word caps: 60 for an answer, 100 for a finished task, 150 for a long session. The first sentence is the answer; process narration, recaps and praise go. Bad news stays at full strength: "shorten the framing, never the fact." Always on.

## When the agent loads it

Always on. Hard word caps on every reply to the user. Lead with the answer, cut process narration, no recaps. Use for every response, not just when asked to be brief.

## Inside the skill

- The caps
- Lead with the answer
- Delete these on sight
- Structure
- What stays, always
- The test

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/working-methods/short ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/short
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/working-methods/short/SKILL.md -o ~/.claude/skills/short/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\short`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
