import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Equal,
  Scissors,
  AudioWaveform,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import CitationRef from "./CitationRef";

/* ============================================================
   模块2 语音意识 · PhonologicalAwareness
   3 张并列交互卡（相同的声音 / 去掉一部分 / 声调不同）
   + 共享揭示横幅 + 底部 IDA Collapsible
   - 动画统一 whileInView + viewport{once,margin} + useReducedMotion
   - 颜色只用 token / var()，明暗自适应
   - 字体：标题 Noto Serif SC / 正文 Noto Sans SC fw300 / 数字英文 Space Grotesk
     拼音含声调符（ā ǎ 等），用 Noto Sans SC 保证字形渲染
   - 卡片同高：flex flex-col + 居中 demo（flex-1）+ 底部 hint，三卡视觉一体
   ============================================================ */

const SERIF = "'Noto Serif SC', serif";
const SANS = "'Noto Sans SC', sans-serif";
const GROTESK = "'Space Grotesk', sans-serif";

/** 卡1：把拼音逐字拆 span，首辅音 m 始终 text-primary，点击后加 bg-primary/15 */
function renderPinyin(word: string, highlight: boolean) {
  return word.split("").map((ch, i) =>
    i === 0 ? (
      <span
        key={i}
        className={cn(
          "text-primary rounded px-0.5 transition-colors",
          highlight && "bg-primary/15"
        )}
      >
        {ch}
      </span>
    ) : (
      <span key={i} className="text-foreground">
        {ch}
      </span>
    )
  );
}

/** 卡3：四个声调的字符、拼音、标签、SVG 轮廓 path 与起止点坐标
 *  viewBox 0 0 100 32：高音 y 小、低音 y 大；基线 y=28 为低音参考。
 *  只渲染当前激活声调的单条轮廓（key 隔离重挂 → 切换时重描），不再四线叠加。 */
const TONES = [
  {
    char: "妈",
    pinyin: "mā",
    label: "一声",
    d: "M 10 10 L 90 10",
    startX: 10,
    startY: 10,
    endX: 90,
    endY: 10,
  },
  {
    char: "麻",
    pinyin: "má",
    label: "二声",
    d: "M 10 26 C 40 26, 62 14, 90 8",
    startX: 10,
    startY: 26,
    endX: 90,
    endY: 8,
  },
  {
    char: "马",
    pinyin: "mǎ",
    label: "三声",
    d: "M 10 10 C 34 28, 56 28, 90 8",
    startX: 10,
    startY: 10,
    endX: 90,
    endY: 8,
  },
  {
    char: "蚂",
    pinyin: "mà",
    label: "四声",
    d: "M 10 8 C 40 10, 62 22, 90 26",
    startX: 10,
    startY: 8,
    endX: 90,
    endY: 26,
  },
] as const;

const IDA_URL = "https://dyslexiaida.org/definition-of-dyslexia/";

