/* ============================================================
   Navbar — 导航栏（支持日间/夜间模式切换 + Gooey 效果）
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import "./Navbar.css";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/logo-icon-B8wkoZ4z4y5bf87CJoo3x3.webp";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Gooey effect refs
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

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

      setTimeout(() => {
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
        setTimeout(() => {
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
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.top}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleSelect = (element: HTMLElement, index: number) => {
    if (activeIndex === index) return;

    const oldIndex = activeIndex;

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
    setTimeout(() => {
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
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", "understand", "action", "resources", "about"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveIndex(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 滚动导致 activeIndex 变化时，同步更新 gooey 特效位置
  useEffect(() => {
    if (!navRef.current) return;
    const activeItem = navRef.current.querySelectorAll("li button")[activeIndex] as HTMLElement;
    if (activeItem) {
      updateEffectPosition(activeItem);
      setTimeout(() => {
        if (filterRef.current) {
          const particles = filterRef.current.querySelectorAll(".particle");
          particles.forEach((particle) => filterRef.current?.removeChild(particle));
          makeParticles(filterRef.current, [90, 0]); // 聚拢：外围→中心
        }
      }, 150);
      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }
    }
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

  const navLinks = [
    { label: "首页", href: "#hero", id: "hero" },
    { label: "了解阅读障碍", href: "#understand", id: "understand" },
    { label: "共同努力", href: "#action", id: "action" },
    { label: "社会资源", href: "#resources", id: "resources" },
    { label: "关于我们", href: "#about", id: "about" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const element = e.currentTarget;
    handleSelect(element, index);
    const href = navLinks[index].href;
    setTimeout(() => scrollTo(href), 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/92 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* 品牌 Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2.5 group"
        >
          <img src={LOGO_URL} alt="字向每人" className="w-8 h-8 rounded-sm" />
          <span
            className="text-lg font-medium tracking-wide text-foreground"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            字向每人
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

        {/* 主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-sm hover:bg-secondary"
          title={theme === "dark" ? "切换到日间模式" : "切换到夜间模式"}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* 移动端按钮组 */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
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
              onClick={() => scrollTo(link.href)}
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