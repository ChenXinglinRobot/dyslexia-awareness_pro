/* ============================================================
   Footer — 页脚
   ============================================================ */

import BrandMark from "./BrandMark";

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
            <div className="flex items-center gap-3 mb-4">
              <BrandMark size="sm" />
              <span
                className="text-base font-medium text-foreground"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                阅见不同
              </span>
            </div>
            <p
              className="text-muted-foreground text-xs leading-relaxed"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
              让阅读困难被理解，让支持更有依据。
            </p>
          </div>

          <div>
            <h4
              className="text-muted-foreground text-xs tracking-wider uppercase mb-3"
              style={{ fontFamily: "'Space Grotesk'" }}
            >
              Navigation
            </h4>
            <nav className="space-y-2">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-muted-foreground text-sm hover:text-primary transition-colors"
                  style={{
                    fontFamily: "'Noto Sans SC', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4
              className="text-muted-foreground text-xs tracking-wider uppercase mb-3"
              style={{ fontFamily: "'Space Grotesk'" }}
            >
              Info
            </h4>
            <p
              className="text-muted-foreground text-xs leading-relaxed mb-2"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
              本站为科普性质，不构成医学诊断建议。
            </p>
            <p
              className="text-muted-foreground text-xs leading-relaxed"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
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
            <p
              className="text-muted-foreground text-xs leading-relaxed mt-4 text-pretty"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
              本站建设过程中，曾就部分内容与呈现方式向李虹教授课题组师生请教，谨致谢意。
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:gap-6 md:text-left">
            <p className="text-xs text-muted-foreground">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                &copy; 2026{" "}
              </span>
              <span style={{ fontFamily: "'Noto Serif SC', serif" }}>
                阅见不同
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {" "}
                &middot; Words For Everyone
              </span>
            </p>

            <nav
              aria-label="网站备案信息"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:justify-end"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            >
              <a
                href="https://beian.mps.gov.cn/#/query/webSearch?code=53060202000298"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              >
                <img
                  src="/备案编号图标.png"
                  alt=""
                  width="20"
                  height="20"
                  className="size-5 shrink-0"
                  decoding="async"
                />
                <span>滇公网安备53060202000298号</span>
              </a>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              >
                滇ICP备2026006312号-1
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
