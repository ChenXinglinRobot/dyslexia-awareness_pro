/* ============================================================
   IncomingGameStrip — 游戏化干预 · 研究中的国内探索

   承载仍在学术原型阶段的游戏（status: "research-prototype"）：
   - 不进入主 Bento 网格
   - 不进入全屏球面探索
   - 用横向条带列表呈现，以虚线边框 + 半透明卡片与主网格视觉区分
   - 主 CTA「查看论文」指向 paperUrl（DOI 直链）

   项目约定：新 motion 用 whileInView，避免 useScrollReveal 的 ref-host silent contract
   ============================================================ */

import { motion } from "framer-motion";
import { Beaker, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import type { GameIntervention } from "@/types/resources";

interface IncomingGameStripProps {
  items: GameIntervention[];
}

const regionLabel = (region: GameIntervention["region"]) =>
  region === "domestic" ? "🇨🇳 国内" : "🌍 国外";

export default function IncomingGameStrip({ items }: IncomingGameStripProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 入参为空不渲染（保留这层判断，避免以后清空数据时还出现一个空标题）
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "mt-10 pt-8 border-t border-dashed transition-colors duration-500",
        isDark ? "border-primary/25" : "border-primary/30",
      )}
    >
      {/* ── 标题区 ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-5"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Beaker className="w-4 h-4 text-primary" />
          <span
            className="text-[10px] tracking-[0.22em] uppercase text-primary/80"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            Under Exploration
          </span>
        </div>
        <h4
          className="text-lg text-foreground"
          style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
        >
          国内游戏化干预 · 探索中
        </h4>
        <p
          className="text-xs text-muted-foreground mt-1.5 max-w-2xl leading-relaxed"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          国内中文阅读障碍游戏化干预的研发探索；目前为学术研究阶段，尚未商用——相关论文已公开发表，可点击「查看论文」跳转 DOI。
        </p>
      </motion.div>

      {/* ── 卡片列表（横向条带） ── */}
      <ul className="space-y-3">
        {items.map((item, idx) => {
          const visibleSkills = item.skills.slice(0, 3);
          const overflow = item.skills.length - visibleSkills.length;

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
              className={cn(
                "rounded-lg border border-dashed p-4 md:p-5",
                "transition-colors duration-500",
                isDark
                  ? "bg-card/40 border-amber-400/30 hover:border-amber-400/55"
                  : "bg-card/55 border-amber-500/35 hover:border-amber-500/60",
              )}
            >
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 gap-3">
                {/* ── 左侧：核心信息 ── */}
                <div className="flex-1 min-w-0">
                  {/* 徽标行 */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {/* 研究原型徽标 */}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full",
                        "border border-dashed",
                        isDark
                          ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                          : "bg-amber-500/10 text-amber-700 border-amber-500/45",
                      )}
                      style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 500 }}
                    >
                      <Beaker className="w-3 h-3" />
                      研究原型
                    </span>

                    {/* 区域 */}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                      style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                    >
                      {regionLabel(item.region)}
                    </span>

                    {/* 年龄 */}
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                    >
                      {item.ageRange[0]}–{item.ageRange[1]}岁
                    </span>
                  </div>

                  {/* 名称 */}
                  <h5
                    className="text-base text-foreground mb-1.5"
                    style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
                  >
                    {item.name}
                  </h5>

                  {/* 描述 */}
                  <p
                    className="text-xs text-muted-foreground leading-relaxed mb-2"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>

                  {/* 技能标签 */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {visibleSkills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                      >
                        {s}
                      </span>
                    ))}
                    {overflow > 0 && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                      >
                        …
                      </span>
                    )}
                  </div>
                </div>

                {/* ── 右侧：DOI + CTA ── */}
                <div className="md:w-64 shrink-0 md:border-l md:border-dashed md:pl-6 md:flex md:flex-col md:justify-center gap-2">
                  <div>
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground block mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                    >
                      Paper · DOI
                    </span>
                    <code
                      className={cn(
                        "text-[11px] block break-all leading-relaxed",
                        isDark ? "text-foreground/75" : "text-foreground/80",
                      )}
                      style={{ fontFamily: "'Space Mono', 'Menlo', monospace" }}
                    >
                      {item.paperDoi}
                    </code>
                  </div>

                  {item.paperUrl && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn(
                        "mt-2 gap-1.5 self-start",
                        isDark
                          ? "border-amber-400/40 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/70 hover:text-amber-200"
                          : "border-amber-500/45 text-amber-700 hover:bg-amber-500/10 hover:border-amber-500/70",
                      )}
                    >
                      <a
                        href={item.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`查看 ${item.name} 的论文`}
                      >
                        查看论文
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}