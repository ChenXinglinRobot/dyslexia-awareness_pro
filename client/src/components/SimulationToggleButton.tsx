/* ============================================================
   SimulationToggleButton — 阅读障碍模拟开关按钮

   参照同目录 ThemeToggleButton.tsx 模板,放置于 Navbar 右侧。
   - enabled=false: Eye 图标,muted-foreground
   - enabled=true : EyeOff 图标 + 琥珀色激活态 (text-primary + bg-primary/15)
   - 标准 toggle button ARIA: aria-pressed + 动态 aria-label + title

   父级通过 className 控制响应式可见性
   (例如 `hidden md:block` 或包裹在 `md:hidden` 容器内)。
   ============================================================ */

import { Eye, EyeOff } from "lucide-react";
import { useSimulation } from "@/contexts/SimulationContext";

interface SimulationToggleButtonProps {
  /** 父级传入的额外 className,通常用于响应式可见性控制 */
  className?: string;
}

export default function SimulationToggleButton({ className = "" }: SimulationToggleButtonProps) {
  const { enabled, toggle } = useSimulation();
  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "关闭模拟体验" : "开启模拟体验"}
      title={enabled ? "关闭模拟体验,恢复正常阅读" : "开启模拟体验,感受阅读障碍视角"}
      className={`p-2 rounded-sm transition-colors ${
        enabled
          ? "text-primary bg-primary/15 hover:bg-primary/25"
          : "text-muted-foreground hover:text-primary hover:bg-secondary"
      } ${className}`}
    >
      {enabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
}
