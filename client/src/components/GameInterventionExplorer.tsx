/* ============================================================
   GameInterventionExplorer — 游戏化干预 · 全屏探索星图
   - 真·全屏沉浸：直接用 DialogPrimitive 自管 Portal，跳过本地
     DialogContent 默认的 overlay 与 zoom-in-95 弹窗动画
   - 主题感知：日间墨线纸面图纸感 / 夜间天文台仪器面板感
   - 延续 CoordinatePlane「观测台星图」视觉语言：菱形角标 +
     amber 径向光池 + 浮动星点 + 外层呼吸光环
   - 控件双轨配色：日间白底墨线 / 夜间深墨底 amber 发光描边
   ============================================================ */

import { FC, useMemo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, AlertTriangle, ArrowLeft, MousePointerClick } from "lucide-react";

import InfiniteMenu from "./InfiniteMenu";
import { Button } from "./ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

type MenuItem = { image: string; link: string; title: string; description: string };

interface GameInterventionExplorerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: MenuItem[];
  /** 父级探测出的 WebGL2 状态：null = 探测中、false = 不可用、true = 可用 */
  webGL2Ok: boolean | null;
}

/* ─── 星点坐标（夜间浮动星点，硬编码 8 个，避开中心球面 30vmin 区域） ─── */
const STAR_FIELD = [
  { x: 12, y: 18, r: 1.2, dur: 4.2, delay: 0.0 },
  { x: 22, y: 78, r: 1.6, dur: 5.0, delay: 0.6 },
  { x: 82, y: 14, r: 1.4, dur: 4.6, delay: 1.2 },
  { x: 88, y: 72, r: 1.1, dur: 5.4, delay: 0.3 },
  { x: 8, y: 52, r: 1.8, dur: 4.0, delay: 1.8 },
  { x: 94, y: 44, r: 1.3, dur: 5.2, delay: 0.9 },
  { x: 50, y: 8, r: 1.0, dur: 4.8, delay: 1.5 },
  { x: 50, y: 92, r: 1.5, dur: 4.4, delay: 0.4 },
] as const;

/* ─── 公共：菱形角标 SVG（复刻 CoordinatePlane.tsx:447-454） ─── */
const DiamondMark: FC<{ size?: number; className?: string }> = ({ size = 10, className = "fill-primary" }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden>
    <path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" className={className} />
  </svg>
);

/* ─── WebGL2 不可用的全屏降级 ─── */
const NoWebGLFallback: FC<{ onClose: () => void; isDark: boolean }> = ({ onClose, isDark }) => (
  <div
    className="flex flex-col items-center justify-center w-full h-full gap-5 p-8 text-center"
    style={{
      background: isDark
        ? "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.18 25 / 0.06) 0%, transparent 60%)"
        : "radial-gradient(ellipse at 50% 50%, oklch(0.577 0.245 27.325 / 0.04) 0%, transparent 60%)",
    }}
  >
    <DiamondMark size={14} className="fill-destructive" />
    <AlertTriangle className="w-10 h-10 text-destructive" />
    <h3
      className="text-2xl text-foreground"
      style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
    >
      当前浏览器不支持 WebGL2
    </h3>
    <p
      className="text-sm text-muted-foreground max-w-md leading-relaxed"
      style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
    >
      球面菜单需要 WebGL2 渲染。请使用最新版 Chrome / Firefox / Edge / Safari（macOS &amp; iOS 15+）打开。
    </p>
    <Button
      onClick={onClose}
      variant="outline"
      size="lg"
      className="mt-2 gap-2 border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
    >
      <ArrowLeft className="w-4 h-4" />
      返回资源列表
    </Button>
  </div>
);

/* ─── 加载中过渡态（探测 WebGL2 的瞬时显示） ─── */
const LoadingState: FC = () => (
  <div className="flex flex-col items-center justify-center w-full h-full gap-4">
    <DiamondMark size={12} className="fill-primary" />
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
    <p
      className="text-xs text-muted-foreground tracking-[0.2em] uppercase"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      Initializing
    </p>
  </div>
);

