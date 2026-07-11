import { BookOpen, ExternalLink, FileText } from "lucide-react";
import { REFERENCES } from "@/data/references";

const usageLabels = {
  future: "延伸阅读",
  supplementary: "补充背景",
} as const;

export default function ReferencesSection() {
  return (
    <section
      id="references"
      aria-labelledby="references-heading"
      className="scroll-mt-24"
    >
      <div className="mb-6 flex items-start gap-3">
        <BookOpen className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
        <div>
          <h3
            id="references-heading"
            className="text-xl text-foreground md:text-2xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            参考文献
          </h3>
          <p
            className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            编号与正文角标一一对应。点击 DOI 可核对出版记录，点击“站内 PDF”可查看本站保存的论文全文或作者稿。
          </p>
        </div>
      </div>

      <ol className="space-y-3" aria-label="参考文献列表">
        {REFERENCES.map(reference => (
          <li
            key={reference.id}
            id={`ref-${reference.id}`}
            tabIndex={-1}
            className="reference-item scroll-mt-24 border border-border bg-card p-4 transition-colors duration-300 focus:outline-none md:p-5"
          >
            <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 md:grid-cols-[2.75rem_minmax(0,1fr)] md:gap-4">
              <span
                className="pt-0.5 text-sm font-semibold text-primary md:text-base"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                aria-hidden
              >
                [{reference.id}]
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className="text-sm leading-7 text-foreground/80"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                  >
                    <span className="font-medium text-foreground">{reference.authors}.</span>{" "}
                    <span>{reference.title}.</span>{" "}
                    <span>{reference.publication}.</span>
                  </p>

                  {reference.usage !== "cited" && (
                    <span className="shrink-0 border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                      {usageLabels[reference.usage]}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  {reference.doi && (
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`在新标签打开参考文献 ${reference.id} 的 DOI 出版页面`}
                      className="inline-flex min-w-0 items-center gap-1.5 text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary/75"
                    >
                      <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                      <span className="break-all">DOI: {reference.doi}</span>
                    </a>
                  )}
                  <a
                    href={reference.pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`在新标签打开参考文献 ${reference.id} 的站内 PDF`}
                    className="inline-flex items-center gap-1.5 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    <FileText className="size-3.5 shrink-0" aria-hidden />
                    站内 PDF
                  </a>
                </div>

                {reference.note && (
                  <p
                    className="mt-2 text-xs leading-6 text-muted-foreground"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                  >
                    {reference.note}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p
        className="mt-5 text-xs leading-6 text-muted-foreground"
        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
      >
        说明：科普内容不能替代医学诊断或个体化教育建议；研究结论适用于其具体样本与实验条件，不应外推为所有阅读障碍者的共同体验。
      </p>
    </section>
  );
}
