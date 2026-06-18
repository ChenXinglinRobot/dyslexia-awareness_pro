import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
  margin?: string;
  stagger?: number;
  defaultDuration?: number;
}

/**
 * 父级 ref + 子级 `animate={inView ? ...}` 的中心化 stagger 触发。
 *
 * ⚠️ 契约：ref 必须绑在用户阅读该 section 时"始终在视口里"的元素上 —— 通常是
 * `<section>` 根，或一个高度 ≥ section 自身的稳定容器。
 *
 * 一旦 ref 绑的内层 div 滚出视口（section 拆成多段、内层 div 只占顶部小段等情况），
 * `inView` 会重新变 false，所有用 `animate={inView ? ...}` 的子元素会塌回 `opacity: 0`，
 * 整块内容视觉消失（即使已经动画过一次）。
 *
 * 防御建议：
 * - 新写的 motion 元素优先用 framer-motion 自带的 `whileInView` —— 每个元素自带
 *   IntersectionObserver，结构怎么拆都不受父级状态影响。参考 ReadabilityLab / ExpertOpinionFlowchart。
 * - 如果确实需要 `useScrollReveal` 的中心化 stagger，重构 section 结构时
 *   把"ref 必须保留在 section 根或等价稳定元素"作为必检项。
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { margin = "-80px", stagger = 0.1, defaultDuration = 0.6 } = options;

  const ref = useRef<HTMLDivElement>(null);
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