# 游戏干预资源文字优化稿

source_xlsx: `D:\Python_work\dyslexia-awareness_pro\client\public\social resource\reference game\game.xlsx`

created: `2026-06-17`

scope: 本文件只处理游戏干预类资源文案与结构化整理，不改原始 Excel，不改任何代码文件，不做 `.ts` 回填。

sheet_note: 已检查工作簿结构：`Sheet1` 为主表，字段包括名称、国内/国外、语种、适用年龄、训练技能、费用、是否有研究文献支持、官网/下载直链、简短说明、可信度；`Sheet2` 与 `Sheet3` 未见有效数据。`Sheet1` 中空白引用行、跨行年龄与下载链接已合并到对应条目，重复表头不单列。

ranking_note: 本稿按 Excel 原始顺序保留来源优先级；同一资源的跨行补充信息并入原条目。后续回填如需二次排序，可依据 `region`、`language`、`ageRange`、`cost`、`isResearchBacked` 与可用性字段筛选。

style_rules:
- 统一使用全角中文标点。
- 产品名、项目名尽量保留官方名称；原始名称中带有编辑备注或过长解释时，移入审核记录，不进入 `name`。
- 年龄区间统一为 `X-Y岁`、`X岁以上` 或学段表述；无法从同一行确认时，合并相邻补充行。
- `desc` 统一写成“游戏机制 + 训练能力”；保留研究证据、训练机制或干预基础，但避免“顶级”“精准定位”等过强宣传语。
- `skills` 最多 5 项，每项不超过 8 字；多于 5 项时选取与阅读障碍、读写训练或筛查最直接相关的能力。
- 字数按网页字段约束复核：`name <= 30`，`desc <= 80`，`skills <= 5 项且单项 <= 8`。

> 注意：本文件用于网页资源展示文案整理，不构成诊断、治疗或购买建议；产品可用性、价格、下载入口和研究证据需以前端回填时的官方页面或论文信息为准。

## 可直接回填的结构化数据

