import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
  margin?: string;
  stagger?: number;
  defaultDuration?: number;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { margin = "-80px", stagger = 0.1, defaultDuration = 0.6 } = options;

  const ref = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once: false, margin: margin as any });
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
    }
  }, [inView]);

  const delay = (index: number) => hasAnimatedRef.current ? 0 : stagger * index;

  const transition = (index: number, overrides?: Partial<{ duration: number; ease: string }>) => ({
    duration: overrides?.duration ?? defaultDuration,
    delay: delay(index),
    ease: overrides?.ease ?? "easeOut",
  });

  return { ref, inView, hasAnimated: hasAnimatedRef.current, delay, transition };
}