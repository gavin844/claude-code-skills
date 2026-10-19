---
name: discovery-call-prep
description: Produces a one-page pre-call brief covering the company, who is in the room, their likely AI pains, and your angle, pulled from the CRM, calendar, past meeting notes, and web research. Load when the user says "prep me for my call with X," "I have a call with [company] tomorrow," "pre-call brief," "who am I meeting," or names a company before a meeting.
---

# Discovery Call Prep

## The sample company

This skill ships with example data for **Fieldstone AI**, a fictional 25-person AI strategy
and build consultancy in Denver, CO (fieldstone.example, hello@fieldstone.example). Its
services are AI strategy workshops, governance and risk, rapid prototyping, product design,
and production AI builds. Its method has four steps: Frame, Prove, Build, Adopt. Worked
examples use a fictional prospect, **Harbor Valley Credit Union**.

To make it yours, replace:
- **Company name** and contact details (Fieldstone AI, fieldstone.example).
- **Services**: the five service lines above, used in the "Our angle" section.
- **Method**: Frame, Prove, Build, Adopt, swapped for your own.
- **Voice**: the writing rules near the end of this file.
- **Pricing placeholder**: Fieldstone never states a price. If pricing comes up, `XXX`.

## Purpose

Turn an upcoming call into a one-page brief the user can read in two minutes before
walking in. The goal is to make the user the most prepared person on the call without
doing any digging themselves.

## When to use

- A prospect or client call is coming up and the user wants context.
- Proactively, when a meeting is near and no brief exists yet.

## Inputs to gather

Use what is connected and skip what is not. Note each skipped source in the brief.

1. **Who.** Pull the calendar event for attendee names and the agenda line. Look each
   attendee up (company site, public profile).
2. **CRM state.** If a CRM is connected, search for the company and its contacts: deal
   stage, owner, last activity, open notes. This is the single most useful signal. Never
   invent a stage. If the company is not there, write "not in CRM yet."
3. **History.** Check your meeting notes tool for any prior conversation with this
   company or person and surface what came out of it.
4. **The company.** A fast web pass: what they do, size, recent news, and any public
   signal they are thinking about AI.

## Output: the brief

One page, in this order:

- **The call.** Company, attendees with titles, date and time, the stated agenda.
- **Where we stand.** CRM deal stage, owner, and last touch, or "first contact."
- **Who they are.** Two or three plain lines on the business and its moment.
- **Likely AI pains.** Mapped to their industry: fragmentation, compliance, adoption, or
  ROI problems. Concrete, not generic.
- **Our angle.** The one or two Fieldstone services that fit, and the sharpest opening
  question to get them talking.
- **Watch-outs.** Anything from history: a past objection, a stalled thread, who owns it.

## Example (sample data)

**The call.** Harbor Valley Credit Union, Thursday 10:00. Dana Reyes (COO), Sam Okafor
(CFO). Agenda: "AI and member onboarding."

**Where we stand.** First contact. Inbound from the website form.

**Who they are.** Regional credit union with 40 branches. Member onboarding takes 3 to 5
days and runs on manual document checks.

**Likely AI pains.** Slow onboarding loses members to faster digital banks. Compliance on
member data limits what they will try. The CFO will want a business case before any build.

**Our angle.** Strategy workshop plus a rapid prototype of document intake. Opening
question for Dana: "Where in the 3 to 5 days does an application sit waiting the longest?"

**Watch-outs.** Two executives with different goals: Dana owns speed, Sam owns cost. Speak to both.

## Writing rules

- No em dashes or en dashes. No reflexive triads. No hedge words.
- Plain active voice. This is internal, so it can be blunt.

## Rules

- Never fabricate CRM data, deal stages, or prior conversations. Missing is a real answer.
- No pricing. If asked, "custom-scoped, XXX."
- This is a brief for the user, not a client document. Fast and skimmable beats polished.

## Related skills

- blueprint-builder: a tailored document to send before or after the call.
- client-follow-up: the follow-up email once the call ends.
- sow-scoping: scope the engagement from the call notes.
- demo-script: if the call includes a demo.
