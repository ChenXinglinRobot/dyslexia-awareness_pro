import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Stack from "./Stack";
import { famousDyslexics } from "@/data/famousDyslexics";
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
            确诊或疑似阅读障碍的名人
          </SheetTitle>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            这些故事来自公开自述、媒体、传记或历史资料，希望给孩子和家长一点鼓励——但我们不神化困难，也不让困难定义一个人。
          </p>
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
