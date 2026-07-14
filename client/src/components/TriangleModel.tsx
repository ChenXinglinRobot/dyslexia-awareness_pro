import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion, useMotionValue, useAnimationFrame, type MotionValue } from "framer-motion";
import { Cat, Volume2, Type, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSimulation } from "@/contexts/SimulationContext";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import CitationRef from "./CitationRef";
import MiniSVRBreadcrumb from "./MiniSVRBreadcrumb";

/* ============================================================
   模块4 三角模型 · TriangleModel
   SVG 三顶点（含义/读音/字形）三边（E1/E2/E3）+ 三态切换 + 全局模拟联动
   - 三态：熟练(E3 直达) / 初学(E1→E2 顺序) / 困难(E1 折线缓慢有停顿 → E2)
   - 内部循环：useAnimationFrame 驱动单 progress，描线(pathLength MV) 与 TravelingArrow 同帧同步
   - 模式切换：key={mode} 重挂 TriangleScene → 旧循环 cancelFrame，不叠加、不加速
   - reduced motion：无循环、无箭头、无 pulse，静态高亮活跃边
   - 颜色只用 token / var()，明暗自适应；禁硬编码色；困难态不用 destructive 红
   - 字体：标题 Noto Serif SC / 正文 Noto Sans SC fw300
   ============================================================ */

const SERIF = "'Noto Serif SC', serif";
const SANS = "'Noto Sans SC', sans-serif";

type TriMode = "skilled" | "novice" | "difficult";

const MODE_OPTIONS: { value: TriMode; label: string }[] = [
  { value: "skilled", label: "熟练阅读" },
  { value: "novice", label: "初学阅读" },
  { value: "difficult", label: "识字困难" },
];

// 顶点坐标（viewBox 0 0 400 360）
const V = {
  meaning: { cx: 200, cy: 60 }, // 含义（上）
  phon: { cx: 80, cy: 300 }, // 读音（左下）
  ortho: { cx: 320, cy: 300 }, // 字形（右下）
};

// 三条边 path：端点距顶点圆心 ~30（节点 r=26），留出箭头落点
const E1_STRAIGHT = "M 290 300 L 110 300"; // 字形→读音（直）
const E1_ZIGZAG = [ // 困难态折线（仅 M/L）：字形→读音，反复转折，最后到达读音
  "M 290 300", "L 268 282", "L 246 318", "L 224 284", "L 202 316",
  "L 180 282", "L 158 316", "L 136 284", "L 110 300",
].join(" ");
const E2_D = "M 93 273 L 187 87"; // 读音→含义
const E3_D = "M 307 273 L 213 87"; // 字形→含义（直达＝熟练者整字识别）

type EdgeId = "E1" | "E2" | "E3";

// E1 的 d 随模式：困难用折线，其余用直线（skilled/novice 中 E1 仅作淡背景）
const E1_D_OF: Record<TriMode, string> = {
  skilled: E1_STRAIGHT,
  novice: E1_STRAIGHT,
  difficult: E1_ZIGZAG,
};

function edgeD(edge: EdgeId, mode: TriMode): string {
  if (edge === "E1") return E1_D_OF[mode];
  return edge === "E2" ? E2_D : E3_D;
}

// 每个模式的活跃边（参与描线 + 箭头）
const ACTIVE_EDGES: Record<TriMode, EdgeId[]> = {
  skilled: ["E3"],
  novice: ["E1", "E2"],
  difficult: ["E1", "E2"],
};

// 非活跃边的淡背景 opacity（实线、不断裂、无 dash）
const BG_OPACITY: Record<TriMode, Partial<Record<EdgeId, number>>> = {
  skilled: { E1: 0.15, E2: 0.15 },
  novice: { E3: 0.15 },
  difficult: { E3: 0.2 },
};

const ACTIVE_STROKE: Record<TriMode, number> = { skilled: 3, novice: 2.5, difficult: 2.5 };

const MODE_COPY: Record<TriMode, string> = {
  skilled: "熟练阅读者看到字形，往往能快速通达含义。这个过程自然、迅速，通常不需要有意识地拼读。",
  novice: "初学阅读者更依赖语音，需要先把字形转换为读音，再由读音通达含义。出声朗读是这一阶段的重要练习。",
  difficult: "当字形到读音的转换不够流畅时，通达含义会更慢、更费力。曲折路径是这种加工困难的概念示意。",
};

/* ---------------- 时序：Timeline + walk ---------------- */

