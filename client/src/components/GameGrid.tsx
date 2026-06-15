import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import GameFilterBar from "./GameFilterBar";
import GameCard from "./GameCard";
import type { GameIntervention } from "@/types/resources";

type RegionFilter = "all" | "domestic" | "international";
type AgeFilter = "all" | "6-8" | "9-12" | "13+";
type CostFilter = "all" | "free" | "paid";

interface GameGridProps {
  items: GameIntervention[];
}

export default function GameGrid({ items }: GameGridProps) {
  const [region, setRegion] = useState<RegionFilter>("all");
  const [skills, setSkills] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<AgeFilter>("all");
  const [cost, setCost] = useState<CostFilter>("all");

  /* ── 过滤逻辑 ── */
  const filtered = useMemo(() => {
    return items.filter((item) => {
      // 地域
      if (region !== "all" && item.region !== region) return false;

      // 技能：交集非空；空选集 = 全部通过
      if (skills.length > 0 && !item.skills.some((s) => skills.includes(s))) return false;

      // 年龄范围重叠
      if (ageRange !== "all") {
        const [itemMin, itemMax] = item.ageRange;
        if (ageRange === "6-8" && !(itemMax >= 6 && itemMin <= 8)) return false;
        if (ageRange === "9-12" && !(itemMax >= 9 && itemMin <= 12)) return false;
        if (ageRange === "13+" && itemMax < 13) return false;
      }

      // 费用
      if (cost !== "all") {
        if (cost === "free" && item.cost !== "free") return false;
        if (cost === "paid" && item.cost === "free") return false;
        // "paid" 匹配 paid + freemium（非免费）
      }

      return true;
    });
  }, [items, region, skills, ageRange, cost]);

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
      <GameFilterBar
        items={items}
        region={region}
        onRegionChange={setRegion}
        skills={skills}
        onSkillsChange={setSkills}
        ageRange={ageRange}
        onAgeRangeChange={setAgeRange}
        cost={cost}
        onCostChange={setCost}
      />

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
