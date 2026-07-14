import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEventHandler,
  type ReactNode,
} from "react";
import "./BorderGlow.css";

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowRadius?: number;
  glowIntensity?: number;
  spotlightRadius?: number;
}

interface PointerPosition {
  clientX: number;
  clientY: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const BorderGlow = ({
  children,
  className = "",
  edgeSensitivity = 66,
  glowRadius = 20,
  glowIntensity = 0.52,
  spotlightRadius = 300,
}: BorderGlowProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerPosition | null>(null);
  const frameRef = useRef<number | null>(null);

  const safeEdgeSensitivity = Math.max(edgeSensitivity, 1);

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (event.pointerType === "touch") return;

      pointerRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
      };

      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;

        const card = cardRef.current;
        const pointer = pointerRef.current;
        if (!card || !pointer) return;

        // A single layout read feeds both the inner spotlight and edge glow.
        const rect = card.getBoundingClientRect();
        const x = clamp(pointer.clientX - rect.left, 0, rect.width);
        const y = clamp(pointer.clientY - rect.top, 0, rect.height);
        const distanceToEdge = Math.min(x, rect.width - x, y, rect.height - y);
        const edgeProximity = clamp(
          1 - distanceToEdge / safeEdgeSensitivity,
          0,
          1
        );

        const deltaX = x - rect.width / 2;
        const deltaY = y - rect.height / 2;
        const rawAngle =
          deltaX === 0 && deltaY === 0
            ? 0
            : (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
        const cursorAngle = (rawAngle + 360) % 360;

        card.style.setProperty("--mouse-x", `${x.toFixed(2)}px`);
        card.style.setProperty("--mouse-y", `${y.toFixed(2)}px`);
        card.style.setProperty("--edge-proximity", edgeProximity.toFixed(4));
        card.style.setProperty(
          "--cursor-angle",
          `${cursorAngle.toFixed(2)}deg`
        );
      });
    },
    [safeEdgeSensitivity]
  );

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      pointerRef.current = null;
    },
    []
  );

  const glowStyles = {
    "--edge-sensitivity": `${safeEdgeSensitivity}px`,
    "--edge-glow-radius": `${Math.max(glowRadius, 0)}px`,
    "--glow-intensity": clamp(glowIntensity, 0, 1),
    "--spotlight-radius": `${Math.max(spotlightRadius, 0)}px`,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      className={["border-glow-card", className].filter(Boolean).join(" ")}
      onPointerMove={handlePointerMove}
      style={glowStyles}
    >
      <span className="border-glow-card__spotlight" aria-hidden="true" />
      <div className="border-glow-card__content">{children}</div>
      <span className="border-glow-card__edge" aria-hidden="true" />
    </div>
  );
};

export default BorderGlow;
