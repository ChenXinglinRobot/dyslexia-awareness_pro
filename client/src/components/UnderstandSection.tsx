/* ============================================================
   UnderstandSection — 了解阅读障碍
   包含：模拟体验、机制（简单阅读观）、汉语特殊性、误解vs事实
   体验目标一：亲身感受阅读的吃力
   体验目标二：直观看见"乘法归零"
   ============================================================ */

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, AlertTriangle, Brain, Languages, X as XIcon, Check } from "lucide-react";
import { useSimulation } from "@/contexts/SimulationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/useMobile";
import FuzzyText from "./FuzzyText";
import SectionHeading from "./SectionHeading";
import TrueFocus from "./TrueFocus";
import DecryptedText from "./DecryptedText";
import CoordinatePlane from "./CoordinatePlane";
// @ts-ignore — matter-js 没有官方 @types,且项目中 FallingText 同样裸导入
import Matter from "matter-js";

const SECTION_BG_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-understand-BXNRYBiW9Ns8QfrGCzzxoW.webp";
const SECTION_BG_LIGHT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-understand-light-gCwMqAx8ue3TNK6TpTGwYk.webp";

// ============ 模拟体验 ============

const sampleText = "今天的语文课，老师让我们大声朗读课文。我站起来，看着书上的字，它们好像在跳舞，我认不出来它们的顺序。同学们都笑了，老师叹了口气。我不是不努力，我只是看到的世界和你们不一样。";

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
            // 二层叠加:DOM 字符层(底,带 4 轴变换)+ FuzzyText canvas 层(上,随机抖动)
            // mix-blend-difference 让两层视觉融合,产生"被文字干扰"的双重感
            <div className="relative">
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
              <FuzzyText
                baseIntensity={intensity}
                hoverIntensity={Math.min(1, intensity + 0.2)}
                direction="both"
                fontSize={16}
                fontFamily="'Noto Sans SC', sans-serif"
                fontWeight={300}
                color="currentColor"
                fps={30}
                disabled={!active}
                className="absolute inset-0 pointer-events-none opacity-60 mix-blend-difference text-foreground/80"
                aria-hidden
              >
                {sampleText}
              </FuzzyText>
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
            注：真实的阅读障碍并非文字在物理上跳动或变形，而是大脑在处理汉字视空间结构时产生的视觉拥挤与认知过载，本组件通过动态效果还原其心理困境。他们的智力完全正常（非言语智商 {'>'} 80），这绝非态度问题。
          </p>
        </div>
      </div>
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

function ReadingMechanism() {
  const [phase, setPhase] = useState<Phase>('normal');
  const { enabled: simEnabled } = useSimulation();
  const [showFocus, setShowFocus] = useState(false);
  const isMobile = useIsMobile();
  const { ref, inView, delay } = useScrollReveal({ margin: "-50px", stagger: 0.2 });
  // 物理容器 ref:在 falling/settled 阶段复用为引言段落的容器
  const physicsContainerRef = useRef<HTMLDivElement>(null);

  // 总开关关掉时,强制收起局部体验,文字回到清晰
  useEffect(() => {
    if (!simEnabled) setShowFocus(false);
  }, [simEnabled]);

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
    () => '这是一道乘法题:任何一项受损归零,乘积都会归零。'.split(''),
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
          阅读 = 字符识别 <span className="text-primary">&times;</span> 言语理解
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay(1) }}
        className="bg-card border border-border p-6 md:p-8 transition-colors duration-500"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <button
              onClick={handleDecodeClick}
              disabled={phase !== 'normal'}
              className={`w-20 h-20 rounded-sm border-2 flex items-center justify-center text-2xl font-bold transition-all duration-500 btn-press ${
                phase === 'normal'
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-destructive bg-destructive/10 text-destructive"
              }`}
              style={{ fontFamily: "'Space Grotesk'" }}
            >
              {decodeValue}
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
              {phase === 'settled' ? '极难进行字符识别' : '字符识别'}
            </span>
          </div>
          <span className="text-3xl text-primary" style={{ fontFamily: "'Space Grotesk'" }}>&times;</span>
          <div className="text-center">
            <div className="w-20 h-20 rounded-sm border-2 border-primary bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary" style={{ fontFamily: "'Space Grotesk'" }}>1</div>
            <p className="text-xs text-muted-foreground mt-2">言语理解</p>
          </div>
          <span className="text-3xl text-muted-foreground">=</span>
          <div className="text-center">
            <div className={`w-20 h-20 rounded-sm border-2 flex items-center justify-center text-3xl font-bold transition-all duration-500 ${
              result === 0
                ? "border-destructive bg-destructive/15 text-destructive"
                : "border-primary bg-primary/15 text-primary"
            }`} style={{ fontFamily: "'Space Grotesk'" }}>{result}</div>
            <span
              className={`text-xs mt-2 block transition-opacity duration-200 ${
                phase === 'falling'
                  ? 'opacity-0 text-muted-foreground'
                  : phase === 'settled'
                    ? 'opacity-100 text-destructive'
                    : 'opacity-100 text-muted-foreground'
              }`}
            >
              {phase === 'settled' ? '阅读障碍' : '阅读能力'}
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
              字符识别归零 — 即使理解力完好，阅读也无法进行。这就是阅读障碍的核心困境。
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* 四象限 — 纯 SVG 坐标系,viewBox 自适应缩放 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay(2) }}
        className="w-full"
      >
        <CoordinatePlane />
      </motion.div>

      {/* 逐字解码体验 — 仅在总开关打开时可进入,鼠标 hover 控制 */}
      {simEnabled && !showFocus && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowFocus(true)}
          className="mx-auto flex items-center gap-2 text-xs px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors btn-press"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          启动逐字解码体验
        </motion.button>
      )}

      {simEnabled && showFocus && (
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
      )}
    </div>
  );
}

