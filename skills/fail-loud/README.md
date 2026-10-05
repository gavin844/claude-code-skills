# fail-loud

**Make failures visible instead of silent. Use when writing exception handling, truthiness checks, resource lifecycles, or any lookup that can return nothing. Prevents bugs that present as working code.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 724 words. This page is the summary; the file is what the agent reads.

## What it does

"The expensive bugs are not the ones that crash. They are the ones that return a plausible answer." Patterns from one week: an `except: pass` that turned a model blend into a silent no-op, an `if x:` that discarded a legitimate zero, a lookup returning `None` that left records permanently ungradeable. After any `except`, `.get()` or truthiness check: "if this silently did nothing, would I be able to tell?"

## Inside the skill

Sections of `SKILL.md`:

- 1. Never `except: pass` in a data path
- 2. `if x:` is not `if x is not None:`
- 3. A lookup that finds nothing must not look like one that found something
- 4. Resources: write then commit, and do not use what you closed
- 5. Do not hardcode a list where a glob is correct
- 6. A display label is not a key
- The habit
- Related skills

## When the agent should load it

Make failures visible instead of silent. Use when writing exception handling, truthiness checks, resource lifecycles, or any lookup that can return nothing. Prevents bugs that present as working code.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/fail-loud ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/fail-loud
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/fail-loud/SKILL.md -o ~/.claude/skills/fail-loud/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\fail-loud`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
