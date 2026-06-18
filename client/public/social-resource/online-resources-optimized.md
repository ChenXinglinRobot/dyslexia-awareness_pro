# 线上资源文字优化稿

source_xlsx: `D:\Python_work\dyslexia-awareness_pro\client\public\social resource\online like weichat\online resource.xlsx`

created: `2026-06-17`

scope: 本文件只处理线上资源类资源，不改原始 Excel，不改任何代码文件，不做 `.ts` 回填。

workbook_check: Excel 共 3 个工作表；`Sheet1` 有 12 行、9 列，表头为“资源名、平台类型、主理人/专家姓名+头衔、专家所属机构、主页/公众号链接、专注领域标签、更新频率、简介（≤ 50 字）、可信度”；`Sheet2`、`Sheet3` 为空。`Sheet1` 中 7 行为有效资源条目，4 行仅为引用标记，未单独成条。

ranking_note: 本稿沿用 Excel 中有效资源的出现顺序；空白引用行只作为来源备注保留到 `sourceStatus`，不参与排序。整体排序从中文家长更容易直接使用的公众号和课程资源，到国际筛查、指南、倡导与研究机构资源。

style_rules:
- 统一使用全角中文标点。
- 资源名、机构名、人名尽量保留全称；如原英文机构名超过 `name` 上限，则使用适合网页展示的中文全称或通行简称。
- `desc` 统一写成“主理人/团队 + 分享内容”，让家长能快速判断资源用途。
- 保留能说明主理人专业背景、研究积累或平台可信度的表达，删除“全球最具权威”“金标准”等过强宣传语。
- `focus` 最多 4 项，每项不超过 8 字；长标签压缩为家长可理解的短标签。
- 字数按网页字段约束复核：`name <= 30`，`desc <= 80`，`expert <= 40`，`expertAffiliation <= 30`，`platform <= 12`，`updateFrequency <= 8`，`focus <= 4 项且每项 <= 8`。

> 注意：本文件用于网页资源展示文案整理，不构成诊断、干预或教育安置建议；资源更新状态、链接入口和课程信息需以前端回填时的官方页面或平台页面为准。

## 可直接回填的结构化数据

