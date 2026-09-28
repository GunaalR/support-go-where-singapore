# PROMPTS.md

# MGMT 6108 --- Google AI Studio Build Log

**Project:** Redesigning the SupportGoWhere Results Screen  
**Prototype brand:** HelpCompass SG  
**Course:** MGMT 6108 --- Decision Architecture for Managers  

## Important workflow

**Google Stitch handles the visual design / replication.**  
**Google AI Studio handles implementation and interaction.**  

Therefore, these prompts assume that the team has already produced the relevant screen/design in Google Stitch and will provide the Stitch-generated code/design as context to AI Studio.

AI Studio must **not redesign the website from scratch**.

For every prompt below:

- Treat the Stitch-generated design as the visual source of truth.
- Preserve the existing layout, typography, spacing, hierarchy and visual language unless a prompt explicitly requests a behavioural change.
- Do not invent new pages or features.
- Do not use real government branding.
- Use fictional HelpCompass SG branding and fictional data.
- Front end only.
- No server.
- No API keys.
- No database.
- No authentication.
- No real payments.
- No real personal data.
- No real government application submission.
- Record every prompt and important correction in this file.

---

# 1. MASTER AI STUDIO PROMPT --- VARIANT A

## Use this after importing the Stitch-generated website/design.

```text
You are implementing the MGMT 6108 Decision Architecture for Managers student prototype.

The Google Stitch-generated design/code supplied in the project is the SOURCE OF TRUTH for the website's visual design.

Do NOT redesign the website.
Do NOT recreate the visual design from scratch.
Do NOT make the interface prettier or change its visual identity unless explicitly requested.

Your task is to turn the supplied Stitch design into a working front-end prototype.

PROJECT
The prototype is a fictional Singapore support-benefits website called "HelpCompass SG".

It is a student prototype inspired by a support-benefits portal. It is NOT an official government website.

Use only:
- fictional scheme names;
- fictional benefit amounts;
- fictional household/persona information.

Do not use:
- real government logos;
- real government branding;
- real personal data;
- NRIC numbers;
- addresses;
- bank details;
- real payments;
- real government application systems.

TECHNICAL GUARDRAILS
- Front end only.
- No server.
- No API keys.
- No database.
- No authentication.
- No real payment.
- No external government service integration.
- Use local/static fictional data.
- Make the interactions functional within the prototype.

VARIANT A
This is the BASELINE condition.

Do not implement the Buddy Apply intervention yet.

Preserve the Stitch design and make the following baseline interactions work:

1. Display the fictional calculator results.
2. Display the estimated total.
3. Display the fictional eligible scheme cards.
4. Allow the user to open a scheme detail view.
5. Allow normal navigation/back behaviour.
6. Keep the scheme list as the baseline condition.
7. Do not add:
   - Start Here;
   - recommended schemes;
   - action-status nudges;
   - day picker;
   - reminder;
   - social-support feature;
   - artificial urgency;
   - fake social proof.

The purpose of Variant A is to provide a clean comparison condition for the later Variant B.

Do not make A intentionally bad or frustrating.

At the end, make sure the prototype is functional and visually faithful to the supplied Stitch design.
```

---

# 2. AI STUDIO CORRECTION PROMPT TEMPLATE

Use one change per message.

```text
Make ONLY this change:

[DESCRIBE ONE SPECIFIC CHANGE]

Do not change the layout, styling, content, navigation, or other functionality.

Preserve the Stitch-generated design as the source of truth.

Do not add any other features.
```

Use this format because the course workflow asks the team to log the prompts and keep changes controlled.

---

# 3. BEFORE VARIANT B

Do not implement Variant B until:

- [x] Actual SupportGoWhere results screenshots have been captured and dated.
- [x] AUDIT.md has been checked against those screenshots.
- [x] Each team member has independently rated the findings.
- [x] The group has agreed on the final findings/severity.
- [x] AUDIT.md has been committed to GitHub.

---

# 4. MASTER AI STUDIO PROMPT --- VARIANT B

## Use only after AUDIT.md is committed.

