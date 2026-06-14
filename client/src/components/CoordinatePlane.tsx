/* ============================================================
   CoordinatePlane — 阅读障碍四象限认知坐标系
   纯 SVG + Framer Motion,viewBox 自适应缩放
   主题自动适配 (CSS 变量 + useTheme),遵循 prefers-reduced-motion

   设计原则:
   - Ink and Amber Observatory:深墨 frame + amber lamp 单光源
   - 主角象限(阅读障碍)是 amber 三件套:渐变底 + 条件描边 + 菱形角标 + 中心呼吸圆
   - 颜色走 CSS 变量 + Tailwind token class,日/夜间通过 .dark 切换自动适配
   - 暗色模式:琥珀光晕滤镜 + 外层呼吸光环,仪器面板感
   - 日间模式:干净墨线 + 无光效,纸面图纸感
   - 字号用 SVG 原生 fontSize (CSS px) — 文字不随 viewBox 缩放,保持跨设备可读
   ============================================================ */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type QuadrantId = "tl" | "tr" | "bl" | "br";

interface Quadrant {
  id: QuadrantId;
  /** viewBox 单位下的象限中心 X 坐标 */
  cx: number;
  /** viewBox 单位下的象限中心 Y 坐标 */
  cy: number;
  /** 坐标条件标签,如 "识别- 理解+" */
  condition: string;
  /** 中文标题 */
  title: string;
  /** 是否为本站主角象限(amber 强调 + pulse) */
  isProtagonist?: boolean;
  /** 主角象限的副标签,如 "本站主角" */
  sub?: string;
  /** 额外注释,如 "[待核实术语]" */
  note?: string;
}

const QUADRANTS: ReadonlyArray<Quadrant> = [
  { id: "tl", cx: 100, cy: 100, condition: "识别- 理解+", title: "阅读障碍", isProtagonist: true, sub: "本站主角" },
  { id: "tr", cx: 300, cy: 100, condition: "识别+ 理解+", title: "正常发展" },
  { id: "bl", cx: 100, cy: 300, condition: "识别- 理解-", title: "全面发展落后" },
  { id: "br", cx: 300, cy: 300, condition: "识别+ 理解-", title: "特定理解困难", note: "[待核实术语]" },
];

// 入场顺序: TR → BR → BL → TL(主角压轴,最后登场,让 amber 戏剧性更集中)
const QUADRANT_ORDER: QuadrantId[] = ["tr", "br", "bl", "tl"];

// 三档字体 (与 DESIGN.md 一致:Noto Serif SC / Noto Sans SC / Space Grotesk)
// 内联 style 注入 — Tailwind font-serif/font-sans 不会穿透到 SVG <text>
const TITLE_FONT = "'Noto Serif SC', STSong, SimSun, serif";
const BODY_FONT = "'Noto Sans SC', PingFang SC, Microsoft YaHei, sans-serif";
const LABEL_FONT = "'Space Grotesk', sans-serif";

