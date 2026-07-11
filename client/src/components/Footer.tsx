/* ============================================================
   Footer — 页脚
   ============================================================ */

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663735095664/T2Ty8s2CAsukaVEWePLa9e/logo-icon-B8wkoZ4z4y5bf87CJoo3x3.webp";

export default function Footer() {
  const navLinks = [
    { label: "首页", href: "#hero" },
    { label: "了解阅读障碍", href: "#understand" },
    { label: "共同努力", href: "#action" },
    { label: "社会资源", href: "#resources" },
    { label: "参考文献", href: "#references" },
    { label: "关于我们", href: "#about" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary border-t border-border transition-colors duration-500">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={LOGO_URL} alt="阅见不同" className="w-7 h-7 rounded-sm" />
              <span className="text-base font-medium text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>阅见不同</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              打破认知壁垒，建立真正的共情。
            </p>
          </div>

          <div>
            <h4 className="text-muted-foreground text-xs tracking-wider uppercase mb-3" style={{ fontFamily: "'Space Grotesk'" }}>Navigation</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)}
                  className="block text-muted-foreground text-sm hover:text-primary transition-colors"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-muted-foreground text-xs tracking-wider uppercase mb-3" style={{ fontFamily: "'Space Grotesk'" }}>Info</h4>
            <p className="text-muted-foreground text-xs leading-relaxed mb-2" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              本站为科普性质，不构成医学诊断建议。
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              内容依据专家共识与同行评议研究，详见
              <button
                type="button"
                onClick={() => scrollTo("#references")}
                className="ml-1 text-primary underline decoration-primary/35 underline-offset-4 hover:text-primary/75"
              >
                参考文献
              </button>
              。
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-muted-foreground/60 text-xs text-center">
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>&copy; 2026 </span>
            <span style={{ fontFamily: "'Noto Serif SC', serif" }}>阅见不同</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}> &middot; Words For Everyone</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
