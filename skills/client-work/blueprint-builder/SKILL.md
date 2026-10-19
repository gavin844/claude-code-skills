---
name: blueprint-builder
description: Builds an Opportunity Blueprint, the tailored top-of-funnel document that shows a prospect where AI can move their business and earns the first meeting. Load when the user says "build a blueprint," "opportunity blueprint," "top-of-funnel doc for [company]," "make the blueprint for this form submission," or a new lead needs a tailored read.
---

# Opportunity Blueprint Builder

## The sample company

This skill ships with example data for **Fieldstone AI**, a fictional 25-person AI strategy
and build consultancy in Denver, CO (fieldstone.example, hello@fieldstone.example). Its
services are AI strategy workshops, governance and risk, rapid prototyping, product design,
and production AI builds. Its method has four steps: Frame, Prove, Build, Adopt. Worked
examples use a fictional prospect, **Harbor Valley Credit Union**.

To make it yours, replace:
- **Company name** and contact details (Fieldstone AI, fieldstone.example).
- **Services**: the five service lines above.
- **Method**: Frame, Prove, Build, Adopt, swapped for your own framework or delivery steps.
- **Voice**: the writing rules near the end of this file.
- **Pricing placeholder**: Fieldstone never states a price. Every investment line reads `XXX`.

## What the Blueprint is

The tailored document that shows a prospect Fieldstone already understands their world
and where AI can move the needle for them. It earns the first meeting. It is not the
Statement of Work. For scoping a signed or near-signed engagement, use `sow-scoping`.

## When to use

- A lead or web form submission comes in and needs a tailored response.
- The user names a prospect and asks for a Blueprint before an intro call.

## Inputs

1. **The company**: name, URL, and anything from the form submission or the user.
2. **CRM record**: if a CRM (HubSpot, Salesforce) is connected, pull the contact and
   company record for context, owner, and any prior touches.
3. **Research**: a web pass on the company and its industry. Recent news, size, how they
   serve customers, and any public signal they are thinking about AI.

If research turns up nothing specific, say so to the user before drafting. A generic
Blueprint is worse than no Blueprint.

## Structure

1. **Their world.** Open by showing you understand their business and its moment.
   Specific to the company, not the industry in general.
2. **Where AI moves the needle.** Three to five concrete opportunity areas. Use these
   lenses to find them: personalization, decision intelligence, operational efficiency,
   customer engagement, governance. Each area names the pain, the AI move, and the outcome.
3. **Use-case portfolio.** A table of candidate use cases with an impact read and an
   effort read (High, Medium, Low). No invented numbers.
4. **How Fieldstone would approach it.** The Frame, Prove, Build, Adopt method in plain
   terms, with the rapid-prototype difference: a working proof before a large commitment.
5. **First step.** The complimentary strategy workshop as the natural next move.
6. **Investment.** None in a Blueprint. If a range is implied, write "scoped separately, XXX."

## Example (sample data)

Harbor Valley Credit Union, 40 branches. Member onboarding takes 3 to 5 days and runs on
manual document review.

| Use case | Impact | Effort |
|---|---|---|
| Document intake and verification assistant for new member applications | High | Medium |
| Branch staff copilot for onboarding policy questions | Medium | Low |
| Onboarding drop-off analysis to find where applicants stall | Medium | Low |
| Governance review of member data handling for any AI step | High | Low |

Opening line in the right voice: "Harbor Valley grew to 40 branches on in-person service,
and new members now wait 3 to 5 days to open an account while staff check documents by hand."

## Writing rules

- No em dashes or en dashes. Ranges read "3 to 5 days".
- No reflexive triads, no "it's not X, it's Y", no meta-commentary ("here's what matters").
- Cut hedge and filler words: actually, just, simply, really, essentially, obviously.
- Active voice, concrete verbs, one idea per sentence. Tables for portfolios and roadmaps.
- Voice: plain, confident, specific. No hype words.

## Quality bar

- Tailored beats generic every time. If a claim about the company is not grounded in
  research, cut it.
- Never fabricate metrics, named clients, or case results.
- No pricing. Workshops are complimentary: say so, do not quote anything else.
- Draft for the user to review, then whoever on their team signs off. Never send it to
  the prospect directly.

## Delivery

Create the draft in your document tool (a Google Doc via your Docs connector, or a local
Markdown file if none is connected). Hand the user the link and a two-line summary of the
opportunity areas you chose.

## Related skills

- discovery-call-prep: brief for the meeting the Blueprint earns.
- sow-scoping: scope the engagement once discovery is done.
- client-follow-up: follow-up email after the first meeting.
- demo-script: a short demo if a prototype exists.