// ============ 汉语特殊性 ============

function ChineseSpecificity() {
  const { ref, inView, delay } = useScrollReveal({ margin: "-50px", stagger: 0.1 });

  const awarenessItems = [
    { title: "复合意识", example: "长颈鹿、梅花鹿 →「短颈鳄」？", desc: "理解词语由语素组合而成的规则。" },
    { title: "同音语素意识", example: "衣 · 一 · 伊 · 医", desc: "分辨读音相同、意义不同的语素。" },
    { title: "同形语素意识", example: "花朵 / 花费；面孔 / 面条", desc: "分辨字形相同、意义不同的语素。" },
    { title: "形旁意识", example: "氵（海、江）、冫（冬、凉）、灬（煮、蒸、煎）", desc: "理解形旁提示字义类别的规律。" },
  ];

  return (
    <div ref={ref} className="space-y-8">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-foreground/80 text-lg leading-relaxed"
        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
      >
        与拼音文字以语音缺陷为主不同，
        <DecryptedText
          text="汉语阅读障碍儿童更突出地缺乏以下四种意识："
          sequential={true}
          revealDirection="start"
          animateOn="view"
          speed={80}
        />
      </motion.p>

      <div className="grid md:grid-cols-2 gap-4">
        {awarenessItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: delay(index) }}
            className="bg-card border border-border p-5 hover:border-primary/50 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-lg font-bold" style={{ fontFamily: "'Space Grotesk'" }}>{index + 1}</span>
              <h4 className="text-foreground text-base font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.title}</h4>
            </div>
            <p className="text-primary text-lg mb-2 tracking-wider" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.example}</p>
            <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay(5) }}
        className="bg-primary/8 border border-primary/30 p-6 text-center transition-colors duration-500"
      >
        <p className="text-primary text-xl md:text-2xl" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
          小学一至三年级，是阅读障碍筛查与早期干预的黄金期。
        </p>
      </motion.div>
    </div>
  );
}

// ============ 误解 vs 事实 ============

function MythsVsFacts() {
  const { ref, inView, delay } = useScrollReveal({ margin: "-50px", stagger: 0.15 });

  const items = [
    { myth: '\u201c他就是不用功\u201d', fact: '与努力程度无关' },
    { myth: '\u201c长大就好了\u201d', fact: '不会自愈，干预越早越好' },
    { myth: '\u201c看不懂字 = 笨\u201d', fact: '智力完全正常，许多障碍者另有突出天赋' },
  ];

  return (
    <div ref={ref} className="space-y-4">
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
            <p className="text-foreground text-base" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 400 }}>{item.fact}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============ 主组件 ============

export default function UnderstandSection() {
  const { theme } = useTheme();
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.1 });
  const sectionBg = theme === "dark" ? SECTION_BG_DARK : SECTION_BG_LIGHT;

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
            <Brain className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:math" />
          </div>
          <ReadingMechanism />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Languages className="w-5 h-5 text-primary" />
            <SectionHeading sectionId="understand:cn" />
          </div>
          <ChineseSpecificity />
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
