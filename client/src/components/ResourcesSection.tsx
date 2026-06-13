/* ============================================================
   ResourcesSection — 社会资源
   ============================================================ */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ClipboardList, BookOpen, Building } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const SECTION_BG_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-resources-Lewy7Hs2KY2GAPVNgUiHwD.webp";
const SECTION_BG_LIGHT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-resources-light-Yuw2okRBVT6i8Mn6NYWwwg.webp";

const institutions = [
  { name: "北京大学第六医院", desc: "国家精神心理疾病临床医学研究中心，从事阅读障碍临床诊断与研究。", url: "https://www.pkuh6.cn" },
  { name: "北京师范大学认知神经科学与学习国家重点实验室", desc: "开展阅读障碍的认知神经机制研究与教育干预方案开发。", url: "https://brain.bnu.edu.cn" },
  { name: "华中科技大学同济医学院附属同济医院", desc: "儿童发育行为科开展阅读障碍的临床评估与干预。", url: "https://www.tjh.com.cn" },
  { name: "中南大学湘雅二医院", desc: "精神卫生研究所从事儿童青少年阅读障碍的临床与科研工作。", url: "https://www.xyeyy.com" },
  { name: "深圳市康宁医院（深圳市精神卫生中心）", desc: "开展儿童发展性阅读障碍的筛查与早期干预服务。", url: "https://www.szknhospital.com" },
  { name: "首都医科大学附属北京天坛医院", desc: "神经内科团队参与阅读障碍的神经影像学研究。", url: "https://www.bjtth.org" },
];

const screeningClues = [
  "朗读和阅读速度慢且错误多",
  "阅读时出现漏字、错字、猜字等现象",
  "常混淆字形相近字词的意义",
  "不理解字在词或句子中的意思",
  "很难找出文章或段落的重点",
  "由汉字识别困难带来的听写问题，如难以完成听写/默写任务",
  "书写时加减笔画、偏旁部首颠倒或左右镜像倒写",
  "[待补：筛查线索]",
];

export default function ResourcesSection() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sectionBg = theme === "dark" ? SECTION_BG_DARK : SECTION_BG_LIGHT;

  return (
    <section id="resources" className="relative overflow-hidden">
      <div className="divider-glow" />
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" style={{ backgroundImage: `url(${sectionBg})` }} />
      </div>
      <div className="absolute inset-0 bg-background/94 transition-colors duration-500" />

      <div className="container relative z-10 py-20 md:py-32" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Social Resources</p>
          <h2 className="text-3xl md:text-5xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>社会资源</h2>
        </motion.div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>研究机构与医疗资源</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {institutions.map((inst, index) => (
              <motion.a key={index} href={inst.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card border border-border p-5 hover:border-primary/50 transition-all card-hover block">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-foreground text-sm font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>{inst.name}</h4>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>{inst.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>筛查线索清单</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>以下为面向家长/教师的观察参考线索：</p>
          <div className="bg-card border border-border p-6 transition-colors duration-500">
            <ul className="space-y-3">
              {screeningClues.map((clue, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary text-xs mt-1.5 shrink-0" style={{ fontFamily: "'Space Grotesk'" }}>{String(index + 1).padStart(2, '0')}</span>
                  <p className={`text-sm leading-relaxed ${clue.startsWith('[') ? 'text-destructive' : 'text-foreground/80'}`} style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>{clue}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                以上仅为观察线索，不能替代专业评估。如有疑虑，请寻求医疗机构或专业人员的正式筛查。
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>参考文献</h3>
          </div>
          <div className="bg-card border border-border p-6 transition-colors duration-500">
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-foreground/80 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                王久菊, 孟祥芝, 李红, 等. 汉语发展性阅读障碍诊断与干预的专家意见[J]. 中国心理卫生杂志, 2023, 37(3): 185-191. DOI: 10.3969/j.issn.1000-6729.2023.03.001
              </li>
              <li className="text-destructive text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>[待补：文献条目]</li>
              <li className="text-destructive text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>[待补：文献条目]</li>
              <li className="text-destructive text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>[待补：文献条目]</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
