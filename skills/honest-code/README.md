# Honest code

Code that tells the truth about itself: failures that show, checks that are proven, settings that are wired, scripts that are kept.

| Skill | What it does |
|---|---|
| [authoring-code-safely](authoring-code-safely) | Write code with the file tools, never through shell string surgery, so escaping cannot corrupt the file. |
| [fail-loud](fail-loud) | Make failures visible instead of swallowed, so broken code cannot pass for working code. |
| [locate-before-you-guard](locate-before-you-guard) | Find the line that produced the wrong output before adding a check that would hide it. |
| [prove-the-checker](prove-the-checker) | Test every validator against a known-bad and a known-good case before trusting what it says. |
| [wire-the-knob](wire-the-knob) | Prove some code reads a new setting before claiming the setting changes anything. |
| [save-the-script](save-the-script) | Turn a working one-off script into a kept tool instead of rewriting it next time. |

[All 37 skills](../../README.md)
