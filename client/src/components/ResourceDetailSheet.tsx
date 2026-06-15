import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type {
  Resource,
  Hospital,
  ResearchInstitute,
  OnlineResource,
} from "@/types/resources";

interface ResourceDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: Resource | null;
}

/* ── type guards ── */
const isHospital = (r: Resource): r is Hospital => r.type === "hospital";
const isInstitute = (r: Resource): r is ResearchInstitute => r.type === "institute";
const isOnline = (r: Resource): r is OnlineResource => r.type === "online-resource";

/* ── shared style tokens ── */
const focusRowCls =
  "text-primary bg-primary/5 border border-primary/20 rounded-md px-3 py-2";

const linkBtn = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Button variant="outline" size="sm" className="gap-1.5">
      {label}
      <ExternalLink className="w-3.5 h-3.5" />
    </Button>
  </a>
);

export default function ResourceDetailSheet({
  open,
  onOpenChange,
  resource,
}: ResourceDetailSheetProps) {
  if (!resource) return null;

  const image = resource.image || resource.logo;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl bg-background/95 backdrop-blur-sm overflow-hidden"
      >
        {/* ── Header ── */}
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {resource.name}
          </SheetTitle>
          {(isHospital(resource) || isInstitute(resource)) && (
            <p className="text-muted-foreground text-xs">
              {(resource as Hospital).city}
            </p>
          )}
          {isOnline(resource) && (
            <p className="text-muted-foreground text-xs">
              {resource.platform}
            </p>
          )}
        </SheetHeader>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {/* Image */}
          {image && (
            <img
              src={image}
              alt={resource.name}
              className="w-full h-40 object-cover rounded-md bg-muted"
              loading="lazy"
            />
          )}

          {/* Description */}
          <p
            className="text-sm"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 300,
            }}
          >
            {resource.desc}
          </p>

          {/* ── Focus row by type ── */}
          {isHospital(resource) && (
            <div className={focusRowCls}>
              <p className="text-sm font-medium">🏥 {resource.dyslexiaUnit}</p>
              {resource.acceptAge && (
                <p className="text-xs text-muted-foreground mt-1">
                  接诊年龄：{resource.acceptAge}
                </p>
              )}
            </div>
          )}

          {isInstitute(resource) && (
            <div className={focusRowCls}>
              <p className="text-sm font-medium">🔬 {resource.dyslexiaLab}</p>
              {resource.focusAreas && resource.focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {resource.focusAreas.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {isOnline(resource) && (
            <div className={focusRowCls}>
              <p className="text-sm font-medium">👤 {resource.expert}</p>
              {resource.expertAffiliation && (
                <p className="text-xs text-muted-foreground mt-1">
                  {resource.expertAffiliation}
                </p>
              )}
              <div className="flex gap-2 mt-1.5 text-xs text-muted-foreground">
                <span>{resource.platform}</span>
                {resource.updateFrequency && (
                  <>
                    <span>·</span>
                    <span>{resource.updateFrequency}</span>
                  </>
                )}
              </div>
              {resource.focus && resource.focus.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {resource.focus.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <SheetFooter>
          <div className="flex flex-wrap gap-2">
            {isHospital(resource) && (
              <>
                {resource.unitUrl && linkBtn(resource.unitUrl, "🔗 门诊页")}
                {linkBtn(resource.officialUrl, "🏥 医院首页")}
              </>
            )}
            {isInstitute(resource) && (
              <>
                {resource.labUrl && linkBtn(resource.labUrl, "🔬 实验室主页")}
                {linkBtn(resource.officialUrl, "🎓 机构首页")}
              </>
            )}
            {isOnline(resource) && linkBtn(resource.url, "🔗 关注/访问")}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
