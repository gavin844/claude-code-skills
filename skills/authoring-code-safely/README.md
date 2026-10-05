# authoring-code-safely

**Write and edit source files with Write/Edit, never through bash heredocs or python -c string surgery. Use when creating or modifying any code file. Prevents escaping corruption that silently breaks the file you just wrote.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 784 words. This page is the summary; the file is what the agent reads.

## What it does

In one session, heredocs turned `"\n"` into literal newlines, `python -c` mangled a regex escape, and an unquoted heredoc let the shell run backticked names as commands, deleting text from four files while this very skill was being written. Source files are written with Write and Edit, never through bash string surgery.

## Inside the skill

Sections of `SKILL.md`:

- What actually went wrong (2026-08-20/21, one session)
- The rule, concretely
- The one exception, and its guard
- Before you run anything that writes
- After you write
- Related skills

## When the agent should load it

Write and edit source files with Write/Edit, never through bash heredocs or python -c string surgery. Use when creating or modifying any code file. Prevents escaping corruption that silently breaks the file you just wrote.

Dates recorded inside the skill, each one an incident it was written from: 2026-08-20, 2026-08-21.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/authoring-code-safely ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/authoring-code-safely
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/authoring-code-safely/SKILL.md -o ~/.claude/skills/authoring-code-safely/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\authoring-code-safely`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
