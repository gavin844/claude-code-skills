# website-craft

**The 30 tells that make a site look machine-made, with a detector that finds them.**

A skill for [Claude Code](https://claude.com/claude-code), in the [Web apps](../) group. The skill itself is [`SKILL.md`](SKILL.md), 1,323 words. This page is the summary; the file is what the agent reads.

## What it does

"All 30 of these are things that make a website obviously vibecoded." The 30 tells, each with an instead: harsh gradients, the default icon set, pure white, three feature cards in a row, the three default fonts, em dashes, fake testimonials, three pricing tiers. The detector needs only Node: `node skills/website-craft/scripts/detect.mjs <dir> [--json] [--only id,id] [--severity high]` prints `file:line` per finding and exits 1 on any HIGH, so it gates a deploy. LOOK items go to a human because "no regex can decide this."

## When the agent loads it

The 30 tells that make a site look vibecoded, with a runnable detector, plus the design tools worth reaching for (Magic MCP, Vectary, Threlte / React Three Fiber, Jitter). Use whenever building, restyling, reviewing or shipping any website, landing page, dashboard or app surface. Load BEFORE writing UI. Pairs with web-app-baseline (the 20 correctness checks); this skill is about whether it looks machine-made, that one is about whether it is finished.

It can also be called directly: `/website-craft [detect <dir> | fix <id> | tools]`.

## Inside the skill

- Run the detector first
- The 30
- Design tools wired up
- Order of work
- What this skill will not do

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/web-apps/website-craft ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/website-craft
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/web-apps/website-craft/SKILL.md -o ~/.claude/skills/website-craft/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\website-craft`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)
- [`scripts/detect.mjs`](scripts/detect.mjs)

## Related skills

None in this repo.

## License

MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.
