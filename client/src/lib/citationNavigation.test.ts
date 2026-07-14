import { describe, expect, it } from "vitest";
import {
  consumeCitationSource,
  storeLatestCitationSource,
  type CitationNavigateDetail,
} from "./citationNavigation";

const firstOccurrence = {
  referenceId: 1,
  sourceId: "citation-first-1",
} satisfies CitationNavigateDetail;

const laterOccurrence = {
  referenceId: 1,
  sourceId: "citation-later-1",
} satisfies CitationNavigateDetail;

describe("citation return targets", () => {
  it("keeps the most recently clicked occurrence for each reference", () => {
    const firstState = storeLatestCitationSource({}, firstOccurrence);
    const latestState = storeLatestCitationSource(firstState, laterOccurrence);

    expect(latestState[1]).toBe(laterOccurrence.sourceId);
  });

  it("consumes the matching return target after it is used", () => {
    const state = storeLatestCitationSource({}, firstOccurrence);
    const consumedState = consumeCitationSource(state, firstOccurrence);

    expect(consumedState[1]).toBeUndefined();
  });

  it("does not let an old return action erase a newer target", () => {
    const state = storeLatestCitationSource(
      storeLatestCitationSource({}, firstOccurrence),
      laterOccurrence
    );
    const unchangedState = consumeCitationSource(state, firstOccurrence);

    expect(unchangedState).toBe(state);
    expect(unchangedState[1]).toBe(laterOccurrence.sourceId);
  });

  it("does not disturb return targets for other references", () => {
    const anotherReference = {
      referenceId: 2,
      sourceId: "citation-first-2",
    } satisfies CitationNavigateDetail;
    const state = storeLatestCitationSource(
      storeLatestCitationSource({}, firstOccurrence),
      anotherReference
    );
    const consumedState = consumeCitationSource(state, firstOccurrence);

    expect(consumedState[1]).toBeUndefined();
    expect(consumedState[2]).toBe(anotherReference.sourceId);
  });
});
