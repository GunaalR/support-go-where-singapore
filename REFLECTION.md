# REFLECTION.md - SupportGoWhere results screen · Group 2

**Members:** GR = Gunaal R., EZ = Enhao (Andy) Zhang, MS = Maya M. Sukumar, DD = Dhiksha D., KV = Venkata Narayana Koppaka

**Length:** about 1,000-1,500 words for the group. Each member initials the parts they wrote, e.g. (AB, CD).

## Part A - Critical thinking

### A1 Where did the AI get the behavioural science wrong, and how did you catch it?

The first AUDIT.md draft from Claude Code stated three principles more strongly than our sources allowed. It said every extra step "cuts follow-through" (Beshears & Gino), that colour "is judged before the words are read" (Labrecque & Milne), and that hard-to-process information is "judged less useful" (Petrova et al.). Each sounded right and each cited a real reading. We caught them by checking every principle line against the slides we held, and rewrote them to what the slides say. The guardrail we kept: a principle line cites a page we have opened, and anything unopened is flagged as such. (EZ)

### A2 Which claim did you check at source (reading and page), and what did you find?

We opened Kahneman ch. 26 and found on p. 282 that the reference point can be "the outcome that you expect, or perhaps the outcome to which you feel entitled", which supports Finding 3. Checking facts as well as readings mattered more. The audit said CDC Vouchers are valid until 31 Dec 2027, copied from the scheme page. On 1 Nov we checked the CDC's own page: the January $300 expires on 31 Dec 2026, a year earlier. The AI had read a true sentence and applied it to a row it did not fully cover, and B had already built a loss-framed line on that date. A wrong deadline inside a loss frame would have turned our nudge into sludge. We dated the correction in AUDIT.md rather than editing the finding. (EZ)

### A3 Which nudge-or-sludge call did you make against the AI's suggestion, and why?

The clearest one was the label on the Child LifeSG Credits. The AI's first version of B labelled them "Automatic: sent to the app, use within 12 months", because the official record says "No application needed". We overruled it. Nothing arrives in a bank account: the child's trustee has to open the app and spend the credits before they expire. A label saying "Automatic" would tell a household it can do nothing, which is the very belief Finding 5 calls sludge. We changed it to "Claim it yourself: in the app" and kept the item in "Start here". The lesson we took was that "no application needed" does not mean "nothing to do".

The second call was a default. The AI built the calendar reminder as a box ticked by default and presented it as a helpful W4 default. We judged it too close to the pre-ticked "Order Protection" that the Week 6 briefing uses as its example of sludge, even though the reminder costs nothing. B now asks the visitor to press "Add reminders to my calendar". A default can serve the user, but a pre-ticked box is the form the course warns about, so we chose an explicit choice over a quiet one. (MS)

### A4 What about your users could the AI not know?

[...] (initials)

## Part B - Reflection

### B1 Which principle replicated, or was refuted, in your pilot or prediction?

[...] (initials)

### B2 What would you test next, and what result would change your mind?

The test we would run next is the three-version test named in DESIGN.md: A, A with B's new look but none of the nudges, and B. Our current comparison cannot separate the nudges from the polish. B is calmer, clearer and better laid out as well as nudged, so a win for B could simply mean "looks more modern". Keeping the primary metric from Finding 10 (the share of testers who commit to a dated first move, about 40% in A and 60% in B) and about 97 testers per version, the three-way split tells us where any gain comes from.

Two results would change our minds. If A with the new look scores within five points of B, the polish did the work and our nudges added little; we would then credit the design, not the behavioural principles, and cut the nudges that cost the most screen space. If B scores well above both, the nudges earn their place. A second check is Finding 5's guardrail: if more than 10% of B testers mark an automatic item as needing action, the status labels are creating confusion rather than removing it, and we would drop or reword them. We would also re-run the voucher loss line with the corrected December 2026 date, since a wrong deadline inside a loss frame is the quickest route from nudge to sludge. (GR)

### B3 How did AI change who did what in your group?

AI did most of the typing, so our jobs moved to the two ends: saying exactly what to build, and checking what came back. To let five people's AI sessions run at once, M1 split variant B into one file per owner (GR-1), and each of us prompted for our own part. The real work then became checking against the evidence, and it was shared: EZ caught the wrong voucher date and the "Already paid" label next to "Claim it yourself"; I caught the AI calling the child credits "Automatic" and the rows squeezed into narrow strips.

The cost was that ownership blurred. One AI session can rewrite many files in minutes, so when I restyled the whole of B and the site shell (MS-3 onwards), I was editing parts that belonged to M1, M4 and M5. On 1 Nov that met EZ's own edits to the same shell files and caused a merge conflict. We resolved it by merging rather than overwriting, keeping both sides' wording, and agreed to pull before editing any shared file. Two habits held it together: the initials in PROMPTS.md, which keep each change tied to a person, and the rule that facts go back to the saved records, not to the AI's memory. (MS)
