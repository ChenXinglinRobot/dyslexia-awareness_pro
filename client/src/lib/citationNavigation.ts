import type { ReferenceId } from "@/data/references";

export const CITATION_NAVIGATE_EVENT = "citation:navigate";

export interface CitationNavigateDetail {
  referenceId: ReferenceId;
  sourceId: string;
}

export type CitationSourceMap = Partial<Record<ReferenceId, string>>;

export function storeLatestCitationSource(
  current: CitationSourceMap,
  detail: CitationNavigateDetail
): CitationSourceMap {
  if (current[detail.referenceId] === detail.sourceId) {
    return current;
  }

  return { ...current, [detail.referenceId]: detail.sourceId };
}

export function consumeCitationSource(
  current: CitationSourceMap,
  detail: CitationNavigateDetail
): CitationSourceMap {
  if (current[detail.referenceId] !== detail.sourceId) {
    return current;
  }

  const next = { ...current };
  delete next[detail.referenceId];
  return next;
}

export function rememberCitationSource(
  referenceId: ReferenceId,
  sourceId: string
) {
  window.dispatchEvent(
    new CustomEvent<CitationNavigateDetail>(CITATION_NAVIGATE_EVENT, {
      detail: { referenceId, sourceId },
    })
  );
}
