# web-motion-3d

**How to put real motion and real 3D into a web app without it reading as generated. Jitter to Lottie (dotlottie-react, the Lottie Creator and LottieFiles MCPs), Vectary embeds and their free-tier limits, and 3D in React via React Three Fiber (Threlte is the Svelte equivalent, not usable in Next.js). Load whenever a build calls for animation, a 3D object, a hero that moves, loading motion, or any "make it feel next-generation" ask. Pairs with website-craft (which motion is a tell) and web-app-baseline.**

A skill for [Claude Code](https://claude.com/claude-code). The skill itself is [`SKILL.md`](SKILL.md) in this folder, 1,104 words, and it can be called directly in a session as `/web-motion-3d`. This page is the summary; the file is what the agent reads.

## What it does

Motion is a tell when generic and an asset when it shows the product doing something; 3D is a tell when it is a blob and an asset when it is a real object. The pipeline: Jitter to dotLottie via `@lottiefiles/dotlottie-react`, React Three Fiber with the Canvas dynamic-imported and `dpr` capped, Vectary and its free-tier limits. Threlte is Svelte-only, so nobody reaches for it in Next.js. "If you cannot say what the motion tells the user, do not add it."

## Inside the skill

Sections of `SKILL.md`:

- 1 · Jitter → Lottie → the app  (motion)
- 2 · 3D in React: React Three Fiber  (not Threlte)
- 3 · Vectary  (3D design and embeds)
- 4 · Before you ship any of it
- What this skill will not do

## When the agent should load it

How to put real motion and real 3D into a web app without it reading as generated. Jitter to Lottie (dotlottie-react, the Lottie Creator and LottieFiles MCPs), Vectary embeds and their free-tier limits, and 3D in React via React Three Fiber (Threlte is the Svelte equivalent, not usable in Next.js). Load whenever a build calls for animation, a 3D object, a hero that moves, loading motion, or any "make it feel next-generation" ask. Pairs with website-craft (which motion is a tell) and web-app-baseline.

Dates recorded inside the skill, each one an incident it was written from: 2026-09-06.

## Install

Copy the folder into your Claude Code skills directory. It loads on the next session.

```sh
git clone https://github.com/gavin844/claude-code-skills.git
cp -r claude-code-skills/skills/web-motion-3d ~/.claude/skills/
```

Or just the one file:

```sh
mkdir -p ~/.claude/skills/web-motion-3d
curl -sL https://raw.githubusercontent.com/gavin844/claude-code-skills/main/skills/web-motion-3d/SKILL.md -o ~/.claude/skills/web-motion-3d/SKILL.md
```

Windows (PowerShell): the skills directory is `$HOME\.claude\skills\web-motion-3d`; the same files go there.

## Files

- [`SKILL.md`](SKILL.md)

## Related skills

- [website-craft](../website-craft)
- [web-app-baseline](../web-app-baseline)

## License

MIT, see the [repository license](../../LICENSE). Written by Gavin Long with Claude Code, 2026.