```text
You are modifying the existing MGMT 6108 student prototype.

The current working prototype and the Google Stitch-generated design are the SOURCE OF TRUTH.

Do NOT redesign the website.
Do NOT rebuild the visual interface from scratch.
Do NOT make unrelated visual changes.

Implement ONLY the behavioural redesign described below.

PROJECT
Fictional prototype: HelpCompass SG.

The decision being redesigned is:

"What does a household do next after seeing its estimated support?"

The intervention is called:

"Start Here + Plan the First Move"

The goal is to help the user move from seeing several eligible schemes to one concrete next step, without hiding options or pressuring the user.

---

CORE INTERVENTION: START HERE

At the results screen, introduce a clearly identifiable "Start Here" section.

The section should recommend 2–3 relevant fictional schemes as possible first options.

The recommendation must be transparent.

Use fictional criteria such as:
- relevance;
- estimated value;
- ease of the next action.

Do not use:
- "Most people choose this";
- fake popularity;
- fake urgency;
- "Act now";
- countdowns;
- guilt;
- scarcity claims.

The recommendation is guidance, not a requirement.

---

KEEP ALL OPTIONS AVAILABLE

Add a clear:

"See all schemes"

option.

The user must still be able to access every eligible fictional scheme.

Do not hide or delete schemes simply because they are not in Start Here.

---

ACTION STATUS

For relevant schemes, clearly show one of:

"Automatic — nothing to do"

or

"You need to apply"

Use text rather than colour alone.

Do not invent real government eligibility rules.

Use only the fictional scheme data already present in the prototype.

---

PLAN THE FIRST MOVE

For a scheme requiring action, after the user chooses to proceed, show:

"When will you take the next step?"

Options:

"Today"
"This weekend"
"Remind me"

The choices must be voluntary.

Include an equally clear way to skip this planning step.

Do not use countdowns or artificial urgency.

The purpose is to implement an intention, not to pressure the user.

---

WHAT YOU'LL NEED

On the relevant fictional scheme-detail screen, add:

"What you'll need"

Show a short fictional checklist of preparation steps.

Use only fictional information.

Do not ask for:
- NRIC;
- name;
- address;
- bank details;
- real income;
- real household data.

---

OPTIONAL SOCIAL SUPPORT

After the user selects a date, provide:

"Do this with someone"

This is optional.

The fictional share message may contain only:
- scheme name;
- chosen date;
- documents to gather.

Do not include personal information.

"Skip" must be equally prominent.

---

ETHICAL REQUIREMENTS

The redesign must NOT include:

- fake social proof;
- fake application counts;
- countdown timers;
- artificial scarcity;
- guilt;
- forced sharing;
- hidden eligible schemes;
- misleading eligibility claims;
- fake guarantees.

Every intervention must be easy to ignore.

---

PRESERVE THE USER'S CONTROL

The user must remain able to:

- see all schemes;
- choose a different scheme;
- skip planning;
- skip sharing;
- leave the flow.

Do not force the recommended scheme.

---

PROTOTYPE REQUIREMENTS

Keep:
- the existing Stitch visual design;
- fictional HelpCompass SG identity;
- fictional data;
- existing navigation unless a change is explicitly required above.

Do not introduce unrelated features.

Do not connect to real government services.

Do not collect real personal data.

Do not implement real payments.

Make the intervention functional so that the A and B conditions can be tested.

Finally, ensure the visual difference between A and B comes primarily from the decision architecture described above rather than from unnecessary cosmetic redesign.
```

---

# 6. FINAL A/B CHECK

### Variant A
- [x] Stitch design preserved
- [x] Baseline scheme list works
- [x] No Buddy Apply features
- [x] No fake urgency
- [x] No fake social proof
- [x] Fictional data only

### Variant B
- [x] Start Here appears
- [x] 2–3 recommended first options
- [x] See all schemes remains available
- [x] Automatic / You need to apply labels work (text-based)
- [x] "When will you take the next step?" works
- [x] Skip remains available
- [x] "What you'll need" works
- [x] "Do this with someone" is optional
- [x] Skip sharing is equally prominent
- [x] No fake urgency/social proof
- [x] Fictional data only

---

# 7. A/B TEST IMPLEMENTATION

The prototype supports:
- `?v=A` → Variant A (Baseline condition)
- `?v=B` → Variant B (Start Here + Plan the First Move intervention)
- Interactive in-app switcher on the top research bar for seamless evaluator testing.
