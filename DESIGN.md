# DESIGN.md - HelpCompass SG visual design: tokens and reasons

Added 2026-10-31 (MS, PROMPTS.md Entry MS-3), after variant B was first built. The tokens live in `src/theme/brand.ts`.

## Who looks at this screen, and what they need to see

The results screen is read by Singapore households who have just run the benefits calculator. Our fictional P1 household has a working adult, a 71-year-old member and two school-age children. P2 is a retiree living alone. Many readers are older, some are on a phone, and some read in a second language. They come with one question: *what do we get, and do we have to do anything?*

So the design has three jobs, in this order:
1. **Make the few items that need action impossible to miss** (AUDIT.md Findings 4 and 5).
2. **Let everything that is automatic recede**, without hiding it (Finding 2: every row stays visible).
3. **Feel calm and trustworthy.** This is public money, and alarm or hype would be sludge.

## Colour

| Token | Hex | Used for | Why (course principle) |
|---|---|---|---|
| `brand` / `brandMid` | `#BE123C` / `#E11D48` | links, primary buttons, progress fill, year tab, hero | **Rose-red, taken from the heart logo (MS-5).** The team chose red to match the logo and the "help" and "care" it stands for. Red is Singapore's national colour and a lucky colour in Chinese culture (Week 10, culture). Because red can also read as risk and loss (Bazley et al., 2021, Week 8), it is kept for the brand only: never on amounts, status labels or warnings. 6.3:1 on white. |
| `brandDeep` | `#881337` | page hero, notice bar | Same hue, darker. It gives the page a clear top and frames the title. White text on it is 9.6:1. |
| `claim` / `claimSolid` / `claimSoft` | `#9A4A00` / `#B45309` / `#FFF8EF` | "Start here" card, "Claim it yourself" chips, step numbers | **Warm apricot/amber.** It sits on its own card, chip and icon (a hand), apart from the brand red by hue, so the few items that need action stand out. (Until MS-5 the brand was teal-blue, and apricot was its complement.) We chose **not red**: red reads as risk and loss (Bazley et al., 2021, Week 8), and in Chinese culture it also means luck, so its meaning is mixed for a Singapore audience (Week 10, culture). 5.8:1 for chip text on its tint. |
| `auto` | `#2F6F5E` on `#EDF6F2` | "Automatic: nothing to do" | Quiet sage with a check icon: "settled". Low saturation, so the 8 automatic rows sit back. Green is used only on the status, never on amounts, so no amount looks "healthier" than another (Schuldt, 2013, Week 8; M5's rule). |
| `signup` | `#1E5A8A` on `#EAF3FB` | "Automatic if you have signed up before" | A calm "information" blue. It is conditional, not urgent. |
| `employee` | `#475569` on `#F1F5F9` | Earn and Save Bonus condition | Neutral slate: a fact, not a task. |
| `ink` / `body` / `muted` | `#0F1E2E` / `#334155` / `#5B6675` | text | Cool slates with high contrast (16.9, 10.4 and 5.8:1) for older readers. Body text is now 10.4:1, up from the live site's grey #4E4E4E at 8.3:1. |
| `page` / `line` | `#F8F6F5` / `#E2E8F0` | background, borders | A warm off-white that sits with the red, so the white cards lift off it without heavy borders. |
| M5 kind colours | `styleB.ts` | bar and pill per kind of support | Unchanged from M5 (KV-1) and GR-4: one muted colour per kind of support, always with an icon and a word. In MS-3 the full-row tint became a wash that fades to white, so the kind colour shows without competing with the claim chip. |

**Never colour alone.** Every status keeps its words, plus an icon (check, hand, person, briefcase) and a tint. A colour-blind reader, or someone printing in black and white, loses nothing (WCAG 1.4.1).

## Hierarchy and type

- **The total is the biggest number on the page** (56-72px), with "Up to", "estimated" and "and 2.5 months of EUC Rebate" kept (Finding 1). Screen readers hear the same sentence as variant A.
- **Every amount is right-aligned** in tabular figures, so amounts line up and can be compared down a column (W7 fluency: easier to process, so judged more readily).
- Headings use Plus Jakarta Sans and body text uses Inter. Body text is at least 16-18px and tap targets at least 44-48px, for older readers and phone users.
- "To note" conditions are now body-size roman text in an info panel, not small italics (Finding 8's repair).
- Each section has a small label above its heading ("Your next steps", "You and your home", "Your household", "Make it happen"), so the page can be skimmed.

## What stayed the same, on purpose

- **Variant A is untouched.** `src/variantA/` still copies the live results screen, so the A/B test still compares the live screen with our redesign.
- **The site shell** (notice bar, header, language bar, footer, homepage) is shared by A and B. Restyling it changes both equally, so it does not enter the comparison.
- **All wording and data in B are unchanged** (MS-3). MS-4 then changed how B is organised; see below.
- The notice bar no longer says "A Singapore Government Agency Website", and the footer no longer names GovTech or MSF. The logo keeps the original warm heart (MS-4: it says "help" and "care"; red appears only in the logo, never on amounts, labels or warnings, so it does not signal risk on the results screen). The homepage's real names (CDC, LifeSG, HDB, CPF, ComCare) and links to real .gov.sg sites were replaced by the fictional ones in `audit/evidence/README.md` (course rule: fictional brand only).

## Where this could turn into sludge (our own check)

- **Variant B now differs from A in visual polish as well as in the audited nudges.** A B-over-A difference could partly come from "looks more modern", not from Start here or the labels. In the paper, B is described as the full redesign package. Separating look from nudges (A, A plus the new look, B) is the next test in section 6.
- The warm Start here card is meant to draw the eye. If testers report feeling *pressured*, the warmth works against the user. M4's pressure question (Finding 10's guardrail) covers this.

## Usability changes (MS-4, 2026-10-31)

MS-3 changed the look. MS-4 changes how the screen works, from the visitor's side of it. Each change answers a question a household has, and traces to a finding.

| Visitor's question | Before (B after MS-3) | After (MS-4) | Finding / principle |
|---|---|---|---|
| "Do I have to do anything?" | The same 2-3 items listed twice: "Start here" at the top, "Plan your next step" at the very bottom | **One to-do list** (the "task list" pattern used by public-service sites such as GOV.UK). Each task shows To do, Planned, Done or Skipped, and opens to "How to do it" (numbered steps from the official record), "What you'll need", a day picker and "Skip for now" | 4, 5, 7, 10; W6 planning prompts; W2 feedback |
| "What's the short answer?" | Only the total | **At a glance**: the total plus three tiles: things to do, how many are automatic, and the next payout month (worked out from the payout lines and today's date) | 1, 3 (partly: the next month only, no paid/coming split); W3 expectations |
| "Which ones are mine?" | 14 rows in one long column | **Jump-to-person chips** (with ages), a **"Only ones that need me"** filter (default "All", so every row stays one tap away), and two columns of rows on wide screens | 2, 4; Nielsen #7 flexibility |
| "I can't read this well" | Fixed text size | **Text size A / A+ / A++** and **Listen**, which reads the summary aloud with the browser's own voice, offline | W7 fluency; older readers |
| "Can I just ask?" | One FAQ link at the bottom | **Ask Compass**: a scripted helper with fixed answers built from this page's data and the scheme records. It says it is not a person, sends nothing anywhere, and never pushes | 7, 11; Nielsen #10 help |
| "Remind me" | A pre-ticked "Add a reminder" box that downloaded a file on Save | An explicit **"Add reminders to my calendar"** button under "Your plan", listing the days picked | 10; a pre-ticked box is a default the course flags as possible sludge (W4), so the visitor now chooses |

**Guardrails kept:** no AI model and no network call (the bot is a fixed script); nothing stored or sent; every task can be skipped; the filter defaults to showing everything; variant A is untouched.

**Where this could turn into sludge:** the bot answers only what it was scripted for, and a visitor who trusts it too much could miss a condition. Its answers point back to the page ("Show my to-do list", "See every scheme") and say that the figures are estimates. The text-size and Listen tools are not part of the A/B comparison; they are accessibility features, but they do add to B's "more polished" difference from A (see the limit above).

## Red theme, wider layout and motion (MS-5, 2026-10-31)

- **Brand colour back to red.** The team asked for the brand to match the original heart logo. All brand uses moved from teal-blue to rose-red (`src/theme/brand.ts`). The guardrail from Week 8 still holds: red is the brand, never a signal. Amounts stay in near-black ink, "Claim it yourself" stays amber with a hand icon, and "Automatic" stays sage with a check.
- **Using the width of a laptop screen.** On wide screens (1024px and up) variant B has two columns: the to-do list and the benefits on the left, and a **sticky sidebar** on the right. The sidebar holds the At a glance summary with a small progress bar, a "Not sure what to do?" card (Ask Compass, Do this with someone), and the finder (filter and jump-to-person, with each person's amount). The answer to "what do we get, and what do I do?" stays in view while the visitor scrolls the detail (Nielsen #1, visibility of status). On phones the summary sits at the top and the finder above the list.
- **Motion with a job.** Sections rise into view as they scroll in; the total counts up when a year tab opens; scheme cards lift slightly under the pointer; a task's steps unfold; the progress bar fills, with one soft shine; finishing the list gives a short "All done" burst (Week 2 feedback); the hero compass turns very slowly; the Ask Compass button pulses three times on arrival, then stops. Nothing moves to create urgency (no timers, no shaking), and **all motion switches off** for visitors whose device asks for reduced motion (WCAG 2.3.3).

**Limit:** the red theme and the motion affect the shell and B's look, not what B asks of the visitor. They add to B's difference from A in polish, the limit already named above.