```yaml
gameInterventions:
  - rank: 1
    id: dami-xiaomi
    name: 大米和小米少儿能力提升平台
    region: 国内
    language: 中文
    ageRange: 2-12岁
    skills:
      - 语言评估
      - 学习筛查
      - 注意测定
    cost: 基础免费，评估与课程付费
    isResearchBacked: true
    evidenceNote: Excel 标注自研 RICE/MI-TALK 干预体系。
    officialUrl: https://apps.apple.com/cn/app/id1522271375
    desc: 通过评估与游戏化任务筛查语言、学习力和注意力，辅助生成个性化训练方案。
    sourceStatus: Excel 标注可信，H2 hyperlink target 已回填。
    counts: "name 13/30, desc 32/80, skills 3项且单项 <= 8"

  - rank: 2
    id: graphogame-pinyin
    name: GraphoGame 拼音游戏
    region: 跨国合作
    language: 中文，多语言版本
    ageRange: 5-9岁
    skills:
      - 拼音映射
      - 音素意识
    cost: 部分免费
    isResearchBacked: true
    evidenceNote: Excel 标注北师大与芬兰于韦斯屈莱大学长期 RCT 验证。
    officialUrl: https://graphogame.com/
    availabilityNote: Excel 标注中文版因缺乏商业维护已下架。
    desc: 用发音示范和字母降落关卡练习字形语音配对，训练拼音映射与音素意识。
    sourceStatus: Excel 标注可信，引用行已并入本条。
    counts: "name 14/30, desc 31/80, skills 2项且单项 <= 8"

  - rank: 3
    id: nessy-reading-and-spelling
    name: Nessy Reading and Spelling
    region: 国外
    language: 英文
    ageRange: 6-11岁
    skills:
      - 结构拼读
      - 构词规则
      - 拼写训练
    cost: 免费试用，约 15.5 美元/月起
    isResearchBacked: true
    evidenceNote: Excel 标注有研究支持，并说明依据 Science of Reading 设计。
    officialUrl: https://www.nessy.com/en-us/product/nessy-reading-and-spelling-home
    desc: 用关卡奖励和系统拼读练习结构化拼读、构词法与拼写规则，降低英文阅读挫败感。
    sourceStatus: Excel 标注可信，引用行已并入本条。
    counts: "name 23/30, desc 34/80, skills 3项且单项 <= 8"

  - rank: 4
    id: touch-type-read-and-spell
    name: Touch-Type Read and Spell
    region: 国外
    language: 英文
    ageRange: 7岁以上
    skills:
      - 盲打记忆
      - 解码训练
      - 视觉拼写
    cost: 付费，约 131 美元/年或合作购买
    isResearchBacked: true
    evidenceNote: Excel 标注 Orton-Gillingham 多感官方法。
    officialUrl: https://www.readandspell.com/us/education
    desc: 通过盲打课程同步听音、看词和敲键，建立动觉记忆，训练解码与拼写。
    sourceStatus: Excel 标注可信，引用行已并入本条。
    counts: "name 21/30, desc 28/80, skills 3项且单项 <= 8"

  - rank: 5
    id: lexia-core5-reading
    name: Lexia Core5 Reading
    region: 国外
    language: 英文
    ageRange: 学前-五年级
    skills:
      - 音素意识
      - 朗读流利
      - 高频词
      - 篇章理解
    cost: 机构采购或特供付费
    isResearchBacked: true
    evidenceNote: Excel 标注循证与区域效度评级。
    officialUrl: https://www.lexialearning.com/solutions/solutions-by-topic/dyslexia
    desc: 用自适应阅读关卡定位音素、流利度和理解薄弱点，训练基础阅读能力。
    sourceStatus: Excel 标注可信，引用行已并入本条。
    counts: "name 17/30, desc 29/80, skills 4项且单项 <= 8"

  - rank: 6
    id: dyslexia-gold
    name: Dyslexia Gold
    region: 国外
    language: 英文
    ageRange: 4-13岁
    skills:
      - 视觉追踪
      - 音位意识
      - 视动协调
      - 解码流利
    cost: 付费，约 24 英镑/月
    isResearchBacked: true
    evidenceNote: Excel 标注针对眼动轨迹异常的研究。
    officialUrl: https://dyslexiagold.co.uk/shop/Parents
    moduleNote: 原名含 Engaging Eyes 模块。
    desc: 以眼动追踪、音位与流利度游戏训练双眼协同、解码和多音节阅读。
    sourceStatus: Excel 标注可信，引用行已并入本条。
    counts: "name 12/30, desc 27/80, skills 4项且单项 <= 8"

  - rank: 7
    id: dystherapy
    name: Dystherapy
    region: 国外
    language: 英语、土耳其语，多语言
    ageRange: 6-13岁
    skills:
      - 音素意识
      - 阅读流利
      - 阅读理解
      - 工作记忆
      - 持续注意
    cost: 基础关卡免费，高级订阅约 13.99 美元/月或 79.99 美元/年
    isResearchBacked: true
    evidenceNote: Excel 标注研发团队发表 AI 生成阅读材料相关论文。
    officialUrl: https://edusyntech.com/
    googlePlayUrl: https://play.google.com/store/apps/details?id=com.arda.dystherapy
    appStoreUrl: https://apps.apple.com/us/app/dystherapy-dyslexia-education/id6736656260
    desc: 用 AI 生成阅读内容和多感官关卡，训练音素意识、理解、工作记忆与注意力。
    sourceStatus: Excel 标注可信，跨行年龄、下载链接与奖项说明已并入本条。
    counts: "name 10/30, desc 31/80, skills 5项且单项 <= 8"

  - rank: 8
    id: dysolve-ai
    name: Dysolve AI
    region: 国外
    language: 英文
    ageRange: 5岁以上
    skills:
      - 音素检测
      - 声学加工
      - 解码拼写
      - 快速命名
      - 听觉处理
    cost: 个人订阅约 99 美元/月起，学校另有采购价
    isResearchBacked: true
    evidenceNote: Excel 标注 CRESP 大规模随机对照试验与技术评估报告。
    officialUrl: https://dysolve.ai/
    platformUrl: https://dysolve.com/
    desc: 通过云端 AI 游戏实时评估语言处理缺陷，训练音素检测、解码、拼写与流利度。
    sourceStatus: Excel 标注可信。
    counts: "name 9/30, desc 32/80, skills 5项且单项 <= 8"

  - rank: 9
    id: cnreader
    name: CNReader
    region: 国内
    language: 中文
    ageRange: 6-8岁
    skills:
      - 语音意识
      - 语素意识
      - 正字法
      - 阅读流利
    cost: 学术研发阶段，暂未商用
    isResearchBacked: true
    evidenceNote: Excel 标注发表于《人文与社会科学通讯》2025 年论文。
    officialUrl: 暂无，Excel 仅提供学术文献 DOI：10.1057/s41599-025-05079-1
    desc: 结合 AI 语音伴读和视觉友好界面，训练中文语音意识、正字法与阅读流利度。
    sourceStatus: Excel 第二段表格条目，暂无商用入口。
    counts: "name 8/30, desc 32/80, skills 4项且单项 <= 8"

  - rank: 10
    id: dypa
    name: DYPA 筛查评估应用
    region: 国内
    language: 中文
    ageRange: 6-8岁
    skills:
      - 风险筛查
      - 笔画评估
      - 部件书写
      - 认知语言
    cost: 学术研发阶段，暂未商用
    isResearchBacked: true
    evidenceNote: Excel 标注发表于 ACM IMWUT 2023。
    officialUrl: 暂无，Excel 仅提供学术文献 DOI：10.1145/3610908
    desc: 用平板书写与阅读任务采集多模态数据，筛查读写风险和认知语言能力。
    sourceStatus: Excel 第二段表格条目，偏筛查评估，非纯训练游戏。
    counts: "name 10/30, desc 30/80, skills 4项且单项 <= 8"

  - rank: 11
    id: poppins
    name: Poppins
    region: 国外
    language: 法语
    ageRange: 7-11岁
    skills:
      - 节奏感知
      - 字音转换
      - 阅读准确
      - 阅读速度
    cost: 临床试验阶段
    isResearchBacked: true
    evidenceNote: Excel 标注发表于 JMIR Serious Games 2025，并列出临床试验编号 NCT06596980。
    officialUrl: 暂无，Excel 仅提供临床试验编号：NCT06596980
    desc: 通过节奏任务与书面语言游戏高频练习，训练字音转换、阅读准确率与速度。
    sourceStatus: Excel 第二段表格条目，临床试验阶段。
    counts: "name 7/30, desc 31/80, skills 4项且单项 <= 8"
```

