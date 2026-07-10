import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import type { GameIntervention } from "@/types/resources";

interface GameCardProps {
  item: GameIntervention;
  variant?: "default" | "featured";
  className?: string;
}

/* ── helpers ── */
const regionLabel = (region: GameIntervention["region"]) =>
  region === "domestic" ? "国内🇨🇳" : "国外🌍";

const costLabel = (cost: GameIntervention["cost"]) =>
  cost === "free" ? "免费" : cost === "freemium" ? "免费增值" : "付费";

/* ── shared style tokens ── */
const tagCls = "text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary";
const titleCls = "text-foreground text-sm font-medium";
const descCls = "text-muted-foreground text-xs";

export default function GameCard({ item, variant = "default", className }: GameCardProps) {
  const isFeatured = variant === "featured";
  const imageClass = cn(
    "w-full object-contain p-4 drop-shadow-sm",
    isFeatured ? "h-48 md:h-full" : "aspect-[4/3]",
  );
  /* 主题感知图片：应用主题由 ThemeProvider 写入 <html class="dark">，
     与 OS 的 prefers-color-scheme 脱钩（见 ThemeContext.tsx:32-43），
     所以必须用 React 主题状态来选图，不能用 <picture media="...">。 */
  const { theme } = useTheme();
  const logoSrc =
    theme === "dark" && item.logoDark
      ? item.logoDark
      : (item.logo ?? item.image);

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg overflow-hidden card-hover",
        isFeatured && "relative",
        className,
      )}
    >
      {/* 「编辑精选」角标已下线（与「仅供参考不代表背书」声明语义冲突）。
          保留 isFeatured / variant 逻辑，bento 网格跨列仍由 featured 项驱动。 */}
      {false && isFeatured && (
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded z-10">
          编辑精选
        </span>
      )}

      <div className={cn(isFeatured && "flex flex-col md:flex-row")}>
        {/* ── 图片 ── */}
        <div
          className={cn(
            "bg-muted shrink-0",
            isFeatured ? "md:w-1/2" : "w-full",
          )}
        >
          <img
            src={logoSrc}
            alt={item.name}
            onError={(e) => {
              const target = e.currentTarget;
              if (item.logoFallback && target.src !== item.logoFallback) {
                target.src = item.logoFallback;
              } else {
                target.src = `https://picsum.photos/seed/${item.id}/800/800`;
              }
            }}
            className={imageClass}
            loading="lazy"
          />
        </div>

        {/* ── 内容 ── */}
        <div className={cn("flex flex-col gap-2", isFeatured ? "p-5 md:w-1/2" : "p-4")}>
          {/* 标签行 */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={tagCls}>{regionLabel(item.region)}</span>

            {isFeatured && (
              <span className={tagCls}>{costLabel(item.cost)}</span>
            )}

            {/* 技能标签 */}
            {(isFeatured ? item.skills : item.skills.slice(0, 2)).map((s) => (
              <span key={s} className={tagCls}>
                {s}
              </span>
            ))}
            {!isFeatured && item.skills.length > 2 && (
              <span className={tagCls}>…</span>
            )}

            {isFeatured && item.isResearchBacked && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                ✓ 研究验证
              </span>
            )}
          </div>

          {/* 年龄范围 */}
          <span className="text-xs text-muted-foreground">
            {item.ageRange[0]}–{item.ageRange[1]}岁
          </span>

          {/* 标题 */}
          <h4 className={titleCls} style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {item.name}
          </h4>

          {/* 描述 */}
          <p
            className={cn(descCls, !isFeatured && "line-clamp-2")}
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            {item.desc}
          </p>

          {/* 链接 */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-auto pt-1"
          >
            访问资源
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
