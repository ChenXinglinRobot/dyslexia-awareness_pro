import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

import { useScrollLock } from '@/hooks/useScrollLock';

import './FlowingMenu.css';

interface MenuItemData {
  link: string;
  text: string;
  image: string;
  imageFallback?: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  /* Parent may pass useScrollReveal state so entrance animation shares the section trigger. */
  inView?: boolean;
  delay?: (index: number) => number;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  index: number;
  inView?: boolean;
  delay?: (index: number) => number;
  isScrollingRef: ReturnType<typeof useScrollLock>;
  scrollUnlockTick: number;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
  inView,
  delay
}) => {
  const [scrollUnlockTick, setScrollUnlockTick] = useState(0);
  const isScrollingRef = useScrollLock(200, () => {
    setScrollUnlockTick((tick) => tick + 1);
  });

  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
            index={idx}
            inView={inView}
            delay={delay}
            isScrollingRef={isScrollingRef}
            scrollUnlockTick={scrollUnlockTick}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  image,
  imageFallback,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
  index,
  inView,
  delay,
  isScrollingRef,
  scrollUnlockTick
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults: gsap.TweenVars = { duration: 0.32, ease: 'power3.out', overwrite: 'auto' };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const showMarquee = (edge: 'top' | 'bottom') => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);

    animationRef.current?.play();
  };

  const hideMarquee = (edge: 'top' | 'bottom') => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);

    animationRef.current?.pause();
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
        paused: !isHoveredRef.current
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  useEffect(() => {
    if (
      scrollUnlockTick === 0 ||
      !isHoveredRef.current ||
      !itemRef.current ||
      !marqueeRef.current ||
      !marqueeInnerRef.current
    ) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(rect.width / 2, rect.height / 2, rect.width, rect.height);
    showMarquee(edge);
  }, [scrollUnlockTick]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    isHoveredRef.current = true;
    if (isScrollingRef.current) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    showMarquee(edge);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    isHoveredRef.current = false;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    hideMarquee(edge);
  };

  return (
    <motion.div
      className="menu__item"
      ref={itemRef}
      style={{ borderColor, borderTopWidth: isFirst ? 0 : undefined }}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.38, delay: (delay ?? ((i: number) => i * 0.075))(index) }}
    >
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (imageFallback && target.dataset.fallbackApplied !== "true") {
                        target.dataset.fallbackApplied = "true";
                        target.src = imageFallback;
                      } else {
                        target.style.visibility = "hidden";
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlowingMenu;
