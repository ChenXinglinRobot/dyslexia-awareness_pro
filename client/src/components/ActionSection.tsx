/* ============================================================
   ActionSection — 让我们共同努力
   包含：个人可以、社会可以（含排版调适体验目标三）、优势视角、金句
   ============================================================ */

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Building2, Sparkles, SlidersHorizontal, Clock, MessageCircle, Home as HomeIcon, GraduationCap, Stethoscope, InfoIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CircularGallery from "./CircularGallery";
import { famousDyslexics } from "@/data/famousDyslexics";
import FamousDyslexicsModal from "./FamousDyslexicsModal";

const SECTION_BG_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-action-TcCGm2ayK8j4zP26qRa3WD.webp";
const SECTION_BG_LIGHT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-action-light-NvKmNJuEMR3fiRz3FNaBFi.webp";

function TypographyAdjuster() {
  const [fontSize, setFontSize] = useState(16);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);

  const sampleText = "阅读障碍的孩子并非不聪明，他们只是需要一个更友好的阅读环境。当我们调整文字的呈现方式，同一段文字可以变得截然不同。这不是迁就，而是尊重每个人认知方式的差异。";

  return (
    <div className="bg-card border border-border p-6 md:p-8 transition-colors duration-500">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <h4 className="text-foreground text-sm font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          亲手调一调，感受文字的呼吸
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">字号: {fontSize}px</label>
          <input type="range" min="12" max="28" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-1 bg-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">字间距: {letterSpacing}px</label>
          <input type="range" min="0" max="8" value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full h-1 bg-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">行距: {lineHeight.toFixed(1)}</label>
          <input type="range" min="12" max="30" value={lineHeight * 10} onChange={(e) => setLineHeight(Number(e.target.value) / 10)}
            className="w-full h-1 bg-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary" />
        </div>
      </div>

      <div className="bg-background p-6 border border-border transition-colors duration-500">
        <p className="text-foreground/80 transition-all duration-300" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300, fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px`, lineHeight }}>
          {sampleText}
        </p>
      </div>

      <p className="text-sm text-muted-foreground mt-4 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
        调整字号、字间距与行距等排版参数，能显著降低阅读障碍者的视觉拥挤效应。
      </p>
    </div>
  );
}

export default function ActionSection() {
  const { theme } = useTheme();
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.1 });
  const sectionBg = theme === "dark" ? SECTION_BG_DARK : SECTION_BG_LIGHT;
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="action" className="relative overflow-hidden">
      <div className="divider-glow" />

      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" style={{ backgroundImage: `url(${sectionBg})` }} />
      </div>
      <div className="absolute inset-0 bg-background/92 transition-colors duration-500" />

      <div className="container relative z-10 py-20 md:py-32" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Take Action Together</p>
          <h2 className="text-3xl md:text-5xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>让我们共同努力</h2>
        </motion.div>

        {/* 个人可以 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <HomeIcon className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>个人可以</h3>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(1) }}
            className="bg-card border border-border p-6 mb-4 transition-colors duration-500">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-primary" />
              <h4 className="text-foreground text-base font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>家庭与教养陪伴</h4>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              了解病因学基础，面对现实并宽容失败；改善早期家庭阅读环境；着重挖掘孩子在创造性思维与空间想象力等高层次问题解决上的独特优势。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(2) }}
            className="bg-primary/8 border border-primary/30 p-6 text-center transition-colors duration-500">
            <p className="text-primary text-lg" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}>
              以及最朴素的三件事：不催促、不嘲笑、尽早评估。
            </p>
          </motion.div>
        </div>

        {/* 社会可以 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>社会可以</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: delay(3) }}
              className="bg-card border border-border p-5 transition-colors duration-500">
              <div className="flex items-center gap-2 mb-3">
                <Stethoscope className="w-4 h-4 text-primary" />
                <h4 className="text-foreground text-sm font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>医疗与康复机构</h4>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                进行视听感知觉与认知行为训练；阅读障碍与 ADHD 共患比例较高，若共患应积极协同治疗。
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: delay(4) }}
              className="bg-card border border-border p-5 transition-colors duration-500">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h4 className="text-foreground text-sm font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>学校与特殊教育</h4>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                普及知识、消除嘲笑；推行"干预应答模式"（RTI，三层级应对体系）；落实考试加大字号、延长时间、口语作答等制度调适。
              </p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(5) }} className="mb-6">
            <TypographyAdjuster />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(6) }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-4 bg-card border border-border p-5 transition-colors duration-500">
              <Clock className="w-6 h-6 text-primary shrink-0" />
              <p className="text-foreground text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>延长考试时间</p>
            </div>
            <div className="flex items-center gap-4 bg-card border border-border p-5 transition-colors duration-500">
              <MessageCircle className="w-6 h-6 text-primary shrink-0" />
              <p className="text-foreground text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>允许口语作答</p>
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: delay(7) }}
            className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
            排版调适只是起点。在制度层面，特殊教育支持同样可以为他们「调一调参数」。
          </motion.p>
        </div>

        {/* 优势视角 */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: delay(8) }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>优势视角</h3>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-destructive/5 border border-primary/30 p-8 md:p-12 transition-colors duration-500">
            <p className="text-foreground text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}>
              阅读障碍不只意味着困难。许多阅读障碍者在艺术、空间科学、创新思维与审辨性思维上拥有独特天赋。科普的终点不是怜悯，而是欣赏与赋能。
            </p>
          </div>
        </motion.div>

        {/* 名人画廊 */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: delay(9) }} className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl md:text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>阅读障碍名人</h3>
          </div>
          <div className="bg-card border border-border p-4 md:p-6" style={{ height: "480px" }}>
            <CircularGallery
              items={famousDyslexics.map(p => ({ image: p.image, text: p.name }))}
              bend={2}
              textColor="#545050"
              borderRadius={0.1}
              scrollSpeed={1.5}
              disabled={showModal}
            />
            <p className="text-center text-muted-foreground text-sm mt-4" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              以上名人均为已确诊的阅读障碍者，他们在各自领域做出了杰出贡献。
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                <InfoIcon className="w-4 h-4" />
                了解详情
              </button>
            </div>
          </div>
        </motion.div>

        <FamousDyslexicsModal open={showModal} onOpenChange={setShowModal} />

        {/* 金句 */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: delay(10) }} className="text-center py-12">
          <p className="text-3xl md:text-5xl text-primary leading-tight" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
            「文字应该向每个人敞开。」
          </p>
        </motion.div>
      </div>
    </section>
  );
}