interface Hold { atFraction: number; durMs: number; }
interface Segment { edge: EdgeId; durationMs: number; holds?: Hold[]; }

const TIMELINES: Record<TriMode, { segments: Segment[]; pauseMs: number }> = {
  skilled: { segments: [{ edge: "E3", durationMs: 900 }], pauseMs: 800 },
  novice: { segments: [{ edge: "E1", durationMs: 1200 }, { edge: "E2", durationMs: 1000 }], pauseMs: 800 },
  difficult: {
    segments: [
      {
        edge: "E1", durationMs: 5000, holds: [
          { atFraction: 0.25, durMs: 350 },
          { atFraction: 0.5, durMs: 350 },
          { atFraction: 0.75, durMs: 350 },
        ],
      },
      { edge: "E2", durationMs: 1000 },
    ],
    pauseMs: 900,
  },
};

// DESIGN.md：新动作用指数 ease-out（ease-out-quart）
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

interface SubSegment { edge: EdgeId; fStart: number; fEnd: number; durMs: number; isHold: boolean; }

/** 把段展开为 advance/hold 子段；hold 占用 durationMs 内时间，advance 按比例分剩余时间。 */
function expandSegment(seg: Segment): SubSegment[] {
  if (!seg.holds || seg.holds.length === 0) {
    return [{ edge: seg.edge, fStart: 0, fEnd: 1, durMs: seg.durationMs, isHold: false }];
  }
  const holds = [...seg.holds].sort((a, b) => a.atFraction - b.atFraction);
  const holdTotal = holds.reduce((s, h) => s + h.durMs, 0);
  const advanceTotal = Math.max(0, seg.durationMs - holdTotal);
  const subs: SubSegment[] = [];
  let prevF = 0;
  for (const h of holds) {
    const span = Math.max(0, h.atFraction - prevF);
    subs.push({ edge: seg.edge, fStart: prevF, fEnd: h.atFraction, durMs: advanceTotal * span, isHold: false });
    subs.push({ edge: seg.edge, fStart: h.atFraction, fEnd: h.atFraction, durMs: h.durMs, isHold: true });
    prevF = h.atFraction;
  }
  subs.push({ edge: seg.edge, fStart: prevF, fEnd: 1, durMs: advanceTotal * Math.max(0, 1 - prevF), isHold: false });
  return subs;
}

interface Timeline { subs: SubSegment[]; cycleMs: number; }

function buildTimeline(mode: TriMode): Timeline {
  const subs: SubSegment[] = [];
  for (const s of TIMELINES[mode].segments) subs.push(...expandSegment(s));
  const activeMs = subs.reduce((sum, s) => sum + s.durMs, 0);
  return { subs, cycleMs: activeMs + TIMELINES[mode].pauseMs };
}

const FADE_MS = 150;

interface WalkResult {
  progress: Record<EdgeId, number>;
  activeEdge: EdgeId;
  activeLocal: number;
  arrowOpacity: number;
}

/** time（ms，距首帧）→ 各边进度 + 当前活跃边/局部进度 + 箭头透明度（首尾淡入淡出，掩盖循环回跳）。 */
function walk(tl: Timeline, time: number): WalkResult {
  const t = time % tl.cycleMs;
  const progress: Record<EdgeId, number> = { E1: 0, E2: 0, E3: 0 };
  let activeEdge: EdgeId = tl.subs[tl.subs.length - 1].edge; // 默认末段（停顿相位）
  let activeLocal = 1;
  let remaining = t;
  for (const s of tl.subs) {
    if (remaining < s.durMs) {
      const localT = s.durMs > 0 ? remaining / s.durMs : 1;
      const eased = s.isHold ? 0 : easeOutQuart(localT);
      const f = s.fStart + eased * (s.fEnd - s.fStart);
      progress[s.edge] = f;
      activeEdge = s.edge;
      activeLocal = f;
      break;
    }
    remaining -= s.durMs;
    progress[s.edge] = s.fEnd;
  }
  let arrowOpacity = 1;
  if (t < FADE_MS) arrowOpacity = t / FADE_MS;
  else if (t > tl.cycleMs - FADE_MS) arrowOpacity = (tl.cycleMs - t) / FADE_MS;
  return { progress, activeEdge, activeLocal, arrowOpacity };
}

/* ---------------- 组件 ---------------- */

/** 移动箭头：尖端在原点、指向 +x，每帧由父级设 transform。reduced 下不渲染。 */
function TravelingArrow({ arrowRef }: { arrowRef: RefObject<SVGGElement | null> }) {
  return (
    <g ref={arrowRef} style={{ opacity: 0 }}>
      <path d="M 0 0 L -11 -5.5 L -11 5.5 Z" fill="var(--primary)" />
    </g>
  );
}

