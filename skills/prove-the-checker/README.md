# prove-the-checker

**Every guard, validator, audit or harness must be proven against a known-bad case AND a known-good case before its output is trusted. Load before writing or believing any checker - a contrast audit, a line-band guard, a UI harness, a lint rule, a fraud filter.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 458 words. This page is the summary; the file is what the agent reads.

## What it does

Four checkers reported the opposite of the truth: a UI harness that tested dark mode by removing the attribute, a hover test using a synthetic event that cannot trigger CSS `:hover`, a guard that quarantined 77,900 valid rows. Before its output influences a decision, a checker must pass a planted known-bad case and a known-good case. "A checker with false results is worse than no checker."

## Inside the skill

Sections of `SKILL.md`:

- The incidents
- The rule
- Specific traps that have already bitten
- Report honestly
- Related

## When the agent should load it

Every guard, validator, audit or harness must be proven against a known-bad case AND a known-good case before its output is trusted. Load before writing or believing any checker - a contrast audit, a line-band guard, a UI harness, a lint rule, a fraud filter.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/prove-the-checker ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/prove-the-checker
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/prove-the-checker/SKILL.md -o ~/.claude/skills/prove-the-checker/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\prove-the-checker`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
