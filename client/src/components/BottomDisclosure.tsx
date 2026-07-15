import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface BottomDisclosureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  children: ReactNode;
  className?: string;
}

const SERIF = "'Noto Serif SC', serif";

export default function BottomDisclosure({
  open,
  onOpenChange,
  label,
  children,
  className,
}: BottomDisclosureProps) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className={cn("border-t border-border", className)}
    >
      <div className="flex justify-end">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group inline-flex min-h-11 items-center gap-2 px-1 py-2.5 text-left text-sm text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ fontFamily: SERIF }}
          >
            <span>{label}</span>
            <ChevronDown
              className={cn(
                "h-[18px] w-[18px] shrink-0 text-primary transition-transform motion-reduce:transition-none",
                open && "rotate-180"
              )}
              aria-hidden
            />
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="space-y-3 pb-1 pt-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
