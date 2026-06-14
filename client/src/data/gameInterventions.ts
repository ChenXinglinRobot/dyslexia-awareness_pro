/* ============================================================
   gameInterventions — 游戏化干预资源
   供 ResourcesSection 中 Dialog → InfiniteMenu 使用
   形状严格匹配 InfiniteMenu.MenuItem：{ image, link, title, description }
   image 必须 1:1 正方形，≥ 800x800；先全部用 picsum 占位
   ============================================================ */

export interface GameIntervention {
  image: string;
  link: string;
  title: string;
  description: string;
}

export const gameInterventions: GameIntervention[] = [
  {
    image: "https://picsum.photos/seed/phoneme-trail/800/800",
    link: "https://example.com/phoneme-trail",
    title: "音素追踪",
    description: "通过音素切分与重组训练，强化汉语拼音—字形—语义映射。",
  },
  {
    image: "https://picsum.photos/seed/char-radical/800/800",
    link: "https://example.com/char-radical",
    title: "汉字部件拼装",
    description: "拆解—重组偏旁部首，提升字形识别速度与结构化记忆。",
  },
  {
    image: "https://picsum.photos/seed/reading-flow/800/800",
    link: "https://example.com/reading-flow",
    title: "朗读流畅度跑酷",
    description: "限时朗读闯关，记录速度与错读率，针对性强化节奏感。",
  },
  {
    image: "https://picsum.photos/seed/dict-spell/800/800",
    link: "https://example.com/dict-spell",
    title: "听写闯关",
    description: "多模态听写输入（语音/手写），针对错字归因与反复练习。",
  },
  {
    image: "https://picsum.photos/seed/working-mem/800/800",
    link: "https://example.com/working-mem",
    title: "工作记忆塔防",
    description: "短时序列记忆与多任务切换，间接提升阅读理解容量。",
  },
  {
    image: "https://picsum.photos/seed/multisense/800/800",
    link: "https://example.com/multisense",
    title: "多感官字词",
    description: "视听触多通道编码，配合图—音—形—义配对，巩固识字。",
  },
];
