---
name: client-follow-up
description: After a client or prospect meeting, turns the transcript or notes into a crisp follow-up email plus a list of concrete next actions with owners and dates. Load when the user says "write the follow-up," "draft a recap email," "follow up with [company]," or a meeting has just ended.
---

# Client Follow-up

## The sample company

This skill ships with example data for **Fieldstone AI**, a fictional 25-person AI strategy
and build consultancy in Denver, CO (fieldstone.example, hello@fieldstone.example). Its
services are AI strategy workshops, governance and risk, rapid prototyping, product design,
and production AI builds. Its method has four steps: Frame, Prove, Build, Adopt. Worked
examples use a fictional prospect, **Harbor Valley Credit Union**.

To make it yours, replace:
- **Company name**, sender signature, and contact details (Fieldstone AI, fieldstone.example).
- **Services**: the five service lines above, referenced when proposing a next step.
- **Method**: Frame, Prove, Build, Adopt, swapped for your own.
- **Voice**: the writing rules near the end of this file.
- **Pricing placeholder**: Fieldstone never states a price in a follow-up. If cost came
  up, write `XXX` or "we will scope that separately."

## Purpose

Turn a meeting into two things within the hour: an email the client is glad to receive,
and a short action list so nothing promised on the call gets dropped.

## When to use

- A client or prospect meeting has ended and the user wants the follow-up drafted.
- The user pastes notes or a transcript and asks for a recap.

## Inputs

1. **The transcript or notes.** Pull them from your meeting notes tool (Granola, Fathom,
   Otter) or take what the user pastes.
2. **Attendees.** From the calendar event, with titles.
3. **Deal context.** If a CRM is connected, the deal stage and the last email sent, so the
   follow-up does not repeat or contradict it.

If no transcript exists, ask the user for three lines of notes rather than inventing content.

## Steps

1. Confirm the meeting happened. A cancelled or one-person recording gets no follow-up.
2. Pull out what the client said they need, in their words.
3. List every commitment made on the call, with who made it.
4. Pick one next step. A specific meeting, a document, or a decision, with a proposed date.
5. Draft the email, then the action list.
6. Run the writing rules check and hand both to the user.

## Email structure

- **Subject.** Specific to the meeting: "Harbor Valley onboarding: notes and next step."
- **Opening line.** Thank them by referencing something they said, not a generic thanks.
- **What we heard.** Two to four short bullets in the client's language.
- **What we will do.** Fieldstone's commitments, each with a date.
- **What we need from you.** Only if something is genuinely needed.
- **Next step.** One clear ask with a proposed time.
- Under 200 words. No attachments promised that do not exist yet.

## Action list format

| Action | Owner | Due |
|---|---|---|
| Send onboarding process map template | Fieldstone | Friday |
| Share current onboarding volumes by branch | Harbor Valley (Dana Reyes) | Next Tuesday |
| Book 60-minute strategy workshop | Fieldstone | This week |

Owners are roles or named attendees from the call. Never assign a task nobody agreed to.

## Example opening (sample data)

"Dana, thanks for walking us through where applications wait the longest. The point that
branch staff re-key the same documents twice is where we would start."

## Writing rules

- No em dashes or en dashes. No reflexive triads. No meta-commentary.
- Cut hedge words: actually, just, simply, really, essentially.
- Warm, direct, specific. No hype words, no "circling back" or "touching base."

## Rules

- Never send the email. Create it as a draft in your email tool or hand the text to the
  user. The user sends it.
- Never invent commitments, quotes, or numbers that were not in the meeting.
- No pricing. If cost came up, defer to a separate scope with `XXX`.

## Related skills

- discovery-call-prep: the brief before the meeting.
- sow-scoping: scope the work once the follow-up confirms the need.
- blueprint-builder: attach or promise a Blueprint as the next step.
- demo-script: if the next step is a demo.
