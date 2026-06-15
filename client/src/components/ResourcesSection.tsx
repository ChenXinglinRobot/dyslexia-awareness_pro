/* ============================================================
   ResourcesSection — 社会资源
   4 个子区：研究机构（FlowingMenu）/ 筛查线索 / 游戏化干预（全屏 GameInterventionExplorer）/ 参考文献
   ============================================================ */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, BookOpen, Building, Gamepad2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";
import GameInterventionExplorer from "./GameInterventionExplorer";
import GameGrid from "./GameGrid";
import { hospitals, researchInstitutes } from "@/data/institutions";
import { onlineResources } from "@/data/onlineResources";
import { gameInterventions } from "@/data/gameInterventions";
import ResourceTabs from "./ResourceTabs";

const SECTION_BG_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-resources-Lewy7Hs2KY2GAPVNgUiHwD.webp";
const SECTION_BG_LIGHT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/section-resources-light-Yuw2okRBVT6i8Mn6NYWwwg.webp";

// TODO: 真资源 — 第 8 条占位"[待补：筛查线索]"是给真线索留的位。
// 找到正式筛查量表后（如 DCCC、汉字阅读障碍筛查表等），直接替换该字符串。
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

/* ---- WebGL2 探测：替 ErrorBoundary 的 fallback prop（ErrorBoundary 不支持 fallback） ---- */
function detectWebGL2(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

export default function ResourcesSection() {
  const { theme } = useTheme();
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.2 });
  const sectionBg = theme === "dark" ? SECTION_BG_DARK : SECTION_BG_LIGHT;

  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  // 探测 WebGL2 一次（懒到用户点按钮再做首次探测，避开服务端渲染 / 首屏白屏）
  const [webGL2Ok, setWebGL2Ok] = useState<boolean | null>(null);
  useEffect(() => {
    if (gameMenuOpen && webGL2Ok === null) {
      setWebGL2Ok(detectWebGL2());
    }
  }, [gameMenuOpen, webGL2Ok]);

  // FlowingMenu 配色（深浅双轨，贴近 token 体系）
  // 行底 bg / 静态文字 / 行间线 / marquee 高亮 / marquee 文字
  // bg 改为 transparent:底色交给每张 .menu__item 自己(用 var(--card)),
  // 让错位卡片像参差的纸片浮在 section 背景上,而不是一整块矩形色块。
  const flowBg = "transparent";
  const flowText = theme === "dark" ? "oklch(0.92 0.01 90)" : "oklch(0.25 0.04 50)";
  const flowBorder = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const flowMarqueeBg = theme === "dark" ? "oklch(0.72 0.14 70)" : "oklch(0.55 0.14 70)";
  const flowMarqueeText = theme === "dark" ? "oklch(0.15 0.02 250)" : "oklch(0.98 0.005 80)";

  return (
    <section id="resources" className="relative overflow-hidden">
      <div className="divider-glow" />
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" style={{ backgroundImage: `url(${sectionBg})` }} />
      </div>
      {/* 还原为显式 #F9F4EC 纸色覆盖层(暗色用 --background 暗调),
          跟下面卡片的 #F0E6DA 拉开颜色对比,卡片边界由对比度决定,
          不再依赖透明度(color-mix 跟浅背景对比度太低,几乎看不出层次)。 */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: theme === "dark" ? "oklch(0.15 0.02 250)" : "#F9F4EC" }}
      />

      <div className="container relative z-10 py-20 md:py-32" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <SectionHeading sectionId="resources" />
        </motion.div>

        {/* ===================== 医疗与研究资源（三 Tab） ===================== */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>医疗与研究资源</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
            家长挂号入口 / 研究者实验室入口 / 一线信息源 3 类入口
          </p>
          <ResourceTabs
            hospitals={hospitals}
            institutes={researchInstitutes}
            onlineResources={onlineResources}
            inView={inView}
            delay={delay}
            flowBg={flowBg}
            flowText={flowText}
            flowBorder={flowBorder}
            flowMarqueeBg={flowMarqueeBg}
            flowMarqueeText={flowMarqueeText}
          />
        </div>

        {/* ===================== 筛查线索清单 ===================== */}
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

        {/* ===================== 游戏化干预 ===================== */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>游戏化干预</h3>
          </div>
          <GameGrid items={gameInterventions} />
        </div>

        {/* ===================== 参考文献 ===================== */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>参考文献</h3>
          </div>
          <div className="bg-card border border-border p-6 transition-colors duration-500">
            {/* TODO: 真资源 — 下面 3 条 [待补：文献条目] 是占位，找到真实文献后替换
                格式参考第 1 条：《标题》[J]. 期刊, 年, 卷(期): 起止页. DOI: xxxx
                建议包成 <a> 链到 DOI/期刊页，纯文本也行 */}
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

      {/* ===================== 全屏探索：游戏化干预星图 ===================== */}
      <GameInterventionExplorer
        open={gameMenuOpen && gameInterventions.length > 0}
        onOpenChange={(open) => {
          setGameMenuOpen(open);
          if (!open) setWebGL2Ok(null); // 关闭时重置探测状态，下次打开重新探测
        }}
        items={gameInterventions}
        webGL2Ok={webGL2Ok}
      />
    </section>
  );
}