```yaml
onlineResources:
  - rank: 1
    id: rainbow-reading-lab
    type: online-resource
    name: 虹阅读实验室
    desc: 李虹教授团队分享汉语阅读障碍鉴别、文本可读性与阶梯阅读干预方法。
    url: "微信内搜索: RainbowReading_47"
    platform: 微信公众号
    expert: 李虹 · 北京师范大学教授
    expertAffiliation: 北京师范大学心理学部
    focus:
      - 汉语阅读
      - 文本可读
      - 阶梯阅读
    updateFrequency: 周更
    sourceStatus: Excel 标记可信；主页列未提供 hyperlink target，保留单元格内微信搜索信息
    counts: "name 6/30, desc 30/80, expert 10/40, expertAffiliation 10/30, platform 5/12, updateFrequency 2/8, focus 3项且均 <= 8"

  - rank: 2
    id: multitudes-newsletter
    type: online-resource
    name: Multitudes Newsletter
    desc: Nadine Gaab团队分享儿童早期筛查系统进展与脑科学、神经发育研究动态。
    url: https://multitudesinfo.ucsf.edu/newsletter-archive
    platform: Newsletter
    expert: Nadine Gaab · Harvard GSE教授
    expertAffiliation: Harvard GSE Gaab Lab
    focus:
      - 脑发育
      - 早期筛查
      - 国际研究
    updateFrequency: 季更
    sourceStatus: Excel 标记可信；引用标记为 [cite: 11, 70]
    counts: "name 20/30, desc 36/80, expert 22/40, expertAffiliation 17/30, platform 10/12, updateFrequency 2/8, focus 3项且均 <= 8"

  - rank: 3
    id: dyslexia-powerup
    type: online-resource
    name: Dyslexia Powerup资源站
    desc: 特教联盟整理全球读写障碍资源入口、干预工具对比与家长书单。
    url: https://dyslexiapowerup.com/resources
    platform: 聚合博客
    expert: 特教联盟
    expertAffiliation: 独立信息集成组织
    focus:
      - 干预工具
      - 资源索引
      - 书单推荐
    updateFrequency: 每月维护
    sourceStatus: Excel 标记可信；引用标记为 [cite: 72]
    counts: "name 18/30, desc 27/80, expert 4/40, expertAffiliation 8/30, platform 4/12, updateFrequency 4/8, focus 3项且均 <= 8"

  - rank: 4
    id: international-dyslexia-association
    type: online-resource
    name: 国际读写障碍协会（IDA）
    desc: IDA专家委员会发布事实清单与结构化读写指南，适合作为家长和教师的循证参考。
    url: https://dyslexiaida.org/fact-sheets/
    platform: 官方指南库
    expert: IDA专家委员会
    expertAffiliation: 国际读写障碍协会
    focus:
      - 事实清单
      - 结构读写
      - 循证指南
    updateFrequency: 日常维护
    sourceStatus: Excel 标记可信；引用标记为 [cite: 66, 72]
    counts: "name 11/30, desc 36/80, expert 8/40, expertAffiliation 8/30, platform 5/12, updateFrequency 4/8, focus 3项且均 <= 8"

  - rank: 5
    id: made-by-dyslexia
    type: online-resource
    name: Made by Dyslexia
    desc: Kate Griggs等倡导者通过名人发声、家长页面和教师培训，帮助重理解读写障碍。
    url: https://www.madebydyslexia.org/parents/
    platform: YouTube／网页
    expert: Kate Griggs等倡导者
    expertAffiliation: Made by Dyslexia慈善机构
    focus:
      - 认知优势
      - 社会倡导
      - 教师培训
    updateFrequency: 月更
    sourceStatus: Excel 标记可信；引用标记为 [cite: 66, 72]
    counts: "name 14/30, desc 38/80, expert 14/40, expertAffiliation 18/30, platform 9/12, updateFrequency 2/8, focus 3项且均 <= 8"

  - rank: 6
    id: das-chinese-programme
    type: online-resource
    name: DAS华文课程
    desc: 新加坡读写障碍协会面向7至17岁华文学习困难学生，分享课程支持与识字训练方向。
    url: https://das.org.sg/services/programmes/chinese/
    platform: 机构官网
    expert: 新加坡读写障碍协会（DAS）
    expertAffiliation: 新加坡读写障碍协会
    focus:
      - 华文教学
      - 识字训练
      - 读写辅导
      - 学习支持
    updateFrequency: 不定期
    sourceStatus: Excel 未填写可信度；按机构官网资源整理
    counts: "name 7/30, desc 37/80, expert 12/40, expertAffiliation 9/30, platform 4/12, updateFrequency 3/8, focus 4项且均 <= 8"

  - rank: 7
    id: the-dyslexia-foundation
    type: online-resource
    name: The Dyslexia Foundation
    desc: The Dyslexia Foundation汇集读写障碍研究者，分享脑科学研究、会议出版物与教育实践转化。
    url: https://dyslexiafoundation.org/
    platform: 机构官网
    expert: Dr Benjamin Powers等顾问
    expertAffiliation: The Dyslexia Foundation
    focus:
      - 神经科学
      - 循证教育
      - 跨学科
      - 研究转化
    updateFrequency: 持续更新
    sourceStatus: Excel 标记可信；原可信度说明为拥有 35 年以上历史并汇聚读写领域学者
    counts: "name 21/30, desc 49/80, expert 19/40, expertAffiliation 21/30, platform 4/12, updateFrequency 4/8, focus 4项且均 <= 8"
```

## 逐条审核记录

### 1. 虹阅读实验室

【原版】资源名：“（a）虹阅读实验室”；平台：“微信公众号”；主理人：“李虹 教授”；机构：“北京师范大学心理学部”；标签：“汉语阅读障碍鉴别 / 文本可读性 / 阶梯阅读”；频率：“周更”；简介：“央视《我不是笨小孩》学术顾问主理，深度解读汉语文本可读性及一线障碍干预方法论。”

