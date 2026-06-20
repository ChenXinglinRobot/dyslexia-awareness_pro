import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Ban,
  CheckCircle2,
  GraduationCap,
  Home,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import CardSwap, { Card } from "./CardSwap";

type RoleKey = "parent" | "teacher" | "peer" | "student";

interface RoleAction {
  key: RoleKey;
  title: string;
  quote: string;
  actions: string[];
  avoid: string;
  icon: LucideIcon;
  accent: string;
  imageSrc: string;
  imageAlt: string;
  imageCredit: string;
  imageHref: string;
  fallbackSrc: string;
}

const ROLE_ACTIONS: RoleAction[] = [
  {
    key: "parent",
    title: "我是家长",
    quote: "先看见困难发生在哪里，再和孩子一起寻找支持。",
    actions: [
      "观察认字、听写、朗读、作业和考试中反复出现的困难",
      "记录困难出现的情境和持续时间，再与班主任或语文老师沟通",
      "必要时寻求学校心理老师、特教资源或儿童发展相关专业评估",
    ],
    avoid: "不要用罚抄、加量阅读或反复责备来“逼好”孩子",
    icon: Home,
    accent: "oklch(0.62 0.15 68)",
    imageSrc:
      "https://images.unsplash.com/photo-1713942590283-59867d5e3f8d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "家长正在给孩子读书",
    imageCredit: "Unsplash / parent and child reading",
    imageHref: "https://unsplash.com/s/photos/parent-and-child-reading",
    fallbackSrc: "/action-roles/parent.webp",
  },
  {
    key: "teacher",
    title: "我是教师",
    quote: "公平不是所有人走同一条路，而是每个人都有抵达方式。",
    actions: [
      "提供合理便利，如延长时间、分段材料、口头回答或大字号文本",
      "减少机械抄写，把精力留给识字、阅读理解和真实表达",
      "用多种方式了解学生是否理解内容，而不只看朗读速度和书写量",
    ],
    avoid: "不要公开羞辱，或强迫学生当众朗读来“锻炼胆量”",
    icon: GraduationCap,
    accent: "oklch(0.55 0.12 210)",
    imageSrc:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80",
    imageAlt: "教师在教室里指导学生学习",
    imageCredit: "Unsplash / teacher reading",
    imageHref:
      "https://unsplash.com/ko/s/%EC%82%AC%EC%A7%84/%EC%9C%A0%EC%B9%98%EC%9B%90-%EA%B5%90%EC%82%AC",
    fallbackSrc: "/action-roles/teacher.webp",
  },
  {
    key: "peer",
    title: "我是同伴",
    quote: "一句嘲笑会变成墙，一次理解也可以变成桥。",
    actions: [
      "不嘲笑读错、读慢或写错字的同学",
      "不把同学叫作“笨”“懒”或“拖后腿”",
      "在小组任务中允许朗读、整理、绘图、讲述等多样参与方式",
    ],
    avoid: "不要把阅读速度当成评价一个人的全部标准",
    icon: UsersRound,
    accent: "oklch(0.58 0.13 150)",
    imageSrc:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "学生们一起阅读和学习",
    imageCredit: "Unsplash / children reading",
    imageHref: "https://unsplash.com/s/photos/children-reading",
    fallbackSrc: "/action-roles/peer.webp",
  },
  {
    key: "student",
    title: "我是学生本人",
    quote: "读得慢不等于想得慢，你可以把困难说出来。",
    actions: [
      "告诉可信任的大人：哪些文字任务最吃力，什么时候最容易卡住",
      "尝试朗读辅助、分段阅读、关键词标记或先听后读等方式",
      "记住读得慢不代表你想得慢，写错字也不代表你没有能力",
    ],
    avoid: "不要把所有困难都归咎于“我不够好”或独自硬扛",
    icon: UserRound,
    accent: "oklch(0.52 0.17 300)",
    imageSrc:
      "https://images.unsplash.com/photo-1585597621714-b54f9ca3b704?auto=format&fit=crop&w=900&q=80",
    imageAlt: "学生在桌前独立完成文字任务",
    imageCredit: "Unsplash / child learning",
    imageHref: "https://unsplash.com/s/photos/kid-tablet",
    fallbackSrc: "/action-roles/student.webp",
  },
];

interface RoleCardProps {
  role: RoleAction;
  compact?: boolean;
}

