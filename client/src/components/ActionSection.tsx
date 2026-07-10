/* ============================================================
   ActionSection — 让我们共同努力
   基于《汉语发展性阅读障碍诊断与干预的专家意见》重构行动路径。
   ============================================================ */

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Building2,
  ClipboardList,
  Compass,
  ExternalLink,
  FileText,
  Handshake,
  InfoIcon,
  ListChecks,
  MessageCircle,
  Search,
  Tags,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CircularGallery from "./CircularGallery";
import ExpertOpinionFlowchart from "./ExpertOpinionFlowchart";
import FamousDyslexicsModal from "./FamousDyslexicsModal";
import ReadabilityLab from "./ReadabilityLab";
import RoleActionCards from "./RoleActionCards";
import SectionHeading from "./SectionHeading";
import { famousDyslexics } from "@/data/famousDyslexics";

interface SupportStep {
  title: string;
  text: string;
  icon: LucideIcon;
}

interface SocialSupport {
  title: string;
  text: string;
  keywords: string[];
  icon: LucideIcon;
}

const SUPPORT_STEPS: SupportStep[] = [
  {
    title: "观察线索",
    text: "孩子长期出现认字慢、读得吃力、听写困难、阅读后明显疲劳等表现。",
    icon: Search,
  },
  {
    title: "记录表现",
    text: "记录困难出现在哪些任务中：朗读、默读、听写、阅读理解、考试时间、写作业。",
    icon: ClipboardList,
  },
  {
    title: "沟通学校",
    text: "与班主任、语文老师、心理老师或特教资源教师沟通，了解孩子在校表现。",
    icon: MessageCircle,
  },
  {
    title: "专业评估",
    text: "必要时寻求专业评估，综合了解阅读能力、听写能力、语言认知能力、注意力和情绪状态。",
    icon: FileText,
  },
  {
    title: "制定支持方案",
    text: "根据孩子的具体困难，提供家庭、学校和专业机构协同的个性化支持。",
    icon: Handshake,
  },
];

const SOCIAL_SUPPORTS: SocialSupport[] = [
  {
    title: "早识别，不贴标签",
    text: "学校和家庭可以关注长期、稳定、跨场景出现的阅读困难。识别风险不是为了给孩子贴标签，而是为了更早找到支持方式。",
    keywords: ["观察线索", "记录表现", "及时沟通"],
    icon: Tags,
  },
  {
    title: "提供合理便利",
    text: "对存在明显阅读困难的学生，可以根据实际情况提供延长考试时间、分段阅读材料、口头回答、减少机械抄写、大字号文本等支持。",
    keywords: ["延长时间", "口头回答", "减少抄写", "分段文本"],
    icon: ListChecks,
  },
  {
    title: "专业评估与转介",
    text: "当孩子的困难持续存在，并明显影响学习与情绪时，应考虑寻求学校心理老师、特教老师、儿童发展相关专业人员或医疗机构的进一步评估。",
    keywords: ["阅读能力", "听写能力", "语言认知", "注意与情绪"],
    icon: FileText,
  },
  {
    title: "家庭—学校协作",
    text: "家长、教师和专业人员应共享观察信息，共同制定支持策略，避免让孩子在家庭和学校之间承受互相矛盾的要求。",
    keywords: ["共同记录", "共同调整", "共同鼓励"],
    icon: UsersRound,
  },
];

