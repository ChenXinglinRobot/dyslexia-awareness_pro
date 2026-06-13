/* ============================================================
   HeroSection — 首页英雄区域
   设计：文字右侧布局（配合左侧光源）+ 打字机动态效果
   复用 book-notes 的 typewriter 状态机逻辑
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import SideRays from "./SideRays/SideRays";

// 背景图 — 深色/浅色各一张
const HERO_BG_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/hero-bg-L6admPuuAYFKMwipXMbsMf.webp";
const HERO_BG_LIGHT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/hero-bg-light-MbtzYKLaXMW8jVkJmGGCGP.webp";

// 打字机 taglines
const taglines = [
  "文字应该向每个人敞开",
  "不是不努力，只是看见的世界不一样",
  "理解，是给他们最温柔的礼物",
];

export default function HeroSection() {
  const { theme } = useTheme();

  // ===== 打字机效果（复用 book-notes 状态机） =====
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const currentText = taglines[taglineIndex];
    const speed = isDeleting ? 40 : 80;

    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }
      }
    }, speed);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [displayText, isDeleting, taglineIndex]);

  // ===== 数字动画 =====
  const [count, setCount] = useState(0);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const target = 40;
    const duration = 2000;
    const step = duration / target;
    let current = 0;

    countRef.current = setInterval(() => {
      current++;
      setCount(current);
      if (current >= target) {
        if (countRef.current) clearInterval(countRef.current);
      }
    }, step);

    return () => { if (countRef.current) clearInterval(countRef.current); };
  }, []);

  const scrollToUnderstand = () => {
    document.querySelector("#understand")?.scrollIntoView({ behavior: "smooth" });
  };

  // 滚动检测：只在前半屏显示光效
  const [showRays, setShowRays] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowRays(window.scrollY < window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === "dark";
  const heroBg = isDark ? HERO_BG_DARK : HERO_BG_LIGHT;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* 叠加层 — 右侧深（保护文字可读性），左侧透（展示光源） */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        isDark
          ? "bg-gradient-to-l from-[oklch(0.15_0.02_250/0.88)] via-[oklch(0.15_0.02_250/0.55)] to-[oklch(0.15_0.02_250/0.25)]"
          : "bg-gradient-to-l from-[oklch(0.97_0.012_80/0.88)] via-[oklch(0.97_0.012_80/0.5)] to-[oklch(0.97_0.012_80/0.15)]"
      }`} />
      <div className={`absolute inset-0 transition-colors duration-700 ${
        isDark
          ? "bg-gradient-to-t from-[oklch(0.15_0.02_250/0.8)] via-transparent to-[oklch(0.15_0.02_250/0.2)]"
          : "bg-gradient-to-t from-[oklch(0.97_0.012_80/0.7)] via-transparent to-transparent"
      }`} />

      {/* 光效 — 只在首屏显示，仅暗色模式 */}
      {isDark && (
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{ opacity: showRays ? 0.8 : 0 }}
        >
          <SideRays
            origin="top-right"
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            speed={2.5}
            intensity={3}
            spread={2.0}
            tilt={0}
            saturation={1.25}
            blend={0.75}
            falloff={2.0}
            opacity={0.8}
          />
        </div>
      )}

      {/* 内容区 — 右侧对齐 */}
      <div className="container relative z-10 pt-20">
        <div className="flex justify-end">
          <div className="max-w-2xl text-right">
            {/* 英文装饰标题 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-primary text-sm tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              Dyslexia Awareness
            </motion.p>

            {/* 主标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              他们不是
              <span className="text-primary">不努力</span>
              <br />
              只是看见的世界
              <br />
              <span className={isDark ? "text-[oklch(0.65_0.18_25)]" : "text-[oklch(0.55_0.18_25)]"}>不一样</span>
            </motion.h1>

            {/* 打字机副标题 — 复用 book-notes 逻辑 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-8 mb-8 flex justify-end"
            >
              <p
                className="text-lg text-muted-foreground typewriter-cursor inline-block"
                style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}
              >
                {displayText}
              </p>
            </motion.div>

            {/* 核心数据 — 内容包 A */}
            {/* 出处：《专家意见》第186页 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-8 p-6 border-r-2 border-primary bg-card/60 backdrop-blur-sm text-right"
            >
              <p className="text-foreground text-lg leading-relaxed mb-2" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 400 }}>
                我国学龄儿童汉语阅读障碍患病率约为 3.45%～8%。
              </p>
              <p className="text-muted-foreground text-base leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                一个 <span className="text-primary font-bold text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{count}</span> 人的班级里，可能坐着 <span className={`font-bold text-2xl ${isDark ? "text-[oklch(0.65_0.18_25)]" : "text-[oklch(0.55_0.18_25)]"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1</span> 到 <span className={`font-bold text-2xl ${isDark ? "text-[oklch(0.65_0.18_25)]" : "text-[oklch(0.55_0.18_25)]"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3</span> 个这样的孩子。
              </p>
              <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                数据来源：王久菊等. 汉语发展性阅读障碍诊断与干预的专家意见[J]. 中国心理卫生杂志, 2023, 37(3): 185-191.
              </p>
            </motion.div>

            {/* 行动按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-end"
            >
              <button
                onClick={scrollToUnderstand}
                className="px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 btn-press"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                了解阅读障碍
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 向下滚动提示 */}
      <motion.button
        onClick={scrollToUnderstand}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-xs tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SCROLL</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
