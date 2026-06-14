/* ============================================================
   institutions — 研究机构与医疗资源
   供 ResourcesSection 的 FlowingMenu 使用
   image 字段为 FlowingMenu 必需；先用 picsum 占位，后续替换
   ============================================================ */

export interface Institution {
  name: string;
  desc: string;
  url: string;
  image: string;
}

export const institutions: Institution[] = [
  {
    name: "北京大学第六医院",
    desc: "国家精神心理疾病临床医学研究中心，从事阅读障碍临床诊断与研究。",
    url: "https://www.pkuh6.cn",
    image: "https://picsum.photos/seed/pku-sixth/800/800",
  },
  {
    name: "北京师范大学认知神经科学与学习国家重点实验室",
    desc: "开展阅读障碍的认知神经机制研究与教育干预方案开发。",
    url: "https://brain.bnu.edu.cn",
    image: "https://picsum.photos/seed/bnu-brain/800/800",
  },
  {
    name: "华中科技大学同济医学院附属同济医院",
    desc: "儿童发育行为科开展阅读障碍的临床评估与干预。",
    url: "https://www.tjh.com.cn",
    image: "https://picsum.photos/seed/tjh-tongji/800/800",
  },
  {
    name: "中南大学湘雅二医院",
    desc: "精神卫生研究所从事儿童青少年阅读障碍的临床与科研工作。",
    url: "https://www.xyeyy.com",
    image: "https://picsum.photos/seed/xyeyy/800/800",
  },
  {
    name: "深圳市康宁医院（深圳市精神卫生中心）",
    desc: "开展儿童发展性阅读障碍的筛查与早期干预服务。",
    url: "https://www.szknhospital.com",
    image: "https://picsum.photos/seed/szkn/800/800",
  },
  {
    name: "首都医科大学附属北京天坛医院",
    desc: "神经内科团队参与阅读障碍的神经影像学研究。",
    url: "https://www.bjtth.org",
    image: "https://picsum.photos/seed/bjtth/800/800",
  },
];
