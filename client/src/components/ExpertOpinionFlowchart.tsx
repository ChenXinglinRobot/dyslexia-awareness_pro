import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";

const FLOWCHART_SRC = "/expert-opinion/dyslexia-diagnosis-flow.jpg";

export default function ExpertOpinionFlowchart() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-card border border-border p-5 transition-colors duration-500 md:p-8"
      aria-labelledby="expert-opinion-flowchart-title"
    >
      <div className="mb-5 flex flex-col gap-3 md:mb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-primary">
            <FileText className="size-4" aria-hidden />
            <p
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Expert Opinion
            </p>
          </div>
          <h3
            id="expert-opinion-flowchart-title"
            className="text-xl text-foreground md:text-2xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            《专家意见》中的诊断流程
          </h3>
        </div>

        <a
          href={FLOWCHART_SRC}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          <span>打开原图</span>
          <ExternalLink className="size-3.5 shrink-0" aria-hidden />
        </a>
      </div>

      <a
        href={FLOWCHART_SRC}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="在新标签打开《专家意见》中的诊断流程原图"
        className="block border border-border bg-background/60 p-3 transition-colors duration-500 hover:border-primary/50 md:p-4"
      >
        <img
          src={FLOWCHART_SRC}
          alt="《汉语发展性阅读障碍诊断与干预的专家意见》中的诊断流程图"
          className="h-auto max-h-[78vh] w-full object-contain"
          loading="lazy"
        />
      </a>

      <p
        className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-5"
        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
      >
        网页不能诊断。筛查提示风险，不等于确诊；是否存在阅读障碍，需要由专业人员结合发展史、教育史、阅读能力和相关认知能力综合判断。
      </p>
    </motion.article>
  );
}
