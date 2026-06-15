/* ============================================================
   institutions — 研究机构与医疗资源
   供 ResourcesSection 的 FlowingMenu 使用
   image 字段为 FlowingMenu 必需；先用 picsum 占位，后续替换

   旧字段 name / desc / url / image 保持不变（兼容 ResourcesSection）
   新字段 id / city / type / dyslexiaUnit|dyslexiaLab / officialUrl / logo 等
   冗余共存，Window 4 整合时统一清理
   ============================================================ */

import type { Hospital, ResearchInstitute } from "@/types/resources";

export const hospitals: Hospital[] = [
  {
    id: "pku-sixth-hospital",
    type: "hospital",
    city: "北京",
    dyslexiaUnit: "儿童学习障碍门诊",
    officialUrl: "https://www.pkuh6.cn",
    acceptAge: "6-18岁",
    // ── 旧字段 ──
    name: "北京大学第六医院",
    desc: "国家精神心理疾病临床医学研究中心，从事阅读障碍临床诊断与研究。",
    url: "https://www.pkuh6.cn",
    image: "https://picsum.photos/seed/pku-sixth/800/800",
    logo: "https://picsum.photos/seed/pku-sixth/800/800",
  },
  {
    id: "tjh-tongji-hospital",
    type: "hospital",
    city: "武汉",
    dyslexiaUnit: "儿童发育行为科",
    officialUrl: "https://www.tjh.com.cn",
    acceptAge: "3-14岁",
    // ── 旧字段 ──
    name: "华中科技大学同济医学院附属同济医院",
    desc: "儿童发育行为科开展阅读障碍的临床评估与干预。",
    url: "https://www.tjh.com.cn",
    image: "https://picsum.photos/seed/tjh-tongji/800/800",
    logo: "https://picsum.photos/seed/tjh-tongji/800/800",
  },
  {
    id: "xyeyy-xiangya",
    type: "hospital",
    city: "长沙",
    dyslexiaUnit: "儿童青少年精神卫生门诊",
    officialUrl: "https://www.xyeyy.com",
    acceptAge: "6-16岁",
    // ── 旧字段 ──
    name: "中南大学湘雅二医院",
    desc: "精神卫生研究所从事儿童青少年阅读障碍的临床与科研工作。",
    url: "https://www.xyeyy.com",
    image: "https://picsum.photos/seed/xyeyy/800/800",
    logo: "https://picsum.photos/seed/xyeyy/800/800",
  },
  {
    id: "szkn-kangning",
    type: "hospital",
    city: "深圳",
    dyslexiaUnit: "儿童发展性阅读障碍筛查中心",
    officialUrl: "https://www.szknhospital.com",
    acceptAge: "6-12岁",
    // ── 旧字段 ──
    name: "深圳市康宁医院（深圳市精神卫生中心）",
    desc: "开展儿童发展性阅读障碍的筛查与早期干预服务。",
    url: "https://www.szknhospital.com",
    image: "https://picsum.photos/seed/szkn/800/800",
    logo: "https://picsum.photos/seed/szkn/800/800",
  },
  {
    id: "bjtth-tiantan",
    type: "hospital",
    city: "北京",
    dyslexiaUnit: "神经影像学研究组",
    officialUrl: "https://www.bjtth.org",
    // ── 旧字段 ──
    name: "首都医科大学附属北京天坛医院",
    desc: "神经内科团队参与阅读障碍的神经影像学研究。",
    url: "https://www.bjtth.org",
    image: "https://picsum.photos/seed/bjtth/800/800",
    logo: "https://picsum.photos/seed/bjtth/800/800",
  },
];

export const researchInstitutes: ResearchInstitute[] = [
  {
    id: "bnu-brain-lab",
    type: "institute",
    city: "北京",
    dyslexiaLab: "认知神经科学与学习国家重点实验室",
    labUrl: "https://brain.bnu.edu.cn",
    officialUrl: "https://brain.bnu.edu.cn",
    focusAreas: ["阅读障碍", "认知神经科学", "教育干预"],
    // ── 旧字段 ──
    name: "北京师范大学认知神经科学与学习国家重点实验室",
    desc: "开展阅读障碍的认知神经机制研究与教育干预方案开发。",
    url: "https://brain.bnu.edu.cn",
    image: "https://picsum.photos/seed/bnu-brain/800/800",
    logo: "https://picsum.photos/seed/bnu-brain/800/800",
  },
];

/** 兼容导出 — ResourcesSection 仍 import { institutions } */
export const institutions = [...hospitals, ...researchInstitutes];
