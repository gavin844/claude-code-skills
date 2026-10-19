# Claude Code skills

A skill is a folder holding a `SKILL.md`: markdown instructions that
[Claude Code](https://claude.com/claude-code) loads when it is in a particular
situation, so a lesson learned once does not have to be relearned every session. Some
also carry a script.

These {count} were written while shipping real systems through 2026, in seven groups. The
first four groups are rules: most exist because something broke quietly and the mistake
only surfaced when a person looked at the result, so each records what went wrong, the
rule that came out of it, and how to recognise the moment it applies again. The last three
are working playbooks for a consultancy, a recruiting product and a betting analyst. They
ship with sample companies and sample numbers in place of the real ones; each says what
to replace to make it yours.

## Install

Copy any skill folder into your skills directory:

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/honest-code/fail-loud ~/.claude/skills/
```

Claude Code picks it up on the next session. The group folder is only for browsing; the
skill folder goes straight into `~/.claude/skills/`. Every skill has its own page with
what it does, when it loads, what is inside, and its install commands.

A few skills mention helper tools from their home workspace (`ui_check.js`,
`ux_audit.js`, `done_gate.py`). Those are not included; the skills stand without them.