## 逐条审核记录

### 1. 大米和小米少儿能力提升平台

【原版】结合国内发育障碍干预经验，精准定位学习困难病因及语言发育障碍水平，提供定制化的数字提升方案。

【改版】通过评估与游戏化任务筛查语言、学习力和注意力，辅助生成个性化训练方案。

【字数】name: 13/30，desc: 32/80，skills: 3 项，单项均 <= 8

【改动说明】去掉原名称中的编号，保留官方平台名；将“精准定位病因”改为更克制的筛查与辅助训练表述，避免在网页卡片中过度承诺诊断能力。

### 2. GraphoGame 拼音游戏

【原版】运用动态发音示范与字母降落游戏，建立坚实的“字形-语音”神经配对网络，个性化自适应调整难度。

【改版】用发音示范和字母降落关卡练习字形语音配对，训练拼音映射与音素意识。

【字数】name: 14/30，desc: 31/80，skills: 2 项，单项均 <= 8

【改动说明】保留发音示范、字母降落和自适应训练机制，将“神经配对网络”收束为家长更容易理解的“字形语音配对”；中文版下架信息放入 `availabilityNote`，避免挤占卡片描述。

### 3. Nessy Reading and Spelling

【原版】严格依据阅读科学(Science of Reading)设计的系统性合成拼读平台，界面生动，通过奖励机制缓解儿童挫败感。

【改版】用关卡奖励和系统拼读练习结构化拼读、构词法与拼写规则，降低英文阅读挫败感。

【字数】name: 23/30，desc: 34/80，skills: 3 项，单项均 <= 8

【改动说明】删除原名称中的编辑推荐和主观体验说明，保留官方名称；描述从理念背书转向“奖励机制 + 拼读训练”的可见玩法与训练目标。

### 4. Touch-Type Read and Spell

【原版】通过教授电脑盲打建立动觉记忆。学生在敲击键盘时听到字母发音并在屏幕上看到文字，形成强大的多重感官代偿。

【改版】通过盲打课程同步听音、看词和敲键，建立动觉记忆，训练解码与拼写。

