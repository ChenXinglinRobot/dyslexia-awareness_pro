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
  const cards = famousDyslexics.map((person) => (
    <div className="card-famous" key={person.name}>
      <img src={person.image} alt={person.name} className="card-famous-image" />
      <div className="card-famous-info">
        <h3 className="card-famous-name">{person.name}</h3>
        <p className="card-famous-field">{person.field}</p>
        <p className="card-famous-desc">{person.description}</p>
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
            阅读障碍名人介绍
          </SheetTitle>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            拖动卡片查看更多名人 · 点击也可翻页
          </p>
        </SheetHeader>
        <div className="stack-wrapper py-6 famous-stack">
          <Stack
            cards={cards}
            randomRotation={false}
            sensitivity={150}
            sendToBackOnClick={true}
            animationConfig={{ stiffness: 260, damping: 20 }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}