/* ============================================================
   onlineResources — 在线资源（公众号、B站、科普平台等）
   后续窗口会渲染到社会资源页的新分区
   ============================================================ */

import type { OnlineResource } from "@/types/resources";

export const onlineResources: OnlineResource[] = [
  {
    id: "wechat-mengxiangzhi",
    type: "online-resource",
    name: "孟祥芝教授谈阅读",
    desc: "北师大教授分享阅读障碍研究与干预方法",
    url: "https://mp.weixin.qq.com/",
    logo: "https://picsum.photos/seed/mengxiangzhi/800/800",
    image: "https://picsum.photos/seed/mengxiangzhi/800/800",
    platform: "微信公众号",
    expert: "孟祥芝 · 北京师范大学教授",
    expertAffiliation: "北京师范大学认知神经科学与学习国家重点实验室",
    focus: ["阅读障碍科普", "家长指导", "干预方法"],
    updateFrequency: "月更",
  },
  {
    id: "bilibili-dyslexia-channel",
    type: "online-resource",
    name: "阅读障碍科普频道",
    desc: "B站UP主分享阅读障碍儿童家庭干预经验与科普视频",
    url: "https://www.bilibili.com/",
    logo: "https://picsum.photos/seed/dyslexia-bili/800/800",
    image: "https://picsum.photos/seed/dyslexia-bili/800/800",
    platform: "哔哩哔哩",
    expert: "阅读障碍科普团队",
    focus: ["阅读障碍科普", "家庭干预", "视频教程"],
    updateFrequency: "周更",
  },
];