function RoleCardContent({ role, compact = false }: RoleCardProps) {
  const Icon = role.icon;

  return (
    <article
      className="h-full bg-card border border-border p-5 md:p-6 shadow-sm transition-colors duration-500"
      style={{ ["--role-accent" as string]: role.accent }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center border border-border bg-background/70 text-[color:var(--role-accent)]">
            <Icon className="size-5" />
          </span>
          <h4
            className="text-lg md:text-xl text-foreground"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {role.title}
          </h4>
        </div>
        <span
          className="hidden sm:block h-px w-16"
          style={{ backgroundColor: role.accent }}
          aria-hidden
        />
      </div>

      <p
        className="text-foreground mb-4"
        style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: compact ? "1.0625rem" : "clamp(1.125rem, 0.65vw + 1rem, 1.45rem)",
          fontWeight: 600,
          lineHeight: 1.65,
          textWrap: "balance",
        }}
      >
        {role.quote}
      </p>

      <ul className="space-y-2.5 mb-4">
        {role.actions.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0 text-[color:var(--role-accent)]"
              aria-hidden
            />
            <span
              className="text-sm leading-relaxed text-foreground/80"
              style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div className="border border-destructive/25 bg-destructive/10 p-4">
        <div className="flex items-start gap-3">
          <Ban className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
          <div>
            <p
              className="text-xs font-medium text-destructive mb-1"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              不要这样做
            </p>
            <p
              className="text-sm leading-relaxed text-foreground/80"
              style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              {role.avoid}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function RoleImage({ role, mobile = false }: { role: RoleAction; mobile?: boolean }) {
  return (
    <figure className={mobile ? "min-w-0 w-full" : "min-w-0 md:max-w-[380px] lg:max-w-[400px]"}>
      <div
        className={
          mobile
            ? "h-[240px] overflow-hidden border border-border bg-muted sm:h-[260px] landscape:h-[240px]"
            : "aspect-[4/5] overflow-hidden border border-border bg-muted"
        }
      >
        <img
          key={role.key}
          src={role.imageSrc}
          alt={role.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            if (image.dataset.fallbackApplied === "true") return;
            image.dataset.fallbackApplied = "true";
            image.src = role.fallbackSrc;
          }}
        />
      </div>
      <figcaption
        className="mt-2 text-xs text-muted-foreground"
        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
      >
        <a
          href={role.imageHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          {role.imageCredit}
        </a>
      </figcaption>
    </figure>
  );
}

function RoleTabs({
  activeKey,
  onChange,
}: {
  activeKey: RoleKey;
  onChange: (key: RoleKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="选择行动角色"
      className="flex flex-col gap-2 md:flex md:flex-col"
    >
      {ROLE_ACTIONS.map((role) => {
        const Icon = role.icon;
        const selected = role.key === activeKey;

        return (
          <button
            key={role.key}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(role.key)}
            className={`group min-w-0 border p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-4 ${
              selected
                ? "min-h-[60px] border-primary/60 border-l-[3px] border-l-[color:var(--role-accent)] bg-card shadow-sm md:min-h-[150px]"
                : "min-h-[52px] border border-border border-l-[3px] border-l-transparent bg-card/60 hover:border-primary/35 hover:bg-card md:min-h-[112px]"
            }`}
            style={{ ["--role-accent" as string]: role.accent }}
          >
            <span className="flex items-center gap-3">
              <span
                className={`grid size-9 shrink-0 place-items-center border transition-colors ${
                  selected
                    ? "border-primary/35 bg-background text-[color:var(--role-accent)]"
                    : "border-border text-muted-foreground group-hover:text-[color:var(--role-accent)]"
                }`}
              >
                <Icon className="size-4" />
              </span>
              <span
                className="text-base text-foreground"
                style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
              >
                {role.title}
              </span>
            </span>
            <span
              className={`hidden md:mt-3 md:block text-xs leading-relaxed text-muted-foreground transition-all duration-300 ${
                selected ? "line-clamp-none opacity-100" : "line-clamp-2 opacity-80"
              }`}
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {role.quote}
            </span>
            {selected && (
              <span
                className="mt-3 hidden h-px w-16 md:mt-4 md:block"
                style={{ backgroundColor: role.accent }}
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface RoleActionCardsProps {
  inView: boolean;
  delay: (index: number) => number;
}

export default function RoleActionCards({ inView, delay }: RoleActionCardsProps) {
  const [activeKey, setActiveKey] = useState<RoleKey>("parent");
  const activeIndex = useMemo(
    () => Math.max(0, ROLE_ACTIONS.findIndex((role) => role.key === activeKey)),
    [activeKey],
  );
  const activeRole = ROLE_ACTIONS[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: delay(2) }}
      className="mb-16"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <h3
            className="text-xl md:text-2xl text-foreground mb-2"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            角色行动卡片
          </h3>
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            从家长、教师、同伴到学生本人，每个角色都可以提供一种支持。
          </p>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[260px_minmax(300px,400px)_minmax(520px,1fr)] gap-6 lg:gap-8 items-end">
        <RoleTabs activeKey={activeKey} onChange={setActiveKey} />

        <div id={`role-panel-desktop-${activeRole.key}`} role="tabpanel" aria-live="polite">
          <RoleImage role={activeRole} />
        </div>

        <div className="relative flex h-[500px] min-w-0 items-end overflow-visible">
          <CardSwap
            width={420}
            height={420}
            cardDistance={30}
            verticalDistance={28}
            skewAmount={3}
            easing="linear"
            autoSwap={false}
            activeIndex={activeIndex}
            onCardClick={(idx) => setActiveKey(ROLE_ACTIONS[idx].key)}
            containerClassName="role-action-swap"
          >
            {ROLE_ACTIONS.map((role) => (
              <Card key={role.key} customClass="role-action-swap-card">
                <RoleCardContent role={role} compact />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      <div
        id={`role-panel-mobile-${activeRole.key}`}
        role="tabpanel"
        aria-live="polite"
        className="space-y-3 md:hidden"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-3 landscape:gap-4 landscape:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] landscape:items-stretch">
          <RoleTabs activeKey={activeKey} onChange={setActiveKey} />
          <RoleImage role={activeRole} mobile />
        </div>
        <RoleCardContent role={activeRole} compact />
      </div>
    </motion.div>
  );
}
