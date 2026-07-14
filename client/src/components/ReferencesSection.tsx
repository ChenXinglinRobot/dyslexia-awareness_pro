import { useEffect, useState, type MouseEvent } from "react";
import { CornerUpLeft } from "lucide-react";
import {
  REFERENCES,
  type ReferenceId,
  type ReferenceRecord,
} from "@/data/references";
import {
  CITATION_NAVIGATE_EVENT,
  consumeCitationSource,
  storeLatestCitationSource,
  type CitationSourceMap,
  type CitationNavigateDetail,
} from "@/lib/citationNavigation";

const usageLabels = {
  future: "延伸阅读",
  supplementary: "补充背景",
} as const;

export default function ReferencesSection() {
  const referenceList: readonly (ReferenceRecord & { id: ReferenceId })[] =
    REFERENCES;
  const [citationSources, setCitationSources] = useState<CitationSourceMap>({});

  useEffect(() => {
    const rememberSource = (event: Event) => {
      const detail = (event as CustomEvent<CitationNavigateDetail>).detail;
      if (!detail) return;

      setCitationSources(current => storeLatestCitationSource(current, detail));
    };

    window.addEventListener(CITATION_NAVIGATE_EVENT, rememberSource);
    return () =>
      window.removeEventListener(CITATION_NAVIGATE_EVENT, rememberSource);
  }, []);

  const returnToCitation = (
    event: MouseEvent<HTMLAnchorElement>,
    referenceId: ReferenceId,
    sourceId: string
  ) => {
    setCitationSources(current =>
      consumeCitationSource(current, { referenceId, sourceId })
    );

    const source = document.getElementById(sourceId);
    if (!source) {
      event.preventDefault();
      return;
    }

    requestAnimationFrame(() => {
      if (source.isConnected) {
        source.focus({ preventScroll: true });
      }
    });
  };

  return (
    <section
      id="references"
      aria-labelledby="references-heading"
      className="scroll-mt-24 lg:grid lg:grid-cols-[minmax(14rem,0.35fr)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16"
    >
      <div className="mb-8 lg:mb-0 lg:self-start">
        <h3
          id="references-heading"
          className="text-xl text-foreground md:text-2xl"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          参考文献
        </h3>
        <p
          className="mt-2 max-w-[65ch] text-sm leading-7 text-muted-foreground lg:max-w-[32ch]"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          保留文内编号便于定位，书目信息依 APA
          要素顺序呈现。点击文献后的“返回正文”，可回到刚才阅读的位置。
        </p>
      </div>

      <div className="min-w-0">
        <ol className="w-full max-w-[86ch] space-y-8" aria-label="参考文献列表">
          {referenceList.map(reference => {
            const citationSource = citationSources[reference.id];

            return (
              <li
                key={reference.id}
                id={`ref-${reference.id}`}
                tabIndex={-1}
                className="reference-item grid scroll-mt-24 grid-cols-[2rem_minmax(0,1fr)] gap-x-2 focus:outline-none sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-3"
              >
                <span
                  className="pt-0.5 text-right text-sm font-semibold text-muted-foreground sm:text-base"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  aria-hidden
                >
                  [{reference.id}]
                </span>

                <div className="min-w-0">
                  <p
                    className="reference-entry-copy text-pretty text-base leading-7 text-foreground/80 transition-colors duration-300"
                    style={{
                      fontFamily: "'Noto Sans SC', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    <span>{reference.authors}.</span>{" "}
                    <span>({reference.year}).</span>{" "}
                    <span>{reference.title}.</span>{" "}
                    <cite className="font-normal italic">
                      {reference.publication.replace(`，${reference.year}`, "")}
                      .
                    </cite>
                    {reference.usage !== "cited" && (
                      <span className="text-muted-foreground">
                        {" "}
                        （{usageLabels[reference.usage]}）
                      </span>
                    )}
                  </p>

                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`在新标签打开参考文献 ${reference.id} 的来源页面`}
                    className="mt-1.5 inline-block max-w-full break-words text-sm leading-6 text-primary underline decoration-primary/35 underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {reference.doi
                      ? `https://doi.org/${reference.doi}`
                      : "来源页面"}
                  </a>

                  {reference.note && (
                    <p
                      className="mt-1 max-w-[65ch] text-xs leading-6 text-muted-foreground"
                      style={{
                        fontFamily: "'Noto Sans SC', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {reference.note}
                    </p>
                  )}

                  {citationSource && (
                    <a
                      href={`#${citationSource}`}
                      onClick={event =>
                        returnToCitation(event, reference.id, citationSource)
                      }
                      className="mt-2 flex w-fit items-center gap-1.5 text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label={`返回正文中刚才引用参考文献 ${reference.id} 的位置`}
                    >
                      <CornerUpLeft className="size-3.5" aria-hidden />
                      返回正文
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <p
          className="mt-5 max-w-[86ch] text-xs leading-6 text-muted-foreground"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          说明：科普内容不能替代医学诊断或个体化教育建议；研究结论适用于其具体样本与实验条件，不应外推为所有阅读障碍者的共同体验。
        </p>
      </div>
    </section>
  );
}