/** 动态场景：测量路径 → 单 useAnimationFrame 循环 → pathLength MV 描线 + 箭头同帧同步。父级用 key={mode} 重挂。 */
function TriangleScene({ mode }: { mode: TriMode }) {
  const tl = useMemo(() => buildTimeline(mode), [mode]);
  const active = ACTIVE_EDGES[mode];

  const e1P = useMotionValue(0);
  const e2P = useMotionValue(0);
  const e3P = useMotionValue(0);
  const mvOf: Record<EdgeId, MotionValue<number>> = { E1: e1P, E2: e2P, E3: e3P };

  const e1MeasureRef = useRef<SVGPathElement | null>(null);
  const e2MeasureRef = useRef<SVGPathElement | null>(null);
  const e3MeasureRef = useRef<SVGPathElement | null>(null);
  const measureRefOf: Record<EdgeId, RefObject<SVGPathElement | null>> = {
    E1: e1MeasureRef, E2: e2MeasureRef, E3: e3MeasureRef,
  };
  const arrowRef = useRef<SVGGElement | null>(null);

  const [totals, setTotals] = useState<Record<EdgeId, number>>({ E1: 0, E2: 0, E3: 0 });

  // 路径进 DOM 后即可测几何长度（与 viewBox 缩放无关）；任一为 0 则下一帧重试一次。
  useLayoutEffect(() => {
    const next: Record<EdgeId, number> = { E1: 0, E2: 0, E3: 0 };
    for (const edge of active) {
      const el = measureRefOf[edge].current;
      if (el) next[edge] = el.getTotalLength();
    }
    setTotals(next);
    if (active.some((e) => next[e] === 0)) {
      const raf = requestAnimationFrame(() => {
        const retry: Record<EdgeId, number> = { ...next };
        for (const edge of active) {
          const el = measureRefOf[edge].current;
          if (el && retry[edge] === 0) retry[edge] = el.getTotalLength();
        }
        setTotals(retry);
      });
      return () => cancelAnimationFrame(raf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // 单循环：描线与箭头用同一帧的 activeLocal，无漂移；setTotals 后闭包稳定，MV.set 不触发 React 重渲染。
  useAnimationFrame((time) => {
    const r = walk(tl, time);
    e1P.set(r.progress.E1);
    e2P.set(r.progress.E2);
    e3P.set(r.progress.E3);

    const g = arrowRef.current;
    const measureEl = measureRefOf[r.activeEdge].current;
    const total = totals[r.activeEdge];
    if (g && measureEl && total > 0) {
      const d = r.activeLocal * total;
      const pt = measureEl.getPointAtLength(d);
      // 中心差分（端点自动退化为前向/后向），折点附近 ~2 单位窗口内换向。
      const ahead = measureEl.getPointAtLength(Math.min(total, d + 2));
      const behind = measureEl.getPointAtLength(Math.max(0, d - 2));
      const deg = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      g.setAttribute("transform", `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${deg.toFixed(2)})`);
      g.style.opacity = r.arrowOpacity.toFixed(3);
    }
  });

  return (
    <g>
      {/* 隐藏测量路径：仅取几何，不绘制、不命中（无 pathLength 属性 → getTotalLength 无歧义） */}
      {active.map((edge) => (
        <path
          key={`m-${edge}`}
          ref={measureRefOf[edge]}
          d={edgeD(edge, mode)}
          fill="none"
          stroke="none"
          pointerEvents="none"
          style={{ visibility: "hidden" }}
        />
      ))}

      {/* 淡背景边（非活跃） */}
      {(Object.keys(BG_OPACITY[mode]) as EdgeId[]).map((edge) => (
        <path
          key={`bg-${edge}`}
          d={edgeD(edge, mode)}
          stroke="var(--primary)"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          opacity={BG_OPACITY[mode][edge]}
        />
      ))}

      {/* 活跃描线：pathLength MV 驱动；无 markerEnd，箭头由 TravelingArrow 负责 */}
      {active.map((edge) => (
        <motion.path
          key={`fg-${edge}`}
          d={edgeD(edge, mode)}
          stroke="var(--primary)"
          strokeWidth={ACTIVE_STROKE[mode]}
          fill="none"
          strokeLinecap="butt"
          style={{ pathLength: mvOf[edge] }}
        />
      ))}

      <TravelingArrow arrowRef={arrowRef} />
    </g>
  );
}

/** reduced-motion 场景：无循环、无箭头，活跃边静态高亮 + 静态箭头。 */
function TriangleSceneStatic({ mode }: { mode: TriMode }) {
  const active = ACTIVE_EDGES[mode];
  return (
    <g>
      {(Object.keys(BG_OPACITY[mode]) as EdgeId[]).map((edge) => (
        <path
          key={`bg-${edge}`}
          d={edgeD(edge, mode)}
          stroke="var(--primary)"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          opacity={BG_OPACITY[mode][edge]}
        />
      ))}
      {active.map((edge) => (
        <path
          key={`fg-${edge}`}
          d={edgeD(edge, mode)}
          stroke="var(--primary)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#tri-arrow)"
        />
      ))}
    </g>
  );
}

/** 顶点：脉冲环（仅非 reduced）+ 节点圆 + lucide 图标 + 文字标签。不随 mode 重挂。 */
function VertexNode({
  cx,
  cy,
  icon,
  role,
  content,
  contentFont,
  labelSide,
  reduced,
  delay,
}: {
  cx: number;
  cy: number;
  icon: ReactNode;
  role: string;
  content?: string;
  contentFont?: string;
  labelSide: "top" | "left" | "right";
  reduced: boolean;
  delay: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {!reduced && (
        <motion.circle
          r={26}
          className="fill-primary/15"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const, delay }}
        />
      )}
      <circle r={26} className="fill-card stroke-primary" style={{ strokeWidth: 2 }} />
      <g transform="translate(-12 -12)">{icon}</g>
      {labelSide === "top" && (
        <text y={-32} textAnchor="middle" className="fill-foreground" style={{ fontFamily: SERIF, fontSize: 14 }}>
          {role}
        </text>
      )}
      {labelSide === "left" && (
        <>
          <text x={-34} y={-2} textAnchor="end" className="fill-foreground" style={{ fontFamily: contentFont, fontSize: 20 }}>
            {content}
          </text>
          <text x={-34} y={16} textAnchor="end" className="fill-muted-foreground" style={{ fontFamily: SERIF, fontSize: 12 }}>
            {role}
          </text>
        </>
      )}
      {labelSide === "right" && (
        <>
          <text x={34} y={-2} textAnchor="start" className="fill-foreground" style={{ fontFamily: contentFont, fontSize: 20 }}>
            {content}
          </text>
          <text x={34} y={16} textAnchor="start" className="fill-muted-foreground" style={{ fontFamily: SERIF, fontSize: 12 }}>
            {role}
          </text>
        </>
      )}
    </g>
  );
}

/** 三分段文字按钮（全断点统一）：照 ReadabilityLab.ControlGroup 视觉，未导出故局部实现。 */
function ModeControl({ mode, onChange, locked }: { mode: TriMode; onChange: (m: TriMode) => void; locked: boolean }) {
  return (
    <div className="flex w-full rounded-md border border-border bg-background/60 p-1" role="group" aria-label="三角模型状态切换">
      {MODE_OPTIONS.map((opt) => {
        const selected = opt.value === mode;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={locked}
            aria-pressed={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-11 flex-1 rounded px-3 text-label transition-colors duration-200",
              selected ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              locked && "cursor-not-allowed opacity-50",
            )}
            style={{ fontFamily: SANS }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function TriangleModel() {
  const reduced = useReducedMotion();
  const { enabled: simEnabled } = useSimulation();
  const [mode, setMode] = useState<TriMode>("skilled");
  const [locked, setLocked] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const isReduced = !!reduced;

  // 全局模拟联动：开启→切困难态 + 锁定；关闭→不回退，仅解锁。effect 仅依赖 [simEnabled]。
  useEffect(() => {
    if (simEnabled) {
      setMode("difficult");
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [simEnabled]);

  const handleModeChange = (m: TriMode) => {
    if (!locked) setMode(m);
  };

  return (
    <motion.div
      initial={isReduced ? false : { opacity: 0, scale: 0.6 }}
      whileInView={isReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: isReduced ? 0 : 0.7, ease: "easeOut" as const }}
      className="relative bg-card border border-border p-5 md:p-8"
    >
      <MiniSVRBreadcrumb activeNode="decode" size="sm" />

      {/* grid：横屏三角+文字侧排，竖屏自动坍缩为单列 */}
      <div className="grid gap-3 md:gap-8 md:grid-cols-[2fr_1fr]">
        {/* 左列：三角 */}
        <div className="mx-auto md:mx-0 w-full max-w-md">
          <svg viewBox="0 0 400 360" className="w-full h-auto overflow-visible" role="img" aria-label="三角模型：字形、读音、含义三个顶点与三条通路">
          <title>三角模型：识字的三条通路与三种状态</title>
          <desc>
            三角模型把识字拆成形（字形）、音（读音）、义（含义）三个顶点，通路分别为字形→读音、读音→含义、字形→含义。切换状态可观察通路活跃程度的概念变化：熟练者字形→含义的直接通路通畅；初学者依次经过字形→读音、读音→含义；识字困难者字形→读音的转换费力，字形→含义的直接通路发展不足。图示为概念示意，并非个体诊断或脑活动实时记录。
          </desc>
          <defs>
            <marker
              id="tri-arrow"
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={8}
              markerHeight={8}
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: "var(--primary)" }} />
            </marker>
          </defs>

          {/* key={mode} 重挂 TriangleScene → 旧 useAnimationFrame cancelFrame，从新模式起点重新开始 */}
          {isReduced ? (
            <TriangleSceneStatic mode={mode} />
          ) : (
            <TriangleScene key={mode} mode={mode} />
          )}

          {/* 三个顶点（脉冲仅非 reduced） */}
          <VertexNode cx={V.meaning.cx} cy={V.meaning.cy} icon={<Cat size={24} className="text-primary" />} role="含义" labelSide="top" reduced={isReduced} delay={0} />
          <VertexNode cx={V.phon.cx} cy={V.phon.cy} icon={<Volume2 size={24} className="text-primary" />} role="读音" content="māo" contentFont={SANS} labelSide="left" reduced={isReduced} delay={0.4} />
          <VertexNode cx={V.ortho.cx} cy={V.ortho.cy} icon={<Type size={24} className="text-primary" />} role="字形" content="猫" contentFont={SERIF} labelSide="right" reduced={isReduced} delay={0.8} />
          </svg>
        </div>

        {/* 右列：模式标签 + 解释文字 */}
        <div className="md:flex md:flex-col md:justify-center">
          <p className="text-sm text-primary mb-2" style={{ fontFamily: SERIF }}>
            {MODE_OPTIONS.find(o => o.value === mode)?.label}
          </p>
          {isReduced ? (
            <p className="text-body md:text-lg leading-relaxed text-muted-foreground" style={{ fontFamily: SANS, fontWeight: 300 }}>
              {MODE_COPY[mode]}
            </p>
          ) : (
            <motion.p
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-body md:text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: SANS, fontWeight: 300 }}
            >
              {MODE_COPY[mode]}
            </motion.p>
          )}
        </div>
      </div>

      {/* 状态控件 */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground" style={{ fontFamily: SANS, fontWeight: 300 }}>
            切换状态，看三条通路如何变化
          </span>
          {locked && (
            <span className="text-xs text-primary" style={{ fontFamily: SANS }}>
              全局模拟生效中
            </span>
          )}
        </div>
        <ModeControl mode={mode} onChange={handleModeChange} locked={locked} />
      </div>

      {/* 底部 Collapsible：概念示意说明 + SVR 文献（非三角模型直接实证） */}
      <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="mt-4">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between bg-card border border-border px-5 py-3 hover:border-primary/50 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="text-foreground text-sm" style={{ fontFamily: SERIF }}>
              这张图怎么读
            </span>
            <ChevronDown
              className={cn("w-4 h-4 text-muted-foreground transition-transform", collapsibleOpen && "rotate-180")}
              aria-hidden
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-card border border-border border-t-0 p-5 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: SANS, fontWeight: 300 }}>
              三角模型把「字词识别」内部拆成字形、读音、含义三个顶点与三条通路。熟练、初学、困难三种状态的动画都是概念示意，用来帮助理解通路强弱的变化，并非对某个个体阅读过程的诊断，也不是大脑活动的实时记录。
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: SANS, fontWeight: 300 }}>
              个体的阅读通路强弱与发展节奏存在差异：识字困难常表现为「字形→读音」转换费力、「字形→含义」直接通路发展不足，但不同读者之间并不一致。曲折路径只是这种加工困难的概念比喻，而非真实的脑活动轨迹。
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: SANS, fontWeight: 300 }}>
              这里引用的「简单阅读观」提供的是「字词识别 × 言语理解」的整体框架
              <CitationRef ids={[6, 7]} />，并非三角模型本身的直接实证来源；三角模型只是把「字词识别」内部拆得更细的一种教学示意。
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
