---
name: correction-to-rule
description: Use the moment the user corrects something, pushes back, repeats an instruction, or says that is not what I meant, no I said, I told you, you keep, stop doing, or every time. Turns a correction into a durable change in the smallest place that will hold it, instead of a fix that lasts until the session ends.
metadata:
  version: 1.0.0
---

# Turn the correction into a rule

Every time the user corrects something and I only fix the thing, the lesson dies when the
session does. He pays for the same correction again next week and reasonably concludes
I do not listen.

Anthropic's skills team puts it as: anything written down can be used efficiently by a
future version of itself. The version that matters here is narrower. **A correction is
evidence that a rule is missing, wrong, or unreachable. Fix the rule, not only the
output.**

## The four steps

### 1. Fix the thing he is looking at
First and fast. He is blocked on it. Do not make him wait through an analysis of why
the system failed him.

### 2. Name the real cause, honestly
Exactly one of these is usually true:

| Cause | What it looks like | Where it gets fixed |
| :- | :- | :- |
| **The process was wrong** | I did the steps I knew, and the steps were wrong | the skill body |
| **Context was missing** | I did not know a fact about him, his stack, or his taste | a reference file or a memory |
| **The rule was too weak** | A rule existed and I read past it | move it to a hook, or make it a hard sentence |
| **The rule was unreachable** | A rule existed and never loaded | the skill router, or the skill's description |
| **The code was unreliable** | The same job done freshly each time, differently each time | a saved script (see save-the-script) |

The fourth row is the one to check first in this workspace, because it has been the
answer more than once. A skill that never loads is a document. Before rewriting a
process, confirm the process was ever read.

### 3. Write it in the smallest durable place
Smallest means: the narrowest scope that still catches the case next time.

- **A hook** when it must not happen again and a machine can judge it. Anthropic:
  when something absolutely must not happen, an instruction is the wrong tool.
- **A skill body** when it is how a recurring job should be done.
- **The skill's description, plus a router rule** when the skill was right but did not
  load. Both halves: the description decides whether a model reaches for it, the router
  decides whether it is offered at all.
- **A memory file** when it is a fact about the user, a project, or a decision, rather
  than a procedure.
- **CLAUDE.md** last and rarely. It is loaded on every turn in every session, so it is
  the most expensive place to put anything, and Anthropic's guidance is to keep it
  under about 200 lines.

Write the **why** with the change, including his words and the date. A rule whose
reason is recorded survives the next person who thinks it looks arbitrary. A bare rule
gets deleted in six months by me.

### 4. Re-run the same task and verify
Run the thing that failed, against the new rule, and check it now passes. A rule that
has never been exercised is a guess. If the rule lives in a hook or a checker, prove it
against a case that should fail as well as one that should pass, or it is not proven.

## Do not

- **Do not apologise at length.** He has said the ask twice; a third paragraph about it
  is the same failure in a different costume.
- **Do not write a rule so broad it fires on everything.** "Always be careful" changes
  nothing and costs context on every turn.
- **Do not add a rule for a one-off.** If it will not recur, fix it and move on. The
  test is whether this is the second time.
- **Do not silently change a rule he set.** If his own instruction is the thing causing
  the problem, say so and let him decide.

## The signal to watch for

He rarely says "add a rule". He says **"again"**, **"I told you"**, **"you keep"**,
**"every time"**, or he repeats an instruction he already gave. Those words mean the
correction has already been paid for at least twice, and the fix belongs somewhere
durable this time.
