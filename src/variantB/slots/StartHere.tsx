import type { YearPanelA } from '../../variantA/resultsDataA';

// SLOT for M3 (choice architecture): the "Start here" block.
// Shown in variant B between the total box and "Your profile and your property".
// Gets the year panel the user is looking at, so it can pick 2-3 schemes from
// panel.ownBoxes / panel.memberBoxes and say why each one is a good first step.
// Returning null shows nothing, which is what variant B does until M3 builds it.
// Owned by M3: only M3 edits this file.

export function StartHere({ panel }: { panel: YearPanelA }) {
  void panel;
  return null;
}
