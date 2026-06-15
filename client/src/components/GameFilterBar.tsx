import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GameIntervention } from "@/types/resources";

type RegionFilter = "all" | "domestic" | "international";
type AgeFilter = "all" | "6-8" | "9-12" | "13+";
type CostFilter = "all" | "free" | "paid";

interface GameFilterBarProps {
  items: GameIntervention[];
  region: RegionFilter;
  onRegionChange: (r: RegionFilter) => void;
  skills: string[];
  onSkillsChange: (s: string[]) => void;
  ageRange: AgeFilter;
  onAgeRangeChange: (a: AgeFilter) => void;
  cost: CostFilter;
  onCostChange: (c: CostFilter) => void;
}

/* ── option sets ── */
const regionOptions: { value: RegionFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "domestic", label: "国内" },
  { value: "international", label: "国外" },
];

const ageOptions: { value: AgeFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "6-8", label: "6-8岁" },
  { value: "9-12", label: "9-12岁" },
  { value: "13+", label: "13+" },
];

const costOptions: { value: CostFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "free", label: "免费" },
  { value: "paid", label: "付费" },
];

export default function GameFilterBar({
  items,
  region,
  onRegionChange,
  skills,
  onSkillsChange,
  ageRange,
  onAgeRangeChange,
  cost,
  onCostChange,
}: GameFilterBarProps) {
  /* 技能列表：从所有 items 去重提取 */
  const allSkills = useMemo(
    () => [...new Set(items.flatMap((i) => i.skills))].sort(),
    [items],
  );

  const toggleSkill = (skill: string) => {
    onSkillsChange(
      skills.includes(skill) ? skills.filter((s) => s !== skill) : [...skills, skill],
    );
  };

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

      {/* ── 技能 ── */}
      <div className="flex items-center gap-1.5 w-full md:w-auto flex-wrap">
        <span className="text-xs text-muted-foreground mr-1 shrink-0">技能</span>
        <div className="flex flex-wrap gap-1.5">
          {allSkills.map((skill) => {
            const selected = skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
                style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 年龄 ── */}
      <div className="flex items-center gap-1.5 w-full md:w-auto">
        <span className="text-xs text-muted-foreground mr-1 shrink-0">年龄</span>
        <div className="flex gap-1">
          {ageOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={ageRange === opt.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onAgeRangeChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* ── 费用 ── */}
      <div className="flex items-center gap-1.5 w-full md:w-auto">
        <span className="text-xs text-muted-foreground mr-1 shrink-0">费用</span>
        <div className="flex gap-1">
          {costOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={cost === opt.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onCostChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