/** 卡片共用样式：flex 列布局，grid 默认 stretch 使三卡同高，demo 居中、hint 沉底 */
const CARD_CLASS =
  "group min-w-0 w-full h-full flex flex-col text-left bg-card border border-border p-5 md:p-6 hover:border-primary/50 transition-colors btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function PhonologicalAwareness() {
  const reduced = useReducedMotion();
  const [highlightM, setHighlightM] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [activeTone, setActiveTone] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* ============ 标题与卡片之间的两句导语 ============
          沿用页面现有「次级正文」样式：text-muted-foreground + Noto Sans SC fw300，
          与上方 UnderstandSection 中 DyslexiaSimulator / CrowdingSimulation 前导语一致。
          不引入新容器 / 边框 / 动画，由外层 space-y-6 负责与卡片的间距。 */}
      <p
        className="text-muted-foreground text-base max-w-2xl leading-relaxed"
        style={{ fontFamily: SANS, fontWeight: 300 }}
      >
        刚才的模拟呈现了"看字费力"的一种体验，但阅读障碍并不只是视觉问题。
        <br />
        许多阅读障碍儿童在觉察和处理语言中的声音时，也会更加费力。
      </p>

      {/* ============ 3 张交互卡 ============ */}
      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        {/* ---- 卡1 相同的声音 ---- */}
        <motion.button
          type="button"
          aria-pressed={highlightM}
          onClick={() => {
            setHighlightM(v => !v);
            setRevealed(true);
          }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0 }}
          className={CARD_CLASS}
        >
          <div className="flex items-center gap-2 mb-4">
            <Equal className="w-4 h-4 text-primary" aria-hidden />
            <h4
              className="text-foreground text-base"
              style={{ fontFamily: SERIF }}
            >
              相同的声音
            </h4>
          </div>
          {/* 两行 汉字+拼音：grid 两列，汉字列与拼音列各自对齐 → 猫/美 上下对齐 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-[auto_auto] gap-x-3 gap-y-2 items-baseline">
              <span
                className="text-2xl text-foreground"
                style={{ fontFamily: SERIF }}
              >
                猫
              </span>
              <span className="text-xl" style={{ fontFamily: SANS }}>
                {renderPinyin("māo", highlightM)}
              </span>
              <span
                className="text-2xl text-foreground"
                style={{ fontFamily: SERIF }}
              >
                美
              </span>
              <span className="text-xl" style={{ fontFamily: SANS }}>
                {renderPinyin("měi", highlightM)}
              </span>
            </div>
          </div>
          <p
            className="mt-4 text-xs text-muted-foreground"
            style={{ fontFamily: SANS, fontWeight: 300 }}
          >
            点击高亮共同的首音 m
          </p>
        </motion.button>

        {/* ---- 卡2 去掉一部分 ---- */}
        <motion.button
          type="button"
          aria-pressed={removed}
          onClick={() => {
            setRemoved(v => !v);
            setRevealed(true);
          }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={CARD_CLASS}
        >
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="w-4 h-4 text-primary" aria-hidden />
            <h4
              className="text-foreground text-base"
              style={{ fontFamily: SERIF }}
            >
              去掉一部分
            </h4>
          </div>
          {/* 喵 miāo − i = ？|猫 māo
              i 不消失：点击后颜色由 primary(琥珀) 经 CSS transition 过渡到 foreground(白/非突出)，
              表示「这部分被拿掉」；结果 猫 māo 交叉淡入。 */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="flex items-center justify-center gap-2 text-xl"
              style={{ fontFamily: SERIF }}
            >
              <span className="text-foreground">喵</span>
              <span className="text-foreground" style={{ fontFamily: SANS }}>
                miāo
              </span>
              <span
                className="text-muted-foreground"
                style={{ fontFamily: GROTESK }}
              >
                −
              </span>
              <span
                className={cn(
                  reduced
                    ? "transition-none"
                    : "transition-colors duration-300",
                  removed ? "text-foreground" : "text-primary"
                )}
                style={{ fontFamily: SANS }}
              >
                i
              </span>
              <span
                className="text-muted-foreground"
                style={{ fontFamily: GROTESK }}
              >
                =
              </span>
              <span className="relative inline-block min-w-[4.5em] text-center">
                <motion.span
                  className="text-muted-foreground"
                  animate={{ opacity: removed ? 0 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                >
                  ？
                </motion.span>
                <motion.span
                  className="absolute inset-0 text-primary"
                  style={{ fontFamily: SANS }}
                  animate={{ opacity: removed ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                >
                  猫 māo
                </motion.span>
              </span>
            </div>
          </div>
          <p
            className="mt-4 text-xs text-muted-foreground"
            style={{ fontFamily: SANS, fontWeight: 300 }}
          >
            点击拿掉 i，看剩下什么
          </p>
        </motion.button>

        {/* ---- 卡3 声调不同 ---- */}
        <motion.button
          type="button"
          aria-label={`切换声调，当前${TONES[activeTone].label}${TONES[activeTone].char}`}
          onClick={() => {
            setActiveTone(t => (t + 1) % 4);
            setRevealed(true);
          }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={CARD_CLASS}
        >
          <div className="flex items-center gap-2 mb-4">
            <AudioWaveform className="w-4 h-4 text-primary" aria-hidden />
            <h4
              className="text-foreground text-base"
              style={{ fontFamily: SERIF }}
            >
              声调不同
            </h4>
          </div>
          <div className="flex-1 min-w-0 w-full flex flex-col items-center justify-center gap-3">
            {/* 字行：4 字 tab，激活项 text-primary + 下划线 */}
            <div className="flex justify-center gap-5 md:gap-7">
              {TONES.map((tone, i) => (
                <span
                  key={tone.char}
                  className={cn(
                    "text-2xl pb-0.5 border-b-2 transition-colors",
                    i === activeTone
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent"
                  )}
                  style={{ fontFamily: SERIF }}
                >
                  {tone.char}
                </span>
              ))}
            </div>
            {/* 单条声调轮廓：只画当前激活声调，切换时 key 重挂 → 重新描线
                宽度跟随卡片收缩，最大 250px；由 viewBox 维持 100×32 的比例。 */}
            <svg
              viewBox="0 0 100 32"
              className="mx-auto block h-auto w-full max-w-[15.625rem] overflow-hidden"
              role="img"
              aria-label={`${TONES[activeTone].label}声调曲线`}
            >
              <title>四声声调曲线</title>
              <desc>
                点击切换：妈一声平、麻二声升、马三声降升、蚂（蚂蚱的蚂）四声降
              </desc>
              {/* 低音参考基线 */}
              <line
                x1="6"
                y1="28"
                x2="94"
                y2="28"
                stroke="var(--muted-foreground)"
                strokeWidth="0.4"
                strokeOpacity="0.14"
              />
              {/* 当前声调轮廓 + 起止点：key 随 activeTone 变化整体重挂 */}
              <g key={activeTone}>
                <motion.path
                  d={TONES[activeTone].d}
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx={TONES[activeTone].startX}
                  cy={TONES[activeTone].startY}
                  r={2}
                  className="fill-primary"
                  initial={reduced ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: reduced ? 0 : 0.3,
                    delay: reduced ? 0 : 0.35,
                  }}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <motion.circle
                  cx={TONES[activeTone].endX}
                  cy={TONES[activeTone].endY}
                  r={2}
                  className="fill-primary"
                  initial={reduced ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: reduced ? 0 : 0.3,
                    delay: reduced ? 0 : 0.6,
                  }}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
              </g>
            </svg>
          </div>
          <p
            className="mt-4 text-xs text-muted-foreground"
            style={{ fontFamily: SANS, fontWeight: 300 }}
          >
            点击切换 · 当前{" "}
            <span className="text-primary">{TONES[activeTone].pinyin}</span>{" "}
            {TONES[activeTone].label}
          </p>
        </motion.button>
      </div>

      {/* ============ 共享揭示横幅（任一卡首次点击后展开） ============ */}
      <motion.div
        className="overflow-hidden"
        animate={{ opacity: revealed ? 1 : 0, height: revealed ? "auto" : 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
        aria-hidden={!revealed}
      >
        <div className="bg-primary/8 border border-primary/30 px-5 py-4 text-center">
          <p
            className="text-primary text-lg md:text-xl"
            style={{ fontFamily: SERIF, fontWeight: 700 }}
          >
            觉察、辨别、操作口语声音的能力
            <span
              className="text-primary/70 mx-2"
              style={{ fontFamily: GROTESK }}
            >
              =
            </span>
            语音意识
          </p>
        </div>
      </motion.div>

      {/* ============ 底部 Collapsible：IDA 定义 + 参考文献 ============ */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center justify-between bg-card border border-border px-5 py-3 hover:border-primary/50 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                className="text-foreground text-sm"
                style={{ fontFamily: SERIF }}
              >
                为什么这与阅读障碍有关？
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  collapsibleOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-card border border-border border-t-0 p-5 space-y-3">
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: SANS, fontWeight: 300 }}
              >
                虽然并非所有阅读障碍者都有相同表现，但语音和词语结构加工方面的困难很常见；早期口语能力较弱，也常常是后来出现读写困难的信号。
                <CitationRef id={19} />
              </p>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: SANS, fontWeight: 300 }}
              >
                汉语研究也发现，语音意识和快速命名都与阅读表现有关。
                <CitationRef id={5} />
              </p>
              <a
                href={IDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="查看 IDA 官方定义原文（英文页面，新窗口打开）"
                className="inline-flex items-center gap-2 text-xs px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors btn-press"
                style={{ fontFamily: SANS }}
              >
                查看 IDA 官方定义原文
                <ExternalLink className="w-3.5 h-3.5" aria-hidden />
              </a>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>
    </div>
  );
}
