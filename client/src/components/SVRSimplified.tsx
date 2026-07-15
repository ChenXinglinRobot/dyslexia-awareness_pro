import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import CitationRef from "./CitationRef";

const SERIF = "'Noto Serif SC', serif";
const SANS = "'Noto Sans SC', sans-serif";
const GROTESK = "'Space Grotesk', sans-serif";

/* ============================================================
   模块3 阅读的两条腿（SVR 概念简化）
   - 主公式是唯一的公式展示与首要交互入口。
   - 两项说明始终可见；未选项整块可切换，选中项保持静态。
   - 竖屏下公式分为两行，说明面板稳定堆叠，不随选择换位。
   - 静态引导始终指向后续的「字词识别」内容。
   - 默认选中「字词识别」。
   - 不引入新动画 / 新依赖；保留 reduced motion + 响应式 + 深浅色兼容。
   ============================================================ */

type Concept = "decode" | "language";

/** 两个可点击概念的简短对照说明（仅复用语种术语，不做全局重命名） */
const EXPLANATIONS: Record<
  Concept,
  { title: string; explanation: string; sentence: ReactNode; note: ReactNode }
> = {
  decode: {
    title: "字词识别",
    explanation: "把看到的字词准确、快速地读出来。",
    sentence: (
      <em>
        {"“一个不小心，他的手被"}
        <span className="text-primary font-medium">剌<small className="text-xs ml-0.5 font-normal">(lá)</small></span>
        {"了一个口子”"}
      </em>
    ),
    note: (
      <>——口语上知道它的意思，看到字却认不出来，自然也无从理解。</>
    ),
  },
  language: {
    title: "言语理解",
    explanation: "读出一句话后，理解它究竟在说什么。",
    sentence: <em>“潜变量的测量不变性，是比较不同群体结构均值的前提。”</em>,
    note: <>——每个字都认识，也能完整读出，却未必明白整句话。</>,
  },
};

export default function SVRSimplified() {
  const reduced = useReducedMotion();
  const isReduced = !!reduced;
  /** 默认选中「字词识别」，与历史橙色强调态保持一致 */
  const [selected, setSelected] = useState<Concept>("decode");

  return (
    <motion.div
      initial={isReduced ? false : { opacity: 0, y: 20 }}
      whileInView={isReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: isReduced ? 0 : 0.6, ease: "easeOut" as const }}
      className="relative bg-card border border-border p-5 md:p-8"
    >
      {/* 主公式 + 引用 [6,7]：唯一的公式展示与术语切换入口。 */}
      <p
        className="text-center text-xl leading-[1.5] text-foreground sm:text-2xl md:text-3xl"
        style={{ fontFamily: SERIF, fontWeight: 700 }}
        role="group"
        aria-label="公式：阅读理解等于字词识别乘以言语理解。点击字词识别或言语理解查看说明"
      >
        <span className="block sm:inline">阅读理解 = </span>
        <span className="inline-block whitespace-nowrap">
          <FormulaTerm
            label="字词识别"
            active={selected === "decode"}
            onClick={() => setSelected("decode")}
            reduced={isReduced}
          />
          <span
            aria-hidden
            style={{ fontFamily: GROTESK }}
            className="mx-1 text-primary"
          >
            ×
          </span>
          <span className="inline-flex items-baseline whitespace-nowrap">
            <FormulaTerm
              label="言语理解"
              active={selected === "language"}
              onClick={() => setSelected("language")}
              reduced={isReduced}
            />
            <CitationRef ids={[6, 7]} />
          </span>
        </span>
      </p>

      {/* 说明区：顺序固定，竖屏堆叠、桌面双列；未选项整块均可切换。 */}
      <div
        className="mx-auto mt-6 grid max-w-4xl divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0"
        role="group"
        aria-label="阅读理解的两个关键能力说明"
      >
        <ExplanationPanel
          title={EXPLANATIONS.decode.title}
          explanation={EXPLANATIONS.decode.explanation}
          sentence={EXPLANATIONS.decode.sentence}
          note={EXPLANATIONS.decode.note}
          active={selected === "decode"}
          onSelect={() => setSelected("decode")}
        />
        <ExplanationPanel
          title={EXPLANATIONS.language.title}
          explanation={EXPLANATIONS.language.explanation}
          sentence={EXPLANATIONS.language.sentence}
          note={EXPLANATIONS.language.note}
          active={selected === "language"}
          onSelect={() => setSelected("language")}
        />
      </div>

      {/* 后续引导语：始终指向「字词识别」这条腿，与当前选中无关；静态提示，不承担导航 */}
      <p
        className="mt-5 flex items-center justify-center gap-1 text-caption text-primary"
        style={{ fontFamily: SANS }}
      >
        <Search className="size-3.5" aria-hidden />
        接下来，我们将研究“字词识别”这条腿
      </p>
    </motion.div>
  );
}

/** 公式行内可点击术语：虚线底线提示可操作，实线底线与琥珀色共同表示当前项。 */
function FormulaTerm({
  label,
  active,
  onClick,
  reduced,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  reduced: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={cn(
        "inline align-baseline border-b cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "transition-all duration-200",
        active
          ? "border-primary text-primary"
          : "border-dotted border-primary/30 text-foreground/70 hover:border-primary/60 hover:text-primary"
      )}
      style={{ fontFamily: SERIF, fontWeight: 700 }}
    >
      {label}
    </motion.button>
  );
}

/**
 * 双列说明面板：未选项是完整的原生 button，标题、定义和例子任意处均可切换。
 * 选中项保留相同信息密度，但不绑定切换动作，避免将「当前状态」误读为另一项入口。
 */
function ExplanationPanel({
  title,
  explanation,
  sentence,
  note,
  active,
  onSelect,
}: {
  title: string;
  explanation: string;
  sentence: ReactNode;
  note: ReactNode;
  active: boolean;
  onSelect: () => void;
}) {
  const bodyTone = active ? "text-foreground/85" : "text-muted-foreground";

  return (
    <button
      type="button"
      onClick={active ? undefined : onSelect}
      aria-pressed={active}
      aria-label={active ? `${title}，当前选中` : `${title}，切换查看说明`}
      tabIndex={active ? -1 : 0}
      className={cn(
        "group w-full min-w-0 rounded-sm px-4 py-5 text-left transition-colors duration-200 motion-reduce:transition-none sm:px-6 md:px-8",
        "focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "cursor-default bg-primary/5"
          : "cursor-pointer hover:bg-primary/5 focus-visible:bg-primary/5"
      )}
    >
      <span
        className={cn(
          "block origin-center transition-transform duration-200 motion-reduce:transition-none",
          active
            ? "scale-100"
            : "md:scale-[0.98] md:group-hover:scale-100 md:group-focus-visible:scale-100"
        )}
      >
        <span
          className={cn(
            "block font-semibold text-xl leading-snug md:text-2xl",
            active ? "text-primary" : "text-foreground group-hover:text-primary"
          )}
          style={{ fontFamily: SERIF }}
        >
          {title}
        </span>
        <span
          className={cn("mt-2 block text-lg leading-[1.75]", bodyTone)}
          style={{ fontFamily: SANS, fontWeight: 300 }}
        >
          {explanation}
        </span>
        <span
          className={cn(
            "mt-3 block break-words text-base leading-[1.8]",
            bodyTone
          )}
          style={{ fontFamily: SANS, fontWeight: 300 }}
        >
          <span className="block">{sentence}</span>
          <span className="mt-1.5 block not-italic">{note}</span>
        </span>
      </span>
    </button>
  );
}
