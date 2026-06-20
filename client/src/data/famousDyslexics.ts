export type FamousDyslexicEvidenceLabel =
  | "公开自述"
  | "媒体报道"
  | "传记提及"
  | "资料提及"
  | "历史资料推测";

export interface FamousDyslexic {
  name: string;
  field: string;
  image: string;
  description: string;
  evidenceLabel?: FamousDyslexicEvidenceLabel;
  evidenceNote?: string;
  featured?: boolean;
  difficulty?: string;
  supportOrPath?: string;
  limitation?: string;
}

export const famousDyslexics: FamousDyslexic[] = [
  {
    name: "Steven Spielberg",
    field: "电影导演",
    image: "/famous-dyslexics/spielberg.webp",
    description: "电影导演、制片人，创作了《E.T.外星人》《侏罗纪公园》《辛德勒的名单》等作品，用镜头把想象、冒险与人性的重量带给一代又一代观众。",
    evidenceLabel: "公开自述",
    featured: true,
    difficulty: "他曾说自己读得慢，学生时代在课堂任务里花了更多力气。",
    supportOrPath: "读得慢不代表想象力慢，你仍然可以用故事、画面和行动表达自己。",
    limitation: "每个孩子都需要被具体理解，也需要找到适合自己的支持方式。",
  },
  {
    name: "General Patton",
    field: "军事人物",
    image: "/famous-dyslexics/patton.webp",
    description: "美国陆军将领，二战期间指挥装甲部队作战，以果断、强悍和极具行动力的军事风格闻名。",
    evidenceLabel: "传记提及",
    featured: true,
    difficulty: "传记资料提到，他小时候学习读写并不轻松，也经历过学业上的挫折。",
    supportOrPath: "有些能力是在一次次练习、行动和承担责任中慢慢长出来的。",
    limitation: "名人故事可以带来鼓励，但每个孩子的支持方式都需要因人而异。",
  },
  {
    name: "Bill Gates",
    field: "科技企业家",
    image: "/famous-dyslexics/gates.webp",
    description: "微软联合创始人，推动个人电脑进入普通人的生活；离开公司一线后，也长期投入教育、公共健康和公益事业。",
    evidenceLabel: "资料提及",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "一些公益科普资料会把他列入相关人物名单，提醒我们学习方式可以很多样。",
    supportOrPath: "好奇心、动手尝试和长期投入，也可能成为你走向世界的路。",
    limitation: "把它当作鼓励的故事，而不是给任何人贴标签。",
  },
  {
    name: "George W. Bush",
    field: "政治人物",
    image: "/famous-dyslexics/bush-w.webp",
    description: "美国第43任总统，曾任得克萨斯州州长，在任内经历重大公共事件，也长期参与公共服务与社会议题。",
    evidenceLabel: "媒体报道",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "媒体曾讨论过他可能存在阅读或语言加工方面的困难。",
    supportOrPath: "表达不总是完美，但人依然可以学习承担、沟通和前进。",
    limitation: "把它当作疑似案例来理解，不把单一表现当成结论。",
  },
  {
    name: "George H. W. Bush",
    field: "政治人物",
    image: "/famous-dyslexics/bush-hw.webp",
    description: "美国第41任总统，曾任副总统、中央情报局局长和驻联合国代表，一生横跨外交、安全与公共服务领域。",
    evidenceLabel: "资料提及",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "一些名人名单会提到他的相关学习差异经历，公开细节并不多。",
    supportOrPath: "人生有很多条路，认真做事和持续成长也会被看见。",
    limitation: "把它当作疑似案例来理解，不把名单说法当成最终结论。",
  },
  {
    name: "Michael Phelps",
    field: "游泳运动员",
    image: "/famous-dyslexics/phelps.webp",
    description: "奥运游泳冠军，凭借长期训练、惊人专注和强大毅力，成为世界泳坛最具代表性的运动员之一。",
    evidenceLabel: "资料提及",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "公益科普资料常把他和学习差异联系在一起，提醒我们每个孩子都有不同节奏。",
    supportOrPath: "如果书本上的路很难，身体、兴趣和热爱也可能带你找到力量。",
    limitation: "鼓励孩子看见多种可能，也尊重每个人不同的困难。",
  },
  {
    name: "Albert Einstein",
    field: "物理学家",
    image: "/famous-dyslexics/einstein.webp",
    description: "物理学家，提出相对论，也因光电效应研究获得诺贝尔物理学奖；他的思想改变了人类理解时间、空间和宇宙的方式。",
    evidenceLabel: "历史资料推测",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "关于他早年学习方式的故事流传很多，也让人看到成长并不只有一种速度。",
    supportOrPath: "慢一点、想得不一样，都不妨碍你保有好奇心和提问的勇气。",
    limitation: "历史故事适合带来鼓励，也需要和今天的专业判断分开。",
  },
  {
    name: "Pablo Picasso",
    field: "艺术家",
    image: "/famous-dyslexics/picasso.webp",
    description: "艺术家，现代艺术的重要代表人物之一，与立体主义密切相关；他的绘画、雕塑和视觉实验改变了人们观看世界的方式。",
    evidenceLabel: "历史资料推测",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "一些历史资料和名人名单会把他与阅读困难联系起来。",
    supportOrPath: "如果文字让你费力，画面、颜色、手作和创造也可以成为表达自己的语言。",
    limitation: "艺术故事可以鼓励孩子探索自己，但不需要把困难浪漫化。",
  },
  {
    name: "Winston Churchill",
    field: "政治人物",
    image: "/famous-dyslexics/churchill.webp",
    description: "英国首相、作家、演说家，在二战关键时期以坚定演讲和政治领导力鼓舞英国，也曾获得诺贝尔文学奖。",
    evidenceLabel: "历史资料推测",
    evidenceNote: "疑似阅读障碍",
    featured: true,
    difficulty: "他的学生时代并不总是一帆风顺，但后来把语言、勇气和判断力变成了自己的力量。",
    supportOrPath: "现在吃力，不代表以后没有光；你也可以慢慢长出自己的声音。",
    limitation: "历史故事适合带来鼓励，也需要和今天的专业判断分开。",
  },
];
