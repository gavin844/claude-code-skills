# authoring-code-safely

**Write code with the file tools, never through shell string surgery, so escaping cannot corrupt the file.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Honest code](../) group. The skill itself is [`SKILL.md`](SKILL.md), 784 words. This page is the summary; the file is what the agent reads.

## What it does

In one session, heredocs turned `"\n"` into literal newlines, `python -c` mangled a regex escape, and an unquoted heredoc let the shell run backticked names as commands, deleting text from four files while this very skill was being written. Source files are written with Write and Edit, never through bash string surgery.

## When the agent loads it

Write and edit source files with Write/Edit, never through bash heredocs or python -c string surgery. Use when creating or modifying any code file. Prevents escaping corruption that silently breaks the file you just wrote.

## Inside the skill

- What actually went wrong (2026-08-20/21, one session)
- The rule, concretely
- The one exception, and its guard
- Before you run anything that writes
- After you write
- Related skills

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/honest-code/authoring-code-safely ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/authoring-code-safely
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/honest-code/authoring-code-safely/SKILL.md -o ~/.claude/skills/authoring-code-safely/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\authoring-code-safely`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
