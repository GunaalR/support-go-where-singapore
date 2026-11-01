# AUDIT.md - SupportGoWhere, Support For You Calculator results screen · the decision: what, if anything, a household does after it sees its estimated benefits

**Group:** 2 · **Members:** M1 Gunaal R. · M2 Enhao (Andy) Zhang (EZ) · M3 Maya M. Sukumar (MS) · M4 Dhiksha D.(DD) · M5 Venkata Narayana Koppaka (KV)

**Product audited:** the live results screen at supportgowhere.life.gov.sg/budget/support-calculator/result, which appears after the calculator form. Our prototype rebuilds it as variant A under the fictional brand HelpCompass SG.

**Captured:** 2026-10-24. The live results for two fictional households were saved from the site's own calculator service, together with the official record behind each scheme page (`audit/evidence/`). Dated laptop screenshots of every screen (Chrome on Windows 11, 24 Oct 2026) are in `audit/screenshots/`, logged one row per file in `SHOTLIST.md`.

**Fictional households (no real personal data):**
- **P1:** you, born 1981, assessable income $22,001 to $39,000; your mother, born 1955, no income; two school-age children, born 2014 and 2017; you own a 4-room HDB flat, annual value $15,000 and below.
- **P2:** you, born 1960, retired, no income, own a 3-room HDB flat.

**Decision sentence:** When a household that has just run the calculator decides what to do about its results, the screen steers it toward reading one large total and leaving without a next step. It does this through a person-by-person list in which the few items that need action look the same as the automatic ones (W7 processing fluency, Petrova et al., 2012) and with no prompt to plan (W6 planning prompts, Beshears & Gino, 2015).

**What P1 sees (2026 tab, the default):** a total of "Up to $8,450 and 2.5 months of S&CC Rebate", then 14 payout rows in five boxes: you (3 rows), household (3), your mother (6) and each child (1 each). The official record for every one of the 10 schemes says "No application needed". Even so, three need the household to act:
- **CDC Vouchers** must be claimed on the RedeemSG website and are valid until 31 Dec 2027.
- **Child LifeSG Credits** reach the child's CDA trustee only in the LifeSG app and expire 12 months after they are paid.
- **GST Voucher payouts** need a one-time sign-up if the person has never signed up before.

**A note on the commit history:** the commits of 28 Sep 2026 are the Week 6 class sprint demo, built before this audit. The project's variant B is built only after this file is committed. From the first prompt for B, nothing above "Added after building" changes.

## Summary of findings

| # | Element on the live screen | Principle (week, reading) | Verdict | EZ | Agreed |
|---|---|---|---|---|---|
| 1 | Total box at the top, labelled "estimated" | W3 expectations, Ariely ch. 9 | nudge, keep | 0 | |
| 2 | Boxes open by default; every row shows amount and month | W7 fluency, Petrova et al. | nudge, keep | 0 | |
| 3 | Default 2026 tab mixes money already paid with money still to come | W3 expectations; W4 reference point, Kahneman ch. 26 | grey | 2 | |
| 4 | Rows grouped by person, in no order of importance | W7 fluency; W6 simplify | grey | 2 | |
| 5 | No row says whether money arrives by itself or must be claimed | W6 simplify; W3 expectations | sludge (unintended) | 3 | |
| 6 | Scheme names in agency shorthand ("Cash - GSTV", "S&CC") | W5 labels, Alter (2014) ch. 2; W7 fluency | grey | 2 | |
| 7 | How to claim, and by when, only behind a link to another page | W6 simplify | sludge (unintended) | 2 | |
| 8 | Conditions on amounts in small italics under "To note:" | W7 fluency | grey | 2 | |
| 9 | Largest button on the page goes to LifeSG to view past payouts | W7 fluency; salience | grey | 1 | |
| 10 | No way to plan, save or be reminded; a reopened link returns to the start | W6 planning prompts and reminders; W2 progress | missed nudge | 3 | |
| 11 | Help is an FAQ link; no path to do it with a family member | W6 accountability | missed nudge | 1 | |
| 12 | One pale green for every box; the category lives only in the name's prefix | W8 colour, Labrecque & Milne (2012); Nielsen #6 | missed nudge | 1 | |

Severity uses the 0-4 scale from the Week 6 briefing. Each member rates every finding alone before we compare, and both the individual and the agreed numbers stay in this file.

