---
name: authoring-code-safely
description: Write and edit source files with Write/Edit, never through bash heredocs or python -c string surgery. Use when creating or modifying any code file. Prevents escaping corruption that silently breaks the file you just wrote.
---

# Authoring code safely

**Rule: source files are written with Write and Edit. Never with a bash heredoc, never
with `python - <<'PY'` doing string replacement, never with `sed -i`.**

This is not style. Every layer between the intent and the file is a chance for the
text to change on the way through, and the failure is silent: the write succeeds, the
file is broken, and you find out on the next build.

## What actually went wrong (2026-08-20/21, one session)

| What I wrote | What landed in the file | Result |
|---|---|---|
| `return "\n".join(L)` inside a heredoc | a literal newline inside the string | `SyntaxError: unterminated string literal` |
| `text + "\n" + wb` inside a heredoc | same | same |
| `re.compile(r"(\d+)")` in a `python -c` | `SyntaxWarning: invalid escape sequence '\d'` | silent regex change |
| `{/* comment */}` before a JSX element | two children in an expression slot | `Failed to compile` |
| `-Args` (guessed the flag) | passed the literal string `-Args` | script errored, exit 2 |
| backticked names inside `python - <<PY` | shell ran each one as a **command**; every name deleted from four files | four broken skill files, silently written |

Four of those cost a full extra round trip each. One of them (`\d`) would have changed
behaviour without erroring at all. The last one happened **while I was writing this
skill**, which is the strongest argument for it: an unquoted heredoc delimiter (`<<PY`
instead of `<<'PY'`) leaves the body open to `$var` expansion and backtick command
substitution, so text that is perfectly valid in the file you meant to write gets
rewritten on the way in. Quoting the delimiter fixes that one case. It does not fix the
other four, which is why the rule is "use Write/Edit", not "quote your heredocs".

## The rule, concretely

- **New file** → `Write`.
- **Change to an existing file** → `Edit` with exact `old_string`/`new_string`.
- **Same change in many files** → still `Edit`, once per file. Repetition is cheaper
  than a corrupted file you have to find.
- **Bash is for running things**, not authoring them: tests, builds, git, greps, one
  line of `python -c` that only PRINTS.

## The one exception, and its guard

Generating many files from data (say, a metadata block per route) is legitimately a
script. When you do that:

1. Write the generator with `Write`, as a real file.
2. Have it write files, not patch them by string replacement where you can avoid it.
3. **Immediately parse every file it touched.** `python -c "import ast; ast.parse(open(f).read())"`
   for Python, `npx tsc --noEmit` for TypeScript. A generator that produced 71 files is
   71 chances to be wrong.
4. Read one generated file back and look at it.

## Before you run anything that writes

- Am I about to embed `\n`, `\t`, `\d`, `\s`, a backtick, `$`, or a quote in a shell
  string that becomes source code? Use `Write`/`Edit` instead.
- Am I inserting into JSX? A `{/* comment */}` is a CHILD. It cannot go in an
  expression slot (`cond ? ( ... ) : ( ... )`) beside the element. Use `//` above the
  return, or put the comment inside the element.
- Am I guessing a CLI flag? Read `--help` or the `param(...)` block first. One command
  is cheaper than one wrong run.

## After you write

Parse or typecheck **before** moving on. Not after three more edits, when you can no
longer tell which one broke it.

```
python -c "import ast; ast.parse(open('file.py',encoding='utf-8').read())"   # python
npx tsc --noEmit                                                            # ts/tsx
node --check file.js                                                        # js
```

If the language has no cheap parse, read the region you changed with `Read`.

## Related skills

Checked 2026-08-21 against the ~100 skills installed here and the public collections
before writing this one, after the user asked whether well-made skills already existed.
They did for two of the six I drafted, and those were folded into the existing skills
rather than duplicated:

- `verification-before-completion` - proving a claim before making it. Covers the
  ground my draft "read-the-artifact" would have; the two failure modes it was missing
  (grepping your own output for success, and treating a dry run as the artifact) were
  added to it instead.
- `systematic-debugging` - root cause before fixes.
- `karpathy-guidelines` - surfacing assumptions, surgical changes.
- `ponytail` - whether the thing needs to exist at all. Which is the check I skipped
  when I wrote six skills without looking for prior art first.

Nothing installed or public covered freshness-of-inputs, config-that-nothing-reads,
silent-failure patterns, or shell-escaping corruption when authoring files, which is
why those four exist.
