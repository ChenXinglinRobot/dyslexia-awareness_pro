/* ============================================================
   AboutSection — 关于我们
   ============================================================ */

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const ABOUT_BG_DARK = "/bg/about-bg-dark.webp";
const ABOUT_BG_LIGHT = "/bg/about-bg-light.webp";

export default function AboutSection() {
  const { theme } = useTheme();
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.1 });
  const sectionBg = theme === "dark" ? ABOUT_BG_DARK : ABOUT_BG_LIGHT;

  return (
    <section id="about" className="relative isolate overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="about-backdrop absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${sectionBg})` }}
      />
      <div aria-hidden="true" className="about-backdrop-wash absolute inset-0 transition-colors duration-500" />

      <div className="container relative z-10 py-20 md:py-32" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <SectionHeading sectionId="about" />
        </motion.div>

        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(1) }} className="max-w-2xl mb-10 md:mb-12">
            <h3 className="text-xl sm:text-2xl text-foreground mb-5 text-balance" style={{ fontFamily: "'Noto Serif SC', serif" }}>我们在做什么</h3>
            <div className="space-y-5">
              <p className="text-foreground/80 text-base leading-relaxed text-pretty" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                有些孩子读得慢、认字困难、经常写错字，却常被误解为不认真、不努力。
              </p>
              <p className="text-foreground/80 text-base leading-relaxed text-pretty" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                「阅见不同」想把这些困难讲清楚：它们可能从哪里来，会怎样影响阅读，又有哪些支持方式能够真正帮上忙。
              </p>
              <p className="text-foreground/80 text-base leading-relaxed text-pretty" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                这里有互动体验、简明解释，也有可以继续查找的专业资源。希望每多一分理解，就能少一点责备，多一种可能。
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(2) }} className="mb-12">
            <h3 className="text-xl sm:text-2xl text-foreground mb-5 text-balance" style={{ fontFamily: "'Noto Serif SC', serif" }}>团队</h3>
            <div className="max-w-3xl">
              <div className="space-y-4">
                <p className="text-foreground text-base leading-relaxed text-pretty" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 500 }}>
                  读悦 ReadLeap 是一支由学生组成的创新实践团队，关注汉语阅读障碍科普与数字化支持，探索人工智能与游戏化设计在阅读支持中的应用。
                </p>
                <p className="text-foreground/80 text-base leading-relaxed text-pretty" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                  “阅见不同”是由 ReadLeap 团队成员以个人身份建设并维护的非经营性科普网站。
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/60">
                <p className="text-muted-foreground text-sm mb-2" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                  关注我们
                </p>
                {/* TODO: 在此处补充正式的小红书品牌图标。 */}
                <a
                  href="https://xhslink.com/m/AXoKxLT0orc"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="在小红书关注读悦 ReadLeap（新窗口打开）"
                  className="inline-flex max-w-full rounded-sm text-primary font-medium underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  读悦 ReadLeap
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay(3) }}>
            <div
              role="note"
              aria-labelledby="about-disclaimer-title"
              className="flex items-start gap-3 bg-card border border-border p-5 transition-colors duration-500">
              <Info aria-hidden="true" className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div className="min-w-0">
                <h4 id="about-disclaimer-title" className="text-foreground text-sm mb-1.5" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}>
                  说明
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                  本站内容仅供科普与交流，不构成医学诊断、治疗或个体化医疗建议。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