export default function CoordinatePlane() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // once: true — 视觉叙事只演一次,用户已看过不需要重播
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto aspect-square p-4 sm:p-8"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="认知能力四象限坐标系"
      >
        <title>阅读能力发展坐标系</title>
        <desc>
          X 轴表示字符识别能力,Y 轴表示言语理解能力。
          阅读障碍位于左上角,即识别弱但理解强,是本站重点讲述对象。
        </desc>

        {/* =================== Defs: 渐变 / 滤镜 / 图案 =================== */}
        <defs>
          {/* 主角象限径向渐变 — 灯光池效果,中心亮边缘暗 */}
          <radialGradient
            id="protagonist-glow"
            cx={100}
            cy={100}
            r={140}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              style={{ stopColor: "var(--primary)", stopOpacity: 0.15 }}
            />
            <stop
              offset="60%"
              style={{ stopColor: "var(--primary)", stopOpacity: 0.06 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--primary)", stopOpacity: 0.02 }}
            />
          </radialGradient>

          {/* 外围象限渐变 — 观测室壁面,极淡 */}
          <radialGradient
            id="peripheral-fill"
            cx={200}
            cy={200}
            r={280}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              style={{ stopColor: "var(--muted)", stopOpacity: 0.25 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--muted)", stopOpacity: 0.05 }}
            />
          </radialGradient>

          {/* 点阵网格 — 50px 间距,1px 圆点 */}
          <pattern
            id="dot-grid"
            x={0}
            y={0}
            width={50}
            height={50}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={25}
              cy={25}
              r={1}
              style={{ fill: "var(--muted-foreground)", opacity: 0.15 }}
            />
          </pattern>

          {/* 琥珀光晕滤镜 — 暗色模式脉冲专用 */}
          <filter
            id="amber-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={6}
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================== 点阵网格底层 =================== */}
        <motion.rect
          x={0}
          y={0}
          width={400}
          height={400}
          fill="url(#dot-grid)"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.1 }}
        />

        {/* =================== 外围象限淡底 =================== */}
        {/* TR 象限 (200,0) 200x200 */}
        <motion.rect
          x={200}
          y={0}
          width={200}
          height={200}
          fill="url(#peripheral-fill)"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* BL 象限 (0,200) 200x200 */}
        <motion.rect
          x={0}
          y={200}
          width={200}
          height={200}
          fill="url(#peripheral-fill)"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* BR 象限 (200,200) 200x200 */}
        <motion.rect
          x={200}
          y={200}
          width={200}
          height={200}
          fill="url(#peripheral-fill)"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* =================== 主角象限渐变背景 =================== */}
        <motion.rect
          x={0}
          y={0}
          width={200}
          height={200}
          fill="url(#protagonist-glow)"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
        {/* 主角象限描边 — 暗色 1.5px 发光框,日间 1px 墨线 */}
        <motion.rect
          x={0.5}
          y={0.5}
          width={199}
          height={199}
          className="stroke-primary/40"
          style={{
            strokeWidth: isDark ? 1.5 : 1,
            fill: "none",
          }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* =================== 坐标轴 =================== */}
        <g
          className="stroke-muted-foreground"
          style={{
            strokeWidth: isDark ? 2 : 1.75,
            strokeOpacity: isDark ? 0.6 : 0.5,
            fill: "none",
          }}
        >
          {/* X 轴:水平,从 (20,200) 到 (380,200) */}
          <motion.line
            x1={20}
            y1={200}
            x2={380}
            y2={200}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeInOut" }}
          />
          {/* Y 轴:垂直,从 (200,380) 到 (200,20) */}
          <motion.line
            x1={200}
            y1={380}
            x2={200}
            y2={20}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeInOut" }}
          />

          {/* 刻度线 — X 轴半轴中点 */}
          <motion.line
            x1={100}
            y1={196}
            x2={100}
            y2={204}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
          <motion.line
            x1={300}
            y1={196}
            x2={300}
            y2={204}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
          {/* 刻度线 — Y 轴半轴中点 */}
          <motion.line
            x1={196}
            y1={100}
            x2={204}
            y2={100}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
          <motion.line
            x1={196}
            y1={300}
            x2={204}
            y2={300}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.8 }}
          />

          {/* X 轴箭头(加大翼展) */}
          <motion.path
            d="M 368 193 L 380 200 L 368 207"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.2 }}
          />
          {/* Y 轴箭头(加大翼展) */}
          <motion.path
            d="M 193 32 L 200 20 L 207 32"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.2 }}
          />
        </g>

        {/* 中心原点 */}
        <motion.circle
          cx={200}
          cy={200}
          r={2.5}
          className="fill-muted-foreground"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={shouldReduceMotion ? false : { scale: 0 }}
          animate={shouldReduceMotion ? false : inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.0 }}
        />

        {/* =================== 坐标轴文字标签 =================== */}
        <motion.text
          x={380}
          y={218}
          textAnchor="end"
          className="fill-muted-foreground"
          style={{ fontFamily: BODY_FONT, fontSize: "12px", fontWeight: 300 }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          字符识别能力 →
        </motion.text>
        <motion.text
          x={218}
          y={24}
          textAnchor="start"
          className="fill-muted-foreground"
          style={{ fontFamily: BODY_FONT, fontSize: "12px", fontWeight: 300 }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          ↑ 言语理解能力
        </motion.text>

        {/* =================== 4 象限文字层 =================== */}
        {QUADRANT_ORDER.map((qid, i) => {
          const q = QUADRANTS.find((it) => it.id === qid)!;
          const isP = !!q.isProtagonist;
          const baseDelay = 1.3 + i * 0.12;
          // 主角象限文字上提,让 3 行整体视觉重心更居中(字号加大后需更多补偿)
          const titleY = q.cy - (isP ? 10 : 4);
          const subtitleY = q.cy + (isP ? 12 : 18);
          const extraY = q.cy + 36;
          return (
            <motion.g
              key={q.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? false : inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: baseDelay }}
            >
              {/* 主标题 — 主角象限 amber 加粗加大 */}
              <text
                x={q.cx}
                y={titleY}
                textAnchor="middle"
                className={isP ? "fill-primary" : "fill-foreground"}
                style={{
                  fontFamily: TITLE_FONT,
                  fontSize: isP ? "22px" : "18px",
                  fontWeight: isP ? 700 : 500,
                }}
              >
                {q.title}
              </text>
              {/* 副标题(condition) */}
              <text
                x={q.cx}
                y={subtitleY}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontFamily: BODY_FONT, fontSize: "12px", fontWeight: 300 }}
              >
                {q.condition}
              </text>
              {/* 主角象限专属:"本站主角" 角标(amber,Space Grotesk 带字距) + 下划线 */}
              {isP && q.sub && (
                <g>
                  <text
                    x={q.cx}
                    y={extraY}
                    textAnchor="middle"
                    className="fill-primary"
                    style={{
                      fontFamily: LABEL_FONT,
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                    }}
                  >
                    · {q.sub} ·
                  </text>
                  {/* amber 下划线 — 微装饰锚点 */}
                  <motion.line
                    x1={q.cx - 10}
                    y1={extraY + 4}
                    x2={q.cx + 10}
                    y2={extraY + 4}
                    className="stroke-primary"
                    style={{ strokeWidth: 0.75, strokeOpacity: 0.5 }}
                    initial={shouldReduceMotion ? false : { pathLength: 0 }}
                    animate={shouldReduceMotion ? false : inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.4, delay: baseDelay + 0.15 }}
                  />
                </g>
              )}
              {/* 右下象限的待核实术语注释(destructive 色) */}
              {q.note && (
                <text
                  x={q.cx}
                  y={extraY}
                  textAnchor="middle"
                  className="fill-destructive"
                  style={{
                    fontFamily: LABEL_FONT,
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {q.note}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* =================== 主角象限专属:左上角菱形角标 =================== */}
        <motion.path
          d="M 10 2 L 14 6 L 10 10 L 6 6 Z"
          className="fill-primary"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 2.0 }}
        />

        {/* =================== 主角象限专属:中心锚点 + 呼吸 pulse ===================
            四层职责分离避免 animate 槽位冲突:
            1. 外层 motion.g — 入场 opacity 淡入
            2. 暗色专属 motion.circle — 外层光晕 aura (慢呼吸)
            3. 内层 motion.circle — pulse 持续呼吸(reduced motion 时不渲染)
            4. 内层静态 <circle> — 实心锚点,reduced motion 时为唯一可见元素
        */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? false : inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 2.2 }}
        >
          {/* 暗色模式专属:外层光晕 aura (慢 3.5s 呼吸) */}
          {!shouldReduceMotion && isDark && (
            <motion.circle
              cx={100}
              cy={100}
              r={24}
              className="fill-primary/15"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                filter: "url(#amber-glow)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0, 0.15],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2,
              }}
            />
          )}
          {/* 内层 pulse (快 2.5s 呼吸) — 暗色模式追加光晕滤镜 */}
          {!shouldReduceMotion && (
            <motion.circle
              cx={100}
              cy={100}
              r={14}
              className="fill-primary/40"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                filter: isDark ? "url(#amber-glow)" : undefined,
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2,
              }}
            />
          )}
          {/* 静态锚点 */}
          <circle cx={100} cy={100} r={3.5} className="fill-primary" />
        </motion.g>
      </svg>
    </div>
  );
}