/* ─── 主组件 ─── */
const GameInterventionExplorer: FC<GameInterventionExplorerProps> = ({
  open,
  onOpenChange,
  items,
  webGL2Ok,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion();

  /* 星点：根据 prefers-reduced-motion 决定是否产生动画 props */
  const stars = useMemo(() => STAR_FIELD, []);

  /* 关闭按钮 className（主题双轨） */
  const closeBtnClass = cn(
    "absolute top-4 right-4 z-50 rounded-full p-2.5",
    "transition-all duration-300 ease-out",
    isDark
      ? // 夜间：深墨底 + 1.5px amber 发光描边 + 亮琥珀 X
        "bg-card/80 backdrop-blur-md border-[1.5px] border-primary/40 text-primary " +
          "shadow-[0_0_24px_-6px_oklch(0.72_0.14_70/0.55)] " +
          "hover:bg-card hover:border-primary/70 " +
          "hover:shadow-[0_0_32px_-4px_oklch(0.72_0.14_70/0.85)]"
      : // 日间：白底 + 1px 墨色 border + 墨色 X + hover 转琥珀
        "bg-card/95 backdrop-blur-sm border border-border text-foreground/75 " +
          "hover:bg-card hover:border-primary/60 hover:text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 " +
      "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-95"
  );

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
          <DialogPrimitive.Portal forceMount>
            {/* 故意省略 DialogPrimitive.Overlay —— 全屏内容自带背景，不要 bg-black/50 残留
                 关键：Content 自身必须用 inline style 兜底背景，避免 framer-motion 入场
                 opacity 0→1 时露出 body 透色 / WebGL canvas 透到下层 */}
            <DialogPrimitive.Content
              forceMount
              aria-describedby={undefined}
              className={cn(
                // 真·全屏：占满 100vw × 100vh，去除 Radix 默认的居中 transform / max-width / rounded / border / shadow
                "fixed inset-0 z-50 w-screen h-screen max-w-none p-0 m-0",
                "rounded-none border-0 shadow-none",
                "top-0 left-0 translate-x-0 translate-y-0"
              )}
              style={{ backgroundColor: "var(--background)" }}
            >
              <DialogPrimitive.Title className="sr-only">游戏化干预探索星图</DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                拖动球面浏览游戏化干预资源，悬停查看详情，点击进入。
              </DialogPrimitive.Description>

              <motion.div
                className="relative w-screen h-screen overflow-hidden"
                style={{ backgroundColor: "var(--background)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* ── 层 1：基础底色已由 bg-background 提供 ── */}

                {/* ── 层 2：主题氛围层 ── */}
                {isDark ? (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.14 70 / 0.10) 0%, " +
                        "oklch(0.72 0.14 70 / 0.04) 30%, transparent 60%)",
                    }}
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 45%, oklch(0.95 0.02 80) 0%, " +
                          "oklch(0.97 0.012 80) 60%, oklch(0.94 0.015 75) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, oklch(0.72 0.14 70 / 0.06) 0%, transparent 50%)",
                      }}
                    />
                  </>
                )}

                {/* ── 层 3a：点阵网格（日夜双轨） ── */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none",
                    isDark ? "opacity-40" : "opacity-60"
                  )}
                  style={{
                    backgroundImage: isDark
                      ? "radial-gradient(circle, oklch(0.92 0.01 90 / 0.08) 1px, transparent 1px)"
                      : "radial-gradient(circle, oklch(0.55 0.04 60 / 0.18) 1px, transparent 1px)",
                    backgroundSize: isDark ? "40px 40px" : "32px 32px",
                  }}
                />

                {/* ── 层 3b：浮动星点（仅夜间） ── */}
                {isDark && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    aria-hidden
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="game-explorer-star-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="0.4" />
                      </filter>
                    </defs>
                    {stars.map((s, i) => (
                      <motion.circle
                        key={i}
                        cx={s.x}
                        cy={s.y}
                        r={s.r * 0.18}
                        fill="oklch(0.85 0.12 70)"
                        filter="url(#game-explorer-star-glow)"
                        initial={{ opacity: reduceMotion ? 0.5 : 0.2, scale: 1 }}
                        animate={
                          reduceMotion
                            ? { opacity: 0.5, scale: 1 }
                            : { opacity: [0.2, 0.85, 0.2], scale: [1, 1.18, 1] }
                        }
                        transition={
                          reduceMotion
                            ? {}
                            : {
                                duration: s.dur,
                                repeat: Infinity,
                                delay: s.delay,
                                ease: "easeInOut",
                              }
                        }
                      />
                    ))}
                  </svg>
                )}

                {/* ── 层 3c：球面外层呼吸光环（仅夜间） ── */}
                {isDark && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                      className="w-[60vmin] h-[60vmin] rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, transparent 0%, transparent 58%, " +
                          "oklch(0.72 0.14 70 / 0.10) 70%, transparent 100%)",
                      }}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={
                        reduceMotion
                          ? { scale: 1, opacity: 0.5 }
                          : { scale: [1, 1.08, 1], opacity: [0.4, 0.85, 0.4] }
                      }
                      transition={
                        reduceMotion ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                      }
                    />
                  </div>
                )}

                {/* ── 层 4：球面或 fallback ── */}
                <div className="absolute inset-0 z-10">
                  {webGL2Ok === false ? (
                    <NoWebGLFallback onClose={() => onOpenChange(false)} isDark={isDark} />
                  ) : webGL2Ok === true ? (
                    <InfiniteMenu items={items} scale={1} />
                  ) : (
                    <LoadingState />
                  )}
                </div>

                {/* ── 层 5：HUD ── */}
                {webGL2Ok !== false && (
                  <>
                    {/* 左上标题块（与 CoordinatePlane 主角象限标签同款） */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                      className="absolute top-6 left-6 z-40 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <DiamondMark size={10} className="fill-primary" />
                        <span
                          className="text-[10px] tracking-[0.22em] uppercase text-primary/85"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                        >
                          Game · Observatory
                        </span>
                      </div>
                      <h2
                        className="text-xl md:text-2xl text-foreground"
                        style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
                      >
                        游戏化干预 · 探索星图
                      </h2>
                      <p
                        className="text-xs text-muted-foreground mt-1"
                        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                      >
                        拖动球面浏览 · 悬停查看 · 点击进入
                      </p>
                    </motion.div>

                    {/* 底部提示：4s 后淡出 */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: [0, 1, 1, 0], y: 0 }}
                      transition={{
                        delay: 0.6,
                        duration: 5,
                        times: [0, 0.15, 0.75, 1],
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <MousePointerClick className="w-3.5 h-3.5" />
                        <span
                          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                        >
                          滚动 / 拖拽以旋转球面
                        </span>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* 关闭按钮（双轨配色） */}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={closeBtnClass}
                  aria-label="关闭探索模式"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </AnimatePresence>
  );
};

export default GameInterventionExplorer;