【改版】资源名：“虹阅读实验室”；平台：“微信公众号”；主理人：“李虹 · 北京师范大学教授”；机构：“北京师范大学心理学部”；标签：“汉语阅读、文本可读、阶梯阅读”；频率：“周更”；简介：“李虹教授团队分享汉语阅读障碍鉴别、文本可读性与阶梯阅读干预方法。”

【字数】name: 6/30；desc: 30/80；expert: 10/40；expertAffiliation: 10/30；platform: 5/12；updateFrequency: 2/8；focus: 3 项，单项均 <= 8。

【改动说明】删除排序标记“（a）”；保留李虹教授与北京师范大学心理学部背景，将“深度解读”“方法论”等较重表达改为更适合卡片阅读的“分享鉴别、可读性与干预方法”。

### 2. Multitudes Newsletter

【原版】资源名：“（b）Multitudes Newsletter”；平台：“Newsletter”；主理人：“Dr. Nadine Gaab”；机构：“Harvard GSE Gaab Lab”；标签：“脑发育轨迹 / 早期筛查技术 / 前沿发现”；频率：“季更”；简介：“分享加州超25万儿童使用的Multitudes早期筛查系统进展，发布国际最新脑科学神经发育动态。”

【改版】资源名：“Multitudes Newsletter”；平台：“Newsletter”；主理人：“Nadine Gaab · Harvard GSE教授”；机构：“Harvard GSE Gaab Lab”；标签：“脑发育、早期筛查、国际研究”；频率：“季更”；简介：“Nadine Gaab团队分享儿童早期筛查系统进展与脑科学、神经发育研究动态。”

【字数】name: 20/30；desc: 36/80；expert: 22/40；expertAffiliation: 17/30；platform: 10/12；updateFrequency: 2/8；focus: 3 项，单项均 <= 8。

【改动说明】删除排序标记“（b）”；保留主理人与 Harvard GSE Gaab Lab 信息；删去“加州超25万儿童”“国际最新”等较占篇幅或容易过期的表述，突出早期筛查和神经发育研究。

### 3. Dyslexia Powerup资源站

【原版】资源名：“（c）Dyslexia Powerup 资源站”；平台：“聚合博客”；主理人：“特教联盟”；机构：“独立信息集成组织”；标签：“干预工具对比 / 全球资源索引 / 书单”；频率：“每月维护”；简介：“极为详尽的全球读写资源导航，涵盖美国、英国、澳洲的各路官方入口及经典必读推荐书单。”

【改版】资源名：“Dyslexia Powerup资源站”；平台：“聚合博客”；主理人：“特教联盟”；机构：“独立信息集成组织”；标签：“干预工具、资源索引、书单推荐”；频率：“每月维护”；简介：“特教联盟整理全球读写障碍资源入口、干预工具对比与家长书单。”

【字数】name: 18/30；desc: 27/80；expert: 4/40；expertAffiliation: 8/30；platform: 4/12；updateFrequency: 4/8；focus: 3 项，单项均 <= 8。

【改动说明】保留英文资源名和资源站定位；删去“极为详尽”“经典必读”等评价性表达，将长地域清单压缩为“全球读写障碍资源入口”，更适合网页卡片。

### 4. 国际读写障碍协会（IDA）

【原版】资源名：“（d）International Dyslexia Association（IDA）”；平台：“官方指南库”；主理人：“IDA 专家委员会”；机构：“IDA”；标签：“事实清单（Fact Sheets） / 结构化读写指南”；频率：“日常维护”；简介：“全球最具权威性的读写障碍非营利组织，其发布的Fact Sheets与结构化读写手册是特殊教育的金标准。”

【改版】资源名：“国际读写障碍协会（IDA）”；平台：“官方指南库”；主理人：“IDA专家委员会”；机构：“国际读写障碍协会”；标签：“事实清单、结构读写、循证指南”；频率：“日常维护”；简介：“IDA专家委员会发布事实清单与结构化读写指南，适合作为家长和教师的循证参考。”

【字数】name: 11/30；desc: 36/80；expert: 8/40；expertAffiliation: 8/30；platform: 5/12；updateFrequency: 4/8；focus: 3 项，单项均 <= 8。

【改动说明】英文全称超过卡片标题的可读长度，因此改为中文全称并保留 IDA；删除“全球最具权威”“金标准”等强评价，改为“循证参考”。

