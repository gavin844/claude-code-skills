---
name: sow-scoping
description: Turns discovery notes into a structured Statement of Work draft with objectives, phases, deliverables, timeline, team, and an investment placeholder. Load when the user says "scope this," "draft a SOW," "statement of work," "turn these notes into a proposal," or "what would this engagement look like."
---

# SOW and Engagement Scoping

## The sample company

This skill ships with example data for **Fieldstone AI**, a fictional 25-person AI strategy
and build consultancy in Denver, CO (fieldstone.example, hello@fieldstone.example). Its
services are AI strategy workshops, governance and risk, rapid prototyping, product design,
and production AI builds. Its method has four steps: Frame, Prove, Build, Adopt. Worked
examples use a fictional prospect, **Harbor Valley Credit Union**.

To make it yours, replace:
- **Company name** and contact details (Fieldstone AI, fieldstone.example).
- **Services**: the five service lines above.
- **Method**: Frame, Prove, Build, Adopt, swapped for your own framework or phases.
- **Voice**: the writing rules near the end of this file.
- **Pricing placeholder**: Fieldstone never states a price. Every investment line reads `XXX`.

## Purpose

Turn discovery notes into a scoped Statement of Work that reads like Fieldstone wrote it,
ready for the user to review before it goes near a client.

## When to use

- The user has notes from a discovery call or workshop and needs phases, deliverables,
  a timeline, and the investment line.
- A pre-proposal "what would this look like" sketch.
- For a top-of-funnel document before discovery, use `blueprint-builder` instead.

## Inputs

1. The discovery notes, transcript, or the user's summary of what the client needs.
2. The client's industry and any constraints they named: compliance, timeline, existing
   tech stack, internal team capacity.
3. Prior context if connected: the deal record in your CRM, the call in your meeting
   notes tool (Granola, Fathom, Otter).

If an input is missing, list what you assumed at the top of the draft so the reviewer sees it.

## Structure of the SOW draft

1. **Context.** Acknowledge the client's framing in one or two lines. Start with their
   problem as they said it, not "this document describes."
2. **Objectives.** The outcomes in the client's language. Business results, not tasks.
3. **Approach.** Map the work to the method (Frame, Prove, Build, Adopt) and to the
   services that fit.
4. **Phases.** Usually Frame (workshop and discovery), Prove (rapid prototype or proof of
   concept), Build (production build or roadmap), Adopt (rollout, training, governance).
   Each phase lists its goal, activities, deliverables, and duration in weeks.
5. **Deliverables.** A concrete, checkable list. Tables for multi-item sets.
6. **Timeline.** Weeks, written "Weeks 1 to 3". No hard dates unless the client gave them.
7. **Team.** Roles, not names, unless the user says otherwise. "Prepared by: Fieldstone AI."
8. **Assumptions and out of scope.** What the client provides, what is excluded.
9. **Investment.** Always **XXX**, or "scoped in a separate proposal." Never a number.

## Example phase table (sample data)

Harbor Valley Credit Union wants member onboarding cut from 3 to 5 days. COO Dana Reyes
owns the outcome. CFO Sam Okafor needs a business case before the Build phase.

| Phase | Weeks | Goal | Key deliverables |
|---|---|---|---|
| Frame | Weeks 1 to 2 | Map the current onboarding flow and pick the first use case | Process map, prioritized use-case list |
| Prove | Weeks 3 to 6 | Working prototype of document intake and verification | Clickable prototype, test results with branch staff |
| Build | Weeks 7 to 14 | Production version integrated with the core banking system | Deployed service, runbook, governance review |
| Adopt | Weeks 15 to 18 | Rollout across branches | Training sessions, adoption metrics plan |

Investment: XXX.

## Writing rules

- No em dashes or en dashes. Ranges read "Weeks 1 to 3" and "5 to 10".
- No reflexive triads, no "it's not X, it's Y", no meta-commentary.
- Cut hedge words: actually, just, simply, really, essentially.
- Active voice, one idea per sentence. Plain and specific, no hype words.

## Pre-send check

Search the draft for dashes, hedge words, and any digit next to a currency sign. Resolve
every hit before handing it over.

## Rules

- No pricing, ever. Investment is XXX.
- This is a draft for internal review. Never present it as client-ready without the
  user's explicit approval.
- Deliver to the user first. Never send anything to a client directly.

## Related skills

- discovery-call-prep: the call that produces the notes this skill scopes.
- blueprint-builder: the top-of-funnel document before discovery.
- client-follow-up: the email that confirms what was heard before scoping.
- demo-script: a short demo of the Prove phase output.
