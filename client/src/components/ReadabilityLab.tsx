import { motion } from "framer-motion";
import {
  AlignLeft,
  Baseline,
  CaseSensitive,
  Contrast,
  Pilcrow,
  SlidersHorizontal,
  Type,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type FontChoice = "serif" | "sans";
type ScaleChoice = "small" | "default" | "large";
type SpacingChoice = "tight" | "default" | "loose";
type ParagraphChoice = "long" | "split";
type ContrastChoice = "low" | "standard" | "high";

interface Option<T extends string> {
  label: string;
  value: T;
}

interface ControlGroupProps<T extends string> {
  icon: ReactNode;
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

const comparisonCards = [
  {
    title: "衬线体：更像书页，适合情绪性标题与文学表达",
    sample: "阅读障碍的孩子并非不聪明，他们只是需要一个更友好的阅读环境。",
    note: "衬线体有笔画收尾和传统书页感，适合用于标题、金句和人文表达。但在屏幕小字号或低对比度场景中，部分读者可能觉得更费力。",
    className: "font-serif",
    style: { fontFamily: "'Noto Serif SC', serif" },
  },
  {
    title: "非衬线体：笔画更均匀，适合说明文字与操作信息",
    sample: "阅读障碍的孩子并非不聪明，他们只是需要一个更友好的阅读环境。",
    note: "非衬线体笔画较均匀，屏幕显示更清晰，适合行动清单、按钮、说明文字和长段科普信息。",
    className: "font-sans",
    style: { fontFamily: "'Noto Sans SC', sans-serif" },
  },
  {
    title: "友好排版：不只换字体，更要调整空间",
    sample:
      "阅读障碍的孩子并非不聪明。\n\n他们只是需要一个更友好的阅读环境：\n更清晰的字体，\n更合适的字号，\n更宽松的行距，\n以及更少的羞辱和责备。",
    note: "真正影响阅读体验的，往往不是单一字体，而是字号、字距、行距、段落长度、颜色对比和信息密度的组合。",
    className: "font-sans",
    style: { fontFamily: "'Noto Sans SC', sans-serif" },
  },
];

const sampleParagraphs = [
  "阅读障碍是一种以儿童阅读能力显著落后为主要表现的神经发育性障碍，不是懒惰，也通常不是单纯视力问题。",
  "支持需要从观察线索开始，再结合学校沟通、专业评估和个性化方案，让孩子在更清晰的路径中学习。",
  "家庭、学校和专业人员共同调整任务、评价和工具时，阅读困难才更可能被看见，也更可能被支持。",
];

function ControlGroup<T extends string>({
  icon,
  label,
  options,
  value,
  onChange,
}: ControlGroupProps<T>) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="text-primary" aria-hidden>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div className="inline-flex w-full rounded-md border border-border bg-background/60 p-1">
        {options.map(option => {
          const selected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`min-h-9 flex-1 rounded px-2.5 text-xs transition-colors duration-200 ${
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Compact horizontal control for mobile portrait — one row per option,
 * with a min label, a thin connecting line, 2-3 dots, and a max label.
 * Dots always sit at 0% / 50% / 100% so rows line up vertically.
 * Stacks 6 rows ≈ 216 px tall.
 */
function CompactDotsRow<T extends string>({
  icon,
  label,
  options,
  value,
  onChange,
}: ControlGroupProps<T>) {
  // 2-stop controls render only the ends; 3-stop adds the middle.
  const positions: { left: string; option: Option<T> }[] =
    options.length === 2
      ? [
          { left: "0%", option: options[0] },
          { left: "100%", option: options[1] },
        ]
      : [
          { left: "0%", option: options[0] },
          { left: "50%", option: options[1] },
          { left: "100%", option: options[2] },
        ];

  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <div className="flex w-14 shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-primary" aria-hidden>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <span
        className="w-10 shrink-0 text-right text-[10px] text-muted-foreground"
        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
      >
        {options[0].label}
      </span>
      <div className="relative h-4 flex-1">
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-muted-foreground/40"
        />
        {positions.map(({ left, option }) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={option.value === value}
            aria-label={`${label}：${option.label}`}
            style={{ left }}
            className={cn(
              "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200",
              option.value === value
                ? "scale-110 border-primary bg-primary shadow-md ring-2 ring-primary/30"
                : "border-muted-foreground/50 bg-background hover:border-muted-foreground/80"
            )}
          />
        ))}
      </div>
      <span
        className="w-12 shrink-0 text-left text-[10px] text-muted-foreground"
        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
      >
        {options[options.length - 1].label}
      </span>
    </div>
  );
}

export default function ReadabilityLab() {
  const [fontChoice, setFontChoice] = useState<FontChoice>("sans");
  const [fontSize, setFontSize] = useState<ScaleChoice>("default");
  const [letterSpacing, setLetterSpacing] = useState<SpacingChoice>("default");
  const [lineHeight, setLineHeight] = useState<SpacingChoice>("default");
  const [paragraph, setParagraph] = useState<ParagraphChoice>("split");
  const [contrast, setContrast] = useState<ContrastChoice>("standard");

  const previewStyle = useMemo<CSSProperties>(() => {
    const fontSizeMap: Record<ScaleChoice, string> = {
      small: "0.9375rem",
      default: "1.0625rem",
      large: "1.25rem",
    };
    const letterSpacingMap: Record<SpacingChoice, string> = {
      tight: "0",
      default: "0.03em",
      loose: "0.08em",
    };
    const lineHeightMap: Record<SpacingChoice, number> = {
      tight: 1.45,
      default: 1.75,
      loose: 2.05,
    };

    return {
      fontFamily:
        fontChoice === "serif"
          ? "'Noto Serif SC', serif"
          : "'Noto Sans SC', sans-serif",
      fontSize: fontSizeMap[fontSize],
      letterSpacing: letterSpacingMap[letterSpacing],
      lineHeight: lineHeightMap[lineHeight],
    };
  }, [fontChoice, fontSize, letterSpacing, lineHeight]);

  const contrastClass = {
    low: "bg-muted/30 text-muted-foreground",
    standard: "bg-background text-foreground/85",
    high: "bg-foreground text-background",
  }[contrast];

  const previewText =
    paragraph === "long" ? sampleParagraphs.join("") : sampleParagraphs;

  return (
    <section className="relative bg-background py-20 md:py-28 pb-24 md:pb-28 transition-colors duration-500">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <p
            className="mb-3 text-sm uppercase tracking-[0.2em] text-primary"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
            }}
          >
            READABILITY LAB
          </p>
          <h2
            className="text-3xl text-foreground md:text-5xl"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
          >
            文字可达性实验室
          </h2>
          <p
            className="mt-6 max-w-3xl border-l-2 border-primary/70 bg-card/70 px-5 py-4 text-sm leading-7 text-foreground/80 md:text-base"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 300,
            }}
          >
            字体和排版不能“治疗”阅读障碍，但清晰、稳定、可调节的文本设计，可能帮助一些读者减少阅读负担。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-5 flex items-center gap-3">
            <Type className="h-5 w-5 text-primary" />
            <h3
              className="text-xl text-foreground md:text-2xl"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              同一段文字，不同字体会带来不同阅读感受
            </h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {comparisonCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex min-h-full flex-col border border-border bg-card p-5 transition-colors duration-500"
              >
                <h4
                  className="mb-4 text-sm font-medium leading-6 text-foreground"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  {card.title}
                </h4>
                <div className="mb-4 flex min-h-32 items-center border border-border bg-background p-5">
                  <p
                    className={`whitespace-pre-line text-foreground/90 ${card.className}`}
                    style={card.style}
                  >
                    {card.sample}
                  </p>
                </div>
                <p
                  className="text-sm leading-7 text-muted-foreground"
                  style={{
                    fontFamily: "'Noto Sans SC', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {card.note}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="mb-6 flex flex-col gap-1.5 lg:mb-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h3
              className="text-xl text-foreground md:text-2xl"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              调一调文本参数
            </h3>
          </div>
          <p
            className="pl-6 text-sm leading-6 text-muted-foreground"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 300,
            }}
          >
            左右拨一拨，看看哪种排版最适合
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]"
        >
          <div className="border border-border bg-card p-4 md:p-6">
            <div className="hidden gap-4 lg:grid lg:grid-cols-1">
              <ControlGroup
                icon={<Type className="h-3.5 w-3.5" />}
                label="字体"
                options={[
                  { label: "衬线体", value: "serif" },
                  { label: "非衬线体", value: "sans" },
                ]}
                value={fontChoice}
                onChange={setFontChoice}
              />
              <ControlGroup
                icon={<CaseSensitive className="h-3.5 w-3.5" />}
                label="字号"
                options={[
                  { label: "小", value: "small" },
                  { label: "默认", value: "default" },
                  { label: "大", value: "large" },
                ]}
                value={fontSize}
                onChange={setFontSize}
              />
              <ControlGroup
                icon={<Baseline className="h-3.5 w-3.5" />}
                label="字距"
                options={[
                  { label: "紧凑", value: "tight" },
                  { label: "默认", value: "default" },
                  { label: "宽松", value: "loose" },
                ]}
                value={letterSpacing}
                onChange={setLetterSpacing}
              />
              <ControlGroup
                icon={<AlignLeft className="h-3.5 w-3.5" />}
                label="行距"
                options={[
                  { label: "紧凑", value: "tight" },
                  { label: "默认", value: "default" },
                  { label: "宽松", value: "loose" },
                ]}
                value={lineHeight}
                onChange={setLineHeight}
              />
              <ControlGroup
                icon={<Pilcrow className="h-3.5 w-3.5" />}
                label="段落"
                options={[
                  { label: "长段", value: "long" },
                  { label: "分段", value: "split" },
                ]}
                value={paragraph}
                onChange={setParagraph}
              />
              <ControlGroup
                icon={<Contrast className="h-3.5 w-3.5" />}
                label="对比度"
                options={[
                  { label: "低对比", value: "low" },
                  { label: "标准", value: "standard" },
                  { label: "高对比", value: "high" },
                ]}
                value={contrast}
                onChange={setContrast}
              />
            </div>

            <div className="lg:hidden">
              <CompactDotsRow
                icon={<Type className="h-3.5 w-3.5" />}
                label="字体"
                options={[
                  { label: "衬线", value: "serif" },
                  { label: "非衬线", value: "sans" },
                ]}
                value={fontChoice}
                onChange={setFontChoice}
              />
              <CompactDotsRow
                icon={<CaseSensitive className="h-3.5 w-3.5" />}
                label="字号"
                options={[
                  { label: "小", value: "small" },
                  { label: "默认", value: "default" },
                  { label: "大", value: "large" },
                ]}
                value={fontSize}
                onChange={setFontSize}
              />
              <CompactDotsRow
                icon={<Baseline className="h-3.5 w-3.5" />}
                label="字距"
                options={[
                  { label: "紧凑", value: "tight" },
                  { label: "默认", value: "default" },
                  { label: "宽松", value: "loose" },
                ]}
                value={letterSpacing}
                onChange={setLetterSpacing}
              />
              <CompactDotsRow
                icon={<AlignLeft className="h-3.5 w-3.5" />}
                label="行距"
                options={[
                  { label: "紧凑", value: "tight" },
                  { label: "默认", value: "default" },
                  { label: "宽松", value: "loose" },
                ]}
                value={lineHeight}
                onChange={setLineHeight}
              />
              <CompactDotsRow
                icon={<Pilcrow className="h-3.5 w-3.5" />}
                label="段落"
                options={[
                  { label: "长段", value: "long" },
                  { label: "分段", value: "split" },
                ]}
                value={paragraph}
                onChange={setParagraph}
              />
              <CompactDotsRow
                icon={<Contrast className="h-3.5 w-3.5" />}
                label="对比度"
                options={[
                  { label: "低", value: "low" },
                  { label: "标准", value: "standard" },
                  { label: "高", value: "high" },
                ]}
                value={contrast}
                onChange={setContrast}
              />
            </div>
          </div>

          <div className="sticky bottom-4 border border-border bg-card p-3 md:p-6 lg:static">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3
                className="text-base text-foreground"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                预览文本
              </h3>
              <span
                className="hidden text-xs text-muted-foreground sm:inline"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                同一内容，不同呈现
              </span>
            </div>
            <div
              className={`min-h-32 md:min-h-80 border border-border p-3 transition-colors duration-300 md:p-7 ${contrastClass}`}
            >
              {Array.isArray(previewText) ? (
                <div className="space-y-5">
                  {previewText.map(text => (
                    <p
                      key={text}
                      className="transition-all duration-300"
                      style={previewStyle}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="transition-all duration-300" style={previewStyle}>
                  {previewText}
                </p>
              )}
            </div>
            <p
              className="mt-5 text-sm leading-7 text-muted-foreground"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
              没有一种字体适合所有人。真正友好的设计，是允许文本被调整。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