【字数】name: 21/30，desc: 28/80，skills: 3 项，单项均 <= 8

【改动说明】保留盲打、听觉、视觉和动觉多感官机制，删去“强大的代偿”等评价性表达，让卡片直接说明它训练解码与拼写。

### 5. Lexia Core5 Reading

【原版】LETRS结构化语言体系的顶级数字化版本。提供精准到音素级别的薄弱环节分析报告，被大量学区作为标配干预工具。

【改版】用自适应阅读关卡定位音素、流利度和理解薄弱点，训练基础阅读能力。

【字数】name: 17/30，desc: 29/80，skills: 4 项，单项均 <= 8

【改动说明】删除“顶级”“标配”等难以在卡片中核验的评价，保留自适应定位、音素、流利度和理解训练这些可回填的能力标签。

### 6. Dyslexia Gold

【原版】独创的Engaging Eyes模块专门训练儿童双眼协同追踪与屏幕阅读汇聚能力；Fluency Builder模块强化多音节文字解码。

【改版】以眼动追踪、音位与流利度游戏训练双眼协同、解码和多音节阅读。

【字数】name: 12/30，desc: 27/80，skills: 4 项，单项均 <= 8

【改动说明】将模块名移入 `moduleNote`，卡片名保留短官方名；描述聚焦视觉追踪、音位意识和多音节解码，避免过长模块介绍。

### 7. Dystherapy

【原版】融合AI自适应算法与多感官交互的阅读障碍数字疗法，通过生成个性化阅读内容与游戏化认知训练，全面提升儿童识字与专注力。

【改版】用 AI 生成阅读内容和多感官关卡，训练音素意识、理解、工作记忆与注意力。

【字数】name: 10/30，desc: 31/80，skills: 5 项，单项均 <= 8

【改动说明】原始名称包含两个应用名和编辑推荐，回填名使用更短的产品主名；将“数字疗法”“全面提升”改为机制和能力清单，并合并相邻行中的年龄、下载链接和奖项信息。

### 8. Dysolve AI

【原版】基于自适应专利AI的云端游戏系统，无需教师指导，通过实时生成的游戏评估并纠正底层语言处理缺陷。

【改版】通过云端 AI 游戏实时评估语言处理缺陷，训练音素检测、解码、拼写与流利度。

【字数】name: 9/30，desc: 32/80，skills: 5 项，单项均 <= 8

【改动说明】保留云端 AI、实时评估和语言处理训练机制；删去“无需教师指导”“纠正缺陷”等容易形成过度承诺的说法，改为训练目标。

### 9. CNReader

【原版】结合AI语音伴读与视觉友好界面的中文阅读训练工具，通过实时反馈改善阅读准确率与节奏。

【改版】结合 AI 语音伴读和视觉友好界面，训练中文语音意识、正字法与阅读流利度。

【字数】name: 8/30，desc: 32/80，skills: 4 项，单项均 <= 8

【改动说明】保留中文阅读训练、AI 语音伴读和视觉友好界面，补足表格“训练/评估技能”里的语音意识、正字法和流利度；标注为学术研发阶段，避免误导为可直接下载产品。

### 10. DYPA 筛查评估应用

【原版】基于平板的多模态中文阅读障碍筛查应用，利用机器学习分析儿童书写与阅读测试数据预测风险。

【改版】用平板书写与阅读任务采集多模态数据，筛查读写风险和认知语言能力。

【字数】name: 10/30，desc: 30/80，skills: 4 项，单项均 <= 8

【改动说明】保留平板、多模态数据和机器学习筛查方向，但明确其偏评估筛查，不把它包装成训练游戏；技能标签压缩为风险筛查、书写评估和认知语言能力。

### 11. Poppins

【原版】融合节奏任务与书面语言训练的数字医疗器械，通过高频游戏化练习有效提升阅读流畅度与语音处理技能。

【改版】通过节奏任务与书面语言游戏高频练习，训练字音转换、阅读准确率与速度。

【字数】name: 7/30，desc: 31/80，skills: 4 项，单项均 <= 8

【改动说明】保留节奏任务和书面语言训练的干预基础，将“有效提升”改为“训练”；前身 Mila-Learn 不放入 `name`，以免标题过长，临床试验信息放入结构化字段。
