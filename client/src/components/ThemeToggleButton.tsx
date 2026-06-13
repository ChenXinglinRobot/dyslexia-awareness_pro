/* ============================================================
   ThemeToggleButton — 日间/夜间模式切换按钮

   桌面端和移动端各引用一份,父级通过 `className` 控制断点可见性
   (例如 `hidden md:block` 或包裹在 `md:hidden` 容器内)。
   ============================================================ */

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleButtonProps {
  /** 父级传入的额外 className,通常用于响应式可见性控制 */
  className?: string;
}

export default function ThemeToggleButton({ className = "" }: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 text-muted-foreground hover:text-primary transition-colors rounded-sm hover:bg-secondary ${className}`}
      title={theme === "dark" ? "切换到日间模式" : "切换到夜间模式"}
      aria-label={theme === "dark" ? "切换到日间模式" : "切换到夜间模式"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
