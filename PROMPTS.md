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

---

# 8. BUILD LOG (every prompt in order, initialled, failures kept)

## Entry EZ-1 - M2 audit and variant A · 2026-10-24, 20:50 SGT · sent by EZ · Claude Code
```
我选的是M2，接下来完成我的这部分
```
(English: "I took M2. Now complete my part." Attached: the team split, the 24 Oct meeting transcript, the 28 Sep plan and the Week 6 briefing.)

**What came back:** instead of working from public descriptions, the AI read how the live results screen gets its data, saved the live results for our two fictional households and the official record of each scheme (`audit/evidence/`), drafted `AUDIT.md` with 12 findings, and built variant A in `src/variantA/` from the saved P1 results, with every real name swapped for a fictional one.
**Our judgement, and what we changed next:** two hypotheses in our 28 Sep plan failed against the evidence. The live screen already shows a hedged total, which is now Finding 1, kept in B. And every scheme record says "No application needed", yet three need the household to claim or sign up, so B's labels and our primary metric say "claim", not "apply" (Finding 5).
**Principle check:** W3 expectations, W6 simplify and planning prompts, W7 fluency.

## Entry EZ-2 - AI error caught before commit · 2026-10-24, 21:20 SGT · EZ · Claude Code
**What came back:** the first AUDIT.md draft stated three principles more strongly than our sources: "every extra step cuts follow-through" (Beshears & Gino), "colour is judged before the words are read" (Labrecque & Milne), and "hard-to-process information is judged less useful" (Petrova et al.). It also counted two rows that need a claim where P1 has three.
**Our judgement, and what we changed next:** each principle line was checked against the slides we hold and rewritten to what they say (Week 6 slide 5; Week 7 slides 7, 13-17, 20 and 38), and the count was fixed. Guardrail added: every principle line cites a page we have opened, and pages not yet checked are flagged in AUDIT.md.
**Principle check:** none: citation accuracy.

## Entry EZ-3 - check that variant A matches the live screen · 2026-10-24, 21:30 SGT · EZ · Claude Code
**What came back:** a render of variant A shows the same figures as the live results for P1: 2026 total "Up to $8,450 and 2.5 months of EUC Rebate" (live: "... S&CC Rebate"), 14 rows in 2026 and 7 in 2027, and the same box totals ($1,600; $1,400 and 2.5 months; Up to $4,450; $500; $500).
**Our judgement, and what we changed next:** A is faithful on content and order. Its visual style is close to, not identical with, the live page; the dated screenshots in `audit/screenshots/` are the reference.
**Principle check:** none: production only.

## Entry EZ-4 - variant A checked against the dated screenshots · 2026-10-24, 22:15 SGT · EZ · Claude Code
**What came back:** comparing A with screenshots S03-S08, the AI had made two content errors. It ordered the rows as the calculator service lists them, but the live page sorts the rows in each box alphabetically by scheme name. And it wrote "Payout in April 2026 and July 2026" for the child credits, where the live page says "Payout in July 2026". The styling also differed: peach year tabs with an orange underline, orange outline icons, a centred illustration for "not eligible".
**Our judgement, and what we changed next:** the screenshots, not the service data, are the reference for A, so A now follows them on order, wording and styling. AUDIT.md Finding 10 is confirmed by S10: the results link opened in a private window lands on the calculator's start page.
**Principle check:** none: production only.

## Entry GR-1 - M1 A/B switch and empty slots for variant B · 2026-10-27, 10:30 SGT · sent by GR · Claude (claude.ai)
```
Build my part: the A/B switch. One URL, ?v=A shows variant A and ?v=B shows variant B, with a switch so the prof can flip between them on one page. Don't touch anyone else's files.
```
**What came back:** `src/study/` holds the switch (`useVariant.ts`) and a floating "A: Live site / B: With nudges" toggle at the bottom of the screen (`VariantToggle.tsx`). No `?v=` opens variant A; `?v=home` opens the rebuilt homepage, and the Back button on the results screen goes there. `src/variantB/ResultsScreenB.tsx` is an exact copy of variant A with four empty slots, one file per owner in `src/variantB/slots/`: `StartHere.tsx` and `SchemeLabel.tsx` (M3), `NextStep.tsx` (M4), `styleB.ts` (M5: wording and colour). Until a slot is filled, B looks exactly like A.
**Our judgement, and what we changed next:** the prof asked for A and B to grade, with a live A/B test optional after the semester, so the consent and debrief screens and the random split are left out for now and described in paper §4 instead. Checked in a browser on desktop and phone: all four URLs load, the toggle switches views, and the browser back button returns to the previous variant. Variant A's files were not changed.
**Principle check:** none: production only.