### 5. Made by Dyslexia

【原版】资源名：“（d）Made by Dyslexia”；平台：“YouTube/网页”；主理人：“Kate Griggs 等倡导者”；机构：“Made by Dyslexia 慈善机构”；标签：“认知优势重塑 / 社会倡导活动 / 免费教师认证”；频率：“月更”；简介：“通过Richard Branson等名人的发声改变刻板印象，提供微软授权的免费在线教师赋能培训（Dyslexic Thinking）。”

【改版】资源名：“Made by Dyslexia”；平台：“YouTube／网页”；主理人：“Kate Griggs等倡导者”；机构：“Made by Dyslexia慈善机构”；标签：“认知优势、社会倡导、教师培训”；频率：“月更”；简介：“Kate Griggs等倡导者通过名人发声、家长页面和教师培训，帮助重理解读写障碍。”

【字数】name: 14/30；desc: 38/80；expert: 14/40；expertAffiliation: 18/30；platform: 9/12；updateFrequency: 2/8；focus: 3 项，单项均 <= 8。

【改动说明】删除重复排序标记；将半角斜杠改为全角斜杠；保留倡导者和机构背景，把“改变刻板印象”“免费在线教师赋能培训”等长句收束为家长易理解的用途说明。

### 6. DAS华文课程

【原版】资源名：“DAS 华文课程”；平台：“海外教育机构官方网站”；主理人为空；机构：“新加坡读写障碍协会（DAS）”；标签：“读写障碍干预、华文教学、识字训练、读写能力辅导、特殊学习困难支持”；频率：“不定期更新”；简介：“专为 7-17 岁华文学习困难学生打造干预课程，传授学习技巧与策略。”

【改版】资源名：“DAS华文课程”；平台：“机构官网”；主理人：“新加坡读写障碍协会（DAS）”；机构：“新加坡读写障碍协会”；标签：“华文教学、识字训练、读写辅导、学习支持”；频率：“不定期”；简介：“新加坡读写障碍协会面向7至17岁华文学习困难学生，分享课程支持与识字训练方向。”

【字数】name: 7/30；desc: 37/80；expert: 12/40；expertAffiliation: 9/30；platform: 4/12；updateFrequency: 3/8；focus: 4 项，单项均 <= 8。

【改动说明】原表没有个人主理人，因此用机构作为 `expert`，避免空字段影响展示；平台压缩为“机构官网”；标签从 5 项压缩为 4 项；年龄表达改为“7至17岁”，避免半角连字符。

### 7. The Dyslexia Foundation

【原版】资源名：“The Dyslexia Foundation（TDF）”；平台：“国际权威机构官方网站”；主理人：“Dr. Benjamin Powers（主席） / Dr. Laurie E. Cutting（科学顾问委员会主席）”；机构：“The Dyslexia Foundation / 耶鲁大学及康涅狄格大学 Haskins 全球读写中心 / 范德堡大学”；标签：“神经科学与教育 / 脑科学研究 / 循证教育实践 / 跨学科合作”；频率：“持续更新（定期举办年度秋季会议、EBS学术研讨会并发布出版物）”；简介：“汇集全球顶尖神经科学家与教育工作者，致力于推动阅读障碍的科学突破，并将脑科学最新研究转化为教育实践。”

【改版】资源名：“The Dyslexia Foundation”；平台：“机构官网”；主理人：“Dr Benjamin Powers等顾问”；机构：“The Dyslexia Foundation”；标签：“神经科学、循证教育、跨学科、研究转化”；频率：“持续更新”；简介：“The Dyslexia Foundation汇集读写障碍研究者，分享脑科学研究、会议出版物与教育实践转化。”

【字数】name: 21/30；desc: 49/80；expert: 19/40；expertAffiliation: 21/30；platform: 4/12；updateFrequency: 4/8；focus: 4 项，单项均 <= 8。

【改动说明】保留机构英文名；专家字段压缩到主席和顾问团队层级，避免超长头衔挤占卡片；删除“全球顶尖”“科学突破”等宣传性表达，将频率压缩为“持续更新”。
