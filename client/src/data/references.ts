export type ReferenceUsage = "cited" | "future" | "supplementary";

export interface ReferenceRecord {
  id: number;
  authors: string;
  title: string;
  publication: string;
  year: number;
  doi?: string;
  url: string;
  shortLabel: string;
  usage: ReferenceUsage;
  note?: string;
}

/**
 * 全站唯一的参考文献编号表。
 *
 * 编号沿用 reference/CITATIONS.md 的既定顺序，避免后续板块上线时重排。
 * 书目信息已按论文首页与出版页面核对；PDF 文件名前缀不是最终引用编号。
 */
export const REFERENCES = [
  {
    id: 1,
    authors: "王久菊，孟祥芝，李虹，等",
    title: "汉语发展性阅读障碍诊断与干预的专家意见",
    publication: "中国心理卫生杂志，2023，37(3)：185–191",
    year: 2023,
    doi: "10.3969/j.issn.1000-6729.2023.03.001",
    url: "https://doi.org/10.3969/j.issn.1000-6729.2023.03.001",
    shortLabel: "王久菊等（2023）",
    usage: "cited",
  },
  {
    id: 2,
    authors:
      "Marco Zorzi, Chiara Barbiero, Andrea Facoetti, Isabella Lonciari, Marco Carrozzi, Marcella Montico, Laura Bravar, Florence George, Catherine Pech-Georgel, Johannes C. Ziegler",
    title: "Extra-large letter spacing improves reading in dyslexia",
    publication:
      "Proceedings of the National Academy of Sciences，2012，109(28)：11455–11459",
    year: 2012,
    doi: "10.1073/pnas.1205566109",
    url: "https://doi.org/10.1073/pnas.1205566109",
    shortLabel: "Zorzi et al.（2012）",
    usage: "cited",
  },
  {
    id: 3,
    authors:
      "Marialuisa Martelli, Gloria Di Filippo, Donatella Spinelli, Pierluigi Zoccolotti",
    title: "Crowding, reading, and developmental dyslexia",
    publication: "Journal of Vision，2009，9(4)：Article 14，1–18",
    year: 2009,
    doi: "10.1167/9.4.14",
    url: "https://doi.org/10.1167/9.4.14",
    shortLabel: "Martelli et al.（2009）",
    usage: "cited",
  },
  {
    id: 4,
    authors: "Chien-Chih Tseng, Jon-Fan Hu, Li-Yun Chang, Hsueh-Chih Chen",
    title:
      "Learning to read Chinese: The roles of phonological awareness, paired-associate learning, and phonetic radical awareness",
    publication: "Reading and Writing，2023，36(7)：1769–1795",
    year: 2023,
    doi: "10.1007/s11145-022-10352-9",
    url: "https://doi.org/10.1007/s11145-022-10352-9",
    shortLabel: "Tseng et al.（2023）",
    usage: "cited",
  },
  {
    id: 5,
    authors: "Shuang Song, George K. Georgiou, Mengmeng Su, Hua Shu",
    title:
      "How well do phonological awareness and rapid automatized naming correlate with Chinese reading accuracy and fluency? A meta-analysis",
    publication: "Scientific Studies of Reading，2016，20(2)：99–123",
    year: 2016,
    doi: "10.1080/10888438.2015.1088543",
    url: "https://doi.org/10.1080/10888438.2015.1088543",
    shortLabel: "Song et al.（2016）",
    usage: "cited",
  },
  {
    id: 6,
    authors: "Wesley A. Hoover, Philip B. Gough",
    title: "The Simple View of Reading",
    publication: "Reading and Writing，1990，2(2)：127–160",
    year: 1990,
    doi: "10.1007/BF00401799",
    url: "https://doi.org/10.1007/BF00401799",
    shortLabel: "Hoover & Gough（1990）",
    usage: "cited",
  },
  {
    id: 7,
    authors: "Philip B. Gough, William E. Tunmer",
    title: "Decoding, reading, and reading disability",
    publication: "Remedial and Special Education，1986，7(1)：6–10",
    year: 1986,
    doi: "10.1177/074193258600700104",
    url: "https://doi.org/10.1177/074193258600700104",
    shortLabel: "Gough & Tunmer（1986）",
    usage: "cited",
  },
  {
    id: 8,
    authors: "Hua Shu, Richard C. Anderson",
    title:
      "Role of radical awareness in the character and word acquisition of Chinese children",
    publication: "Reading Research Quarterly，1997，32(1)：78–89",
    year: 1997,
    doi: "10.1598/RRQ.32.1.5",
    url: "https://doi.org/10.1598/RRQ.32.1.5",
    shortLabel: "Shu & Anderson（1997）",
    usage: "cited",
  },
  {
    id: 9,
    authors: "Hua Shu, Catherine McBride-Chang, Sina Wu, Hongyun Liu",
    title:
      "Understanding Chinese developmental dyslexia: Morphological awareness as a core cognitive construct",
    publication: "Journal of Educational Psychology，2006，98(1)：122–133",
    year: 2006,
    doi: "10.1037/0022-0663.98.1.122",
    url: "https://doi.org/10.1037/0022-0663.98.1.122",
    shortLabel: "Shu et al.（2006）",
    usage: "cited",
  },
  {
    id: 10,
    authors:
      "Sarah G. Wood, Jerad H. Moxley, Elizabeth L. Tighe, Richard K. Wagner",
    title:
      "Does use of text-to-speech and related read-aloud tools improve reading comprehension for students with reading disabilities? A meta-analysis",
    publication: "Journal of Learning Disabilities，2018，51(1)：73–84",
    year: 2018,
    doi: "10.1177/0022219416688170",
    url: "https://doi.org/10.1177/0022219416688170",
    shortLabel: "Wood et al.（2018）",
    usage: "cited",
  },
  {
    id: 11,
    authors:
      "Sanne M. Kuster, Marjolijn van Weerdenburg, Marjolein Gompel, Anna M. T. Bosman",
    title:
      "Dyslexie font does not benefit reading in children with or without dyslexia",
    publication: "Annals of Dyslexia，2018，68(1)：25–42",
    year: 2018,
    doi: "10.1007/s11881-017-0154-6",
    url: "https://doi.org/10.1007/s11881-017-0154-6",
    shortLabel: "Kuster et al.（2018）",
    usage: "cited",
  },
  {
    id: 12,
    authors:
      "Jessica Galliussi, Luciano Perondi, Giuseppe Chia, Walter Gerbino, Paolo Bernardis",
    title:
      "Inter-letter spacing, inter-word spacing, and font with dyslexia-friendly features: Testing text readability in people with and without dyslexia",
    publication: "Annals of Dyslexia，2020，70(1)：141–152",
    year: 2020,
    doi: "10.1007/s11881-020-00194-x",
    url: "https://doi.org/10.1007/s11881-020-00194-x",
    shortLabel: "Galliussi et al.（2020）",
    usage: "cited",
  },
  {
    id: 13,
    authors: "Florina Erbeli, Peng Peng, Marianne Rice",
    title:
      "No evidence of creative benefit accompanying dyslexia: A meta-analysis",
    publication: "Journal of Learning Disabilities，2022，55(3)：242–253",
    year: 2022,
    doi: "10.1177/00222194211010350",
    url: "https://doi.org/10.1177/00222194211010350",
    shortLabel: "Erbeli et al.（2022）",
    usage: "cited",
  },
  {
    id: 14,
    authors: "Nadyanna M. Majeed, Andree Hartanto, Jacinth J. X. Tan",
    title: "Developmental dyslexia and creativity: A meta-analysis",
    publication: "Dyslexia，2021，27(2)：187–203",
    year: 2021,
    doi: "10.1002/dys.1677",
    url: "https://doi.org/10.1002/dys.1677",
    shortLabel: "Majeed et al.（2021）",
    usage: "cited",
  },
  {
    id: 15,
    authors: "Hugh W. Catts, Yaacov Petscher",
    title: "A cumulative risk and resilience model of dyslexia",
    publication: "Journal of Learning Disabilities，2022，55(3)：171–184",
    year: 2022,
    doi: "10.1177/00222194211037062",
    url: "https://doi.org/10.1177/00222194211037062",
    shortLabel: "Catts & Petscher（2022）",
    usage: "cited",
  },
  {
    id: 16,
    authors:
      "Lijuan Liu, Tuo Fang, Enmao Liu, Shang Shi, Shuo Zhai, Yang Chen, Lingyan Zhang, Yan Shi, Cheng Yao",
    title:
      "CNReader: A reading practice tool designed for Chinese children with developmental dyslexia",
    publication:
      "Humanities and Social Sciences Communications，2025，12：Article 751",
    year: 2025,
    doi: "10.1057/s41599-025-05079-1",
    url: "https://doi.org/10.1057/s41599-025-05079-1",
    shortLabel: "Liu et al.（2025）",
    usage: "cited",
    note: "研究原型；不等同于已商业化产品。",
  },
  {
    id: 17,
    authors:
      "Shuhan Zhong, Sizhe Song, Tianhao Tang, Fei Nie, Xinrui Zhou, Yankun Zhao, Yizhe Zhao, Kuen Fung Sin, S.-H. Gary Chan",
    title:
      "DYPA: A machine learning dyslexia prescreening mobile application for Chinese children",
    publication:
      "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies，2023，7(3)：Article 143，21 pages",
    year: 2023,
    doi: "10.1145/3610908",
    url: "https://doi.org/10.1145/3610908",
    shortLabel: "Zhong et al.（2023）",
    usage: "cited",
    note: "研究原型；只能用于风险预筛查，不能替代专业诊断。",
  },
  {
    id: 18,
    authors: "Mingliang Gong, Tong Li, Han Sheng",
    title:
      "The impact of visual crowding on Chinese character recognition: A comparative study of primary school children and adult university students",
    publication: "Current Psychology，2025，44：9365–9376",
    year: 2025,
    doi: "10.1007/s12144-025-07765-4",
    url: "https://doi.org/10.1007/s12144-025-07765-4",
    shortLabel: "Gong et al.（2025）",
    usage: "supplementary",
    note: "补充背景：研究比较一般儿童与成人的汉字视觉拥挤，并非阅读障碍样本。",
  },
  {
    id: 19,
    authors: "International Dyslexia Association",
    title: "2025 Definition of Dyslexia",
    publication: "International Dyslexia Association，2025（官方定义，在线）",
    year: 2025,
    url: "https://dyslexiaida.org/definition-of-dyslexia/",
    shortLabel: "IDA（2025）",
    usage: "cited",
    note: "IDA 官方定义；在线资源，无本地 PDF。",
  },
] as const satisfies readonly ReferenceRecord[];

export type ReferenceId = (typeof REFERENCES)[number]["id"];

export function getReference(id: ReferenceId) {
  const reference = REFERENCES.find(item => item.id === id);

  if (!reference) {
    throw new Error(`Unknown reference id: ${id}`);
  }

  return reference;
}