## Finding 1 - The total is shown, and labelled an estimate (keep)
- **Where:** results screen, top box under the year tabs.
- **What the user sees and does:** "Total estimated benefits for you and your household: Up to $8,450 and 2.5 months of S&CC Rebate", under a page line that says the figures assume the inputs stay the same for current and 2027 payouts. The user reads the total first.
- **Principle:** W3 expectations shape how an outcome is judged (Ariely, 2008, ch. 9, pp. 155-172; Week 3 slides, p. 6). The word "estimated", the assumption line and "Up to" keep the expectation honest.
- **Mechanism, whose goal wins:** a single truthful number answers "is this worth my time?" before any detail, and the hedges stop it reading as a promise. Both the user and the agency win. · **nudge**
- **Severity 0-4:** M1 GR 0 · M2 EZ 0 · M3 MS 0 · M4 DD 2  · M5 KV 0 · agreed [ ] · driver: none, it works
- **Repair (what should be true afterwards):** keep the total and its hedges in B. Our plan assumed the live screen showed "amounts per card only". The screenshots show a total, so B keeps this element rather than adding it.
- **Prediction:** none, because the element does not change between A and B.

## Finding 2 - Boxes open by default, and every row shows amount and month (keep)
- **Where:** the five boxes (you, household, each household member).
- **What the user sees and does:** every box is already expanded on arrival, so all 14 rows are visible by scrolling, each with its amount and payout month ("Payout in August 2026").
- **Principle:** W7 processing fluency. Nothing is hidden behind a tap, so the information is easy to reach (Petrova et al., 2012, pp. 39-48).
- **Mechanism, whose goal wins:** no hidden rows means no scheme is missed through a closed box. The user wins. · **nudge**
- **Severity 0-4:** M1 GR 0 · M2 EZ 0 · M3 MS 0 · M4 DD 0 · M5 KV 0 · agreed [ ] · driver: none, it works
- **Repair (what should be true afterwards):** B keeps every row reachable. "See all schemes" in B must be one tap and must show every row A shows.
- **Prediction:** guardrail for Finding 4. Testers in B list the schemes they qualify for as accurately as testers in A, within 10 points.

## Finding 3 - The default tab mixes money already paid with money still to come
- **Where:** year tabs (2026 | 2027); 2026 opens by default.
- **What the user sees and does:** on 24 Oct 2026, P1's 2026 tab shows $8,450. $6,450 of it (76%) was paid out between January and October. Only $2,000 (December) is still to come. The rows say "Payout in August 2026" with no "paid" or "coming" mark, so the user takes the whole total as money ahead.
- **Principle:** W3 expectations (Ariely, 2008, ch. 9). W4 reference point: "the outcome that you expect, or perhaps the outcome to which you feel entitled" becomes the reference point (Kahneman, 2011, ch. 26, p. 282).
- **Mechanism, whose goal wins:** the total becomes the reference point, so later payouts below it feel like a loss. The site's own FAQ has a question for exactly this: "Why do the estimated benefits not tally with the actual payouts that I have received?" Nobody gains. · **grey**
- **Severity 0-4:** M1 GR 2 · M2 EZ 2 · M3 MS 2 · M4 DD 1 · M5 KV 2 · agreed [ ] · driver: how often (every visit after the first quarter); trust
- **Repair (what should be true afterwards):** each row says "Paid in August 2026" or "Coming in December 2026", and the total is split into "already paid this year" and "still to come". Not in our B, which keeps to the five-person scope; listed for section 6.
- **Prediction:** the share of testers who can say how much P1 still gets in 2026 moves from about 15% in A to 60% in a future B. Not tested in this round.

