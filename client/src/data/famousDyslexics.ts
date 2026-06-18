export type FamousDyslexicEvidenceLabel =
  | "本人公开自述"
  | "权威媒体报道"
  | "传记资料提及"
  | "历史推测，谨慎参考";

export interface FamousDyslexic {
  name: string;
  field: string;
  image: string;
  description: string;
  evidenceLabel?: FamousDyslexicEvidenceLabel;
  difficulty?: string;
  supportOrPath?: string;
  limitation?: string;
}

export const famousDyslexics: FamousDyslexic[] = [
  {
    name: "Steven Spielberg",
    field: "电影导演",
    image: "/famous-dyslexics/spielberg.jpg",
    description: "电影导演，曾公开谈到阅读障碍诊断和学生时期的阅读困难。",
    evidenceLabel: "本人公开自述",
    difficulty: "他曾公开谈到自己阅读速度较慢，学生时期在阅读和完成课堂任务时比同龄人更吃力。",
    supportOrPath:
      "影像表达、讲故事和片场实践成为他理解世界与表达想法的重要路径；成年后的诊断也帮助他重新理解早年的学习经历。",
    limitation:
      "这个案例不能说明阅读障碍会带来电影才能，也不能说明困难会自动消失。真正重要的是理解困难，并给出适合个人的支持路径。",
  },
  {
    name: "General Patton",
    field: "军事人物",
    image: "/famous-dyslexics/patton.jpg",
    description: "美国陆军将领；部分传记资料提及其早年读写困难经历。",
    evidenceLabel: "传记资料提及",
    difficulty: "传记资料常提到他童年学习读写困难，在军事院校早期也曾因学业表现吃力而受挫。",
    supportOrPath:
      "资料显示，他后来通过反复训练、军事技能、体能与组织实践寻找优势路径；但这些并不是阅读障碍的通用解决方案。",
    limitation:
      "这个案例不能说明只要足够努力，所有阅读障碍都会自然克服；也不能替代专业评估和针对性支持。",
  },
  {
    name: "George W. Bush",
    field: "政治人物",
    image: "/famous-dyslexics/bush-w.jpg",
    description: "美国第43任总统；部分媒体曾讨论其可能存在阅读或语言加工困难。",
    evidenceLabel: "权威媒体报道",
    difficulty:
      "公开资料中更多是媒体和评论者对其学生时期表现、语言错误和家族学习困难背景的讨论，并非现代标准下的确诊记录。",
    supportOrPath:
      "可谨慎理解为：学习困难有时会在家庭、学校和社会评价中被误读；是否属于阅读障碍仍需专业资料支持。",
    limitation:
      "这个案例不能说明他本人已经确诊阅读障碍，也不能把公众人物的语言风格简单归因为阅读障碍。",
  },
  {
    name: "Albert Einstein",
    field: "物理学家",
    image: "/famous-dyslexics/einstein.jpg",
    description: "物理学家；常被列入相关讨论，但缺少现代诊断记录。",
    evidenceLabel: "历史推测，谨慎参考",
    difficulty:
      "关于他是否存在阅读障碍，公开流传说法很多，但缺少可按现代诊断标准核验的记录；不宜编写具体的阅读障碍经历。",
    supportOrPath:
      "更谨慎的理解是：他在数学、物理和概念推理上表现突出，但这不能被倒推出某种诊断。",
    limitation:
      "这个案例不能说明阅读障碍等于天才，也不能把历史人物的成就当作现代医学或教育判断的证据。",
  },
  {
    name: "Pablo Picasso",
    field: "艺术家",
    image: "/famous-dyslexics/picasso.jpg",
    description: "艺术家；常见名人名单会提及，但可靠诊断资料不足。",
    evidenceLabel: "历史推测，谨慎参考",
    difficulty:
      "目前缺少可核验的现代诊断记录；如果资料不足，就不应替他编造具体的阅读、拼写或学校困难。",
    supportOrPath:
      "他的艺术训练和视觉表达路径可以启发我们看见多样能力，但不能作为阅读障碍经验的直接证明。",
    limitation:
      "这个案例不能说明阅读障碍会带来艺术天赋，也不能用名人成就淡化真实的阅读困难。",
  },
  {
    name: "Winston Churchill",
    field: "政治人物",
    image: "/famous-dyslexics/churchill.jpg",
    description: "政治人物、作家；关于阅读障碍的说法多属于后世推测。",
    evidenceLabel: "历史推测，谨慎参考",
    difficulty:
      "他学生时期学业表现不稳定的资料较常见，但将其直接等同于阅读障碍缺少现代诊断依据。",
    supportOrPath:
      "可以谨慎理解为：一个人的表达能力、学习路径和学校成绩并不总是线性对应；但具体支持经历不能凭空补写。",
    limitation:
      "这个案例不能说明阅读障碍会造就演说或写作能力，也不能用后世推测替代专业诊断。",
  },
];
