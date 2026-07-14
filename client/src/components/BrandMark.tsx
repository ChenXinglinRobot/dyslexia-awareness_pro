interface BrandMarkProps {
  size?: "sm" | "md";
}

export default function BrandMark({ size = "md" }: BrandMarkProps) {
  const sizeClass = size === "sm" ? "size-7" : "size-8";

  return (
    <span aria-hidden="true" className={`relative block shrink-0 ${sizeClass}`}>
      <img
        src="/brand/brand-mark-light.svg"
        alt=""
        width={size === "sm" ? 28 : 32}
        height={size === "sm" ? 28 : 32}
        draggable={false}
        className="block size-full select-none object-contain dark:hidden"
      />
      <img
        src="/brand/brand-mark-dark.svg"
        alt=""
        width={size === "sm" ? 28 : 32}
        height={size === "sm" ? 28 : 32}
        draggable={false}
        className="hidden size-full select-none object-contain dark:block"
      />
    </span>
  );
}
