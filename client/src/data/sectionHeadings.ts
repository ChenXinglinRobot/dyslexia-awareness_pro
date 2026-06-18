import type { CSSProperties } from "react";

/**
 * SectionHeading 视觉级别
 * - main: section 根标题（H2），使用 Glitch 效果
 * - sub:  subsection 子标题（H3），使用 Fuzzy 效果
 */
export type HeadingLevel = "main" | "sub";

/**
 * 英文小标签的效果
 * - shuffle: Shuffle 组件（滚到视口时触发一次字符渐变）
 * - none:    静态 <p>
 */
export type EnEffect = "shuffle" | "none";

/**
 * 单一权威源：描述"哪个 section 标题用哪个 level、用什么效果、保留什么样式"。
 *
 * 修改策略：
 * - 增删标题  → 改 SECTION_HEADINGS 数组
 * - 改文字    → 改 cn / en
 * - 调样式    → 改 enClassName / enStyle（section 级别的样式覆盖）
 * - 调效果    → 改 enEffect（仅 main 级别）
 */
export interface SectionHeadingEntry {
  /** 唯一 id。section 根用裸 id，子标题用 `parent:slug` 复合 id */
  sectionId: string;
  /** 中文标题 */
  cn: string;
  /** 英文小标签（仅 main 级别，目前 4 个 section 都有） */
  en?: string;
  /** 英文小标签的 className 覆盖（默认由 SectionHeading 提供） */
  enClassName?: string;
  /** 英文小标签的 inline style 覆盖 */
  enStyle?: CSSProperties;
  /** 视觉级别 */
  level: HeadingLevel;
  /** 英文效果：仅对 main 级别生效；sub 级别忽略此字段 */
  enEffect?: EnEffect;
}

/**
 * 4 个 section 根标题 + UnderstandSection 内 3 个子标题。
 * 拼写错误 → TypeScript 字面量联合类型报错
 */
export const SECTION_HEADINGS = [
  {
    sectionId: "understand",
    cn: "了解阅读障碍",
    en: "Understanding Dyslexia",
    level: "main",
    enEffect: "shuffle",
  },
  {
    sectionId: "action",
    cn: "让我们共同努力",
    en: "Take Action Together",
    level: "main",
    enEffect: "shuffle",
  },
  {
    sectionId: "resources",
    cn: "社会资源",
    en: "Social Resources",
    level: "main",
    enEffect: "shuffle",
  },
  {
    sectionId: "about",
    cn: "关于我们",
    en: "About Us",
    level: "main",
    enEffect: "shuffle",
  },
  { sectionId: "understand:sim",  cn: "模拟体验",                  level: "sub" },
  { sectionId: "understand:crowd", cn: "视觉拥挤效应",             level: "sub" },
  { sectionId: "understand:math", cn: "一道乘法题，归零了整个世界", level: "sub" },
  { sectionId: "understand:cn",   cn: "汉语的特殊性",              level: "sub" },
] as const satisfies readonly SectionHeadingEntry[];

/** 字面量联合类型："understand" | "action" | ... | "understand:sim" | ... */
export type SectionHeadingId = (typeof SECTION_HEADINGS)[number]["sectionId"];

/**
 * 查表函数。sectionId 不存在时抛错 —— 这是字面量类型 + 编译期校验的运行期兜底。
 */
export const getHeading = (id: SectionHeadingId): SectionHeadingEntry => {
  const entry = SECTION_HEADINGS.find((h) => h.sectionId === id);
  if (!entry) throw new Error(`SectionHeading: unknown sectionId "${id}"`);
  return entry;
};
