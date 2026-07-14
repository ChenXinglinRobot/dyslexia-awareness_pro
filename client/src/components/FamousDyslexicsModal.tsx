import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import Stack from "./Stack";
import { famousDyslexics } from "@/data/famousDyslexics";
import { ExternalLink } from "lucide-react";
import "./Stack.css";
import "./FamousDyslexicsModal.css";

interface FamousDyslexicsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FamousDyslexicsModal({ open, onOpenChange }: FamousDyslexicsModalProps) {
  // Delay Stack mount until Sheet slide-in animation finishes (duration-500),
  // so Framer Motion's drag projection measures against the final layout — not
  // mid-animation — avoiding the large incorrect transform offsets.
  const [stackReady, setStackReady] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setStackReady(true), 550);
      return () => clearTimeout(timer);
    } else {
      setStackReady(false);
    }
  }, [open]);

  const displayedPeople = famousDyslexics.filter((person) => person.featured !== false);

  const cards = displayedPeople.map((person) => (
    <div className="card-famous" key={person.name}>
      <img src={person.image} alt={person.name} className="card-famous-image" />
      <div className="card-famous-info">
        <div className="card-famous-heading">
          <div>
            <h3 className="card-famous-name">{person.name}</h3>
            <p className="card-famous-field">{person.field}</p>
          </div>
          {person.evidenceLabel && (
            <span className="card-famous-evidence">
              {person.evidenceNote ?? person.evidenceLabel}
            </span>
          )}
        </div>
        <p className="card-famous-desc">{person.description}</p>
        {person.sources && person.sources.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {person.sources.map(source => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-xs leading-5 text-primary underline decoration-primary/35 underline-offset-4 hover:text-primary/75"
                aria-label={`${source.label}（新标签打开）`}
              >
                <ExternalLink className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                {source.label}
              </a>
            ))}
          </div>
        )}
        <div className="card-famous-detail-list">
          {person.difficulty && (
            <section className="card-famous-detail">
              <h4>他们也曾不容易</h4>
              <p>{person.difficulty}</p>
            </section>
          )}
          {person.supportOrPath && (
            <section className="card-famous-detail">
              <h4>可以对孩子说</h4>
              <p>{person.supportOrPath}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-xl bg-background/95 backdrop-blur-sm overflow-hidden"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="text-lg md:text-xl" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            不同的路，也能抵达
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            这些经历来自公开自述、访谈、传记或历史资料。每个人的道路和优势都不相同；它们不是"天才证明"，只是让我们看见，阅读困难之外，人生仍有许多可能。
          </SheetDescription>
        </SheetHeader>
        <div className="stack-wrapper py-6 famous-stack">
          {stackReady ? (
            <Stack
              cards={cards}
              randomRotation={false}
              sensitivity={150}
              sendToBackOnClick={true}
              animationConfig={{ stiffness: 260, damping: 20 }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full min-h-[300px]">
              <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
        <p
          className="border-t border-border pt-3 text-center text-xs leading-6 text-muted-foreground"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          阅读障碍不等于天才，也不等于失败。被理解、被支持，才是改变开始的地方。
        </p>
      </SheetContent>
    </Sheet>
  );
}
