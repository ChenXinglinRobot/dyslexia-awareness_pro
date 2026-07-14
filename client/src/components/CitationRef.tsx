import { useId } from "react";
import { cn } from "@/lib/utils";
import { getReference, type ReferenceId } from "@/data/references";
import { rememberCitationSource } from "@/lib/citationNavigation";

type CitationRefProps =
  | {
      id: ReferenceId;
      ids?: never;
      className?: string;
    }
  | {
      id?: never;
      ids: readonly ReferenceId[];
      className?: string;
    };

export default function CitationRef({ id, ids, className }: CitationRefProps) {
  const citationIds = ids ?? [id];
  const isGroup = citationIds.length > 1;
  const instanceId = useId().replaceAll(":", "");

  return (
    <sup
      className={cn(
        "ml-0.5 inline-flex whitespace-nowrap align-super text-[0.68em] font-semibold leading-none",
        className
      )}
    >
      {isGroup && <span aria-hidden>[</span>}
      {citationIds.map((citationId, index) => {
        const reference = getReference(citationId);
        const sourceId = `citation-${instanceId}-${citationId}`;

        return (
          <span key={citationId} className="inline-flex">
            {index > 0 && (
              <span className="text-primary" aria-hidden>
                ,
              </span>
            )}
            <a
              id={sourceId}
              href={`#ref-${citationId}`}
              onClick={() => rememberCitationSource(citationId, sourceId)}
              aria-label={`参考文献 ${citationId}：${reference.shortLabel}`}
              title={`${reference.shortLabel}：${reference.title}`}
              className="rounded-sm text-primary no-underline transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isGroup ? citationId : `[${citationId}]`}
            </a>
          </span>
        );
      })}
      {isGroup && <span aria-hidden>]</span>}
    </sup>
  );
}
