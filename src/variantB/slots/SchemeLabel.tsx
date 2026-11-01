import { Briefcase, CheckCircle2, Hand, UserCheck, type LucideIcon } from 'lucide-react';
import type { PayoutRowA } from '../../variantA/resultsDataA';
import { C } from '../../theme/brand';
import { statusFor, type StatusKind } from './schemeStatusM3';

// SLOT for M3 (choice architecture): the label under each scheme name,
// "Automatic: nothing to do", "Claim it yourself: [where]" or
// "Automatic if you have signed up before" (AUDIT.md Finding 5).
// Wording comes from schemeStatusM3.ts. Shown as a chip: the words carry the
// meaning, and an icon plus a tint repeat it, so colour is never the only cue.
// Only "Claim it yourself" is warm; everything automatic is cool and quiet,
// so the eye goes to the rows that need the household (DESIGN.md).

const CHIP: Record<StatusKind, { Icon: LucideIcon; fg: string; bg: string }> = {
  automatic: { Icon: CheckCircle2, fg: C.auto, bg: C.autoTint },
  claim: { Icon: Hand, fg: C.claim, bg: C.claimTint },
  signup: { Icon: UserCheck, fg: C.signup, bg: C.signupTint },
  employee: { Icon: Briefcase, fg: C.employee, bg: C.employeeTint },
};

export function SchemeLabel({ row }: { row: PayoutRowA }) {
  const status = statusFor(row);
  if (!status) return null;
  const { Icon, fg, bg } = CHIP[status.kind];
  const needsYou = status.kind === 'claim';
  return (
    <p
      className="inline-flex items-start gap-1.5 w-fit max-w-full rounded-lg px-2.5 py-1 text-[15px] leading-snug"
      style={{
        color: fg,
        backgroundColor: bg,
        fontWeight: needsYou ? 700 : 600,
        boxShadow: needsYou ? `inset 0 0 0 1px ${C.claimLine}` : undefined,
      }}
      data-status={status.kind}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
      <span>{status.label}</span>
    </p>
  );
}
