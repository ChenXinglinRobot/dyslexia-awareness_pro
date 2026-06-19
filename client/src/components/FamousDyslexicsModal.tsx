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

  const cards = famousDyslexics.map((person) => (
    <div className="card-famous" key={person.name}>
      <img src={person.image} alt={person.name} className="card-famous-image" />
      <div className="card-famous-info">
        <div className="card-famous-heading">
          <div>
            <h3 className="card-famous-name">{person.name}</h3>
            <p className="card-famous-field">{person.field}</p>
          </div>
          {person.evidenceLabel && <span className="card-famous-evidence">{person.evidenceLabel}</span>}
        </div>
        <p className="card-famous-desc">{person.description}</p>
        <div className="card-famous-detail-list">
          {person.difficulty && (
            <section className="card-famous-detail">
              <h4>面对过什么文字/学习困难</h4>
              <p>{person.difficulty}</p>
            </section>
          )}
          {person.supportOrPath && (
            <section className="card-famous-detail">
              <h4>如何被支持或找到替代路径</h4>
              <p>{person.supportOrPath}</p>
            </section>
          )}
          {person.limitation && (
            <section className="card-famous-detail card-famous-detail-warning">
              <h4>这个案例不能说明什么</h4>
              <p>{person.limitation}</p>
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
            他们也曾面对文字困难
          </SheetTitle>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            以下人物案例仅用于说明：阅读困难不定义一个人的全部。部分历史人物缺乏现代标准下的诊断记录，应谨慎理解。
          </p>
          <p
            className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-900 dark:text-amber-100"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            阅读障碍不等于天才，也不意味着一定会拥有某种特殊能力。
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
      </SheetContent>
    </Sheet>
  );
}
