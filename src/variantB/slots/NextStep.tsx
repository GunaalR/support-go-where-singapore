import type { YearPanelA } from '../../variantA/resultsDataA';

// SLOT for M4 (follow-through): "When will you take the next step?" with Skip,
// the "What you'll need" checklist, the progress cue and the optional
// "Do this with someone".
// Shown in variant B right after the results boxes, before the banner.
// Gets the year panel the user is looking at.
// Returning null shows nothing, which is what variant B does until M4 builds it.
// Owned by M4: only M4 edits this file.

export function NextStep({ panel }: { panel: YearPanelA }) {
  void panel;
  return null;
}
