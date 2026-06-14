/* ============================================================
   AboutSection — 关于我们
   ============================================================ */

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.1 });

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="divider-glow" />
      <div className="absolute inset-0 bg-secondary/30 transition-colors duration-500" />

      <div className="container relative z-10 py-20 md:py-32" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <SectionHeading sectionId="about" />
        </motion.div>

        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(1) }} className="mb-12">
            <h3 className="text-xl text-foreground mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>项目使命</h3>
            <p className="text-foreground/80 text-base leading-relaxed mb-4" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              我们相信，打破认知壁垒的第一步不是告知，而是亲历。「字向每人」致力于通过沉浸式的交互体验，让每一位访客真正理解阅读障碍者所面对的世界——不是怜悯，而是共情；不是标签，而是理解。
            </p>
            <p className="text-foreground/80 text-base leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              我们希望每一位来到这里的人，都能经历这样一段心理旅程：亲历困难、理解机制、看到希望、走向欣赏与赋能。文字应该向每个人敞开——这是我们的信念，也是这个站点存在的意义。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(2) }} className="mb-12">
            <h3 className="text-xl text-foreground mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>团队</h3>
            <div className="bg-card border border-border p-6 transition-colors duration-500">
              <p className="text-destructive text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>[待补：作者介绍]</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(3) }}
            className="flex items-start gap-3 bg-card border border-border p-5 transition-colors duration-500">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              本站为科普性质，不构成医学诊断建议。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
