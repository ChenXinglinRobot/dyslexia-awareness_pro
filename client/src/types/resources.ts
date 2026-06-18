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
