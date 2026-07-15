/* ============================================================
   UnderstandSection — 了解阅读障碍
   包含：模拟体验、机制（简单阅读观）、汉语特殊性、误解vs事实
   体验目标一：亲身感受阅读的吃力
   体验目标二：直观看见"乘法归零"
   ============================================================ */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, AlertTriangle, Brain, Languages, Focus, X as XIcon, Check, ExternalLink, AudioWaveform, Footprints, Share2, Timer } from "lucide-react";
import { useSimulation } from "@/contexts/SimulationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/useMobile";
import SectionHeading, { CHINESE_SERIF_STACK } from "./SectionHeading";
import TrueFocus from "./TrueFocus";
import TextPressure from "./TextPressure";
import DecryptedText from "./DecryptedText";
import CoordinatePlane from "./CoordinatePlane";
import CitationRef from "./CitationRef";
import PhonologicalAwareness from "./PhonologicalAwareness";
import SVRSimplified from "./SVRSimplified";
import TriangleModel from "./TriangleModel";
import RapidNaming from "./RapidNaming";
import MiniSVRBreadcrumb from "./MiniSVRBreadcrumb";
import BorderGlow from "./BorderGlow";
// @ts-ignore — matter-js 没有官方 @types,且项目中 FallingText 同样裸导入
import Matter from "matter-js";

const SECTION_BG_DARK = "/bg/hero-bg-dark.webp";
const SECTION_BG_LIGHT = "/bg/hero-bg-light.webp";

// ============ 模拟体验 ============

const sampleText = "今天的语文课，老师让我们大声朗读课文。我站起来，看着书上的字，它们好像在跳舞，我认不出来它们的顺序。同学们都笑了，老师叹了口气。我很努力，我只是看见的文字和你们不一样。";

function DyslexiaSimulator() {
  // 单一真相源:模拟开关与强度全部从 SimulationContext 读取
  const { enabled: active, intensity, toggle, setIntensity } = useSimulation();
  const intensityPct = Math.round(intensity * 100);

  // useMemo 避免每次渲染都新建 chars,防止 FuzzyText 因依赖变化而频繁重启
  const chars = useMemo(
    () =>
      sampleText.split("").map((char, i) => {
        const factor = intensity;
        return {
          char,
          rotate: (i % 3 === 0 ? -3 : i % 5 === 0 ? 4 : 0) * factor,
          translateY: (i % 4 === 0 ? -3 : i % 6 === 0 ? 3 : 0) * factor,
          blur: i % 7 === 0 ? 1.5 * factor : i % 11 === 0 ? 1 * factor : 0,
          opacity: 1 - (i % 9 === 0 ? 0.3 * factor : 0),
        };
      }),
    [intensity],
  );

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border p-6 md:p-8 transition-colors duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <h4 className="text-foreground text-sm font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {active ? "模拟：阅读障碍者的视角" : "普通人的视角"}
            </h4>
          </div>
          <button
            onClick={toggle}
            aria-pressed={active}
            className="flex items-center gap-2 text-xs px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors btn-press"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            {active ? "恢复正常" : "开启模拟"}
          </button>
        </div>

        {active && (
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-muted-foreground">强度</span>
            <input
              type="range" min="20" max="100" value={intensityPct}
              onChange={(e) => setIntensity(Number(e.target.value) / 100)}
              className="flex-1 h-1 bg-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <span className="text-xs text-primary" style={{ fontFamily: "'Space Grotesk'" }}>{intensityPct}%</span>
          </div>
        )}

        <div className="min-h-[120px] leading-loose text-base">
          {active ? (
            // 保留可自然换行的 DOM 字符动画。FuzzyText canvas 只支持单行文本，
            // 在段落换行时会与原文错位，因此不再叠加该噪声层。
            <div>
              <p className="text-foreground/80 dyslexia-text" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                {chars.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      transform: `translateY(${item.translateY}px) rotate(${item.rotate}deg)`,
                      filter: item.blur > 0 ? `blur(${item.blur}px)` : "none",
                      opacity: item.opacity,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.char}
                  </span>
                ))}
              </p>
            </div>
          ) : (
            <p className="text-foreground/80" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              {sampleText}
            </p>
          )}
        </div>
      </div>

      {/* 内容包 B — 科学免疫声明 */}
      <div className="bg-primary/5 border border-primary/30 p-5 transition-colors duration-500">
        <div className="flex gap-3">
          <AlertTriangle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
            注：本体验借用动态文字表现部分读者可能感受到的阅读负担，不代表阅读障碍者真实看到文字跳动，也不能概括所有人的体验。阅读障碍并非单纯的视力问题
            <CitationRef id={1} />。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ 视觉拥挤效应 ============

