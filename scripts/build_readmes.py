"""Builds every README in this repo from catalog.json and the SKILL.md files.

    python scripts/build_readmes.py          # write
    python scripts/build_readmes.py --check  # exit 1 if any README is out of date

catalog.json holds, per skill: its group, a one-sentence summary (the root table) and one
paragraph (the skill page). Everything else (description, sections, word count, files,
related skills) is read from the skill folder, so a page can never drift from its skill.
Edit catalog.json or a SKILL.md, then run this. Never edit a README by hand.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = "gavin844/claude-code-skills"

GROUPS = [
    ("working-methods", "Working methods", "How the agent behaves across a session: when to act, when to ask, what to say, and what counts as finished."),
    ("honest-code", "Honest code", "Code that tells the truth about itself: failures that show, checks that are proven, settings that are wired, scripts that are kept."),
    ("trustworthy-data", "Trustworthy data", "Numbers and records a person can rely on: fresh inputs, money read from the source, user decisions that survive a rebuild."),
    ("web-apps", "Web apps", "Shipping a web surface that is finished, does not look generated, and moves well."),
    ("client-work", "Client work", "A consultancy's sales and delivery documents, from the first call to the release notes. Ships with a sample company, Fieldstone AI, to replace with your own."),
    ("recruiting", "Recruiting", "Screening resumes in batches, selling to staffing agencies, and grading job postings. Ships with sample data to replace with your own."),
    ("betting-and-money", "Betting and money", "A recommend-only sports betting analyst and a personal finance coach. Neither places a bet or a trade. Ships with a sample $1,000 bankroll."),
]


def front_matter(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    fm = {}
    if m:
        for line in m.group(1).splitlines():
            k, _, v = line.partition(":")
            if k and not k.startswith(" "):
                fm[k.strip()] = v.strip().strip('"')
    return fm, text[m.end():] if m else text


def sections(body):
    out, fence = [], False
    for line in body.splitlines():
        if line.startswith("```"):
            fence = not fence
        elif not fence and line.startswith("## "):
            out.append(line[3:].strip())
    return out


def related(body, known):
    m = re.search(r"^## Related skills\n(.*?)(?=^## |\Z)", body, re.S | re.M)
    if not m:
        return []
    found = []
    for name in re.findall(r"[a-z0-9]+(?:-[a-z0-9]+)+|\bshort\b|\bpreflight\b|\bsharp\b", m.group(1)):
        if name in known and name not in found:
            found.append(name)
    return found


def files_of(folder):
    out = []
    for dirpath, _, names in os.walk(folder):
        for n in sorted(names):
            if n == "README.md":
                continue
            out.append(os.path.relpath(os.path.join(dirpath, n), folder).replace(os.sep, "/"))
    return sorted(out, key=lambda p: (p != "SKILL.md", p))


def skill_page(s, fm, body, rel, where, files):
    name, group = s["name"], s["group"]
    words = len(re.findall(r"\S+", body))
    lines = [
        f"# {name}",
        "",
        f"**{s['summary']}**",
        "",
        f"A skill for [Claude Code](https://claude.com/claude-code), in the [{dict((g, t) for g, t, _ in GROUPS)[group]}](../) group. "
        f"The skill itself is [`SKILL.md`](SKILL.md), {words:,} words. This page is the summary; the file is what the agent reads.",
        "",
        "## What it does",
        "",
        s["about"],
        "",
        "## When the agent loads it",
        "",
        fm.get("description", ""),
        "",
    ]
    if fm.get("user-invocable") == "true":
        lines += [f"It can also be called directly: `/{name}{(' ' + fm['argument-hint']) if fm.get('argument-hint') else ''}`.", ""]
    lines += ["## Inside the skill", ""] + [f"- {h}" for h in sections(body)] + [""]
    lines += [
        "## Install",
        "",
        "Copy the folder into your Claude Code skills directory. It loads on the next session.",
        "",
        "```sh",
        f"git clone https://github.com/{REPO}.git",
        f"cp -r claude-code-skills/skills/{group}/{name} ~/.claude/skills/",
        "```",
        "",
        "Or just the one file:",
        "",
        "```sh",
        f"mkdir -p ~/.claude/skills/{name}",
        f"curl -sL https://raw.githubusercontent.com/{REPO}/main/skills/{group}/{name}/SKILL.md -o ~/.claude/skills/{name}/SKILL.md",
        "```",
        "",
        f"Windows (PowerShell): the skills directory is `$HOME\\.claude\\skills\\{name}`; the same files go there.",
        "",
        "## Files",
        "",
    ] + [f"- [`{f}`]({f})" for f in files] + [""]
    lines += ["## Related skills", ""]
    lines += [f"- [{r}](../../{where[r]}/{r}) ({dict((g, t) for g, t, _ in GROUPS)[where[r]]})" for r in rel] if rel else ["None in this repo."]
    lines += ["", "## License", "", "MIT, see the [repository license](../../../LICENSE). Written by Gavin Long with Claude Code, 2026.", ""]
    return "\n".join(lines)


def group_page(gid, title, blurb, members):
    lines = [f"# {title}", "", blurb, "", "| Skill | What it does |", "|---|---|"]
    lines += [f"| [{s['name']}]({s['name']}) | {s['summary']} |" for s in members]
    lines += ["", f"[All {sum(1 for _ in CATALOG)} skills](../../README.md)", ""]
    return "\n".join(lines)


def root_page(intro, outro):
    lines = [intro.rstrip(), ""]
    for gid, title, blurb in GROUPS:
        members = [s for s in CATALOG if s["group"] == gid]
        lines += [f"## [{title}](skills/{gid})", "", blurb, "", "| Skill | What it does |", "|---|---|"]
        lines += [f"| [{s['name']}](skills/{gid}/{s['name']}) | {s['summary']} |" for s in members]
        lines += [""]
    return "\n".join(lines + [outro.lstrip()])


def build():
    out = {}
    where = {s["name"]: s["group"] for s in CATALOG}
    for s in CATALOG:
        folder = os.path.join(ROOT, "skills", s["group"], s["name"])
        text = open(os.path.join(folder, "SKILL.md"), encoding="utf-8").read().replace("\r\n", "\n")
        fm, body = front_matter(text)
        if fm.get("name") != s["name"]:
            sys.exit(f"{s['name']}: SKILL.md name is {fm.get('name')!r}")
        if not s.get("summary") or not s.get("about"):
            sys.exit(f"{s['name']}: catalog.json needs a summary and an about")
        rel = [r for r in related(body, where) if r != s["name"]]
        out[os.path.join(folder, "README.md")] = skill_page(s, fm, body, rel, where, files_of(folder))
    for gid, title, blurb in GROUPS:
        members = [s for s in CATALOG if s["group"] == gid]
        if members:
            out[os.path.join(ROOT, "skills", gid, "README.md")] = group_page(gid, title, blurb, members)
    head = open(os.path.join(ROOT, "scripts", "readme-intro.md"), encoding="utf-8").read()
    tail = open(os.path.join(ROOT, "scripts", "readme-outro.md"), encoding="utf-8").read()
    out[os.path.join(ROOT, "README.md")] = root_page(head.replace("{count}", str(len(CATALOG))), tail)
    return out


CATALOG = json.load(open(os.path.join(ROOT, "catalog.json"), encoding="utf-8"))
_unknown = {s["group"] for s in CATALOG} - {g for g, _, _ in GROUPS}
if _unknown:
    sys.exit(f"unknown group(s) in catalog.json: {_unknown}")
_on_disk = {(g, n) for g in os.listdir(os.path.join(ROOT, "skills")) if os.path.isdir(os.path.join(ROOT, "skills", g)) for n in os.listdir(os.path.join(ROOT, "skills", g)) if os.path.isdir(os.path.join(ROOT, "skills", g, n))}
_listed = {(s["group"], s["name"]) for s in CATALOG}
if _on_disk != _listed:
    sys.exit(f"catalog.json and skills/ disagree. Not in catalog: {sorted(_on_disk - _listed)}. Missing on disk: {sorted(_listed - _on_disk)}")

if __name__ == "__main__":
    pages = build()
    stale = [p for p, body in pages.items() if not os.path.exists(p) or open(p, encoding="utf-8").read().replace("\r\n", "\n") != body]
    if "--check" in sys.argv:
        for p in stale:
            print("out of date:", os.path.relpath(p, ROOT))
        sys.exit(1 if stale else 0)
    for p in stale:
        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(pages[p])
    print(f"{len(pages)} pages, {len(stale)} written")
