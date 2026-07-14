import type { PropsWithChildren } from "react";
import BorderGlow from "./BorderGlow";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  /** @deprecated The shared amber light now comes from var(--primary). */
  spotlightColor?: string;
}

// Compatibility wrapper for any older call sites. New surfaces should use
// BorderGlow directly so spotlight and edge light share one pointer pipeline.
const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => (
  <BorderGlow className={className}>{children}</BorderGlow>
);

export default SpotlightCard;