## Finding 4 - Rows are grouped by person, in no order of importance
- **Where:** the five boxes below the total.
- **What the user sees and does:** P1 scrolls through 14 rows sorted by who receives them. The three rows that need a claim (CDC Vouchers in the household box, Child LifeSG Credits in each child's box) sit among 11 others, in three different boxes. The user has to read everything to find the few that matter.
- **Principle:** W7 processing fluency: how easy information feels to process shapes how it is judged, apart from what it says (Petrova et al., 2012, pp. 39-48; Week 7 slides, p. 20). W6 simplify, a System 1 tool (Beshears & Gino, 2015; Week 6 briefing, slide 5).
- **Mechanism, whose goal wins:** effort goes into reading rows that need nothing, and the items that need action are easy to miss. The agency wants uptake and the user wants the money, so both lose. · **grey**
- **Severity 0-4:** M1 GR 3 · M2 EZ 2 · M3 MS 3 · M4 DD 1· M5 KV 3 · agreed [ ] · driver: how often (every household with more than one member); cost (missed claims)
- **Repair (what should be true afterwards):** a "Start here" block above the boxes shows the 2-3 items that need the household's action, each with a one-line reason, and "See all schemes" keeps the full list one tap away (M3).
- **Prediction:** the share of testers who, unprompted, name a correct first thing to do moves from about 35% in A to 65% in B. We drop this repair if B testers list the schemes they qualify for more than 10 points less accurately than A testers.

## Finding 5 - No row says whether money arrives by itself or must be claimed
- **Where:** every payout row (scheme name, "Payout in [month]", amount).
- **What the user sees and does:** "Voucher - CDC Vouchers · Payout in January 2026 and June 2026 · $800" looks exactly like "Rebate - U-Save · $600", which needs nothing. In fact the vouchers must be claimed on RedeemSG, the child credits arrive only in the LifeSG app, and GST Voucher cash needs a one-time sign-up for anyone who has never signed up. The site already holds this information (an "application needed" field and a "How to apply" section on each scheme page, plus "Need to apply / No need to apply" filters in its directory), but the results screen does not show it.
- **Principle:** W6 simplify: put the needed information where the decision is made (Beshears & Gino, 2015; Week 6 briefing, slide 5). W3 expectations: "Payout in June 2026" sets the expectation that money will simply arrive (Ariely, 2008, ch. 9).
- **Mechanism, whose goal wins:** the user infers "automatic" for everything, does nothing, and unclaimed vouchers or credits expire. The user loses money they are entitled to. · **sludge (unintended)**
- **Severity 0-4:** M1 GR 3 · M2 EZ 3 · M3 MS 4 · M4 DD 4 · M5 KV 4 · agreed [ ] · driver: cost (money); learn around it (only by opening each scheme page)
- **Repair (what should be true afterwards):** each row carries one plain status taken from the official record: "Automatic: nothing to do", "Claim it yourself: [where]", or "Automatic if you have signed up before". B must not label anything "You need to apply" when the record says "No application needed" (M3).
- **Prediction:** the share of testers who correctly pick the items that need their action moves from about 20% in A to 70% in B. We drop this repair if more than 10% of B testers mark an automatic item as needing action.

## Finding 6 - Scheme names are in agency shorthand
- **Where:** the scheme name at the top of every row.
- **What the user sees and does:** "Cash - GSTV", "CPF Top-up - GSTV — MediSave", "CPF Top-up - Majulah Package — Earn and Save Bonus", "Rebate - Service and Conservancy Charges (S&CC) Rebate", "Credit - Child LifeSG Credits". The prefix ("Cash", "Rebate", "Credit") is the only plain-language cue.
- **Principle:** W5 labels: the name given to a thing shapes what people think it is (Alter, 2014, ch. 2, pp. 28-29: "Labels make a complex world simpler"). W7 fluency: plain words are easier to process than rare ones (Petrova et al., 2012; Week 7 slides, pp. 16-17, "use" vs "utilize"), and what is easy to process feels more familiar and more likable (Week 7 slides, p. 38).
- **Mechanism, whose goal wins:** acronyms make each row harder to understand, so the user skims and cannot tell what each payment is for. Nobody gains. · **grey**
- **Severity 0-4:** M1 GR 3 · M2 EZ 2 · M3 MS 2 · M4 DD 2 · M5 KV 2 · agreed [ ] · driver: how often (every row); learn around it (not without opening each page)
- **Repair (what should be true afterwards):** each name keeps its official form and gains one plain line underneath, such as "GST Voucher cash: paid into your bank account in August" (M5).
- **Prediction:** the share of testers who can say in their own words what two named schemes are moves from about 30% in A to 75% in B.

## Finding 7 - How to claim, and by when, sits behind a link to another page
- **Where:** the scheme name link on each row, which opens the scheme page in a new tab.
- **What the user sees and does:** the only route to "How to apply?" is the scheme page. The validity dates that matter (CDC Vouchers until 31 Dec 2027; Child LifeSG Credits 12 months from payout) appear only there or in the LifeSG app.
- **Principle:** W6 simplify: remove the steps between intention and action, as Singpass Myinfo does by pre-filling forms (Beshears & Gino, 2015; Week 6 briefing, slide 5).
- **Mechanism, whose goal wins:** opening and reading a separate page for each item is a hassle the user has to choose to take on, so most stop at the results. The user loses. · **sludge (unintended)**
- **Severity 0-4:** M1 GR 2 · M2 EZ 2 · M3 MS 3 · M4 DD 1 · M5 KV 3 · agreed [ ] · driver: cost (time); how often
- **Repair (what should be true afterwards):** for items that need action, a short "What you'll need" list sits on the screen: where to claim, what to have ready (Singpass, the LifeSG app), and the expiry date (M4).
- **Prediction:** the share of testers who can say where to claim the vouchers and by when moves from about 10% in A to 60% in B.

## Finding 8 - Conditions on amounts sit in small italics under "To note:"
- **Where:** the italic notes at the foot of a box.
- **What the user sees and does:** the mother's "Up to $1,000" Earn and Save Bonus counts towards "Up to $8,450", but the condition (it "assumes that your average monthly income in preceding Year of Assessment is $500 to $6,000") sits in small italics at the bottom of her box. The same holds for the property conditions on U-Save and the S&CC Rebate.
- **Principle:** W7 fluency: small, low-contrast or italic text is harder to read, so it gets skipped (Petrova et al., 2012; Week 7 slides, pp. 13-15, fonts, spacing and contrast).
- **Mechanism, whose goal wins:** the condition is technically disclosed but rarely read, so the household keeps a figure it may not get. Nobody gains. · **grey**
- **Severity 0-4:** M1 GR 1 · M2 EZ 2 · M3 MS 2 · M4 DD 3 · M5 KV 2 · agreed [ ] · driver: trust; how often
- **Repair (what should be true afterwards):** the condition sits next to the amount it limits, in body-size roman text, such as "Up to $1,000 · only if she earns $500 to $6,000 a month" (M5).
- **Prediction:** the share of testers who mention the income condition when asked about the mother's benefits moves from about 15% in A to 60% in B.

## Finding 9 - The largest button sends the user to LifeSG to view past payouts
- **Where:** banner below the results, "Your benefits @ LifeSG · View benefits", with a wide blue button.
- **What the user sees and does:** the most prominent action on the page leads off-site to "View benefits paid out this year and in previous years". It does not lead to the items that still need action.
- **Principle:** W7 fluency: a choice that is easy to process "just feels right" (Week 7 slides, p. 7), and the biggest, clearest button is the easiest action on this page.
- **Mechanism, whose goal wins:** the attention at the end of the page goes to looking back, not to acting. This is mild, and it is useful for checking past payouts. · **grey**
- **Severity 0-4:** M1 GR 1 · M2 EZ 1 · M3 MS 1 · M4 DD 3 · M5 KV 1 · agreed [ ] · driver: how often
- **Repair (what should be true afterwards):** keep the banner below the action items. Not changed in B.
- **Prediction:** none, because the element does not change between A and B.

## Finding 10 - No way to plan, save or be reminded
- **Where:** the whole results screen, which has no planning, saving or reminder control.
- **What the user sees and does:** nothing asks when the household will deal with the vouchers or credits. Saving the link does not help: opening the results link in a new tab or a later session sends the user back to the calculator's start (the page checks a one-session ID before showing results, and the site's bookmark feature is switched off). Confirmed on shot S10: the results link opened in a private window lands on the calculator's start page.
- **Principle:** W6 planning prompts and reminders: "When will you do it?", with a time the person picks and a reminder at that time (Beshears & Gino, 2015; Week 6 briefing, slide 5). W2 progress: showing what is done (to-date) early and what is left (to-go) late sustains effort (Koo & Fishbach, 2008, in Week 2 slides, pp. 134-140).
- **Mechanism, whose goal wins:** good intentions at the screen ("I'll claim those later") have no plan or cue behind them, so they lapse once the tab closes. The user loses, and so does the agency's uptake. · **missed nudge**
- **Severity 0-4:** M1 GR 3 · M2 EZ 3 · M3 MS 3 · M4 DD 2 · M5 KV 2 · agreed [ ] · driver: how often (every visit); cost (missed claims)
- **Repair (what should be true afterwards):** for items that need action only, "When will you do this? Today / This weekend / Remind me", with "Skip" as visible as the other choices, and a small "0 of 2 done" cue (M4).
- **Prediction:** our primary metric. The share of testers who commit to a dated first move for at least one item that needs action moves from about 40% in A to 60% in B (about 97 per arm for α = .05, power = .80). We drop the day picker if more than 10% of B testers report feeling pressured.

