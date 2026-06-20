import { Button } from "@/components/ui/button";
import type { GameIntervention } from "@/types/resources";

type RegionFilter = "all" | "domestic" | "international";

interface GameFilterBarProps {
  items: GameIntervention[];
  region: RegionFilter;
  onRegionChange: (r: RegionFilter) => void;
}

/* ── option sets ── */
const regionOptions: { value: RegionFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "domestic", label: "国内" },
  { value: "international", label: "国外" },
];

export default function GameFilterBar({
  items,
  region,
  onRegionChange,
}: GameFilterBarProps) {
  // 保留 `items` prop 接口以备后续重新启用其它筛选维度时复用（避免调用方改动）
  void items;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* ── 地域 ── */}
      <div className="flex items-center gap-1.5 w-full md:w-auto">
        <span className="text-xs text-muted-foreground mr-1 shrink-0">地域</span>
        <div className="flex gap-1">
          {regionOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={region === opt.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onRegionChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}