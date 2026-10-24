# Evidence behind AUDIT.md

Retrieved on 2026-10-24 (SGT) by EZ from the live SupportGoWhere site. Only the two fictional households in AUDIT.md were entered.

| File | What it is |
|---|---|
| `2026-10-24_P1_calculator_input.json`, `..._P2_...` | The household answers, in the form the calculator page sends them |
| `2026-10-24_P1_calculator_result.json`, `..._P2_...` | The calculator's reply, which the results screen draws as its rows, amounts and payout months |
| `2026-10-24_scheme_records.json` | The official record behind each scheme page for the 10 schemes P1 and P2 receive: "application needed" flag, highlights, "How to apply" and "About this support" text |

## How the files were obtained

The results screen gets its numbers from the calculator service the page itself calls (`api.supportgowhere.life.gov.sg/v1/sr/bc/benefits/check`), and each scheme page reads its record from `api.supportgowhere.life.gov.sg/v2/sr/schemes/{code}`. We sent the same answers a user would type into the form, so the files show what the screen shows, before layout. The dated screenshots in `audit/screenshots/` show the same screens as a user sees them.

## What P1 receives (2026 tab, default)

The table groups rows by box; on screen, rows inside each box are sorted alphabetically by scheme name (screenshots S04–S07).

| Box | Scheme as named on screen | Amount | Payout line | What the household must do (official record) |
|---|---|---|---|---|
| You | Cash - Assurance Package | $250 | Payout in December 2026 | Nothing |
| You | Cash - GSTV | $850 | Payout in August 2026 | Nothing if signed up before; otherwise sign up once |
| You | Cash - Budget 2026 Cost-of-Living Special Payment | $500 | Payout in September 2026 | Nothing |
| Household | Rebate - U-Save | $600 | Granted from Jan, Apr, Jul and Oct 2026 | Nothing |
| Household | Voucher - CDC Vouchers | $800 | Payout in Jan and Jun 2026 | Claim on RedeemSG; valid until 31 Dec 2027 |
| Household | Rebate - Service and Conservancy Charges (S&CC) Rebate | 2.5 months | Granted from Jan, Apr, Jul and Oct 2026 | Nothing |
| Member 1 | CPF Top-up - Budget 2026 CPF Top-Up | $1,500 | Payout in December 2026 | Nothing |
| Member 1 | CPF Top-up - GSTV — MediSave | $250 | Payout in August 2026 | As GSTV cash |
| Member 1 | CPF Top-up - Majulah Package — Earn and Save Bonus | Up to $1,000 | Payout in March 2026 | Nothing for employees; self-employed declare income |
| Member 1 | Cash - Assurance Package | $250 | Payout in December 2026 | Nothing |
| Member 1 | Cash - Budget 2026 Cost-of-Living Special Payment | $600 | Payout in September 2026 | Nothing |
| Member 1 | Cash - GSTV | $850 | Payout in August 2026 | As above |
| Member 2, Member 3 | Credit - Child LifeSG Credits | $500 each | Payout in July 2026 | Reaches the CDA trustee in the LifeSG app; expires 12 months after payout |

Total shown: **Up to $8,450 and 2.5 months of S&CC Rebate** (2026); **Up to $3,625 and 2.5 months** (2027). On 24 Oct 2026, $6,450 of the 2026 total had already been paid out and $2,000 was still to come.

## How variant A maps the live screen to the fictional brand

Variant A (`src/variantA/`) keeps the live layout, row order, amounts, payout months and caveats for P1, as checked against the screenshots, and swaps every real name for a fictional one.

| Live site | Variant A (HelpCompass SG) |
|---|---|
| SupportGoWhere | HelpCompass SG |
| LifeSG (app, banner, credits) | CompassLife |
| CPF, MediSave | NSF (National Savings Fund), HealthSave |
| GST Voucher (GSTV) | Living Cost Voucher (LCV) |
| Assurance Package | Steady Package |
| Majulah Package | Harbour Package |
| Budget 2026 Cost-of-Living Special Payment | 2026 Cost-of-Living Special Payment |
| Budget 2026 CPF Top-Up | 2026 NSF Top-Up |
| U-Save | U-Credit |
| Service and Conservancy Charges (S&CC) Rebate | Estate Upkeep Charges (EUC) Rebate |
| CDC Vouchers, RedeemSG | NCV Vouchers (Neighbourhood Council Vouchers), RedeemNow |
| HDB flat | public flat |
