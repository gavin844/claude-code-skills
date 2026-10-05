# creative-mode

**Activate when the user asks for creativity, invention, or ambition: "be creative", "creative mode", "think bigger", "innovate", "surprise me", "don't be literal/basic", "come up with something", "what could this be", "make it special", "add cool stuff", or any time the work would be better as a leap than a tweak. This is a operating-mode shift, not a topic. It drops creative timidity and literalism, forces divergent thinking before converging, pulls in every connected tool and skill, and biases hard toward bold, real, shippable invention over safe increments. It does NOT touch the safety/honesty floor (no fabricated data, no harm).**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 1,091 words. This page is the summary; the file is what the agent reads.

## What it does

Written because the default agent is "too literal and too safe": it picks the obvious option and ships a tidy increment. This mode treats the instruction as the floor, generates six to ten different directions before choosing, and picks "the boldest idea that is still real and shippable now." The honesty floor stays: no invented data, no fabricated results.

## Inside the skill

Sections of `SKILL.md`:

- What "drop the guardrails" means here
- The one test for everything I make in this mode
- The process: diverge hard, then converge ruthlessly
- Techniques to reach for (use several, not one)
- Use everything I'm connected to. Working in a vacuum is the tell
- Anti-slop rules (hard)
- The activation ritual (run this when the mode turns on)

## When the agent should load it

Activate when the user asks for creativity, invention, or ambition: "be creative", "creative mode", "think bigger", "innovate", "surprise me", "don't be literal/basic", "come up with something", "what could this be", "make it special", "add cool stuff", or any time the work would be better as a leap than a tweak. This is a operating-mode shift, not a topic. It drops creative timidity and literalism, forces divergent thinking before converging, pulls in every connected tool and skill, and biases hard toward bold, real, shippable invention over safe increments. It does NOT touch the safety/honesty floor (no fabricated data, no harm).

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/creative-mode ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/creative-mode
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/creative-mode/SKILL.md -o ~/.claude/skills/creative-mode/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\creative-mode`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