export default function ActionSection() {
  const { ref, inView, delay } = useScrollReveal({ margin: "-80px", stagger: 0.1 });
  const [maskOpen, setMaskOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const reduced = useReducedMotion();
  const displayedFamousDyslexics = famousDyslexics.filter((person) => person.featured !== false);

  const handleOpenModal = () => {
    setMaskOpen(true);
    setTimeout(() => setSheetOpen(true), 500);
  };

  const handleCloseModal = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setTimeout(() => setMaskOpen(false), 400);
    }
  };

  return (
    <section id="action" className="relative overflow-hidden" ref={ref}>
      <div className="divider-glow" />
      <div className="absolute inset-0 bg-background transition-colors duration-500" />

      <div className="container relative z-10 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-12"
        >
          <SectionHeading sectionId="action" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay(1) }}
          className="mb-16 max-w-4xl"
        >
          <p
            className="mb-4 text-foreground"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontWeight: 600,
              fontSize: "clamp(1.375rem, 2.2vw + 0.5rem, 2.125rem)",
              lineHeight: 1.55,
              textWrap: "balance",
            }}
          >
            理解不是终点。
            <br />
            看见困难发生在哪里，我们就能一起调整孩子接触、理解和表达文字的方式。
          </p>
          <p
            className="text-primary"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontWeight: 500,
              fontSize: "clamp(1.1875rem, 1.4vw + 0.55rem, 1.625rem)",
              lineHeight: 1.6,
              textWrap: "balance",
            }}
          >
            真正的帮助，不是降低期待，而是提供一条更适合孩子抵达的路。
          </p>
        </motion.div>

        <RoleActionCards inView={inView} delay={delay} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        >
          从家长、教师、同伴到学生本人，每个人都可以让这条路更清晰、更友善。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay(3) }}
          className="mb-16 md:mb-20"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <ClipboardList className="size-4" aria-hidden />
                <p
                  className="text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Support Path
                </p>
              </div>
              <h3
                className="text-xl text-foreground md:text-2xl"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                从发现到支持，可以这样走
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {SUPPORT_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === SUPPORT_STEPS.length - 1;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: delay(4 + index) }}
                  className={`relative border border-border bg-card p-3.5 transition-colors duration-500 sm:p-4 md:p-5 ${isLast ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3 md:mb-5 md:gap-4">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-7 place-items-center border border-border bg-background text-primary sm:size-8 md:size-9">
                      <Icon className="size-3.5 sm:size-4" aria-hidden />
                    </span>
                  </div>
                  <h4
                    className="mb-1.5 text-sm text-foreground sm:mb-2 md:mb-3 md:text-base"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-sm leading-6 text-foreground/75 md:leading-7"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                  >
                    {step.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        <div className="relative z-0 mb-16 md:mb-20">
          <ExpertOpinionFlowchart />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay(9) }}
          className="mb-16 md:mb-20"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Building2 className="size-4" aria-hidden />
                <p
                  className="text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Social Support
                </p>
              </div>
              <h3
                className="text-xl text-foreground md:text-2xl"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                社会可以做什么
              </h3>
              <p
                className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground"
                style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
              >
                当支持系统一起调整，孩子不必独自承担所有困难。
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {SOCIAL_SUPPORTS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: delay(10 + index) }}
                  className="border border-border bg-card p-5 transition-colors duration-500 md:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid size-10 place-items-center border border-border bg-background text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h4
                      className="text-base text-foreground md:text-lg"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    className="mb-5 text-sm leading-7 text-foreground/75"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
                  >
                    {item.text}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map(keyword => (
                      <span
                        key={keyword}
                        className="border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>

      <ReadabilityLab />

      <div className="container relative z-10 pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="max-w-3xl">
            {/* ── Stanza 0：诗体主标题（节标题 h3 + Compass 图标，象征"不同的路也能抵达"的方向感） ── */}
            <div className="flex items-center gap-3 md:gap-4">
              <Compass
                className="size-7 shrink-0 text-primary md:size-8"
                aria-hidden
              />
              <motion.h3
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: reduced ? 0.001 : 0.7,
                  ease: reduced ? "linear" : [0.23, 1, 0.32, 1],
                }}
                className="text-foreground"
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.4vw + 0.5rem, 3rem)",
                  lineHeight: 1.35,
                  letterSpacing: "0.01em",
                  textWrap: "balance",
                }}
              >
                当一扇门很难推开
              </motion.h3>
            </div>

            {/* ── Stanza 1：原因（2 行） ── */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduced ? 0.001 : 0.65,
                delay: reduced ? 0 : 0.08,
                ease: reduced ? "linear" : [0.23, 1, 0.32, 1],
              }}
              className="mt-12 pl-6 text-foreground/85 md:mt-16 md:pl-10"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 400,
                fontSize: "clamp(1.0625rem, 0.5vw + 0.95rem, 1.3125rem)",
                lineHeight: 1.95,
                textWrap: "pretty",
              }}
            >
              字读得慢，不是孩子不努力，
              <br />
              只是文字这条路，对他来说更加费力。
            </motion.p>

            {/* ── Stanza 2：银光面（1 行独句，拉高 line-height 制造呼吸） ── */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduced ? 0.001 : 0.65,
                delay: reduced ? 0 : 0.22,
                ease: reduced ? "linear" : [0.23, 1, 0.32, 1],
              }}
              className="mt-10 pl-10 text-foreground/85 md:mt-12 md:pl-16"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 400,
                fontSize: "clamp(1.0625rem, 0.5vw + 0.95rem, 1.3125rem)",
                lineHeight: 2.1,
                textWrap: "pretty",
              }}
            >
              绕远路时，有些孩子会发展出不同的理解方式和解决问题的策略。
            </motion.p>

            {/* ── Stanza 3：祛魅（突然回撤 + 字号缩小 + 颜色变淡 = 警句跳脱） ── */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduced ? 0.001 : 0.55,
                delay: reduced ? 0 : 0.34,
                ease: reduced ? "linear" : [0.23, 1, 0.32, 1],
              }}
              className="mt-6 pl-2 italic text-foreground/65 md:mt-8 md:pl-4"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 400,
                fontSize: "clamp(0.8125rem, 0.3vw + 0.75rem, 1rem)",
                lineHeight: 2.0,
                letterSpacing: "0.04em",
                textWrap: "pretty",
              }}
            >
              这不意味着每个孩子都是天才。
            </motion.p>

            {/* ── Stanza 4：落地（回 pl-0 主轴，承载「一扇窗」锚点） ── */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduced ? 0.001 : 0.75,
                delay: reduced ? 0 : 0.46,
                ease: reduced ? "linear" : [0.23, 1, 0.32, 1],
              }}
              className="mt-10 text-foreground md:mt-12"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 400,
                fontSize: "clamp(1.125rem, 0.6vw + 1rem, 1.4375rem)",
                lineHeight: 1.95,
                textWrap: "pretty",
              }}
            >
              真正重要的是早点发现、守住信心，
              <br />
              换一种方法，陪他一起找
              <span
                className="relative inline-block align-baseline text-primary"
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontWeight: 500,
                  fontSize: "1.08em",
                  letterSpacing: "0.05em",
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-[0.18em] h-px bg-primary/55"
                />
                一扇窗
              </span>
              。
            </motion.p>

            {/* ── 外链（保留既有 L363–L373） ── */}
            <a
              href="https://whatisdyslexia.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 whatisdyslexia.org 观看短片(英文页面,新窗口打开)"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary md:mt-12"
              style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              <span>这部短片，给了阅读障碍另一种讲法</span>
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>

            {/* ── 主色短分隔线（保留既有 L375–L377） ── */}
            <div className="mb-6 mt-14 flex items-center gap-4 md:mb-8 md:mt-16" aria-hidden>
              <span className="block h-px w-10 bg-primary/70 md:w-14" />
            </div>

            {/* ── 两句收尾金句（保留既有 L378–L401） ── */}
            <p
              className="text-foreground"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 600,
                fontSize: "clamp(1.375rem, 2.2vw + 0.5rem, 2.125rem)",
                lineHeight: 1.55,
                textWrap: "balance",
              }}
            >
              理解始于欣赏，支持带来可能。
            </p>
            <p
              className="mt-3 text-foreground/90 md:mt-5"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 500,
                fontSize: "clamp(1.1875rem, 1.4vw + 0.55rem, 1.625rem)",
                lineHeight: 1.6,
                textWrap: "balance",
              }}
            >
              请看见天赋，也请看见他们曾经付出的努力。
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative z-0 mb-16 md:mb-24"
        >
          <div className="mb-6">
            <h3
              className="text-xl text-foreground md:text-2xl"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              不同的路，也能抵达
            </h3>
          </div>

          {/* 画廊 wrapper：稳定最小高度、明确 stacking context */}
          <div className="relative z-0 mb-6 min-h-[420px] overflow-hidden border border-border bg-card md:min-h-[460px]">
            {/* CircularGallery：absolute 填满容器 */}
            <div className="absolute inset-0">
              <CircularGallery
                items={displayedFamousDyslexics.map(person => ({
                  image: person.image,
                  text: person.name,
                }))}
                bend={2}
                textColor="#545050"
                borderRadius={0.1}
                scrollSpeed={1.5}
                disabled={maskOpen}
              />
            </div>
            {/* mask：单独 z-20，只覆盖画廊区域 */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={maskOpen ? { x: "0%" } : { x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 z-20 bg-background/95"
              style={{ pointerEvents: maskOpen ? "auto" : "none" }}
              aria-hidden
            />
          </div>

          <div
            className="mx-auto max-w-3xl space-y-3 text-center text-sm leading-7 text-muted-foreground"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            <p>这些经历来自公开自述、访谈、传记或历史资料。</p>
            <p>
              每个人的道路和优势都不相同；它们不是"天才证明"，只是让我们看见，阅读困难之外，人生仍有许多可能。
            </p>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 active:scale-95"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              <InfoIcon className="size-4" aria-hidden />
              了解详情
            </button>
          </div>
        </motion.div>

        <FamousDyslexicsModal open={sheetOpen} onOpenChange={handleCloseModal} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="py-12 text-center"
        >
          <p
            className="text-3xl leading-tight text-primary md:text-5xl"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}
          >
            「文字应该向每个人敞开。」
          </p>
          <p
            className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            当家庭、学校和社会愿意一起调整路径，阅读障碍儿童就不再只是“跟不上”的那一个，而是可以被理解、被支持、被看见的学习者。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
