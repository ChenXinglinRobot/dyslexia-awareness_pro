import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import GameFilterBar from "./GameFilterBar";
import GameCard from "./GameCard";
import type { GameIntervention } from "@/types/resources";

type RegionFilter = "all" | "domestic" | "international";

interface GameGridProps {
  items: GameIntervention[];
}

export default function GameGrid({ items }: GameGridProps) {
  const [region, setRegion] = useState<RegionFilter>("all");

  /* ── 过滤逻辑 ── */
  const filtered = useMemo(() => {
    return items.filter((item) => {
      // 地域
      if (region !== "all" && item.region !== region) return false;

      return true;
    });
  }, [items, region]);

  /* ── Featured 选择 ── */
  const featuredItem = useMemo(() => {
    return (
      filtered.find((i) => i.isResearchBacked && i.cost === "free") ??
      filtered[0] ??
      null
    );
  }, [filtered]);

  return (
    <div>
      <GameFilterBar items={items} region={region} onRegionChange={setRegion} />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          没有找到匹配的资源，试试调整筛选条件
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const isFeatured = item === featuredItem;
            return (
              <GameCard
                key={item.id}
                item={item}
                variant={isFeatured ? "featured" : "default"}
                className={cn(isFeatured && "md:col-span-2")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}