function CrowdingSimulation({
  showCrowding,
  setShowCrowding,
}: {
  showCrowding: boolean;
  setShowCrowding: (v: boolean) => void;
}) {
  const { enabled: simEnabled } = useSimulation();
  const isMobile = useIsMobile();
  const [crowdIntensity, setCrowdIntensity] = useState(0.6);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const intensityPct = Math.round(crowdIntensity * 100);

  return (
    <div className="space-y-4">
      {simEnabled && showCrowding && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border p-6 md:p-10 transition-colors duration-500"
        >
          <p className="sr-only">
            视觉拥挤效应模拟：移动鼠标（或拖动手指）注视任意一个字，只有它清晰，周围的字挤作一团；拉大字间距可缓解拥挤。
          </p>
          <p
            className="text-xs text-muted-foreground text-center mb-6"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            {isMobile
              ? "拖动手指 — 只有指尖处的字清晰，周围挤作一团"
              : "移动鼠标注视任意一个字 — 只有它清晰，周围挤作一团"}
          </p>

          {/* TextPressure crowding 模式: 注视点清晰, 外围 scaleX 重叠 + 加重 */}
          <div className="flex justify-center items-center min-h-[140px] text-3xl md:text-4xl mb-8">
            <TextPressure
              mode="crowding"
              text="盯着这一个字 周围的字全挤在了一起"
              intensity={crowdIntensity}
              focusRadius={50}
              letterSpacing={letterSpacing}
              textColor="var(--foreground)"
            />
          </div>

          {/* 两条滑块: 拥挤强度 + 字间距缓解 */}
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">拥挤强度</span>
              <input
                type="range" min="20" max="100" value={intensityPct}
                onChange={(e) => setCrowdIntensity(Number(e.target.value) / 100)}
                className="flex-1 h-1 bg-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                aria-label="拥挤强度"
              />
              <span className="text-xs text-primary w-10 text-right" style={{ fontFamily: "'Space Grotesk'" }}>{intensityPct}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">字间距</span>
              <input
                type="range" min="0" max="24" value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="flex-1 h-1 bg-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                aria-label="字间距"
              />
              <span className="text-xs text-primary w-10 text-right" style={{ fontFamily: "'Space Grotesk'" }}>{letterSpacing}px</span>
            </div>
            <p
              className="text-xs text-muted-foreground text-center pt-1"
              style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              拉大字间距 → 拥挤消解：这正是“无障碍排版”能够帮到阅读障碍者的原因。
            </p>
          </div>

          <button
            onClick={() => setShowCrowding(false)}
            className="mx-auto mt-8 block text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            收起
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============ 简单阅读观 + 四象限 ============

type Phase = 'normal' | 'falling' | 'settled';

// 标签小字常量(不存于 DOM,作为补充字源)
const DROP_LABEL_CHARS   = ['字', '符', '识', '别'];
const DROP_READING_CHARS = ['阅', '读', '能', '力'];
// 外层包装也常量化:JSX 内联 [DROP_LABEL_CHARS, ...] 每次渲染都会建新数组,
// 导致 useEffect 引用比对失败 → dev/StrictMode 下可见「下落两次」
const DROP_EXTRA_GROUPS: string[][] = [DROP_LABEL_CHARS, DROP_READING_CHARS];

// 统一落字区:挂载在 ReadingMechanism 的「引言容器」上,
// 通过 containerRef 读取容器内已有 [data-drop-char] span 的精确位置,
// 在原坐标生成 Matter.js 刚体;不在容器内的小字以负 y 坐标「落入」容器。
function UnifiedDropZone({
  containerRef,
  height,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  height: number;
}) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    if (width <= 0 || height <= 0) return;

    // 一个 Engine、一个世界
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 1;

    // 共享地板、左右墙、天花板
    const floor   = Matter.Bodies.rectangle(width / 2,  height + 25, width,  50, { isStatic: true });
    const left    = Matter.Bodies.rectangle(-25,        height / 2,  50,   height, { isStatic: true });
    const right   = Matter.Bodies.rectangle(width + 25, height / 2,  50,   height, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2,  -25,        width,  50, { isStatic: true });
    Matter.World.add(engine.world, [floor, left, right, ceiling]);

    // 鼠标约束(共享):任何字都能被拖
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.World.add(engine.world, mouseConstraint);

    // 移除 touch 事件监听,避免移动端 Matter.js 拦截 touchstart/touchmove/touchend 导致页面无法滚动
    mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
    mouseConstraint.mouse.element.removeEventListener('touchmove',  mouseConstraint.mouse.mousemove);
    mouseConstraint.mouse.element.removeEventListener('touchend',   mouseConstraint.mouse.mouseup);

    // === 收集所有字符的起始坐标 ===
    type Entry = { body: Matter.Body; elem: HTMLSpanElement; fontSize: number };
    const entries: Entry[] = [];

    // 1) 引言段落的每个字符:从 DOM 读取真实位置
    const introSpans = container.querySelectorAll<HTMLSpanElement>('[data-drop-char]');
    introSpans.forEach((src) => {
      const rect = src.getBoundingClientRect();
      const char = src.textContent || '';
      if (!char) return;
      const fontSize = parseFloat(getComputedStyle(src).fontSize) || 16;
      const charW = rect.width || fontSize;
      const charH = rect.height || fontSize * 1.4;
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const span = document.createElement('span');
      span.textContent = char;
      span.style.position = 'absolute';
      span.style.left = '0';
      span.style.top = '0';
      span.style.fontSize = `${fontSize}px`;
      span.style.fontFamily = "'Noto Sans SC', sans-serif";
      span.style.color = 'currentColor';
      span.style.pointerEvents = 'none';
      span.style.transform = 'translate(-50%, -50%)';
      span.style.whiteSpace = 'nowrap';
      container.appendChild(span);

      const body = Matter.Bodies.rectangle(x, y, charW, charH, {
        restitution: 0.5,
        frictionAir: 0.01,
        friction: 0.2,
      });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);
      Matter.World.add(engine.world, body);
      entries.push({ body, elem: span, fontSize });
    });

    // 2) 不在容器内的标签小字:用负 y 坐标,模拟「从容器上方落入」
    //    落在容器顶部居中区域,避免与引言字重叠
    const extraChars = DROP_EXTRA_GROUPS.flat();
    const labelFontSize = 12; // 与 text-xs 一致
    const labelCharW = labelFontSize;
    const labelCharH = labelFontSize * 1.4;
    const labelGap = 2;
    const totalLabelW = extraChars.length * (labelCharW + labelGap);
    let labelX = Math.max(8, (width - totalLabelW) / 2);
    // 关键:y 为负 → 物理引擎一启动,字就在容器顶之上,自然「落入」,缓解瞬移违和感
    const labelY0 = -(labelCharH * 0.6);

    extraChars.forEach((ch) => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.position = 'absolute';
      span.style.left = '0';
      span.style.top = '0';
      span.style.fontSize = `${labelFontSize}px`;
      span.style.fontFamily = "'Noto Sans SC', sans-serif";
      span.style.color = 'currentColor';
      span.style.pointerEvents = 'none';
      span.style.transform = 'translate(-50%, -50%)';
      span.style.whiteSpace = 'nowrap';
      container.appendChild(span);

      const body = Matter.Bodies.rectangle(
        labelX + labelCharW / 2,
        labelY0,
        labelCharW,
        labelCharH,
        {
          restitution: 0.6,
          frictionAir: 0.01,
          friction: 0.2,
        },
      );
      // 起始无随机速度,让标签字同步下落,看起来更像「集体入场」
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
      Matter.World.add(engine.world, body);
      entries.push({ body, elem: span, fontSize: labelFontSize });
      labelX += labelCharW + labelGap;
    });

    // 不用 Matter.Runner(它内部已自带 RAF),只手动 RAF 驱动,避免每帧双重 update
    let raf = 0;
    let lastTime = performance.now();
    const loop = (now: number) => {
      const delta = Math.min(now - lastTime, 50); // 限制最大 delta,后台标签页恢复时不跳帧
      lastTime = now;
      Matter.Engine.update(engine, delta);
      entries.forEach(({ body, elem }) => {
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      entries.forEach(({ elem }) => elem.remove());
    };
  }, [containerRef, height]);

  // 此组件不渲染任何 DOM:一切物理活动直接发生在 containerRef 指向的容器内
  return null;
}

