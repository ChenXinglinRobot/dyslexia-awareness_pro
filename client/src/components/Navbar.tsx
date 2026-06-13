/* ============================================================
   Navbar — 导航栏（支持日间/夜间模式切换）
   ============================================================ */

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/logo-icon-B8wkoZ4z4y5bf87CJoo3x3.webp";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", "understand", "action", "resources", "about"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm transition-colors duration-200 relative group ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 400 }}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}

          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-sm hover:bg-secondary"
            title={theme === "dark" ? "切换到日间模式" : "切换到夜间模式"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

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
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`block w-full text-left px-6 py-3 text-sm transition-colors ${
                activeSection === link.id
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
