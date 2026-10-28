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

## Entry GR-2 - M1 rename to the fictional brand HelpCompass SG · 2026-10-28 · sent by GR · Claude (claude.ai)
```
Change the site name from SupportGoWhere to the fictional HelpCompass SG, as AUDIT.md and the rules at the top of this file say.
```
**What came back:** header logo text now reads "HelpCompass SG"; footer brand, about, contact and copyright lines no longer claim to be an official government site; the homepage assistant is "HelpCompass Guided Assistant"; browser tab title and metadata.json updated. Layout, logo shape and colours unchanged. Variant A and B files were not touched.
**Our judgement, and what we changed next:** the grey "A Singapore Government Agency Website" bar and the "Part of LifeSG" link are left as they were for the team to decide, since the bar is part of the live page that variant A copies.
**Principle check:** none: production only.

## Entry MS-1 - M3 "Start here" block and a status label on every row · 2026-10-28 · sent by MS · Claude Code
```
I'm M3 (Maya M. Sukumar, initials MS) in a 5-person team for an SMU course, Decision Architecture for Managers. Our term paper redesigns one decision on Singapore's SupportGoWhere benefits site using nudges. We rebuilt the calculator's results page under a fictional brand, HelpCompass SG.

Repo: https://github.com/GunaalR/support-go-where-singapore (React + Vite + Tailwind, deployed on Vercel)
- ?v=A shows Variant A: the live results page, copied as-is (src/variantA/, owned by M2, do not edit)
- ?v=B shows Variant B: the same page plus our nudges (src/variantB/ResultsScreenB.tsx, owned by M1, do not edit)
- Each teammate's nudges live in their own slot files in src/variantB/slots/. Mine (M3) are: StartHere.tsx, SchemeLabel.tsx, schemeStatusM3.ts. Only edit those files, plus my own entry in PROMPTS.md.

My task (from AUDIT.md, Findings 4 and 5):
1. A "Start here" block above the result boxes showing the 2-3 items that need the household's action, each with a one-line reason, plus a "See all schemes" link to the full list.
2. A status label under every scheme, taken from the official records in audit/evidence/2026-10-24_scheme_records.json, using the fictional names listed in audit/evidence/README.md. Use: "Automatic: nothing to do", "Claim it yourself: [where]", or "Automatic if you have signed up before". Never write "You need to apply", because every record says "No application needed".

A first version is already on the branch m3-start-here-labels. Please:
1. Clone the repo and check out m3-start-here-labels.
2. Read AUDIT.md (Findings 4 and 5), the scheme records file and my three slot files.
3. Check every label and every Start here reason against the official records. Fix anything wrong, unclear or not matching the audit. Keep the site's existing style; don't add colour (that's M5's part).
4. Run npm install --legacy-peer-deps and npm run build to confirm it builds.
5. In PROMPTS.md, update my entry "Entry MS-1": change the header to "· 2026-10-28 · sent by MS · [name of this AI]", put this prompt in the code block, and update "What came back" and "Our judgement" to describe what you checked and changed.
6. Commit with my name (Maya Sukumar, mayasuku2004@gmail.com) and a message ending in "(M3)", then push to the same branch m3-start-here-labels. Do not push to main.

Tell me what you changed and anything I should decide myself.
```
**What came back:** the AI checked all 10 scheme statuses in `schemeStatusM3.ts` against `audit/evidence/2026-10-24_scheme_records.json` (the record's "How to apply" text is now quoted beside each one) and against AUDIT.md Findings 4 and 5. Seven were right as they were: the five "Automatic: nothing to do" schemes, NCV Vouchers ("Claim it yourself: on the RedeemNow website", valid until 31 December 2027) and the LCV "Automatic if you have signed up before" pair. It changed four things. (1) Child CompassLife Credits were labelled "Automatic: sent to the CompassLife app, use within 12 months" while also sitting in Start here under "These need something from you", so the block and the label contradicted each other, and the label was not one of Finding 5's three forms. It now reads "Claim it yourself: in the CompassLife app", which matches AUDIT.md's count of three rows that need a claim. (2) LCV cash and the LCV HealthSave top-up share the same sign-up in the record, but only the cash counted in Start here ($1,700). They are now one item, "LCV cash and HealthSave top-up: $1,950". (3) Start here was sorted claim, then app, then sign-up; it is now sorted by deadline: child credits (12 months from payout), then NCV Vouchers (31 Dec 2027), then the sign-up, which only matters for someone who has never signed up. (4) The intro line said "in 2026. Most of the rest is paid without you doing anything", but the child credits and vouchers run into 2027 and the Earn and Save Bonus is not automatic for the self-employed. It now says "The label under each scheme below shows what, if anything, the others need." The Earn and Save Bonus label was reworded to "Automatic for employees; if self-employed, declare your income to the tax office". `npm run build` passes. A headless browser check: ?v=A shows no block and no labels; ?v=B shows 14 labels and Start here with 3 items in 2026, and 7 labels and 2 items (NCV $300, LCV) in 2027.
**Our judgement, and what we changed next:** the first version's reason for calling the child credits "Automatic" (the record says "No application needed") was the same trap Finding 5 warns about: "no application" does not mean "nothing to do". We kept no colour and no new styling; the label stays plain grey and bold only when it needs the household. Two calls are left open for the group: whether "claim" is the right word for credits that arrive in the app but must be used there before they expire, and whether the Earn and Save Bonus may keep a fourth, conditional label form.
*Principle check:** W6 simplify and W7 processing fluency (Finding 4): X, a short "Start here" list of what needs action → Y, more testers name a correct first step (about 35% in A to 65% in B) → because Z, the few items that matter no longer have to be found among 14 rows. W6 simplify and W3 expectations (Finding 5): X, a plain status on each row → Y, more testers correctly pick the items that need their action (about 20% to 70%) → because Z, "Payout in [month]" no longer implies everything arrives by itself.

## Entry GR-3 - M1 slot for M5 under each scheme name · 2026-10-28 · sent by GR · Claude (claude.ai)
```
Give M5 a place to build Findings 6 and 12 (an icon and category word per kind of support, and a plain-language line) without touching anyone else's files.
```
**What came back:** a new empty file `src/variantB/slots/SchemeCategory.tsx` owned by M5, rendered in `ResultsScreenB.tsx` directly under each scheme name and above M3's status label. It returns null, so variant B looks the same until M5 fills it.
**Our judgement, and what we changed next:** checked that the build passes and that variant A and variant B render as before.
**Principle check:** none: production only.

## Entry KV-1 - M5 colour per kind of support and plain-language lines · 2026-10-28 · sent by KV · Claude (claude.ai)
```
I'm M5 (Venkata Narayana Koppaka, initials KV) in a 5-person team for an SMU course, Decision Architecture for Managers (MGMT6108). Our term paper redesigns one decision on Singapore's SupportGoWhere benefits site using nudges from the course. We rebuilt the Budget calculator's results page under a fictional brand, HelpCompass SG.

REPO: https://github.com/GunaalR/support-go-where-singapore (React + Vite + Tailwind, deployed on Vercel)
- ?v=A = Variant A: the live results page copied as-is.
- ?v=B = Variant B: the same page plus our nudges. The prof grades A vs B.

MY PART (M5: colour and fluency) comes from AUDIT.md Finding 6 and Finding 12. Read both in full first.
1. Colour per kind of support (Finding 12). There are 5 kinds, shown by the prefix of each scheme name in src/variantA/resultsDataA.ts:
   Cash (paid to the bank) · NSF Top-up (savings top-up) · Rebate (taken off bills) · Voucher · Credit (app credits).
   Give each kind ONE colour and ONE icon (lucide-react icons are already installed), always shown WITH a text word for the kind. Never rely on colour alone.
   - In src/variantB/slots/styleB.ts, make schemeColour(row) return that kind's colour; variant B draws it as a 4px bar on the left of the row.
   - In src/variantB/slots/SchemeCategory.tsx, render the icon + the kind's word (e.g. "Cash") in that colour, under the scheme name.
2. Plain language (Finding 6). In SchemeCategory.tsx, add one short plain line saying what each scheme is and where it goes, e.g. "Cash paid into your bank account". Keep the official name as it is. Take the facts from audit/evidence/2026-10-24_scheme_records.json, and use only the fictional names in audit/evidence/README.md (never real names like GSTV, CDC, LifeSG, RedeemSG). You may also make other wording plainer by overriding keys in COPY_B in styleB.ts.

COURSE PRINCIPLES TO APPLY (Week 8 colour, Week 7 fluency). Choose colours on purpose and explain each choice:
- Colour carries meaning and shapes judgment (Labrecque & Milne, 2012).
- Green reads as "healthy/good" even when the facts are the same (Schuldt, 2013). Don't use green to make an amount look better than it is.
- Red reads as risk and loss (Bazley et al., 2021) and raises vigilance (red pen study). NO alarm red anywhere, especially on "Claim it yourself" (Finding 12 says so).
- Blue is linked to calm, open thinking.
- Boundary conditions from the slides: colour effects vanish for colourblind people (so always pair colour with icon + word), and red means prosperity in Chinese culture (relevant in Singapore).
- Fluency: plain, familiar words and clear contrast make information easier to process and more trusted.
- Contrast: every text colour at least 4.5:1 on its background, the left bar at least 3:1 on white (WCAG AA). Compute and list the ratios.
- Keep it calm and consistent with the site's existing style. 5 muted, clearly different colours; no gradients or flashing.

STRICT RULES: DO NOT CHANGE OTHER PEOPLE'S WORK
Only these files may change:
- src/variantB/slots/styleB.ts (mine)
- src/variantB/slots/SchemeCategory.tsx (mine)
- AUDIT.md: ONLY "M5 [name]" on the Members line and "M5 [ ]" on each Severity line
- PROMPTS.md: ONLY add one new entry at the very bottom
Never touch: src/variantA/, src/variantB/ResultsScreenB.tsx, src/App.tsx, src/study/, StartHere.tsx, SchemeLabel.tsx, schemeStatusM3.ts (M3), NextStep.tsx (M4), README.md, other people's ratings or PROMPTS entries. If my part seems to need a change in one of those, stop and tell me instead.

AUDIT.md
- Members line: "M5 [name]" becomes "M5 Venkata Narayana Koppaka (KV)".
- My severity ratings for Findings 1-12, in order (use exactly these, do not choose them yourself): [ 0 0 2 3 4 2 3 2 1 2 2 1 ]. Write each as "M5 KV n" in place of "M5 [ ]".
- Under the "Added after building" heading at the end, add one line: "- 2026-10-28: M5 (KV) severity ratings added to Findings 1-12, after variant B was built."

PROMPTS.md: add one entry at the very bottom in the same format as the others:
## Entry KV-1 - M5 colour per kind of support and plain-language lines · 2026-10-28 · sent by KV · Claude (claude.ai)
then this prompt in a code block, then **What came back:** (what you built, every colour with its contrast ratio, the icons and plain lines), **Our judgement, and what we changed next:** (anything you checked or changed), **Principle check:** one "X → Y because Z" line for Finding 12 and one for Finding 6, citing the Week 8 / Week 7 principles above.

STEPS
1. git clone https://github.com/GunaalR/support-go-where-singapore.git and create a new branch: git checkout -b m5-colour-fluency
2. Read AUDIT.md (Findings 6 and 12), audit/evidence/README.md, the scheme records file, src/variantA/resultsDataA.ts, and my two slot files.
3. Build my part as above.
4. npm install --legacy-peer-deps, then npm run build. It must pass. Do not commit package-lock.json.
5. Check in a browser: ?v=A must look exactly as before (no colours, no icons); ?v=B shows the colours, icons, words and plain lines; switching the 2026/2027 tabs works.
6. Commit as me: git -c user.name="Venkata Narayana Koppaka" -c user.email="venkatnarayana74@gmail.com" commit -m "Add colour per kind of support and plain-language lines (M5)"
7. Push the branch (not main):
   git push https://[token not recorded]@github.com/GunaalR/support-go-where-singapore.git m5-colour-fluency
8. Tell me what you built, the colours and contrast ratios, and anything I should decide myself.
```
**What came back:** changes in my two slot files only. `styleB.ts`: each scheme code is mapped to one of five kinds (falling back to the name's prefix), and `schemeColour(row)` returns that kind's colour for the 4px left bar. Colours and contrast (WCAG relative luminance; on white / on the box green #EBF1EE): Cash #1D5A96 blue, 7.11:1 / 6.21:1; NSF Top-up #5B4A8B purple, 7.51:1 / 6.56:1; Rebate #8A5300 brown, 6.33:1 / 5.53:1; Voucher #0E6B6B teal, 6.30:1 / 5.50:1; Credit #8B3A62 plum, 7.29:1 / 6.37:1. All pass 4.5:1 for the kind word and 3:1 for the bar. `SchemeCategory.tsx`: under each official name, the kind's lucide icon (Banknote, PiggyBank, ReceiptText, Ticket, Smartphone) and its word ("Cash", "NSF Top-up", "Rebate", "Voucher", "Credit") in the kind's colour, then one plain line in the site's body grey #4E4E4E (8.32:1): Steady Package cash "Cash paid to your bank account every December, until 2026."; 2026 Cost-of-Living Special Payment "One-off cash to help with living costs, paid to your bank account in September 2026."; LCV cash "Cash paid to your bank account every August."; LCV HealthSave "Added to your HealthSave account (savings for medical bills) every August."; 2026 NSF Top-Up "A one-off top-up added to your NSF savings account."; Earn and Save Bonus "A yearly bonus for working seniors, added to your NSF savings account every March."; EUC Rebate "Covers some months of your estate upkeep charges, credited to your estate charges account."; U-Credit "Money taken off your utilities bills, credited to your utilities account."; NCV Vouchers "Vouchers to spend at neighbourhood shops, hawkers and supermarkets, claimed on RedeemNow."; Child CompassLife Credits "Credits for household spending, sent in the CompassLife app to the trustee of the child's Child Savings Account." Facts are from `audit/evidence/2026-10-24_scheme_records.json`, names from `audit/evidence/README.md`. COPY_B is unchanged. AUDIT.md: M5 name on the Members line, M5 KV ratings 0 0 2 3 4 2 3 2 1 2 2 1, and the dated line under "Added after building".
**Our judgement, and what we changed next:** no red anywhere, so "Claim it yourself" (M3's grey label) stays calm; no green, so no amount is made to look better than another; blue for cash, the most common kind. Colour is never alone: each row always shows the icon and the word. The plain lines say what each scheme is and where it goes, and leave "what you must do" to M3's label, so the two don't repeat each other. Changed "up to 2026" to "until 2026" on the Steady Package line, so it cannot be misread as an amount. Every plain line was checked against the scheme record it comes from. The AI's workspace could not reach the npm registry, so `npm run build` and the browser check could not run there; instead it rendered variant A and variant B with React's server renderer for both tabs: A shows no bars, icons or kind words; B shows 14 coloured bars on the 2026 tab, and every row on both tabs gets the right kind, icon, word and plain line. `npm run build` and a browser look (?v=A unchanged, ?v=B, 2026/2027 tabs) must still be run before merging.
**Principle check:** Finding 12 (W8 colour; Labrecque & Milne, 2012; Schuldt, 2013; Bazley et al., 2021): X, one muted colour plus icon and word per kind of support, with no red or green → Y, testers find every voucher or credit row faster (about 40 s in A to 20 s in B) → because Z, the kind is recognised at a glance rather than recalled from each name's prefix, and the colours carry no loss or "good" signal. Finding 6 (W7 fluency; Petrova et al., 2012): X, one plain line under each official name → Y, more testers can say in their own words what two named schemes are (about 30% in A to 75% in B) → because Z, familiar words such as "cash paid to your bank account" are easier to process than agency shorthand, and what is easy to process feels more familiar and trusted.

## Entry GR-4 - M1 makes the M5 category colours easier to see · 2026-10-28 · sent by GR · Claude (claude.ai)
```
The colour per kind of support in variant B is too subtle to notice on the live site. Make it stand out more, keeping M5's colours, icons and words, the no-red/no-green rule and the contrast checks.
```
**What came back:** each scheme row in variant B now has a pale tint of its kind's colour behind it (9% of the colour on white: Cash #EBF0F6, NSF Top-up #F0EFF5, Rebate #F4F0E8, Voucher #E9F2F2, Credit #F5EDF1), a 6px bar instead of 4px, and padding with rounded right corners. The kind word and icon sit in a white pill with a border in the kind's colour. Changes are in `styleB.ts` (a `tint` per kind and `schemeTint(row)`), `SchemeCategory.tsx` (the pill) and `ResultsScreenB.tsx` (row style). M5's colours, icons, words and plain lines are unchanged.
**Our judgement, and what we changed next:** contrast rechecked on every tint: kind colour 5.5-6.6:1, body grey 7.2-7.3:1, link blue 4.8:1, all above 4.5:1. Checked in a browser on phone and desktop: variant A unchanged, variant B shows the tinted rows. Done by M1 to help M5's part; M5 to review.
**Principle check:** W8 colour and Nielsen heuristic 6 (Finding 12): X, a visible tint per kind of support, not only a thin bar → Y, testers find every voucher or credit row faster (about 40 s in A to 20 s in B) → because Z, the kind is recognised at a glance instead of read from each name.