// ============ SVR 回收衔接 ============
// ReadingMechanism 上方的轻量过渡：迷你三角（呼应上一节三角模型对字词识别的放大）
// 缩小并淡出，概念上「收回」到下方 SVR 全景路标。reduced motion 下静态显示，不缩放。
function SVRBridge() {
  const reduced = useReducedMotion();
  const isReduced = !!reduced;
  return (
    <div className="pointer-events-none flex h-10 items-center justify-center" aria-hidden>
      <motion.div
        className="h-7 w-7"
        style={{ transformOrigin: "center" }}
        initial={isReduced ? false : { opacity: 0.6, scale: 1 }}
        whileInView={isReduced ? { opacity: 0.35 } : { opacity: 0, scale: 0.25 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: isReduced ? 0 : 0.8, ease: "easeOut" as const }}
      >
        <svg viewBox="0 0 100 90" className="h-full w-full">
          <path
            d="M50 10 L90 80 L10 80 Z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

function ReadingMechanism() {
  const [phase, setPhase] = useState<Phase>('normal');
  const { enabled: simEnabled } = useSimulation();
  const isMobile = useIsMobile();
  const { ref, inView, delay } = useScrollReveal({ margin: "-50px", stagger: 0.2 });
  // 物理容器 ref:在 falling/settled 阶段复用为引言段落的容器
  const physicsContainerRef = useRef<HTMLDivElement>(null);

  // 单向触发:点击 → falling → 3s 后 settled(无回退)
  const handleDecodeClick = () => {
    if (phase !== 'normal') return;
    setPhase('falling');
  };

  useEffect(() => {
    if (phase !== 'falling') return;
    const t = setTimeout(() => setPhase('settled'), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  // 统一落字区高度:所有字共享一个物理世界,同一块地板
  const dropZoneH = isMobile ? 300 : 200;
  const isPhysics = phase === 'falling' || phase === 'settled';

  const decodeValue = phase === 'normal' ? 1 : 0;
  const result = decodeValue * 1;

  // 引言字(扁平化一次,保持引用稳定以避免子组件重渲染)
  const introChars = useMemo(
    () => '这是一个简化模型:任何一项显著受限,都会限制整体阅读理解。'.split(''),
    [],
  );

  return (
    <div ref={ref} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay(0) }}
        className="text-center"
      >
        <p className="text-2xl md:text-3xl text-foreground mb-4" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
          字词识别 <span className="text-primary">&times;</span> 言语理解 <span className="text-primary">=</span> 阅读理解
          <CitationRef ids={[6, 7]} />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay(1) }}
      >
        <BorderGlow className="p-6 md:p-8 transition-colors duration-500">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <button
              type="button"
              onClick={handleDecodeClick}
              disabled={phase !== 'normal'}
              aria-label={phase === 'normal' ? '将字词识别从 100% 降为 0%' : '字词识别已降为 0%'}
              className={`reading-mechanism-trigger w-20 h-20 rounded-sm border-2 flex items-center justify-center text-2xl font-bold btn-press ${
                phase === 'normal'
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-destructive bg-destructive/10 text-destructive"
              }`}
              style={{ fontFamily: "'Space Grotesk'" }}
            >
              {decodeValue === 1 ? '100%' : '0%'}
            </button>
            {/* inline 标签:normal 显原字(muted)/ settled 显 replacement(destructive 红);falling 时透明度降为 0(字在落字区) */}
            <span
              className={`text-xs mt-2 block transition-opacity duration-200 ${
                phase === 'falling'
                  ? 'opacity-0 text-muted-foreground'
                  : phase === 'settled'
                    ? 'opacity-100 text-destructive'
                    : 'opacity-100 text-muted-foreground'
              }`}
            >
              {phase === 'settled' ? '字词识别受限' : '字词识别'}
            </span>
          </div>
          <span className="text-3xl text-primary" style={{ fontFamily: "'Space Grotesk'" }}>&times;</span>
          <div className="text-center">
            <div className="w-20 h-20 rounded-sm border-2 border-primary bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary" style={{ fontFamily: "'Space Grotesk'" }}>100%</div>
            <p className="text-xs text-muted-foreground mt-2">言语理解</p>
          </div>
          <span className="text-3xl text-muted-foreground">=</span>
          <div className="text-center">
            <div className={`w-20 h-20 rounded-sm border-2 flex items-center justify-center text-3xl font-bold transition-all duration-500 ${
              result === 0
                ? "border-destructive bg-destructive/15 text-destructive"
                : "border-primary bg-primary/15 text-primary"
            }`} style={{ fontFamily: "'Space Grotesk'" }}>{result === 1 ? '100%' : '0%'}</div>
            <span
              className={`text-xs mt-2 block transition-opacity duration-200 ${
                phase === 'falling'
                  ? 'opacity-0 text-muted-foreground'
                  : phase === 'settled'
                    ? 'opacity-100 text-destructive'
                    : 'opacity-100 text-muted-foreground'
              }`}
            >
              {phase === 'settled' ? '阅读理解受限' : '阅读理解'}
            </span>
          </div>
        </div>

        {/*
          引言 / 物理容器 — 同一个 <div>,在 normal 是引言段落,
          在 falling/settled 膨胀为统一落字区。
          关键:容器内始终保留引言的 inline-block span,让 UnifiedDropZone 能读取精确位置。
        */}
        <div
          ref={physicsContainerRef}
          className={`rounded transition-all duration-500 ${
            isPhysics
              ? 'relative overflow-hidden border border-border bg-background/30'
              : ''
          }`}
          style={isPhysics ? { height: dropZoneH } : undefined}
        >
          <p
            className={`text-muted-foreground text-base leading-relaxed text-center max-w-2xl mx-auto transition-opacity duration-200 ${
              isPhysics ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            {introChars.map((ch, i) => (
              // inline-block 关键:让 getBoundingClientRect() 在换行/对齐时给出绝对精准的宽高和坐标
              <span
                key={i}
                data-drop-char=""
                style={{ display: 'inline-block' }}
              >
                {ch}
              </span>
            ))}
          </p>

          {/* UnifiedDropZone 不渲染 DOM,所有物理活动直接发生在 physicsContainerRef 内 */}
          {isPhysics && (
            <UnifiedDropZone
              containerRef={physicsContainerRef}
              height={dropZoneH}
            />
          )}

          {/* settled 总结语:绝对定位叠在物理容器顶端,不参与文档流,避免卡片拉长 */}
          {phase === 'settled' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-3 left-0 right-0 text-center text-destructive text-sm px-4 pointer-events-none z-10"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              字词识别显著受限时，即使言语理解较好，整体阅读理解也会受到限制。这里的”0%”是理论示意，不是诊断分数。
            </motion.p>
          )}
        </div>
        </BorderGlow>
      </motion.div>

    </div>
  );
}

// ============ 汉语特殊性 ============

function ChineseSpecificity() {
  const { ref, inView, delay } = useScrollReveal({
    margin: "-50px",
    stagger: 0.1,
  });
  const shouldReduceMotion = useReducedMotion();

  // 「声旁意识」需要把每个字里的"青"高亮出来，所以单独列出字符。
  const phonStems = ["请", "清", "情", "晴", "青"];

  const morphologyItems: Array<{
    title: string;
    example?: string;
    desc: string;
  }> = [
    {
      title: "复合词意识",
      example: "长颈鹿、梅花鹿 →「短颈鳄」？",
      desc: "理解词语由语素组合而成的规则。",
    },
    {
      title: "同音语素意识",
      example: "衣 · 一 · 伊 · 医",
      desc: "分辨读音相同、意义不同的语素。",
    },
    {
      title: "同形语素意识",
      example: "花朵 / 花费；面孔 / 面条",
      desc: "分辨字形相同、意义不同的语素。",
    },
    {
      title: "形旁意识",
      example: "氵（海、江） · 冫（冬、凉） · 灬（煮、蒸、煎）",
      desc: "理解形旁提示字义类别的规律。",
    },
    {
      title: "声旁意识",
      desc: "声旁常能提供读音线索，但读音不一定完全相同。",
    },
  ];

  return (
    <div ref={ref} className="space-y-12 md:space-y-16">
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-foreground/80 text-lg leading-relaxed text-pretty"
        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
      >
        不同文字系统既有共性，也有侧重。拼音文字阅读障碍常以语音意识缺陷为主；汉语阅读障碍则更突出
        <span className="text-primary font-semibold">
          <DecryptedText
            text="语素意识"
            sequential={true}
            revealDirection="start"
            animateOn="view"
            speed={80}
          />
        </span>
        缺陷，同时也涉及汉字构形规则的掌握
        <CitationRef ids={[1, 8, 9]} />。
      </motion.p>

      <section
        aria-labelledby="morphology-awareness-title"
        className="grid gap-8 lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,2fr)] lg:gap-14"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: delay(0) }}
          className="lg:pt-1"
        >
          <p
            className="mb-3 text-sm text-primary"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            词怎样组成意义
          </p>
          <h4
            id="morphology-awareness-title"
            className="text-lg md:text-xl text-foreground text-balance"
            style={{ fontFamily: CHINESE_SERIF_STACK, fontWeight: 600 }}
          >
            语素意识
          </h4>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            识别词语中最小的意义单位，并理解字音、字形与意义之间如何建立联系。
          </p>
        </motion.div>

        <div className="border-y border-border">
          {morphologyItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: delay(index + 1) }}
              className="group grid gap-3 border-b border-border px-1 py-5 transition-colors duration-300 last:border-b-0 hover:bg-primary/[0.04] sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 sm:px-4 md:py-6"
            >
              <h5
                className="text-base font-medium text-foreground"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {item.title}
              </h5>
              <div className="min-w-0">
                {item.title === "声旁意识" ? (
                  <p
                    className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-xl text-foreground"
                    aria-label="请、清、情、晴共享声旁青"
                  >
                    {phonStems.map(ch => (
                      <span
                        key={ch}
                        className={
                          ch === "青"
                            ? "text-primary font-semibold underline decoration-primary/50 decoration-2 underline-offset-4"
                            : ""
                        }
                        style={{ fontFamily: "'Noto Serif SC', serif" }}
                      >
                        {ch}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p
                    className="mb-2 text-lg leading-relaxed text-primary text-pretty"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {item.example}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {item.desc}
                  {(item.title === "形旁意识" || item.title === "声旁意识") && (
                    <CitationRef ids={[4]} />
                  )}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="orthographic-awareness-title"
        className="border-t border-border pt-10 md:pt-14"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,2fr)] lg:gap-14">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: delay(6) }}
          >
            <p
              className="mb-3 text-sm text-primary"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              字怎样写才成立
            </p>
            <h4
              id="orthographic-awareness-title"
              className="text-lg md:text-xl text-foreground text-balance"
              style={{ fontFamily: CHINESE_SERIF_STACK, fontWeight: 600 }}
            >
              正字法意识
            </h4>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              判断部件位置与笔画组合是否符合汉字的常见构形规则。它与语素意识相互关联，但不是同一种能力
              <CitationRef ids={[4]} />。
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay(7) }}
            className="bg-card border border-border"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8 md:border-r md:border-border">
                <p className="mb-6 text-sm text-muted-foreground">部件位置</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <span
                      className="w-14 text-center text-4xl text-primary"
                      style={{ fontFamily: CHINESE_SERIF_STACK }}
                    >
                      氵
                    </span>
                    <div>
                      <p className="text-foreground">通常在左</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        海 · 江 · 河
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span
                      className="w-14 text-center text-4xl text-primary"
                      style={{ fontFamily: CHINESE_SERIF_STACK }}
                    >
                      艹
                    </span>
                    <div>
                      <p className="text-foreground">通常在上</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        花 · 草 · 茶
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span
                      className="w-14 text-center text-4xl text-primary"
                      style={{ fontFamily: CHINESE_SERIF_STACK }}
                    >
                      灬
                    </span>
                    <div>
                      <p className="text-foreground">通常在下</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        蒸 · 煮 · 煎
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-6 md:border-t-0 md:p-8">
                <p className="mb-6 text-sm text-muted-foreground">笔画组合</p>
                <div className="border-b border-border pb-5">
                  <p className="mb-2 text-xs text-muted-foreground">简单变化</p>
                  <div
                    className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-2xl text-foreground"
                    style={{ fontFamily: CHINESE_SERIF_STACK }}
                    role="img"
                    aria-label="大加一笔形成太"
                  >
                    <span className="text-center">大</span>
                    <span
                      aria-hidden
                      className="text-sm text-muted-foreground"
                    >
                      加一笔
                    </span>
                    <span className="text-center text-primary">太</span>
                  </div>
                </div>

                <div className="pt-5">
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                    同一个“日”，一笔加在不同位置
                  </p>
                  <div
                    className="flex items-stretch gap-4"
                    role="img"
                    aria-label="日加一笔可以形成旦、旧、由、甲、田、白"
                  >
                    <div className="flex w-16 shrink-0 items-center justify-center bg-primary/[0.08] px-2 py-4 sm:w-20">
                      <span
                        className="text-4xl text-primary"
                        style={{ fontFamily: CHINESE_SERIF_STACK }}
                      >
                        日
                      </span>
                    </div>
                    <div className="grid min-w-0 flex-1 grid-cols-3 border border-border bg-border gap-px">
                      {["旦", "旧", "由", "甲", "田", "白"].map(char => (
                        <span
                          key={char}
                          className="flex items-center justify-center bg-card py-2 text-2xl text-foreground"
                          style={{ fontFamily: CHINESE_SERIF_STACK }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground md:px-8">
              <p>
                语素意识关注“这个单位表达什么意义”，正字法意识关注“这个字形是否符合汉字规则”。
              </p>
              <p className="mt-2 text-xs">
                研究通常把语音意识、语素意识和正字法意识作为相互关联但不同的能力分别讨论
                <CitationRef ids={[1, 8, 9]} />。
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ============ 误解 vs 事实 ============

function MythsVsFacts() {
  const { ref, inView, delay } = useScrollReveal({ margin: "-50px", stagger: 0.15 });

  const items = [
    { myth: '\u201c他就是不用功\u201d', fact: '持续的阅读困难不能简单归因于“不努力”', citationIds: [1] },
    { myth: '\u201c长大就好了\u201d', fact: '困难可能持续到青春期和成年期，尽早支持更合适', citationIds: [1] },
    {
      myth: '\u201c看不懂字 = 笨\u201d',
      fact: '智力完全正常，障碍者甚至可能另有天赋',
      citationIds: [1, 13, 14],
    },
  ] as const;

  return (
    <div ref={ref} className="space-y-6">
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: delay(index) }}
            className="flex flex-col md:flex-row gap-4 bg-card border border-border p-5 transition-colors duration-500"
          >
            <div className="flex items-start gap-3 flex-1">
              <XIcon className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive line-through text-base" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{item.myth}</p>
            </div>
            <div className="flex items-start gap-3 flex-1">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-foreground text-base" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 400 }}>
                {item.fact}
                <CitationRef ids={item.citationIds} />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/*
        外部延伸阅读 — 哈佛大学教育学院 Gaab 实验室的「30 条阅读障碍误区」英文专题页。
        按钮样式沿用本节其它按钮的 border-primary / text-primary / hover:bg-primary/10 token,
        所有颜色都走 var(--primary),自动适配日 / 夜间模式(在 .dark 下 primary 会更亮)。
      */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay(items.length) }}
        className="flex flex-col items-center gap-3 pt-2"
      >
        <p
          className="text-xs text-muted-foreground text-center"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          以上只是最常见的 3 条 · 哈佛大学教育学院 Gaab 实验室整理了约 30 条完整误区
        </p>
        <a
          href="https://www.gaablab.com/dyslexia-myths"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在 Gaab 实验室网站查看完整误区清单(英文页面,新窗口打开)"
          className="inline-flex items-center gap-2 text-xs px-5 py-2.5 border border-primary text-primary hover:bg-primary/10 transition-colors btn-press"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          查看完整误区清单
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      </motion.div>
    </div>
  );
}

// ============ 主组件 ============

export default function UnderstandSection() {
  const { theme } = useTheme();
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.1 });
  const sectionBg = theme === "dark" ? SECTION_BG_DARK : SECTION_BG_LIGHT;
  const { enabled: simEnabled } = useSimulation();
  const isMobile = useIsMobile();
  const [showCrowding, setShowCrowding] = useState(false);
  const [showFocus, setShowFocus] = useState(false);

  // 总开关关掉时,强制收起两个体验面板
  useEffect(() => {
    if (!simEnabled) {
      setShowCrowding(false);
      setShowFocus(false);
    }
  }, [simEnabled]);

  const crowdingLauncher = (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setShowCrowding(true)}
      className="flex items-center gap-2 border border-primary px-5 py-2.5 text-sm text-primary transition-colors hover:bg-primary/10 btn-press"
      style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
    >
      启动视觉拥挤体验
    </motion.button>
  );

  const focusLauncher = (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setShowFocus(true)}
      className="flex items-center gap-2 border border-primary px-5 py-2.5 text-sm text-primary transition-colors hover:bg-primary/10 btn-press"
      style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
    >
      启动逐字解码体验
    </motion.button>
  );

  const focusPanel = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border p-6 md:p-10 transition-colors duration-500"
    >
      <p className="text-xs text-muted-foreground text-center mb-6" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
        {isMobile
          ? "正在自动逐字扫描 — 一次只能看清一个字"
          : "鼠标移到任意字上 — 只有它会清晰"}
      </p>
      <div className="flex justify-center">
        <TrueFocus
          sentence="一次 只能 看清 一个 字"
          separator=" "
          manualMode={!isMobile}
          blurAmount={6}
          borderColor="var(--primary)"
          glowColor="color-mix(in oklch, var(--primary) 60%, transparent)"
          animationDuration={0.4}
        />
      </div>
      <button
        onClick={() => setShowFocus(false)}
        className="mx-auto mt-8 block text-xs text-muted-foreground hover:text-foreground transition-colors"
        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
      >
        收起
      </button>
    </motion.div>
  );

  return (
    <section id="understand" className="relative overflow-hidden">
      <div className="divider-glow" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" style={{ backgroundImage: `url(${sectionBg})` }} />
      </div>
      <div className="absolute inset-0 bg-background/95 transition-colors duration-500" />

      <div className="container relative z-10 py-20 md:py-32" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: delay(0) }}
          className="mb-16"
        >
          <SectionHeading sectionId="understand" />
        </motion.div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:sim" />
          </div>
          <p className="text-muted-foreground text-base mb-6 max-w-2xl" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
            点击下方按钮，感受阅读障碍儿童在阅读时可能经历的视觉拥挤与认知过载。
          </p>
          <DyslexiaSimulator />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Focus className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:crowd" />
          </div>
          <p className="text-muted-foreground text-base mb-6 max-w-2xl" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
            视觉拥挤可能影响一部分阅读障碍者；有研究发现，增大字距可即时改善部分儿童的阅读表现，但字距、词距与个体差异都会影响结果
            <CitationRef ids={[2, 3, 12]} />。
          </p>

          {simEnabled && !showCrowding && !showFocus ? (
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              {crowdingLauncher}
              {focusLauncher}
            </div>
          ) : simEnabled ? (
            <div className="space-y-6 md:space-y-8">
              {showCrowding ? (
                <CrowdingSimulation
                  showCrowding={showCrowding}
                  setShowCrowding={setShowCrowding}
                />
              ) : (
                <div className="flex justify-center">{crowdingLauncher}</div>
              )}

              {showFocus ? (
                focusPanel
              ) : (
                <div className="flex justify-center">{focusLauncher}</div>
              )}
            </div>
          ) : null}
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <AudioWaveform className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:phon" />
          </div>
          <PhonologicalAwareness />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Footprints className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:svr" />
          </div>
          <SVRSimplified />
        </div>

        <div className="mb-20">
          <CoordinatePlane />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Share2 className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:triangle" />
          </div>
          <TriangleModel />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Timer className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:ran" />
          </div>
          <RapidNaming />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Languages className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:cn" />
          </div>
          <ChineseSpecificity />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:math" />
          </div>
          <SVRBridge />
          <div className="relative md:pt-12">
            <MiniSVRBreadcrumb activeNode="decode" size="sm" className="hidden md:flex" />
            <ReadingMechanism />
          </div>
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="bg-primary/8 border border-primary/30 p-6 text-center transition-colors duration-500"
          >
            <p className="text-primary text-xl md:text-2xl" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
              小学低年级是识别阅读困难风险、尽早提供支持的重要阶段<CitationRef ids={[1]} />。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 flex items-start gap-3 bg-card border border-border p-5 transition-colors duration-500"
            role="note"
            aria-label="诊断与随访提示"
          >
            <AlertTriangle className="size-4 shrink-0 mt-0.5 text-primary" aria-hidden />
            <p
              className="text-muted-foreground text-sm leading-relaxed"
              style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              一、二年级的正式诊断需谨慎，高风险儿童应持续随访<CitationRef ids={[1, 15]} />；
              识别风险是为了更早支持，不是给孩子贴标签。
            </p>
          </motion.div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>误解 vs 事实</h3>
          </div>
          <MythsVsFacts />
        </div>
      </div>
    </section>
  );
}
