import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ActiveNode = "decode" | "language" | "comprehension" | null;

interface MiniSVRBreadcrumbProps {
  activeNode?: ActiveNode;
  /** sm = 右上角绝对定位小路标（父级需 relative）; md = step3 主区内联横条 */
  size?: "sm" | "md";
  caption?: string;
  className?: string;
}

/**
 * 共享迷你 SVR 路标横条：[字词识别] × [言语理解] = [阅读理解]。
 * 激活节点用 text-primary + ring + bg-primary/10 高亮，并 whileInView 一次轻脉冲；
 * 非激活节点用 text-muted-foreground。useReducedMotion 时跳过脉冲。
 * step3/4/7 各就地渲染一份，不做跨 section layoutId morph。
 */
const NODES: { key: Exclude<ActiveNode, null>; label: string }[] = [
  { key: "decode", label: "字词识别" },
  { key: "language", label: "言语理解" },
  { key: "comprehension", label: "阅读理解" },
];

export default function MiniSVRBreadcrumb({
  activeNode = null,
  size = "md",
  caption,
  className,
}: MiniSVRBreadcrumbProps) {
  const reduced = useReducedMotion();
  const activeLabel = activeNode
    ? NODES.find((n) => n.key === activeNode)?.label
    : undefined;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        size === "sm"
          ? "max-md:static max-md:mb-3 md:absolute md:top-3 md:right-3 z-10 text-caption"
          : "text-sm",
        className,
      )}
      role="img"
      aria-label={`简单阅读观路标：字词识别 乘以 言语理解 等于 阅读理解${activeLabel ? `，当前聚焦${activeLabel}` : ""}`}
    >
      {NODES.map((node, i) => {
        const isActive = activeNode === node.key;
        return (
          <div key={node.key} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-muted-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {i === 1 ? "×" : "="}
              </span>
            )}
            <motion.span
              initial={false}
              whileInView={isActive && !reduced ? { scale: [1, 1.06, 1] } : undefined}
              viewport={{ once: true, margin: "-80px" }}
              transition={isActive ? { duration: 1.2, times: [0, 0.5, 1] } : undefined}
              className={cn(
                "inline-flex items-center rounded-sm border px-2 py-0.5 transition-colors",
                isActive
                  ? "border-primary/40 bg-primary/10 text-primary ring-1 ring-primary/40"
                  : "border-border text-muted-foreground",
              )}
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {node.label}
            </motion.span>
          </div>
        );
      })}
      {caption && (
        <span className="ml-1 text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          {caption}
        </span>
      )}
    </div>
  );
}
