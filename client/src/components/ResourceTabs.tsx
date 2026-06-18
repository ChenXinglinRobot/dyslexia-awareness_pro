import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FlowingMenu from "./FlowingMenu";
import ResourceDetailSheet from "./ResourceDetailSheet";
import type {
  Resource,
  Hospital,
  ResearchInstitute,
  OnlineResource,
} from "@/types/resources";

type TabKey = "hospital" | "institute" | "online";

interface ResourceTabsProps {
  hospitals: Hospital[];
  institutes: ResearchInstitute[];
  onlineResources: OnlineResource[];
  inView?: boolean;
  delay?: (index: number) => number;
  flowBg: string;
  flowText: string;
  flowBorder: string;
  flowMarqueeBg: string;
  flowMarqueeText: string;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "hospital", label: "医院与门诊" },
  { key: "institute", label: "高校与研究机构" },
  { key: "online", label: "网络资源" },
];

export default function ResourceTabs({
  hospitals,
  institutes,
  onlineResources,
  inView,
  delay,
  flowBg,
  flowText,
  flowBorder,
  flowMarqueeBg,
  flowMarqueeText,
}: ResourceTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("hospital");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  /* ── 当前 Tab 数据 ── */
  const tabData: Resource[] = useMemo(() => {
    switch (activeTab) {
      case "hospital":
        return hospitals;
      case "institute":
        return institutes;
      case "online":
        return onlineResources;
    }
  }, [activeTab, hospitals, institutes, onlineResources]);

  /* ── FlowingMenu items：link 改为 hash，便于拦截 ── */
  const flowItems = useMemo(
    () =>
      tabData.map((i) => ({
        link: `#resource-${i.id}`,
        text: i.name,
        image: i.logo || i.image || "",
        imageFallback: i.logoFallback,
      })),
    [tabData],
  );
  const flowMenuHeight = Math.min(820, Math.max(460, flowItems.length * 74));

  /* ── FlowingMenu 点击拦截 ── */
  const handleFlowingMenuClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    e.preventDefault();
    const href = target.getAttribute("href") || "";
    const id = href.replace("#resource-", "");
    const resource = tabData.find((r) => r.id === id);
    if (resource) {
      setSelectedResource(resource);
      setSheetOpen(true);
    }
  };

  /* ── 移动端卡片点击 ── */
  const handleCardClick = (res: Resource) => {
    setSelectedResource(res);
    setSheetOpen(true);
  };

  return (
    <div>
      {/* ── Tab 切换 ── */}
      <div className="flex gap-1 border-b border-border relative mb-6">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.key)}
            className="relative rounded-none border-0 border-b-2 border-transparent"
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </div>

      {/* ── 桌面端：FlowingMenu 行式 ── */}
      <div
        onClick={handleFlowingMenuClick}
        className="hidden md:block"
        style={{ height: flowMenuHeight }}
      >
        <FlowingMenu
          key={activeTab}
          items={flowItems}
          speed={5}
          bgColor={flowBg}
          textColor={flowText}
          marqueeBgColor={flowMarqueeBg}
          marqueeTextColor={flowMarqueeText}
          borderColor={flowBorder}
          inView={inView}
          delay={delay}
        />
      </div>

      {/* ── 移动端：grid 卡片 ── */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tabData.map((res, index) => (
          <motion.div
            key={`${activeTab}-${res.id}`}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: delay?.(index) ?? index * 0.1 }}
            className="bg-card border border-border p-5 hover:border-primary/50 transition-all card-hover cursor-pointer"
            onClick={() => handleCardClick(res)}
          >
            <h4
              className="text-foreground text-sm font-medium mb-2"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {res.name}
            </h4>
            <p
              className="text-muted-foreground text-xs leading-relaxed"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
              {res.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Detail Sheet ── */}
      <ResourceDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        resource={selectedResource}
      />
    </div>
  );
}
