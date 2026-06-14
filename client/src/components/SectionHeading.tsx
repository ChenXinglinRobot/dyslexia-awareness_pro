import { useSimulation } from "@/contexts/SimulationContext";
import GlitchText from "./GlitchText";
import FuzzyText from "./FuzzyText";
import Shuffle from "./Shuffle";
import { getHeading, type SectionHeadingId } from "@/data/sectionHeadings";

interface SectionHeadingProps {
  sectionId: SectionHeadingId;
}

/**
 * 4 个 section 根 H2 + UnderstandSection 内 3 个 H3 子标题的统一渲染入口。
 *
 * 行为由 SECTION_HEADINGS 配置表中的 level / enEffect 决定：
 * - main + enEffect="shuffle" → 英文 <Shuffle> + 中文 <GlitchText as="h2">
 * - main + enEffect="none"    → 英文 <p>          + 中文 <GlitchText as="h2">
 * - sub                       → <h3 aria-label> 包裹 <FuzzyText>（联动 SimulationContext）
 *
 * 改"哪个级别用哪个效果"策略 → 改本组件；改某标题文字 → 改配置表。
 */
export default function SectionHeading({ sectionId }: SectionHeadingProps) {
  const entry = getHeading(sectionId);
  const { cn, en, level, enEffect, enClassName, enStyle } = entry;
  const sim = useSimulation();

  // ===== main 级别：英文小标签 + 中文 H2 (Glitch) =====
  if (level === "main") {
    // 4 个 section 的英文小标签当前使用相同的样式，作为默认；可被 enClassName / enStyle 覆盖
    const defaultEnClassName =
      "text-primary text-sm tracking-[0.2em] uppercase mb-3";
    const defaultEnStyle: React.CSSProperties = {
      // 必须用 inline style 覆盖 .shuffle-parent 的 `font-size: 4rem` 和
      // `font-family: 'Press Start 2P'` 默认值(CSS class 优先级高于 Tailwind utility)
      fontSize: "0.875rem",
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 500,
    };

    return (
      <>
        {en &&
          (enEffect === "shuffle" ? (
            <Shuffle
              text={en}
              tag="p"
              textAlign="left"
              shuffleDirection="right"
              duration={0.5}
              stagger={0.04}
              triggerOnce
              respectReducedMotion
              className={enClassName ?? defaultEnClassName}
              style={enStyle ?? defaultEnStyle}
            />
          ) : (
            <p className={enClassName ?? defaultEnClassName} style={enStyle ?? defaultEnStyle}>
              {en}
            </p>
          ))}

        <GlitchText
          as="h2"
          respectSimulation
          dataText={cn}
          className="text-3xl md:text-5xl text-foreground"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {cn}
        </GlitchText>
      </>
    );
  }

  // ===== sub 级别：Fuzzy + <h3 aria-label> 包裹（保证语义化 + 可访问性） =====
  // FuzzyText 内部渲染 <canvas>，不输出语义标签。用 <h3 aria-label> 让屏幕阅读器朗读标题，
  // canvas 是装饰性视觉。aria-label 与 cn 完全一致，等价于 h3 的可访问名称。
  //
  // 布局稳定性（两层防线）:
  // 1. 容器尺寸:relative inline-block + visibility:hidden spacer 保容器宽度 = 文字本来的宽度,
  //    canvas 绝对定位脱流,不撑大容器。
  // 2. 可见文字位置:canvas 内部 ctx.translate(horizontalMargin, verticalMargin) 把文字画在
  //    canvas (50, 40) 处(FuzzyText.tsx:152-156)。如果不补偿,disabled → enabled 时,可见文字
  //    从容器 (0,0) 跳到 (50,40) = "往右下方跳"。
  //    修复:传 textAnchorOffset 把 canvas 整体拉到 (-50, -40),让 visible text 落回容器 (0,0),
  //    与 disabled 分支对齐。x/y 与 FuzzyText 内部 horizontalMargin/verticalMargin 一一对应。
  return (
    <h3
      aria-label={cn}
      className="text-xl md:text-2xl text-foreground"
      style={{ fontFamily: "'Noto Serif SC', serif" }}
    >
      <span className="relative inline-block">
        {/* 不可见 spacer：撑出文字本来宽度，保持布局稳定 */}
        <span aria-hidden style={{ visibility: "hidden" }}>
          {cn}
        </span>
        <FuzzyText
          className="absolute left-0 top-0 pointer-events-none"
          fontSize="clamp(1.25rem, 3vw, 1.5rem)"
          fontWeight={600}
          fontFamily="'Noto Serif SC', serif"
          color="currentColor"
          direction="both"
          fps={30}
          // 把 sim.intensity (0..1) 映射到 FuzzyText 默认区间，0 时完全静止
          baseIntensity={sim.intensity * 0.18}
          hoverIntensity={Math.min(1, sim.intensity * 0.5)}
          // 抵消 canvas 内部 margin (fuzzRange=30, direction='both'):
          // x = -(fuzzRange + 20) = -(30 + 20) = -50
          // y = -(fuzzRange + 10) = -(30 + 10) = -40
          // 让 visible text 在 disabled/enabled 两种状态下都落在容器 (0,0)
          textAnchorOffset={{ x: -50, y: -40 }}
          disabled={!sim.enabled}
        >
          {cn}
        </FuzzyText>
      </span>
    </h3>
  );
}
