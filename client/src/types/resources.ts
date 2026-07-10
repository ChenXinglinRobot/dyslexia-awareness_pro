/* ============================================================
   resources — 社会资源页统一类型定义
   供 data/ 层与后续组件使用
   ============================================================ */

export type ResourceType = "hospital" | "institute" | "online-resource" | "game";

export interface BaseResource {
  id: string;
  name: string;
  desc: string;
  logo?: string;
  url: string;
  type: ResourceType;
  // ── 图片回退 ──
  logoFallback?: string; // 主图加载失败的回退
  heroImage?: string;
  heroImageFallback?: string;
  // ── 主题感知 ──
  // 大多数 logo 是「深色文字 + 透明」，在日间卡片（白底）上清晰，
  // 但在夜间卡片（深海军蓝）上几乎不可见。对这类资源，可选地提供
  // 一个「反相/浅色版」用于暗色模式（应用主题由 ThemeProvider 写入
  // <html class="dark">，与 OS 的 prefers-color-scheme 脱钩，见
  // ThemeContext.tsx:32-43，所以渲染端用 useTheme() 而不是 <picture media="...">）。
  // 球面（InfiniteMenu）等深色场景的 image 字段也可指向暗色版。
  logoDark?: string;
  // ── 旧字段兼容 ──
  image?: string; // FlowingMenu / InfiniteMenu 必需
}

export interface Hospital extends BaseResource {
  type: "hospital";
  city: string;
  dyslexiaUnit: string; // ★ 焦点行字段
  unitUrl?: string;
  officialUrl: string;
  acceptAge?: string;
  // ── 收窄为必填（实际数据都有，FlowingMenu.MenuItemData 要求 string） ──
  image: string;
}

export interface ResearchInstitute extends BaseResource {
  type: "institute";
  city: string;
  dyslexiaLab: string; // ★ 焦点行字段
  labUrl?: string;
  officialUrl: string;
  focusAreas?: string[];
  institutionDesc?: string; // 机构/高校自身介绍
  // ── 收窄为必填（实际数据都有，FlowingMenu.MenuItemData 要求 string） ──
  image: string;
}

export interface OnlineResource extends BaseResource {
  type: "online-resource";
  platform: string;
  expert: string; // ★ 焦点行字段
  expertAffiliation?: string;
  focus?: string[];
  updateFrequency?: string;
}

export interface GameIntervention extends BaseResource {
  type: "game";
  region: "domestic" | "international";
  language: "zh-CN" | "en" | "multi";
  skills: string[];
  ageRange: [number, number];
  cost: "free" | "paid" | "freemium";
  isResearchBacked: boolean;
  // ── 主题感知图片（继承自 BaseResource.logoDark） ──
  // 球面（InfiniteMenu）背景也是深色，建议 image 用深色版。
  // 现行实例：Poppins（[data/gameInterventions.ts:208-227]）。
  // ── 旧字段兼容（MenuItem = { image, link, title, description }) ──
  link: string; // = url
  title: string; // = name
  description: string; // = desc
  // ── 收窄为必填（实际数据都有，InfiniteMenu.MenuItem 要求 string） ──
  image: string;
}

export type Resource =
  | Hospital
  | ResearchInstitute
  | OnlineResource
  | GameIntervention;