## Finding 11 - Help is an FAQ link, with no path to do it with someone
- **Where:** the bottom line, "Unsure of your benefits? See Frequently Asked Questions".
- **What the user sees and does:** the FAQ says any household member can check benefits on behalf of another, but the screen offers no way to bring that person in. An older parent such as P1's mother, or P2, has to find help alone.
- **Principle:** W6 accountability: a plan another person can see is more likely to be carried out (Beshears & Gino, 2015; Week 6 briefing, slide 5).
- **Mechanism, whose goal wins:** asking for help is left to the user's own initiative. A small loss for users who would accept help if it were offered. · **missed nudge**
- **Severity 0-4:** M1 GR 1 · M2 EZ 1 · M3 MS 2 · M4 DD 2 · M5 KV 2 · agreed [ ] · driver: how often (older users)
- **Repair (what should be true afterwards):** an optional "Do this with someone" message containing only the scheme name, the chosen day and what to bring. It never contains income or household details, and "Skip" is as visible as "Share" (M4).
- **Prediction (one that could fail):** fewer than 15% of B testers use "Do this with someone". If so, we report that any gain in Finding 10 comes from the day picker alone.

## Finding 12 - One pale green for every box; the category lives only in the name's prefix
- **Where:** box headers (all the same pale green, #EBF1EE) and rows (plain text).
- **What the user sees and does:** cash, top-ups to CPF, rebates on bills, vouchers and app credits all look the same. Telling them apart means reading each prefix.
- **Principle:** W8 colour carries meaning: it "can shape consumer perceptions such as brand personality, familiarity, likability, and purchase intent" (Labrecque & Milne, 2012, p. 711; Alter, 2014, ch. 7, pp. 125-126). Nielsen heuristic 6, recognition rather than recall (Week 6 briefing, slide 17).
- **Mechanism, whose goal wins:** the user has to recall what each prefix means, row by row. A small cost in time. · **missed nudge**
- **Severity 0-4:** M1 GR 2 · M2 EZ 1 · M3 MS 1 · M4 DD 0 · M5 KV 1 · agreed [ ] · driver: how often
- **Repair (what should be true afterwards):** one consistent colour and icon per kind of support, always with its text label (never colour alone), and no alarm red on "Claim it yourself" (M5).
- **Prediction:** the median time testers take to find every voucher or credit row drops from about 40 seconds in A to 20 seconds in B.

## What this audit changed in our plan
- **The total stays.** Our plan assumed amounts per card only. The live screen already shows a hedged total (Finding 1), so B keeps it.
- **"Apply" becomes "claim".** The official record says "No application needed" for all ten schemes P1 gets, yet three need action (Finding 5). B's labels and the primary metric use "claim it yourself" and "commit to a dated first move for an item that needs action", not "start an application".
- **Not every finding gets a repair in B.** Finding 3 (paid versus coming) is real but outside B's scope; it goes to section 6 as the next test.

**Citations check (2026-10-25):** checked against our copies:
- Kahneman ch. 26 (p. 282).
- Labrecque & Milne (2012, p. 711; published online 2011, which is why the syllabus lists 2011).
- Alter (2014, Oneworld edition, the one on the course reading list): ch. 2, "Labels", pp. 28-29; ch. 7, "Colours", pp. 125-126 (Ebook Central page numbers).
- Ariely ch. 9 (pp. 155-172 per the reading list; our scan has the page numbers cropped). The claims rest on "expectations are more than the mere anticipation of a boost" and "these biased processes can influence how we experience other aspects of our world".
- The Week 2, 3, 6 and 7 slides, and the syllabus page ranges.
- Not opened: Petrova et al. and Beshears & Gino. Beshears & Gino is not on the course reading list, so we cite it through the Week 6 briefing. Each claim that cites either reading is also tied to a slide we checked (Week 6 slide 5; Week 7 slides 7, 13-17, 20 and 38).

## Added after building
[Dated. From the first prompt for B, nothing above this heading changes.]
- 2026-10-28: M1 (GR) severity ratings added to Findings 1-12, after variant B was built.
- 2026-10-28: M3 (MS) severity ratings added to Findings 1-12, after variant B was built.
- 2026-10-28: M5 (KV) severity ratings added to Findings 1-12, after variant B was built.
- 2026-10-31: MS-3 visual redesign of variant B and the shared site shell (colour tokens and reasons in DESIGN.md). Variant A unchanged; no finding, severity or prediction above was edited. B now also differs from A in visual polish, which is noted as a limit in DESIGN.md.
- 2026-10-31: MS-4 usability changes to variant B: one to-do list in place of the duplicated Start here / Plan blocks, At a glance tiles, jump-to-person and "only ones that need me" filter, text size and Listen, and the scripted Ask Compass helper (details and the finding behind each in DESIGN.md). Variant A unchanged; nothing above this heading was edited.
- 2026-10-31: MS-5 brand colour changed back to the heart logo's red across the shell and variant B, a two-column layout with a sticky summary sidebar on wide screens, and calm motion that switches off under reduced-motion settings (DESIGN.md). Variant A unchanged; nothing above this heading was edited.

- 2026-11-01: group number filled in on line 3 (it was a blank). No finding changed.

### 2026-11-01 (EZ): correction to Findings 5 and 7

The header and Finding 7 give "valid until 31 Dec 2027" for CDC Vouchers. That is true only of the June 2026 $500. P1's $800 row also holds the January 2026 $300, which is valid until **31 Dec 2026** (sources in `audit/evidence/2026-11-01_recheck.md`). We took the date from the scheme page, and that page describes only the June and later vouchers.

The findings stand and are stronger for it: one row hides two deadlines, and on 1 Nov 2026 the nearer one is two months away. No severity rating was changed for this. Variant A shows no expiry date, so it is unaffected. Variant B's "Unclaimed vouchers expire on 31 December 2027" needs the same correction (M3).

### 2026-11-01 (EZ): recheck of the live screen

The calculator's results for P1 and P2 were identical to those saved on 24 Oct (`audit/evidence/2026-11-01_recheck.md`).

### 2026-11-01 (EZ): ratings compared

Each member rated alone. "Median" is the middle of the five ratings. It stands in for the agreed number until the group has talked through the rows marked "discuss", where ratings are two points apart (Week 6 briefing, slide 22).

| # | Finding | GR | EZ | MS | DD | KV | Median | Range | |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Total, labelled an estimate | 0 | 0 | 0 | 2 | 0 | 0 | 0-2 | discuss |
| 2 | Boxes open by default | 0 | 0 | 0 | 0 | 0 | 0 | 0 | |
| 3 | Paid and upcoming money mixed | 2 | 2 | 2 | 1 | 2 | 2 | 1-2 | |
| 4 | Rows by person, no priority | 3 | 2 | 3 | 1 | 3 | 3 | 1-3 | discuss |
| 5 | No "automatic or claim" status | 3 | 3 | 4 | 4 | 4 | 4 | 3-4 | |
| 6 | Agency shorthand names | 3 | 2 | 2 | 2 | 2 | 2 | 2-3 | |
| 7 | How to claim is on another page | 2 | 2 | 3 | 1 | 3 | 2 | 1-3 | discuss |
| 8 | Conditions in small italics | 1 | 2 | 2 | 3 | 2 | 2 | 1-3 | discuss |
| 9 | Largest button looks backward | 1 | 1 | 1 | 3 | 1 | 1 | 1-3 | discuss |
| 10 | No plan, save or reminder | 3 | 3 | 3 | 2 | 2 | 3 | 2-3 | |
| 11 | Help is an FAQ link only | 1 | 1 | 2 | 2 | 2 | 2 | 1-2 | |
| 12 | One colour for every box | 2 | 1 | 1 | 0 | 1 | 1 | 0-2 | discuss |

### 2026-11-01 (EZ): where each repair stands in variant B

Checked on the commit of 31 Oct (`d9e328a`), by reading the code and rendering `?v=B`.

| # | Repair | Status in B |
|---|---|---|
| 1 | Keep the total and its hedges | Total box and subtitle kept. The page title changed from "may receive" to "can get", which drops one hedge |
| 2 | Every row reachable | Kept: all rows stay on the page, and "See all schemes" jumps to them |
| 3 | Paid versus coming | Not built, as planned; next test |
| 4 | "Start here" with reasons | Built (M3) |
| 5 | One status on every row | Built (M3), plus one form the audit did not list: "Automatic for employees; if self-employed, declare your income to the tax office" |
| 6 | One plain line per scheme | Built (M5) |
| 7 | "What you'll need" with expiry | Built (M1, in M4's slot); the voucher expiry needs the correction above |
| 8 | Condition next to the amount | Not built: the notes are still in small italics at the foot of each box |
| 9 | Banner | Unchanged, as planned |
| 10 | Plan and reminder | Built (M1, in M4's slot) as a date picker with Skip and a calendar file, in place of "Today / This weekend / Remind me"; the progress cue is M3's count |
| 11 | "Do this with someone" | Built (M1, in M4's slot): a message to copy, naming only the items and days |
| 12 | Colour and icon per kind | Built (M5, M1): always with a word, and no red |

### 2026-11-01 (EZ): changes in B that the audit did not predict

These came after the audit, so no prediction was committed before they were built, and any pilot result for them is exploratory. Verdicts are EZ's reading and have not been rated by the group. Prompts are in PROMPTS.md, entries MS-2 and GR-5.

| Change | Principle | Whose goal wins | Verdict |
|---|---|---|---|
| "8 of 14 benefits already taken care of" count and bar | W2 endowed progress | The user, if the count stays true. The 8 needed nothing from them, so it may flatter | grey |
| "I've done this" tick per item | W2 feedback | The user | nudge |
| "$800 is already set aside" with an expiry date | W4 loss aversion, endowment | The user, because the deadline is real. It must be the correct date: a wrong deadline inside a loss frame is what the briefing calls sludge | nudge once corrected |
| Member ages in the "For:" line | W2 identifiable person | The user | nudge |
| Calendar reminder ticked by default | W4 default | The user: it costs no money, is one click to untick, and the file only downloads on "Save my plan". Pre-ticked boxes are the briefing's own warning, so the paper should defend this one | nudge, with a watch |
| Page title "can get" | W7 fluency | Mixed: plainer, but it weakens the hedge Finding 1 keeps | grey |

### 2026-11-01, later (EZ): two changes applied to variant B

The voucher line now gives both dates on the 2026 tab, and vouchers move to the top of "Start here" because theirs is now the earliest deadline. The page title reads "may get", which restores the hedge. Both tables above show the state before these two changes.

### 2026-11-01 (MS): later changes to variant B, logged by date

- 2026-11-01: MS-6 merged main (EZ's corrections) into the redesign branch; brand colour changed from red to care teal, with red kept for the heart logo only; the NCV task and the helper now give both voucher dates from EZ's correction (DESIGN.md). Variant A unchanged; nothing above this heading was edited.
- 2026-11-01: MS-7 built two repairs that the check above lists as not built: Finding 8 (each condition now sits next to the amount it limits, in body-size roman text) and Finding 3 (each row is marked "Already paid" or "Still to come" as of today, the total is split into paid and to come, and a month-by-month payout calendar was added). Also added: a printable plan, and the brief's consent screen, random A/B assignment (kept in localStorage; `?v=` overrides) and debrief screen. Finding 3's prediction above was written for "a future B"; any result for it is now testable but exploratory. Variant A unchanged; nothing above this heading was edited.

### 2026-11-01 (MS): where each repair stands now

Checked on `main` after the merge of 1 Nov (`f453fb6`), by reading the code and rendering `?v=B`. EZ's table above stays as the record of 31 Oct.

| # | Repair | Status in B now |
|---|---|---|
| 1 | Keep the total and its hedges | Kept. The total says "Up to" and "estimated", and the title reads "may get" (EZ-8). Screen readers hear the full sentence. The total is now also split into paid and still to come (see 3) |
| 2 | Every row reachable | Kept. All 14 rows show by default. The "Only ones that need me" filter is opt-in and defaults to "All"; jump-to-person buttons only scroll |
| 3 | Paid versus coming | **Built (MS-7)**, not just listed for later: each row says "Already paid" or "Still to come" as of today, the total is split ($6,450 paid and $2,000 to come on 1 Nov, matching the figures above), and a month-by-month payout calendar was added. The prediction above was written for "a future B", so any result for it is exploratory |
| 4 | "Start here" with reasons | Built (M3). Since MS-4 it is one to-do list with how-to steps, a day picker, Skip and "I've done this" ticks. NCV Vouchers are first (earliest deadline) |
| 5 | One status on every row | Built (M3), as a chip with an icon and the words. Still includes the form the audit did not list ("Automatic for employees; if self-employed, declare your income") |
| 6 | One plain line per scheme | Built (M5), unchanged |
| 7 | "What you'll need" with expiry | Built, now inside each task (MS-4). The NCV task gives both dates on the 2026 tab ($300 by 31 Dec 2026, $500 by 31 Dec 2027, MS-6). Ask Compass gives the same steps and dates |
| 8 | Condition next to the amount | **Built (MS-7).** Each condition sits in its row beside the amount, in body-size roman text. The "To note" panel stays at the foot of each box |
| 9 | Banner | Unchanged in content and still below the action items; restyled only |
| 10 | Plan and reminder | Built. A day picker per task (GR-5's date picker in place of "Today / This weekend / Remind me"). Calendar reminders are now downloaded by an explicit button, no longer a pre-ticked box (MS-4). Also a progress count and a printable plan (MS-7) |
| 11 | "Do this with someone" | Built: a message to copy that names only the items and days, a "Do this with someone" card in the sidebar, and the printable plan |
| 12 | Colour and icon per kind | Built (M5, M1). Always with a word and an icon. Since MS-6 the brand is teal, and red appears only in the heart logo |

### 2026-11-01 (MS): changes in B that the audit did not predict, part 2

These continue EZ's table above. They came after the audit, so no prediction was committed before they were built, and any pilot result for them is exploratory. The verdicts are MS's reading and have not been rated by the group. Prompts: PROMPTS.md, entries MS-3 to MS-9.

| Change | Principle | Whose goal wins | Verdict |
|---|---|---|---|
| One to-do list in place of the same items in two blocks | W6 simplify; W2 feedback | The user | nudge |
| "At a glance" tiles: things to do, automatic count, next payout month | W3 expectations; Nielsen #1 | The user | nudge |
| "Only ones that need me" filter and jump-to-person buttons | Nielsen #7 | The user, as long as the default stays "All". A default of "Only mine" would hide rows, which Finding 2 rules out | nudge, with a watch |
| Text size (A / A+ / A++) and "Listen" | W7 fluency | The user | nudge |
| "Ask Compass", a scripted helper with fixed answers | Findings 7 and 11; Nielsen #10 | The user. Risk: a visitor may trust a fixed answer too far, so its answers point back to the page and say the figures are estimates | nudge, with a watch |
| Payout calendar | W3 expectations | The user | nudge |
| Printable plan | W6 accountability | The user | nudge |
| Sticky summary sidebar on wide screens | Nielsen #1; W2 goal gradient | The user | nudge |
| Motion: sections rising in, the total counting up, an "All done" burst | W2 feedback | Mixed: it adds polish more than it changes the decision. It switches off under reduced-motion settings | grey |
| Amber for "needs you" against a teal brand; red only in the logo | W8 colour (Bazley et al., 2021) | The user | nudge |
| Reminder downloaded by a button, no longer pre-ticked | W4 default | The user: the choice is explicit. This replaces EZ's row "Calendar reminder ticked by default" | nudge |
| Consent screen, random A/B assignment and debrief | W1 randomised experiments; Week 6 brief | The study's validity, and an informed participant | not a nudge: study scaffolding, the same in A and B |

Taken together, these make B differ from A by more than the audited repairs, so a B-over-A result would test B as a package (DESIGN.md, "Where this could turn into sludge").

### Still open for the group: agreed severities

The "Agreed" column in the summary and the "agreed [ ]" lines above stay blank, because nothing above this heading changes after the first prompt for B. Once the group has talked through the rows EZ marked "discuss" (Findings 1, 4, 7, 8, 9 and 12), the agreed numbers go in a new dated table here.

### 2026-11-01 (EZ): agreed severities

The group took the median of the five solo ratings as the agreed number (group chat, 1 Nov: MS proposed locking it unless a reason changed someone's mind, and DD accepted it for the rows where DD sat at one end). One-line reasons from the raters at each end were optional. Where a rater gave none, the reason below is EZ's reading of the finding's driver, not the raters' own words. The six rows that were two points apart are marked.

| # | Finding | Agreed | Range | Why this number |
|---|---|---:|:--|---|
| 1 | Total, labelled an estimate * | 0 | 0-2 | It is honest and hedged, so it works and B keeps it |
| 2 | Boxes open by default | 0 | 0 | Nothing is hidden |
| 3 | Paid and upcoming money mixed | 2 | 1-2 | Costs trust and planning, not money directly |
| 4 | Rows by person, no priority * | 3 | 1-3 | Reaches every household with more than one member, and a missed claim costs money |
| 5 | No "automatic or claim" status | 4 | 3-4 | Vouchers and credits can expire unclaimed, with no warning on the screen |
| 6 | Agency shorthand names | 2 | 2-3 | On every row, and only opening each page gets around it |
| 7 | How to claim is on another page * | 2 | 1-3 | The information exists one click away, so the cost is time |
| 8 | Conditions in small italics * | 2 | 1-3 | Disclosed but easy to miss, so the cost is to trust in the figure |
| 9 | Largest button looks backward * | 1 | 1-3 | It blocks nothing and is useful for past payouts |
| 10 | No plan, save or reminder | 3 | 2-3 | Every visit, and a lapsed intention can mean a missed claim |
| 11 | Help is an FAQ link only | 2 | 1-2 | Matters most for older users; a small cost for others |
| 12 | One colour for every box * | 1 | 0-2 | The prefix already names the kind, so the cost is a little time |

\* Ratings were two points apart. The "Agreed" column in the summary and the "agreed [ ]" lines above stay blank, because nothing above "Added after building" changes after the first prompt for B. This table is the record.
