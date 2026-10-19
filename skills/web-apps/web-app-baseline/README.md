# web-app-baseline

**The 20 checks every web app passes before it is called done, with the commands that prove them.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Web apps](../) group. The skill itself is [`SKILL.md`](SKILL.md), 1,059 words. This page is the summary; the file is what the agent reads.

## What it does

The user listed these once; they went into a rules file nothing referenced, so they loaded nowhere. Now a skill, so it applies everywhere. Twenty checks: custom 404 and error pages, loading and empty states, a title and Open Graph image per route, keyboard reach, 360px responsiveness, AA contrast on composited colours, every UI claim true, verified at the public URL. Covers the three theme states (dark, light, unstamped) that kept biting.

## When the agent loads it

The 20 checks every web app must pass before it is called done, plus the measurement commands that prove it. Use whenever building, styling, theming or shipping any rendered surface - a page, a dashboard, an artifact, a landing page. Load BEFORE writing UI, not after the user finds the bug. Pairs with website-craft (the 30 vibecoded tells and its detector).

## Inside the skill

- The 20
- Themes: the part that keeps biting
- Measure it, do not look at it
- Order of work

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/web-apps/web-app-baseline ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/web-app-baseline
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/web-apps/web-app-baseline/SKILL.md -o ~/.claude/skills/web-app-baseline/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\web-app-baseline`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
