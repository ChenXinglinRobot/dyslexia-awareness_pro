/* ============================================================
   UnderstandSection — 了解阅读障碍
   包含：模拟体验、机制（简单阅读观）、汉语特殊性、误解vs事实
   体验目标一：亲身感受阅读的吃力
   体验目标二：直观看见"乘法归零"
   ============================================================ */

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Eye, AlertTriangle, Brain, Languages, X as XIcon, Check } from "lucide-react";
import { useSimulation } from "@/contexts/SimulationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FuzzyText from "./FuzzyText";
import GlitchText from "./GlitchText";
import TrueFocus from "./TrueFocus";
import DecryptedText from "./DecryptedText";

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

function ReadingMechanism() {
  const [decodeOff, setDecodeOff] = useState(false);
  const { enabled: simEnabled } = useSimulation();
  const [showFocus, setShowFocus] = useState(false);
  const { ref, inView, delay } = useScrollReveal({ margin: "-50px", stagger: 0.2 });

  // 总开关关掉时,强制收起局部体验,文字回到清晰
  useEffect(() => {
    if (!simEnabled) setShowFocus(false);
  }, [simEnabled]);

  const decodeValue = decodeOff ? 0 : 1;
  const result = decodeValue * 1;

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
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
          这是一道乘法题：任何一项受损归零，乘积都会归零。阅读障碍的核心，正是「字符识别」这一项出了问题。
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
              onClick={() => setDecodeOff(!decodeOff)}
              className={`w-20 h-20 rounded-sm border-2 flex items-center justify-center text-2xl font-bold transition-all duration-500 btn-press ${
                decodeOff
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-primary bg-primary/10 text-primary"
              }`}
              style={{ fontFamily: "'Space Grotesk'" }}
            >
              {decodeValue}
            </button>
            <p className="text-xs text-muted-foreground mt-2">字符识别</p>
            <p className="text-xs text-muted-foreground/60">(点击切换)</p>
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
            <p className="text-xs text-muted-foreground mt-2">阅读能力</p>
          </div>
        </div>
        {decodeOff && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-destructive text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            字符识别归零 — 即使理解力完好，阅读也无法进行。这就是阅读障碍的核心困境。
          </motion.p>
        )}
      </motion.div>

      {/* 四象限 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay(2) }}
        className="grid grid-cols-2 gap-3 md:gap-4 max-w-xl mx-auto"
      >
        <div className="p-4 bg-card border border-border text-center transition-colors duration-500">
          <p className="text-xs text-muted-foreground mb-1">识别+ 理解+</p>
          <p className="text-sm text-foreground/70">正常发展</p>
        </div>
        <div className="p-4 bg-primary/10 border-2 border-primary text-center relative transition-colors duration-500">
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full" />
          <p className="text-xs text-primary mb-1">识别- 理解+</p>
          <p className="text-sm text-primary font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>阅读障碍</p>
          <p className="text-xs text-muted-foreground mt-1">本站主角</p>
        </div>
        <div className="p-4 bg-card border border-border text-center transition-colors duration-500">
          <p className="text-xs text-muted-foreground mb-1">识别+ 理解-</p>
          <p className="text-sm text-foreground/70">特定理解困难 <span className="text-destructive text-xs">[待核实术语]</span></p>
        </div>
        <div className="p-4 bg-card border border-border text-center transition-colors duration-500">
          <p className="text-xs text-muted-foreground mb-1">识别- 理解-</p>
          <p className="text-sm text-foreground/70">全面发展落后</p>
        </div>
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
            鼠标移到任意字上 — 只有它会清晰
          </p>
          <div className="flex justify-center">
            <TrueFocus
              sentence="一次 只能 看清 一个 字"
              separator=" "
              manualMode={true}
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
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Understanding Dyslexia</p>
          <GlitchText
            as="h2"
            respectSimulation
            className="text-3xl md:text-5xl text-foreground"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            了解阅读障碍
          </GlitchText>
        </motion.div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>模拟体验</h3>
          </div>
          <p className="text-muted-foreground text-base mb-6 max-w-2xl" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
            点击下方按钮，感受阅读障碍儿童在阅读时可能经历的视觉拥挤与认知过载。
          </p>
          <DyslexiaSimulator />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>一道乘法题，归零了整个世界</h3>
          </div>
          <ReadingMechanism />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>汉语的特殊性</h3>
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
