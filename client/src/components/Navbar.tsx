/* ============================================================
   Navbar — 导航栏（支持日间/夜间模式切换 + Gooey 效果）
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import SimulationToggleButton from "./SimulationToggleButton";
import ThemeToggleButton from "./ThemeToggleButton";
import BrandMark from "./BrandMark";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Gooey effect refs
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  const hasInitializedActiveEffectRef = useRef(false);
  const navigationRequestRef = useRef(0);
  const programmaticTargetIndexRef = useRef<number | null>(null);
  const programmaticTargetHrefRef = useRef<string | null>(null);
  const selectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      pendingTimersRef.current.delete(timer);
      callback();
    }, delay);
    pendingTimersRef.current.add(timer);
    return timer;
  };

  const cancelTimeout = (timer: ReturnType<typeof setTimeout> | null) => {
    if (timer === null) return;
    clearTimeout(timer);
    pendingTimersRef.current.delete(timer);
  };

  // Gooey particle system constants
  const noise = (n = 1) => n / 2 - Math.random() * n;
  const particleCount = 15;
  const particleR = 100;
  const timeVariance = 300;
  const animationTime = 600;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement, distances: [number, number] = [90, 0], manageActive = true) => {
    const d: [number, number] = distances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      if (manageActive) {
        element.classList.remove("active");
      }

      scheduleTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        if (manageActive) {
          requestAnimationFrame(() => {
            element.classList.add("active");
          });
        }
        scheduleTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Particle may already be gone
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return false;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    // The desktop nav is display:none below the md breakpoint. Measuring it
    // there returns a 0x0 rect and collapses the duplicated effect text into a
    // vertical column when the nav becomes visible again.
    if (
      containerRect.width === 0 ||
      containerRect.height === 0 ||
      pos.width === 0 ||
      pos.height === 0
    ) {
      return false;
    }

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.top}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
    return true;
  };

  const handleSelect = (element: HTMLElement, index: number, requestId: number) => {
    if (activeIndex === index && !isAnimatingRef.current) return;

    const oldIndex = activeIndex;
    cancelTimeout(selectionTimerRef.current);
    cancelTimeout(unlockTimerRef.current);
    isAnimatingRef.current = true;

    if (navRef.current) {
      navRef.current.querySelectorAll("li").forEach(li => {
        li.classList.remove("active");
      });
    }

    // Phase 1: 在旧位置散开（扩散）
    if (oldIndex !== index && filterRef.current && containerRef.current) {
      const oldItem = navRef.current?.querySelectorAll("li button")[oldIndex] as HTMLElement;
      if (oldItem) {
        // 显式设置 opacity = 0，让 gooey fill 渐隐
        filterRef.current.style.opacity = "0";

        const containerRect = containerRef.current.getBoundingClientRect();
        const oldPos = oldItem.getBoundingClientRect();
        // 临时把 filter 移回旧位置
        Object.assign(filterRef.current.style, {
          left: `${oldPos.x - containerRect.x}px`,
          top: `${oldPos.y - containerRect.top}px`,
          width: `${oldPos.width}px`,
          height: `${oldPos.height}px`,
        });
        textRef.current!.innerText = oldItem.innerText;

        // 清除旧粒子，在旧位置散开（不管理 active class）
        const particles = filterRef.current.querySelectorAll(".particle");
        particles.forEach((particle) => filterRef.current?.removeChild(particle));
        makeParticles(filterRef.current, [0, 90], false);
      }
    }

    // 延迟后：gooey 跳到新位置 + 聚拢粒子
    selectionTimerRef.current = scheduleTimeout(() => {
      selectionTimerRef.current = null;
      if (requestId !== navigationRequestRef.current) return;

      setActiveIndex(index);
      updateEffectPosition(element);

      // 显式设置 opacity = 1，让 gooey fill 渐显
      if (filterRef.current) {
        filterRef.current.style.opacity = "1";
        const particles = filterRef.current.querySelectorAll(".particle");
        particles.forEach((particle) => filterRef.current?.removeChild(particle));
        makeParticles(filterRef.current, [90, 0], false); // 不管理 active，直接用 opacity 控制
      }

      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }

      // 动画完成后释放锁，保护粒子动画完整播放
      unlockTimerRef.current = scheduleTimeout(() => {
        unlockTimerRef.current = null;
        if (requestId !== navigationRequestRef.current) return;
        isAnimatingRef.current = false;
      }, 800);
    }, 400);
  };

  const getScrollActivationOffset = () => {
    const scrollPaddingTop = Number.parseFloat(
      window.getComputedStyle(document.documentElement).scrollPaddingTop
    );

    if (Number.isFinite(scrollPaddingTop)) return scrollPaddingTop;
    return headerRef.current?.getBoundingClientRect().height ?? 0;
  };

  const getScrollDestination = (href: string) => {
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return null;

    const sectionTop = window.scrollY + el.getBoundingClientRect().top;
    const targetScrollTop = Math.max(
      0,
      Math.ceil(sectionTop - getScrollActivationOffset())
    );
    const maxScrollTop = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    return Math.min(targetScrollTop, maxScrollTop);
  };

  const finishProgrammaticScroll = () => {
    const targetIndex = programmaticTargetIndexRef.current;
    if (targetIndex === null) return;

    const targetHref = programmaticTargetHrefRef.current;
    const nextScrollTop = targetHref
      ? getScrollDestination(targetHref)
      : null;
    const physicalPixel = 1 / (window.devicePixelRatio || 1);

    // Lazy content above the target can change the document geometry during a
    // long first-load scroll. Re-read the live destination after every real
    // settlement and keep following it until the target is actually reached.
    if (
      nextScrollTop !== null &&
      Math.abs(window.scrollY - nextScrollTop) > physicalPixel
    ) {
      window.scrollTo({ top: nextScrollTop, behavior: "smooth" });
      return;
    }

    cancelTimeout(scrollSettleTimerRef.current);
    scrollSettleTimerRef.current = null;
    programmaticTargetIndexRef.current = null;
    programmaticTargetHrefRef.current = null;
    setActiveIndex(targetIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Keep the clicked target stable until the browser reports that the
      // programmatic smooth scroll has actually settled. A short inactivity
      // debounce covers browsers without the scrollend event.
      if (programmaticTargetIndexRef.current !== null) {
        if (!("onscrollend" in document)) {
          cancelTimeout(scrollSettleTimerRef.current);
          scrollSettleTimerRef.current = scheduleTimeout(
            finishProgrammaticScroll,
            150
          );
        }
        return;
      }

      // 动画期间绝不允许滚动改变 activeIndex，防止 React re-render 导致 <li> 闪烁
      if (isAnimatingRef.current) return;

      const sections = ["hero", "understand", "action", "resources", "about"];
      const activationOffset = getScrollActivationOffset();
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= activationOffset) {
          setActiveIndex(i);
          break;
        }
      }
    };
    const handleScrollEnd = () => finishProgrammaticScroll();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("scrollend", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scrollend", handleScrollEnd);
      cancelTimeout(scrollSettleTimerRef.current);
    };
  }, []);

  // 滚动导致 activeIndex 变化时，同步更新 gooey 特效位置
  useEffect(() => {
    // Initial render already highlights and positions "首页" below. Skip the
    // otherwise redundant particle convergence to keep first paint light.
    if (!hasInitializedActiveEffectRef.current) {
      hasInitializedActiveEffectRef.current = true;
      return;
    }

    // 双重保险：动画期间跳过，防止意外干扰
    if (!navRef.current || isAnimatingRef.current) return;
    const activeItem = navRef.current.querySelectorAll("li button")[activeIndex] as HTMLElement;
    if (activeItem && updateEffectPosition(activeItem)) {
      const effectTimer = scheduleTimeout(() => {
        if (filterRef.current) {
          const particles = filterRef.current.querySelectorAll(".particle");
          particles.forEach((particle) => filterRef.current?.removeChild(particle));
          makeParticles(filterRef.current, [90, 0], false); // 聚拢：外围→中心，不操控 active class
        }
      }, 150);
      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }
      return () => cancelTimeout(effectTimer);
    }
  }, [activeIndex]);

  // Keep the duplicated gooey layers aligned when the desktop nav changes
  // size, especially when crossing the md breakpoint from hidden to visible.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncEffectPosition = () => {
      const activeItem = navRef.current?.querySelectorAll("li button")[
        activeIndex
      ] as HTMLElement | undefined;
      if (activeItem) updateEffectPosition(activeItem);
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncEffectPosition);

    resizeObserver?.observe(container);
    window.addEventListener("resize", syncEffectPosition);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", syncEffectPosition);
    };
  }, [activeIndex]);

  // Initialize effect position on mount
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeItem = navRef.current.querySelectorAll("li button")[activeIndex] as HTMLElement;
    if (activeItem) {
      updateEffectPosition(activeItem);
      textRef.current?.classList.add("active");
    }
  }, []);

  useEffect(() => {
    return () => {
      navigationRequestRef.current += 1;
      pendingTimersRef.current.forEach(timer => clearTimeout(timer));
      pendingTimersRef.current.clear();
    };
  }, []);

  const navLinks = [
    { label: "首页", href: "#hero", id: "hero" },
    { label: "了解阅读障碍", href: "#understand", id: "understand" },
    { label: "共同努力", href: "#action", id: "action" },
    { label: "社会资源", href: "#resources", id: "resources" },
    { label: "关于我们", href: "#about", id: "about" },
  ];

  const scrollTo = (href: string) => {
    const nextScrollTop = getScrollDestination(href);
    if (nextScrollTop !== null) {
      const physicalPixel = 1 / (window.devicePixelRatio || 1);

      if (Math.abs(window.scrollY - nextScrollTop) <= physicalPixel) {
        setMenuOpen(false);
        return false;
      }

      window.scrollTo({
        top: nextScrollTop,
        behavior: "smooth",
      });
      setMenuOpen(false);
      return true;
    }
    setMenuOpen(false);
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const element = e.currentTarget;
    const requestId = ++navigationRequestRef.current;
    programmaticTargetIndexRef.current = index;
    programmaticTargetHrefRef.current = navLinks[index].href;
    handleSelect(element, index, requestId);
    const href = navLinks[index].href;
    if (!scrollTo(href)) finishProgrammaticScroll();
  };

  const handleDirectNavigation = (index: number) => {
    navigationRequestRef.current += 1;
    programmaticTargetIndexRef.current = index;
    programmaticTargetHrefRef.current = navLinks[index].href;
    cancelTimeout(selectionTimerRef.current);
    cancelTimeout(unlockTimerRef.current);
    selectionTimerRef.current = null;
    unlockTimerRef.current = null;
    isAnimatingRef.current = false;
    setActiveIndex(index);
    if (!scrollTo(navLinks[index].href)) finishProgrammaticScroll();
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/92 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* 品牌 Logo */}
        <button
          onClick={() => handleDirectNavigation(0)}
          className="flex items-center gap-2.5 group"
        >
          <BrandMark />
          <span
            className="text-lg font-medium tracking-wide text-foreground"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            阅见不同
          </span>
        </button>

        {/* 桌面导航 - Gooey 效果容器 */}
        <div className="gooey-nav-container hidden md:block" ref={containerRef}>
          <nav ref={navRef}>
            <ul>
              {navLinks.map((link, index) => (
                <li key={link.href} className={activeIndex === index ? "active" : ""}>
                  <button
                    onClick={(e) => handleNavClick(e, index)}
                    className="text-sm transition-colors duration-200"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 400 }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <span className="effect filter" ref={filterRef} />
          <span className="effect text" ref={textRef} />
        </div>

        {/* 主题切换按钮 — 桌面端 */}
        <div className="hidden md:flex items-center gap-1">
          <SimulationToggleButton />
          <ThemeToggleButton />
        </div>

        {/* 移动端按钮组 */}
        <div className="md:hidden flex items-center gap-2">
          <SimulationToggleButton />
          <ThemeToggleButton />
          <button
            className="p-2 text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-t border-border py-4">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => handleDirectNavigation(index)}
              className={`block w-full text-left px-6 py-3 text-sm transition-colors ${
                activeIndex === index
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
