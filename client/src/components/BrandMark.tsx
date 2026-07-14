interface BrandMarkProps {
  size?: "sm" | "md";
}

export default function BrandMark({ size = "md" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-sm bg-primary font-semibold text-primary-foreground ${
        size === "sm" ? "size-7 text-sm" : "size-8 text-base"
      }`}
      style={{ fontFamily: "STSong, SimSun, serif" }}
    >
      阅
    </span>
  );
}
