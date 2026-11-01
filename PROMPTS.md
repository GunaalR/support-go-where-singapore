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

## Entry GR-5 - M1 builds the follow-through block in M4's slot, and a plainer page title · 2026-10-31 · sent by GR · Claude (claude.ai)
```
Our variant B mostly uses simplifying and colour. Add more of what the course taught: a "When will you do this?" with Skip, a calendar reminder on by default, a "What you'll need" checklist, a "Do this with someone" message, and a plainer page title. M4 has finished her other parts, so build this in her empty NextStep slot.
```
**What came back:** `src/variantB/slots/NextStep.tsx` (M4's slot, built by M1) shows "Plan your next step" after the results, for each item in M3's Start here list: a "What you'll need" checklist, a date picker "When will you do this?" with a Skip button, a "Add a reminder to my calendar" box ticked by default, and "Save my plan", which lists the plan and downloads a calendar file (.ics) with a reminder for each picked day. "Do this with someone (optional)" shows a ready message naming the items and days, with a Copy button. Nothing is stored or sent. In `styleB.ts`, COPY_B's page title is now "What you and your household can get" (variant A keeps "Estimated benefits you and your household may receive").
**Our judgement, and what we changed next:** the "What you'll need" items say "digital ID login" rather than a real login name, to keep the fictional brand. The plan resets when the year tab changes. Checked with `npm run build` and in a browser on desktop and phone: variant A unchanged; variant B shows 3 items in 2026 and 2 in 2027; picking dates, Skip, the calendar file, untick-to-skip-download and Copy all work; no errors from our code.
**Principle check:** W1 self-imposed nudge, nudging not pushing (Finding 10): X, "When will you do this?" with a day picker and Skip → Y, more testers say they will act and name a day → because Z, choosing a day themselves turns an intention into a plan, and Skip keeps the choice theirs. W4 defaults (Finding 10): X, the calendar reminder ticked by default → Y, more plans end with a reminder saved → because Z, people tend to keep the default option. W1/W2 goal visibility (Finding 7): X, "What you'll need" under each item → Y, fewer testers stop at the results page → because Z, the effort ahead is visible and small. W2 social support (Finding 11): X, a ready message to send someone → Y, more testers plan to do it with someone → because Z, a specific person and a specific day make the step concrete. W7 fluency: X, the plainer title → Y, testers say the page is easier to understand → because Z, familiar words are processed more easily.

## Entry MS-2 - M3 progress count, tick-off, loss framing and named members in Start here · 2026-10-31 · sent by MS · Claude Code
```
I'm M3 (Maya M. Sukumar, initials MS) in a 5-person team for an SMU course, Decision Architecture for Managers (MGMT6108). Our term paper redesigns one decision on Singapore's SupportGoWhere benefits site using nudges from the course. We rebuilt the Budget calculator's results page under a fictional brand, HelpCompass SG.

REPO: https://github.com/GunaalR/support-go-where-singapore (React + Vite + Tailwind)
- ?v=A = Variant A: the live results page copied as-is.
- ?v=B = Variant B: the same page plus our nudges.
My part (M3) is the "Start here" block and the status labels. My files:
- src/variantB/slots/StartHere.tsx
- src/variantB/slots/schemeStatusM3.ts
- src/variantB/slots/SchemeLabel.tsx

TASK: add 4 more course principles to my Start here block. Keep everything already there (the 3 items, their reasons, "See all schemes", the labels).

1. Endowed progress + goal gradient (Week 2, the loyalty-card study: a card that starts with some stamps already filled gets completed more often). At the top of Start here, count the scheme rows in the year shown and say how many are already taken care of, e.g. "11 of 14 already taken care of: 3 to go", with a progress bar. "Taken care of" = rows whose status kind is 'automatic' or 'employee'. Compute the numbers from the data; don't hard-code them.

2. Feedback (Week 2). Give each Start here item a checkbox, "I've done this". Ticking it adds to the count and fills the bar ("12 of 14… 2 to go"), shows a ✓ and greys the item. Keep it in React state only (no localStorage). When all are ticked, show a short calm "All done for [year]" line.

3. Loss aversion + endowment effect (Week 4, prospect theory: losses weigh more than equal gains, and people value what is already theirs). For items whose kind is 'claim', add one line framing the amount as already theirs, with the real deadline from the records, e.g. "$800 is already set aside for your household. Unclaimed vouchers expire on 31 December 2027." and for the child credits "$1,000 is already set aside. Credits expire 12 months after they arrive." It must stay truthful and calm: no red, no alarm words, no exclamation marks (Week 8: red = risk; this must stay a nudge, not sludge).

4. Identifiable person (Week 2, identifiable victim effect: a named, specific person motivates more than a statistic). In the "For:" line, replace "Member 2" with the member's age from the data, e.g. "Member 2 (age 12)". Take the age from each box's profile text in src/variantA/resultsDataA.ts. Do NOT assume relationships like "your child" or "your parent": the data doesn't say.

COURSE RULES: plain words (Week 7 fluency), the site's existing style, no new colours (colour is M5's part), keyboard and screen-reader friendly (real checkboxes with labels).

STRICT: DO NOT CHANGE OTHER PEOPLE'S WORK
Only edit my 3 files above, plus ONE new entry at the very bottom of PROMPTS.md. Never touch src/variantA/, ResultsScreenB.tsx, App.tsx, src/study/, styleB.ts, SchemeCategory.tsx, NextStep.tsx, AUDIT.md, README.md, or other PROMPTS entries. If something seems to need a change there, stop and tell me.

PROMPTS.md: add at the very bottom, in the same format as the other entries:
## Entry MS-2 - M3 progress count, tick-off, loss framing and named members in Start here · [today's date] · sent by MS · [name of this AI]
then this prompt in a code block, then **What came back:**, **Our judgement, and what we changed next:**, and **Principle check:** with one "X → Y because Z" line for each of the 4 principles above, citing the week.

STEPS
1. git clone https://github.com/GunaalR/support-go-where-singapore.git and stay on main (pull the latest).
2. Read src/variantA/resultsDataA.ts, src/variantB/ResultsScreenB.tsx (read only) and my 3 files.
3. Build the 4 changes.
4. npm install --legacy-peer-deps, then npm run build. It must pass. Don't commit package-lock.json.
5. Check in a browser: ?v=A unchanged; ?v=B shows the count, bar, checkboxes, loss lines and ages in both the 2026 and 2027 tabs.
6. Commit as me: git -c user.name="Maya Sukumar" -c user.email="mayasuku2004@gmail.com" commit -m "Add progress, tick-off, loss framing and named members to Start here (M3)"
7. Do NOT push. Instead run: git format-patch -1 HEAD --stdout
   and print the FULL output in one code block so I can copy it exactly.
8. Then tell me what you built and anything I should decide myself.
```
**What came back:** changes in `StartHere.tsx` and `schemeStatusM3.ts` only (`SchemeLabel.tsx` needed none). (1) A count and progress bar at the top of Start here, computed from the year's payout rows: a row is "taken care of" when its status is 'automatic' or 'employee'. On the 2026 tab it reads "8 of 14 benefits already taken care of: 3 to go"; on 2027, "3 of 7 ... 2 to go". The "to go" number counts Start here items, not rows. (2) A real checkbox with a label, "I've done this", under each item (screen readers also hear the item's name). Ticking adds that item's rows to the count (child credits 2 rows, NCV Vouchers 1, LCV 3), fills the bar, swaps the number for ✓ and greys the item. Ticks live in React state only, kept separately for each year tab. When every item is ticked, "14 of 14 benefits already taken care of" and "All done for 2026." appear. (3) For the two 'claim' items, a plain grey line: "$800 is already set aside for your household. Unclaimed vouchers expire on 31 December 2027." (2027 tab: $300) and "$1,000 is already set aside. Credits expire 12 months after they arrive." The amount comes from the data; the deadlines from `audit/evidence/2026-10-24_scheme_records.json`. (4) The "For:" line names members by the age in their box's profile: "For: Member 2 (age 12), Member 3 (age 9)" and "For: You, Member 1 (age 71)". No relationship is named. `npm run build` passes. Browser check: ?v=A shows no Start here and no labels; ?v=B shows the count, bar, checkboxes, loss lines and ages on both tabs; ticking with the mouse and with the keyboard (Tab, Space) moves the count 8 → 10 → 14 of 14.
**Our judgement, and what we changed next:** the prompt's example "11 of 14 ... 3 to go" does not match the data: only 8 of P1's 14 rows are 'automatic' or 'employee', because the LCV rows (3) and the claim rows (3) are not. We kept the count truthful at 8 of 14 rather than forcing the example. The browser's default blue checkbox counted as a new colour, so it was set to the site's existing dark grey (#2C2C2C); the bar uses the site's existing #2C2C2C on #EBF1EE. The loss lines use no red, no alarm words and no exclamation marks. Two points for the group to check: "already set aside" is a stretch for the $300 of NCV Vouchers that only becomes claimable in January 2027, and the ages come from profiles that say "(in 2026)", so on the 2027 tab Member 1 still shows age 71.
**Principle check:** W2 endowed progress and goal gradient (Kivetz, Urminsky & Zheng, 2006, loyalty-card study): X, a count and bar that start at the 8 of 14 benefits already taken care of → Y, more testers act on at least one Start here item → because Z, a task that already looks partly done feels closer to the finish, and effort rises as the goal gets near. W2 feedback: X, an "I've done this" tick that moves the count and fills the bar → Y, testers who tick one item go on to the next → because Z, visible progress after each step confirms the effort counted and shows how little is left. W4 loss aversion and endowment effect (Kahneman, ch. 26-27, prospect theory): X, "$800 is already set aside for your household. Unclaimed vouchers expire on 31 December 2027." → Y, more testers say they will claim the vouchers or credits → because Z, money framed as already theirs makes not claiming it feel like a loss, and losses weigh more than equal gains; it stays a nudge because the amount and deadline are true and the tone is calm (no red, W8). W2 identifiable person: X, "Member 2 (age 12), Member 3 (age 9)" instead of "Member 2, Member 3" → Y, more testers act on the items for other household members → because Z, a specific person is more motivating than an anonymous label, and the age is taken from the data without guessing a relationship.

## Entry MS-3 - visual redesign of variant B and the site shell, with colour theory · 2026-10-31 · sent by MS · Claude Code
```
Hey, my team mate pushed the above. The whole website looks very dull and boring and I feel like even If i were the Prof, i wouldnt give marks to our team. Use color theory (Wrt to the website and who the customers are and what we need for them to see), literally I wanna make it look like its the best when comapred to the orginial live website. Do nit categorise by team mates, ill just change everything now , wherever needed (including others parts). Dont say this is only my part and not to do other part, we just split it for not o verlapping with each other, but prof didnt mention anything like that. so give me a master code to chnage everything and make sure it looks the best and modern (which would cater to the people who would visit the webiste in 2026, like tht I mean).  Give the code and ill ask my friend to push it. I dont wanna keep doing it, so make it look the best in each and every single component and area when comapred to the original live website. It should fetch us full marks.
```
**What came back:** one set of colour tokens (`src/theme/brand.ts`), with every colour, its contrast ratio and its reason in a new `DESIGN.md`. Variant B (`ResultsScreenB.tsx`) was rebuilt visually and its data, wording, section order and nudges are unchanged:
- a deep teal-blue hero for the title;
- sticky pill-shaped year tabs under the header;
- a large total card that keeps "Up to" and the rebate months;
- benefit boxes as white cards with a person icon and right-aligned totals;
- each scheme row with M5's kind bar, a soft wash, its amount right-aligned in large figures and a calendar icon on the payout line;
- "To note" as body-size text in an info panel instead of small italics.

`StartHere.tsx` became the one warm (apricot) card on the page, with a white progress panel, numbered step badges, the loss line in a tinted strip with a wallet icon, bigger checkboxes and a "See all schemes" pill. `SchemeLabel.tsx` now shows each status as a chip with an icon: sage check for automatic, apricot hand for "Claim it yourself", blue person for sign-up, slate briefcase for employees. `SchemeCategory.tsx` (tinted kind pill) and `NextStep.tsx` (tokens, larger date and Skip controls of equal size, a rounded primary button) were restyled with their logic unchanged.

Shell, shared by A and B:
- The notice bar now says "HelpCompass SG is a class prototype. Not a government website." instead of claiming to be a government agency site.
- A new compass logo (`BrandMark.tsx`) replaces the red heart.
- The header, language bar and footer use the tokens. The footer no longer names GovTech or MSF, and its low-contrast grey text was darkened.
- The homepage hero and the calculator banner use the brand. Homepage text is larger, "Part of LifeSG" and the links to real .gov.sg sites were removed, and real names (CDC, LifeSG, HDB, CPF, ComCare) were swapped for the fictional ones.

`npm run build` passes. Screenshots on desktop (1280px) and phone (390px): the homepage, A and B all render, and A's results screen is unchanged.

**Our judgement, and what we changed next:** the request was to make the whole site look its best. We kept `src/variantA/` untouched, because A must stay a copy of the live screen for the A/B comparison to mean anything. We restyled only the shared shell and B. We kept M5's five kind colours and their no-red, no-green-on-money rule, and changed only how they are drawn. The risk is the "a prettier B" trap from the Week 6 briefing: B now differs from A in polish as well as in the nudges, so a B-over-A result cannot be credited to the nudges alone. This is written into DESIGN.md as a limit, and a three-arm next test (A, A plus the new look, B) is proposed for paper section 6. A dated line was added under "Added after building" in AUDIT.md; nothing above it changed.

**Principle check:** W8 colour, complementary contrast (Mehta & Zhu, 2009; Bazley et al., 2021): X, a cool teal-blue page in which the only warm surface is the Start here card and the "Claim it yourself" chip → Y, testers find the items that need their action faster and more often than in A (Findings 4 and 5) → because Z, a single warm area on a cool field is the most salient spot on the screen, and apricot draws attention without red's risk and loss meaning. W8 colour, quiet defaults: X, automatic rows labelled with a low-saturation sage chip and a check icon → Y, fewer testers mark an automatic item as needing action (Finding 5's guardrail) → because Z, low-salience "settled" cues let those rows recede while the words still say "nothing to do". W7 processing fluency (Petrova et al., 2012): X, 16-18px body text at 10.4:1 contrast, right-aligned tabular amounts and "To note" in roman body text → Y, more testers can state the total and the income condition (Findings 1 and 8) → because Z, text that is easier to read and compare is processed faster and judged more trustworthy. Course rule, fictional brand: X, no "Government Agency" claim and no real agency names or links → Y, no tester mistakes the prototype for an official service → because Z, a real brand would borrow trust the prototype has not earned.

## Entry MS-4 - usability redesign of variant B, scripted helper bot, original logo · 2026-10-31 · sent by MS · Claude Code
```
https://support-go-where-singapore-git-m3-visual-redesign-winner-0575.vercel.app/?v=B

hey, let the original color of the logo be there as its catering to "help" aspect. I want to change the whole interface into a more user friendly one. make it more easily acccesible. Include a bot. for example, let's say im using the website, i would want it to be more user frienly in every way (maybe refer to a similar website and build it similary like that). It still looks the same, i feel like u only changed the colors. I want to make it more userfriendly as the whole point of this project is to ehance the interface by making it more user friendly to the users. think from the users point of view and from their place and what all you think will have to be changed frim the original website so that its more easily accessible and used. try to push the code by yourself this time
```
**What came back:**
- **Original logo:** the warm heart logo was restored (`BrandMark.tsx`).
- **One to-do list:** in variant B, "Start here" and "Plan your next step" listed the same 2-3 items twice. They became one list (`StartHere.tsx`) in the task-list pattern public-service sites use (GOV.UK). Each task shows To do / Planned / Done / Skipped, a deadline line and the "already set aside" line, and opens to numbered "How to do it" steps taken from the scheme records, "What you'll need", a day picker and "Skip for now".
- **Your plan:** "Plan your next step" became "Your plan" (`NextStep.tsx`): the days picked, one "Add reminders to my calendar" button, and "Do this with someone".
- **Shared logic:** a new `taskGuide.ts` holds the steps, deadlines, plan state and payout-date logic, so the list, the plan and the bot never disagree.
- **Main screen:** `ResultsScreenB.tsx` gained:
  - "At a glance" tiles: things to do, automatic count, next payout month;
  - text size A / A+ / A++ and a "Listen" button using the browser's built-in speech;
  - jump-to-person chips and an "All / Only ones that need me" filter;
  - two columns of rows on wide screens.
- **Ask Compass** (`HelpBot.tsx`): a scripted helper with quick questions ("What do I need to do?", "How much will we get?", "When is the next payout?", "Do I need to apply?", "What do these schemes mean?", "Can someone help me?") and free-text keyword matching. Every answer is built from the page's data. It is a dialog with a labelled input, a live log, Escape to close, and focus returned to its button.

`npm run build` passes and there were no console errors. Browser test on desktop (1280px) and phone (390px):
- picking a day sets the task to "Planned" and lists it under "Your plan";
- ticking a task moves the count from 8 to 9 of 14;
- the filter shows 6 rows instead of 14;
- the bot answers the to-do, vouchers and next-payout questions correctly;
- ?v=A shows no bot and no labels.

The push from the AI's workspace was refused again (403, no GitHub access), so the patch was handed over to push by hand.

**Our judgement, and what we changed next:** the AI found two problems in its own first build: the bot listed "NSF Top-up - 2026 NSF Top-Up" (the hyphen in "Top-up" broke the name clean-up), and on phones the A/B switch covered the bot's typing box. Both were fixed before committing. We dropped the pre-ticked "Add a reminder" box: a pre-ticked default is what the course flags as possible sludge (Week 4 defaults), so the visitor now presses a button instead. The "Next payout" tile shows only the next month, not the full paid/coming split of Finding 3, which stays the next test. The bot is a fixed script on purpose: the guardrails rule out AI model and network calls, and a scripted helper cannot invent an eligibility rule. All of this widens B's difference from A beyond the audited nudges; DESIGN.md records it as a limit.

**Principle check:** Finding 4 and W6 simplify: X, one to-do list in place of the same items in two places → Y, more testers name a correct first step (35% in A to 65% in B) → because Z, the task, its steps and its day picker are in one place, so nothing has to be matched up across the page. Finding 7 and W6 simplify: X, numbered "How to do it" steps inside each task → Y, more testers can say where to claim the vouchers and by when (10% in A to 60% in B) → because Z, the how-to moves from another page to the moment of choice. Finding 10, W6 planning prompts and W2 feedback: X, a day picker and a To do / Planned / Done status on each task → Y, more testers commit to a dated first move (40% to 60%, our primary metric) → because Z, a plan the person picks, and visible progress after each step, make following through more likely. Findings 7 and 11, Nielsen heuristic 10: X, "Ask Compass" answering in plain words for this household → Y, fewer testers leave without knowing what to do → because Z, help moves from one FAQ link to the place where the question comes up, with no pressure and nothing hidden. W7 fluency, for older readers: X, text size A / A+ / A++ and Listen → Y, testers aged 60+ find their own items as fast as younger testers → because Z, larger or spoken text is easier to process.

## Entry MS-5 - red theme, two-column layout with sticky sidebar, motion · 2026-10-31 · sent by MS · Claude Code
```
can you make it look more better, change back the logo and color theme to red (like the original), i like the way the interface looks now. in the webppage , i feel like there's too much space in the sides, maybe utilize those space, make the webite look more organized (i only see that majorly fonts and colors have been changed), maybe add more animated and make it look interesting and not dull
```
(Sent with two screenshots of the m3-ux-redesign preview.)

**What came back:**
- **Red theme:** the brand colour moved from teal-blue to the heart logo's rose-red (`#BE123C`, deep `#881337`, mid `#E11D48`) in `src/theme/brand.ts` and every shell and variant B file. The page background became a warm off-white (`#F8F6F5`). Variant A was excluded from the swap.
- **Two-column layout:** on wide screens, variant B now has two columns: the to-do list and the benefits on the left, and a sticky sidebar on the right. The sidebar holds At a glance (total, a small progress bar, compact tiles), a "Not sure what to do?" card (Ask Compass, Do this with someone) and the finder (filter, and jump-to-person with each person's amount). It scrolls on its own if the window is short. On phones the summary sits on top.
- **Rows:** one column beside the sidebar, two on very wide screens.
- **Motion:** a new `src/variantB/motion.tsx` (Reveal, CountUp, Burst) and keyframes in `src/index.css`:
  - sections rise into view as they scroll in;
  - the total counts up;
  - cards lift under the pointer;
  - task steps unfold;
  - the progress bar has one soft shine;
  - an "All done" burst when the list is finished;
  - the hero compass turns slowly;
  - the Ask Compass button pulses three times.

  All motion is off under reduced-motion settings. On wide screens the floating Ask Compass button is hidden, because the sidebar has its own.

`npm run build` passes with no console errors at 1440px and 390px. Checked: the sidebar's Ask Compass opens the helper; ticking all three tasks shows 14 of 14 and "All done" in both the list and the sidebar; ?v=A is unchanged.

**Our judgement, and what we changed next:** the first two-column build had two problems the AI caught in its own screenshots. The sidebar was taller than the screen, so the help card and finder were cut off; the tiles were made compact, the help card moved up, and the sidebar now scrolls on its own. And rows in two columns beside the sidebar were cramped; they became one column there. We accepted a known risk with red: Bazley et al. (2021) found that red made people more risk-averse about money. So red stays on the brand only, and every amount, status and warning keeps its own non-red colour, words and icon. The motion is for orientation and feedback only. Nothing moves to rush the visitor, which would turn a nudge into sludge.

**Principle check:** W10 culture and W8 colour (Bazley et al., 2021): X, a rose-red brand that matches the heart logo, kept off amounts and labels → Y, testers rate the site as trustworthy and caring at least as highly as A, without reading the amounts as risky → because Z, red signals care and luck in a Singapore context when it is the brand, while the money itself carries no red. Nielsen #1, visibility of status, and W2 goal gradient: X, a sticky sidebar with the total, the progress bar and the tasks left → Y, more testers finish all their to-do items → because Z, progress stays in sight while they work through the detail. W2 feedback: X, a short "All done" burst and a filling progress bar → Y, testers who tick one task go on to the next → because Z, an immediate, visible response confirms that the effort counted.

## Entry EZ-5 - README · 2026-10-24, 22:40 SGT · sent by EZ · Claude Code
```
直接推，但是要搞的美观大气，要有"高级感"。，如果需要图片你就直接加，如果需要更适合且此刻可以做的，你跟我说。
```
(English: "Push it directly, but make it look polished and high-end. Add images if needed; tell me if something better is possible now.")
**What came back:** `README.md` and a drawn SVG banner in `docs/`.
**Our judgement, and what we changed next:** two sentences claimed more than was true ("each finding has a prediction"; B's label wording, which was not yet decided) and were reworded before the push.
**Principle check:** none: production only.

## Entry EZ-6 - citations checked against the readings · 2026-10-25, 01:15 SGT · EZ · Claude Code
**What came back:** Labrecque & Milne confirmed at p. 711 (published 2012, not 2011). Our Ariely scan has its page numbers cropped, so the reading list gave the range. The library proxy failed on the e-book chapters until an incognito window got past a cookie error; Alter ch. 2 and ch. 7 were then read online.
**Our judgement, and what we changed next:** pages we opened went into AUDIT.md. Readings we could not open are named as such, and each of those claims also rests on a slide we checked.
**Principle check:** none: citation accuracy.

## Entry EZ-7 - status check, a wrong date in the audit, and the site shell · 2026-11-01, 03:30 SGT · sent by EZ · Claude Code
```
把你这边明确归属于我这部分以及没有人明确负责的部分全部保质保量的做好，时间不限，可以用很多时间。
```
(English: "Do everything that clearly belongs to me, and everything nobody clearly owns, to a high standard. Take as long as it needs.")
**What came back:** the AI's audit had said CDC Vouchers are valid until 31 Dec 2027, copied from the scheme page. Checked against the CDC's own page, the January 2026 $300 expires on 31 Dec 2026. It also compared the five solo ratings, checked every repair against variant B, rechecked the live results (identical to 24 Oct), rendered A and B for the first time at laptop and phone width, and replaced the government bar and real names in the site shell (the item GR-2 left for the team).
**Our judgement, and what we changed next:** the error is corrected under "Added after building", not edited in place, so the pre-registered text stands. Its rename of a homepage question from CPF to NSF would have broken that button's routing, which was fixed before the push. The "agreed" numbers are given as medians and marked unsettled, because the group has not yet discussed the six two-point gaps. Claims about why members disagreed were removed from the paper: we do not know their reasons.
**Principle check:** W4 loss framing: a wrong deadline inside a loss frame would be sludge, so B's voucher line needs the corrected date.

## Entry EZ-8 - voucher date and page title applied to variant B; REFLECTION.md started · 2026-11-01 · sent by EZ · Claude Code
```
把所有这些文件，看看除了venkata还有没有其他人的 ，直接放进去他们的部分，然后群里跟他们说一声就行。
```
(English: "Take all these, see if anyone besides Venkata has parts too, put them straight into their parts, and tell them in the group.")
**What came back:** `schemeStatusM3.ts` (M3): the voucher line gives both dates on the 2026 tab and one on the 2027 tab, and vouchers rank first in Start here. `styleB.ts`: the title reads "may get". New `REFLECTION.md` from the briefing template, with EZ's A1 and A2 filled in and the rest left for the group.
**Our judgement, and what we changed next:** these files have other owners, so the changes are small and the group was told. Consent and debrief were not built: that is M1's call and depends on what Prof said. Checked by rendering Start here for both year tabs, then `tsc` and `vite build`.
**Principle check:** W4 loss framing with a true deadline; W3 expectations (Finding 1, keep the hedge).

## Entry MS-6 - merge EZ's main into the redesign, care-teal brand, both voucher dates · 2026-11-01 · sent by MS · Claude Code
```
okay, lets go back to working on the website. So, someone from my team pushed a change so we have a merge conflict, we need to resolve that first, add our chnage on top of EZ's change (if any confilt is there) and then push it to the branch. 

Also, the red apparently is about danger/risk, so we can keep a few components of red (As in the, let keep the original logo) and maybe use some other color in other parts.  As, its a help realted app, use resonating colors. 

The interface looks good, so lets leave it as it is. If you have some other ideas about the interfcae, do let me know as we can maybe change it if it looks good
```
**What came back:**
- **The merge:** `main` (7 commits from EZ) was merged into `m3-red-layout` with a normal merge commit (no rebase, no force-push). Seven files conflicted.
  - AUDIT.md and PROMPTS.md: both sides only added dated entries, so both were kept, ours (31 Oct) before EZ's (1 Nov).
  - The five shell components: both sides had replaced the real brand names. Our restyled layout was kept, with EZ's wording (e.g. "2026 Support Calculator", "Neighbourhood Support Offices"), EZ's in-page resource buttons in place of our self-linking anchors, and EZ's fix to the homepage helper (it searched for "cpf", which no longer appears).
  - Checked: every EZ text change is in the result; no conflict markers left; it builds.
- **Voucher dates:** EZ's audit correction (the January 2026 $300 of NCV Vouchers expires 31 Dec 2026, not 2027) had reached `schemeStatusM3.ts`, but not our newer to-do steps, deadline line and helper answers. A new `stepsFor()` / `deadlineFor()` in `taskGuide.ts` now gives two dates on the 2026 tab ($300 by 31 Dec 2026, $500 by 31 Dec 2027) and one on the 2027 tab.
- **Colour:** red stays only in the heart logo. The brand became care teal (`#0F766E`, deep `#134E4A`). "Needs you" stays amber. "Automatic" became a quiet grey with a check, and "done" states use teal.

`npm run build` passes, with no console errors. Browser check: the 2026 NCV task shows both dates, the 2027 task one date, and the helper's to-do answer uses the same dates; ?v=A is unchanged.

**Our judgement, and what we changed next:** the merge kept both teammates' work instead of overwriting either side. The voucher fix shows why: the date was wrong in our new code even though EZ had fixed it in the shared status file, so a later layer had to be checked against the evidence again. The red brand was undone: a colour that also signals danger and risk (Bazley et al., 2021) works against a site meant to feel safe to ask for help. Teal keeps the logo's red visible as a single accent.

**Principle check:** W8 colour, complementary contrast: X, a cool teal brand with the warm amber kept only for the items that need the household → Y, testers find their to-do items faster than in A (Findings 4 and 5) → because Z, the one warm area on a cool page is the most salient. W8 colour, red as risk (Bazley et al., 2021): X, red kept off everything except the logo → Y, testers do not read the amounts or tasks as risky or urgent → because Z, red carries danger and loss meanings that a help site should not attach to money. Finding 5 and W3 expectations: X, both real voucher expiry dates in the task and in the helper → Y, fewer testers miss the 31 Dec 2026 deadline → because Z, a single later date would set a wrong expectation for the $300 that expires first.

## Entry MS-7 - conditions next to amounts, paid/coming, payout calendar, printable plan, consent and debrief · 2026-11-01 · sent by MS · Claude Code
```
i like evetyhing, add all the 5 ideads and push it. If i push this change, do other also have to interefere in the audit.md?
```
(The five ideas, as the AI offered them in reply to MS-6: show each condition next to its amount (Finding 8); "Paid" and "Coming" marks with a split total (Finding 3); consent and debrief screens with random A/B assignment; a payout timeline; a printable plan.)

**What came back:**
- **Conditions next to amounts:** `CONDITION` in `taskGuide.ts`, shown under the amount in each row of `ResultsScreenB.tsx`. Three conditions: the Earn and Save Bonus income range, the EUC Rebate property rule and the U-Credit property rule.
- **Paid / still to come:** `payStatus()` and `paidSplit()` compare each payout line with today's date. Each row has an "Already paid" / "Still to come" / "Partly paid" badge, and the total card and sidebar say "$6,450 already paid · $2,000 still to come (as of 1 Nov 2026)" with a two-part bar.
- **Payout calendar:** `PayoutTimeline.tsx`, a 12-month strip with a detail panel for the month tapped.
- **Printable plan:** `PrintPlan.tsx`, rendered outside the app so the print is one clean page, behind a "Print my plan" button in `NextStep.tsx`.
- **Study screens:** `src/study/StudyScreens.tsx` (consent, debrief, an "I'm finished" bar), random assignment in `useVariant.ts`, and the flow in `App.tsx`.
- **Ask Compass** now gives the paid/to-come split and a scheme's condition.

`npm run build` passes. Browser test at 1440px and 390px, with no console errors:
- the consent screen shows first and hides the A/B switch;
- with no `?v=`, the visitor was assigned an arm that survived a reload, and `?v=B` overrode it;
- B showed 11 "Already paid" and 3 "Still to come" badges and 3 conditions;
- the calendar's default month was December 2026 (Steady Package ×2 and the 2026 NSF Top-Up, $2,000), and March showed the Earn and Save Bonus;
- print preview showed only the plan, with the chosen day;
- "I'm finished" opened the debrief, "See version A" switched to A, and "Clear and start over" returned to consent.

**Our judgement, and what we changed next:** the first print build hid the app with `visibility`, which would have printed about 20 blank pages, because the long page keeps its height. The plan now renders outside the app and printing hides the app entirely. The paid/coming split matches the figures in AUDIT.md ($6,450 paid and $2,000 to come, checked on 24 Oct and again on 1 Nov). Amounts in the calendar are shown only where a payout falls in one month, so no figure is invented by splitting. Findings 3 and 8 were audited repairs that had not been built, so building them closes gaps the audit itself named. The consent and debrief screens are shared by A and B, so they do not enter the comparison.

**Principle check:** Finding 8 and W7 fluency: X, the condition in body-size text beside the amount it limits → Y, more testers mention the income condition when asked about Member 1's benefits (15% in A to 60% in B) → because Z, a condition read at the moment the amount is read is processed, while small italics at the foot of a box are skipped. Finding 3, W3 expectations and W4 reference point: X, "Already paid / Still to come" marks and a split total → Y, more testers can say how much P1 still gets in 2026 (15% in A to 60% in B) → because Z, the reference point becomes the $2,000 still to come, not the $8,450 total, so later payouts are not felt as a loss. W6 accountability (Finding 11): X, a printable one-page plan → Y, testers who have a helper share or keep the plan → because Z, a plan on paper can be handed to the person who will help. W1 random assignment: X, A or B given at random and kept per browser, with consent and debrief → Y, a pilot comparison that is fair and ethical → because Z, chance, not choice, decides who sees which version.

## Entry MS-8 - README brought up to date with the current build · 2026-11-01 · sent by MS · Claude Code
```
You yourself push this change and add what's changed in README.md in my name and wherever needed
```
**What came back:** README.md (EZ's layout and wording kept) updated to the build on `m3-red-layout`:
- a "Design" link to DESIGN.md;
- the variant B row rewritten, and a new "What variant B adds" table: each change as the visitor's question, what B shows, and the finding it answers;
- the Switch row now describes random assignment with `?v=` overriding;
- the Test row says the consent and debrief screens are built;
- the repository map lists DESIGN.md, `src/theme/` and the study screens;
- one ground rule added on readability (WCAG AA, never colour alone, reduced motion).

The commit is authored by MS and was pushed to `m3-red-layout`.

**Our judgement, and what we changed next:** the README is what a marker reads first, so it must match what the live prototype does. The old text still described "Plan your next step" as a separate block and the test screens as not built. Every row of the new table points to the finding it answers, so the README states the same traceability as AUDIT.md. Nothing in AUDIT.md changed for this.

**Principle check:** none: documentation only.

## Entry MS-9 - alignment pass across the site · 2026-11-01 · sent by MS · Claude Code
```
hey, the whole website loooks somewhat misaligned, make sure its properly aligned and mainly the attached one and push it
```
(Sent with a screenshot of the household box in variant B at about 1536px wide, with the scheme text squeezed into narrow columns.)

**What came back:**
- **Cause:** at the widest breakpoint the rows went two-across, and each row also kept a fixed right-hand column (up to 240px) for the amount, badge and condition, so the scheme text was left with a strip about 100px wide.
- **Scheme rows:** each row in `ResultsScreenB.tsx` is now one left-aligned column (name with the amount on its line, kind and plain line, a chip row with status and paid/to come, the condition in its own note, the payout date). Rows are one column everywhere. On phones the amount drops under the name.
- **Other fixes:** box totals no longer wrap; the sidebar filter is two equal halves; the homepage resource grid goes four-across only on wide screens.
- **Automated check:** every page (B, A, home) at 1920, 1536, 1280, 1024, 820 and 390px, looking for sideways scroll and for any text block under 140px wide but more than four lines tall. The first run found two cramped spots: the homepage resource cards at 820px, and a long scheme name beside its amount at 390px. Both were fixed, and the rerun found none.

**Our judgement, and what we changed next:** the two-column rows came from MS-4 and survived MS-5, because at the widths checked then the rows had room. The fixed amount column added in MS-7 made them collapse at 1536px. A check of every width was added so a later change cannot quietly break one. Variant A was not touched.

**Principle check:** W7 processing fluency: X, each row read in one column with the name and amount on the same line → Y, testers find a scheme's amount and condition faster → because Z, text in normal line lengths is processed quickly, while one or two words per line is effortful and gets skipped.
