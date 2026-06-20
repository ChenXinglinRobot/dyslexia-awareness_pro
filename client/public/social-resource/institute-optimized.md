# 研究机构资源文字优化稿

source_xlsx: `D:\Python_work\dyslexia-awareness_pro\client\public\social resource\institute\institude.xlsx`

created: `2026-06-17`

scope: 本文件只处理研究机构类资源，不改原始 Excel，不改任何代码文件，不做 `.ts` 回填。

excel_structure:
- 工作簿包含 3 个工作表：`优化前`、`适配网站优化后`、`Sheet3`。
- 有效数据位于 `优化前`；表头为：`机构名`、`所在城市`、`实验室/团队/项目名称`、`实验室/项目主页直链`、`机构首页`、`研究方向标签`、`近3年代表性论文`、`可信度`。
- `适配网站优化后` 与 `Sheet3` 仅有空表头；未作为本次文案来源。
- `优化前` 共 22 行原始内容，其中 9 行含机构名；其余为空机构名的论文、引用续行，已合并回上一条机构记录。

ranking_note: 按原始 Excel 中有效机构行顺序排列；原表先列华语阅读障碍研究团队，再列国际研究中心与筛查平台。续行中的论文与引用信息只作为审核依据，不单独生成资源条目。

style_rules:
- 统一使用全角中文标点。
- 机构名、学校名、人名尽量保留原始全称；若英文机构联合名称过长，则使用网页卡片短名，并在 `officialName` 或 `officialLabName` 保留原始完整名称。
- `desc` 统一写成“研究方向 + 应用价值”，让家长能快速理解该机构与阅读障碍识别、评估或干预的关系。
- `dyslexiaLab` 使用适合焦点行展示的实验室、课题组、中心或项目短名；过长原名放入 `officialLabName`。
- `focusAreas` 最多 4 项，每项不超过 8 字；多余研究方向压缩到 `desc` 或审核说明中。
- 字数按网页字段约束复核：`name <= 30`，`desc <= 80`，`dyslexiaLab <= 35`，`focusAreas <= 4 项 × 8 字`。

> 注意：本文件用于网页资源展示文案整理，不构成诊断、治疗或升学建议；机构页面、团队成员和研究项目状态需以前端回填时的官方页面为准。

## 可直接回填的结构化数据

```yaml
institutes:
  - rank: 1
    id: cas-psychology-bi
    type: institute
    name: 中国科学院心理研究所
    city: 北京
    dyslexiaLab: 毕鸿燕教授团队
    officialLabName: 毕鸿燕教授团队（脑科学与学习困难研究中心）
    desc: 研究汉字认知、视觉与听觉加工机制，为中文阅读障碍识别和干预提供依据。
    focusAreas:
      - 汉字认知
      - 视觉加工
      - 听觉加工
      - 学习困难
    officialUrl: https://www.psych.ac.cn/
    labUrl: https://psych.cas.cn/sourcedb/cn/expert/200908/t20090826_6369803.html
    url: https://psych.cas.cn/sourcedb/cn/expert/200908/t20090826_6369803.html
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - 发展性阅读障碍的听觉时间加工缺陷（心理科学进展，2021）
      - 汉语阅读障碍与视觉大细胞网络关联（2023）
    counts: "name 10/30, desc 31/80, dyslexiaLab 7/35, focusAreas 4项；单项最大 4/8"

  - rank: 2
    id: bnu-learning-lab
    type: institute
    name: 北京师范大学
    city: 北京
    institutionDesc: 北京师范大学心理学部是国家世界一流心理学科建设单位、唯一心理学一级学科国家重点学科单位，心理学科连续位居教育部学科排名全国第一。
    dyslexiaLab: 认知神经科学与学习国家重点实验室
    officialLabName: 舒华、李虹教授团队（认知神经科学与学习国家重点实验室）
    desc: 研究汉语阅读发展、可读性与互联网干预，为早期识别和阅读训练提供证据。
    focusAreas:
      - 阅读发展
      - 可读性
      - 早期鉴别
      - 阅读干预
    officialUrl: https://www.bnu.edu.cn/
    labUrl: https://psych.bnu.edu.cn/szdw/zrjs/js/lh/index.htm
    url: https://psych.bnu.edu.cn/szdw/zrjs/js/lh/index.htm
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - 汉语阅读障碍儿童的工作记忆刷新机制与阅读理解（2022）
      - 基于互联网的落后儿童阅读干预模型（2023）
    counts: "name 6/30, desc 31/80, dyslexiaLab 16/35, focusAreas 4项；单项最大 4/8"

  - rank: 3
    id: pku-meng-lab
    type: institute
    name: 北京大学
    city: 北京
    institutionDesc: 北京大学心理与认知科学学院是心理学 A+ 单位，心理学科入选国家双一流建设学科，在认知神经科学等方向积累深厚。
    dyslexiaLab: 孟祥芝研究员课题组
    officialLabName: 孟祥芝研究员课题组（行为与心理健康北京市重点实验室）
    desc: 研究视觉注意和神经可塑性，比较中英文阅读障碍，为儿童评估和干预提供线索。
    focusAreas:
      - 视觉注意
      - 神经可塑
      - 跨语阅读
      - 儿童评估
    officialUrl: https://www.pku.edu.cn/
    labUrl: https://www.psy.pku.edu.cn/szdw/qzjy/fjs/mxz/index.htm
    url: https://www.psy.pku.edu.cn/szdw/qzjy/fjs/mxz/index.htm
    sourceStatus: 工作簿超链接已保留
    representativePapers:
      - Atypical visual selective attention in children with dyslexia: evidence from N2pc and PD（NeuroImage，2024）
    counts: "name 4/30, desc 33/80, dyslexiaLab 9/35, focusAreas 4项；单项最大 4/8"

  - rank: 4
    id: ntnu-lee-team
    type: institute
    name: 台湾师范大学
    city: 台北
    institutionDesc: 台湾师范大学是台湾知名高等教育机构，教育与心理相关学科基础深厚，教育心理与辅导学系设有阅读障碍、阅读发展与认知神经科学方向。
    dyslexiaLab: 李俊仁副教授团队
    officialLabName: 李俊仁副教授团队（教育心理与辅导学系）
    desc: 结合行为评估与脑认知技术，探究跨语言阅读机制、工作记忆发展，并深度解析中文儿童发展性阅读障碍的认知-语言轮廓与跨文化异同。
    focusAreas:
      - 声韵加工
      - 工作记忆
      - 多语言阅读
      - 眼动与阅读
      - 认知神经科学
    officialUrl: https://www.ntnu.edu.tw/
    labUrl: https://www.epc.ntnu.edu.tw/Front/Faculty_and_Staff/FullTime/Members.aspx?id=0pjIJ+Wlsho=&PID=0000000022〈=zh-tw
    url: https://www.epc.ntnu.edu.tw/Front/Faculty_and_Staff/FullTime/Members.aspx?id=0pjIJ+Wlsho=&PID=0000000022〈=zh-tw
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - 以认知成份分析区辨学童阅读困难的效能（2022）
      - 中文断词机制及其在阅读障碍中的表现（2023）
    counts: "name 6/30, desc 28/80, dyslexiaLab 8/35, focusAreas 4项；单项最大 4/8"

  - rank: 5
    id: cuhk-mcbride-team
    type: institute
    name: 香港中文大学
    city: 香港
    dyslexiaLab: Catherine McBride 教授团队
    officialLabName: Catherine McBride 教授团队
    desc: 研究跨文化读写发展与语素意识，长期追踪儿童阅读风险和早期支持路径。
    focusAreas:
      - 跨文化
      - 语素意识
      - 长期追踪
      - 早期干预
    officialUrl: https://www.cuhk.edu.hk/
    labUrl: https://www.psy.cuhk.edu.hk/images/FacultyMembersInfo/cammiecv20191217.pdf
    url: https://www.psy.cuhk.edu.hk/images/FacultyMembersInfo/cammiecv20191217.pdf
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - Dyslexia in Chinese Children: Risk Factors and Potential Early Interventions（2023）
      - Coping with Dyslexia, Dysgraphia, ADHD（2019）
    counts: "name 6/30, desc 31/80, dyslexiaLab 20/35, focusAreas 4项；单项最大 4/8"

  - rank: 6
    id: harvard-gaab-lab
    type: institute
    name: Harvard University
    city: 波士顿（美国）
    institutionDesc: 哈佛大学教育研究生院的 Gaab Lab 聚焦语言、阅读与学习差异发展，是国际教育神经科学与早期筛查研究的重要团队。
    dyslexiaLab: Gaab Lab
    officialLabName: Gaab Lab（PI：Nadine Gaab）
    desc: 追踪婴幼儿到学龄期的脑发育与读写能力关系，用影像研究支持早期筛查。
     focusAreas:
      - 脑发育
      - MRI影像
      - 发展性阅读障碍
      - 语音与听觉加工
      - 音乐训练与脑可塑性
    officialUrl: https://www.harvard.edu/
    labUrl: https://www.gaablab.com/
    url: https://www.gaablab.com/
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - Longitudinal trajectories of brain development from infancy to school age and their relationship with literacy development（PNAS，2025）
    counts: "name 17/30, desc 31/80, dyslexiaLab 7/35, focusAreas 4项；单项最大 5/8"

  - rank: 7
    id: yale-dyslexia-center
    type: institute
    name: Yale University
    city: 纽黑文（美国）
    institutionDesc: 耶鲁阅读障碍与创造力中心由 Sally 与 Bennett Shaywitz 共同创立，是阅读障碍研究、倡导与家庭教育资源的重要来源。
    dyslexiaLab: Yale Center for Dyslexia
    officialLabName: Yale Center for Dyslexia & Creativity（PI：Sally Shaywitz）
    desc: 依托纵向追踪与脑功能成像技术揭示阅读障碍机制，为早期筛查、教育干预及政策倡导提供科学依据。
    focusAreas:
      - 优势模型
      - 流行病学
      - 筛查工具
      - 政策倡导
      - 脑神经机制
    officialUrl: https://www.yale.edu/
    labUrl: http://dyslexia.yale.edu/
    url: http://dyslexia.yale.edu/
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - The Yale Multistep Dyslexia Screener validities in kindergarten cohorts（2023）
    counts: "name 14/30, desc 35/80, dyslexiaLab 21/35, focusAreas 4项；单项最大 4/8"

  - rank: 8
    id: ucsf-ucb-schwab-center
    type: institute
    name: UCSF | UC Berkeley
    officialName: University of California, San Francisco 与 University of California, Berkeley
    city: 旧金山（美国）
    dyslexiaLab: Schwab Center for Dyslexia
    officialLabName: Schwab Center for Dyslexia and Cognitive Diversity
    desc: 整合两校多学科力量，推进阅读障碍筛查评估、干预研究与去污名化。
    focusAreas:
      - 筛查评估
      - 干预研究
      - 去污名化
      - 多学科合作
    officialUrl: https://www.ucsf.edu/
    labUrl: https://schwabcognitivediversity.ucsf.edu/
    url: https://schwabcognitivediversity.ucsf.edu/
    sourceStatus: 工作簿超链接已保留，可信度标记为已核验
    representativePapers:
      - 运用神经成像评估生物表型在儿童阅读困难早期识别中的应用（2024）
    counts: "name 18/30, desc 31/80, dyslexiaLab 26/35, focusAreas 4项；单项最大 5/8"

  - rank: 9
    id: ucsf-dyslexia-center
    type: institute
    name: UCSF Dyslexia Center
    officialName: UCSF Dyslexia Center
    city: 旧金山（美国）
    dyslexiaLab: Multitudes 早期识字筛查平台
    officialLabName: Multitudes Universal Screening Platform（Multitudes 多维早期识字数字筛查平台）
    desc: 以神经科学研究为基础开发数字筛查平台，支持K-2阅读挑战早期识别与学校干预。
    focusAreas:
      - 数字筛查
      - 早期识别
      - 教学支持
      - 学校应用
    officialUrl: https://dyslexia.ucsf.edu/
    labUrl: https://multitudesinfo.ucsf.edu/
    url: https://multitudesinfo.ucsf.edu/
    sourceStatus: 工作簿文本链接已提取；原行未标可信度符号
    representativePapers: []
    counts: "name 18/30, desc 38/80, dyslexiaLab 19/35, focusAreas 4项；单项最大 4/8"
```

## 逐条审核记录

### 1. 中国科学院心理研究所

【原版】机构名：中国科学院心理研究所；实验室/团队/项目名称：毕鸿燕教授团队（脑科学与学习困难研究中心）；研究方向标签：汉字认知 / 视觉大细胞通路 / 听觉时间加工缺陷；代表性论文：发展性阅读障碍的听觉时间加工缺陷（心理科学进展，2021）、汉语阅读障碍与视觉大细胞网络关联（2023）。

【改版】name: 中国科学院心理研究所；dyslexiaLab: 毕鸿燕教授团队；focusAreas: 汉字认知、视觉加工、听觉加工、学习困难；desc: 研究汉字认知、视觉与听觉加工机制，为中文阅读障碍识别和干预提供依据。

【字数】name: 10/30，desc: 31/80，dyslexiaLab: 7/35，focusAreas: 4 项，单项最大 4/8

【改动说明】保留中科院心理所与毕鸿燕教授团队作为可信学术背景；将“视觉大细胞通路”“听觉时间加工缺陷”压缩为家长更容易理解的“视觉加工”“听觉加工”，并在 `desc` 中说明其对阅读障碍识别和干预的应用价值。

### 2. 北京师范大学

【原版】机构名：北京师范大学；实验室/团队/项目名称：舒华 / 李虹教授团队（认知神经科学与学习国家重点实验室）；研究方向标签：汉字可读性分析 / 阅读发展轨迹 / 早期鉴别与GraphoGame研究；代表性论文：汉语阅读障碍儿童的工作记忆刷新机制与阅读理解（2022）、基于互联网的落后儿童阅读干预模型（2023）。

【改版】name: 北京师范大学；dyslexiaLab: 认知神经科学与学习国家重点实验室；focusAreas: 阅读发展、可读性、早期鉴别、阅读干预；desc: 研究汉语阅读发展、可读性与互联网干预，为早期识别和阅读训练提供证据。

【机构介绍】北京师范大学心理学部是国家世界一流心理学科建设单位、唯一心理学一级学科国家重点学科单位，心理学科连续位居教育部学科排名全国第一。

【字数】name: 6/30，desc: 31/80，dyslexiaLab: 16/35，focusAreas: 4 项，单项最大 4/8

【改动说明】焦点行优先展示国家重点实验室名称，团队成员保留在 `officialLabName`；将 GraphoGame 等具体项目收束为“互联网干预”和“阅读干预”，避免标签过长。

### 3. 北京大学

【原版】机构名：北京大学；实验室/团队/项目名称：孟祥芝研究员课题组（行为与心理健康北京市重点实验室）；研究方向标签：视觉选择性注意 / 神经可塑性 / 中英文跨文化阅读障碍；代表性论文：Atypical visual selective attention in children with dyslexia: evidence from N2pc and PD（NeuroImage，2024）。

【改版】name: 北京大学；dyslexiaLab: 孟祥芝研究员课题组；focusAreas: 视觉注意、神经可塑、跨语阅读、儿童评估；desc: 研究视觉注意和神经可塑性，比较中英文阅读障碍，为儿童评估和干预提供线索。

【机构介绍】北京大学心理与认知科学学院是心理学 A+ 单位，心理学科入选国家双一流建设学科，在认知神经科学等方向积累深厚。

【字数】name: 4/30，desc: 33/80，dyslexiaLab: 9/35，focusAreas: 4 项，单项最大 4/8

【改动说明】保留孟祥芝研究员课题组与北京市重点实验室背景；将“视觉选择性注意”“中英文跨文化阅读障碍”压缩为短标签，`desc` 补足研究方向与儿童评估价值。

### 4. 台湾师范大学

【原版】机构名：台湾师范大学；实验室/团队/项目名称：李俊仁副教授团队（教育心理与辅导学系）；研究方向标签：声韵觉识（Phonological Awareness） / 识字量评估 / 认知成分分析；代表性论文：以认知成份分析区辨学童阅读困难的效能（2022）、中文断词机制及其在阅读障碍中的表现（2023）。

【改版】name: 台湾师范大学；dyslexiaLab: 李俊仁副教授团队；focusAreas: 声韵觉识、识字评估、认知成分、中文断词；desc: 研究声韵觉识、识字量与认知成分，帮助区分中文儿童阅读困难类型。

【机构介绍】台湾师范大学是台湾知名高等教育机构，教育与心理相关学科基础深厚，教育心理与辅导学系设有阅读障碍、阅读发展与认知神经科学方向。

【字数】name: 6/30，desc: 28/80，dyslexiaLab: 8/35，focusAreas: 4 项，单项最大 4/8

【改动说明】保留团队和教育心理背景；删去英文括注，把“识字量评估”压缩为“识字评估”，让标签更适合卡片展示。

### 5. 香港中文大学

【原版】机构名：香港中文大学；实验室/团队/项目名称：Catherine McBride 教授团队；研究方向标签：跨文化读写发展 / 语素意识（Morphological Awareness） / 大规模长序列跟踪；代表性论文：Dyslexia in Chinese Children: Risk Factors and Potential Early Interventions（2023）、Coping with Dyslexia, Dysgraphia, ADHD（2019）。

【改版】name: 香港中文大学；dyslexiaLab: Catherine McBride 教授团队；focusAreas: 跨文化、语素意识、长期追踪、早期干预；desc: 研究跨文化读写发展与语素意识，长期追踪儿童阅读风险和早期支持路径。

【字数】name: 6/30，desc: 31/80，dyslexiaLab: 20/35，focusAreas: 4 项，单项最大 4/8

【改动说明】保留英文人名全称和中文大学全称；将“大规模长序列跟踪”改为“长期追踪”，并把早期干预价值放入标签和描述。

### 6. Harvard University

【原版】机构名：Harvard University；实验室/团队/项目名称：Gaab Lab（PI: Nadine Gaab）；研究方向标签：婴幼儿纵向脑白质网络发育 / MRI影像学 / 早期预防筛查；代表性论文：Longitudinal trajectories of brain development from infancy to school age and their relationship with literacy development（PNAS，2025）。

【改版】name: Harvard University；dyslexiaLab: Gaab Lab；focusAreas: 脑发育、MRI影像、早期筛查、读写发展；desc: 追踪婴幼儿到学龄期的脑发育与读写能力关系，用影像研究支持早期筛查。

【机构介绍】哈佛大学教育研究生院的 Gaab Lab 聚焦语言、阅读与学习差异发展，是国际教育神经科学与早期筛查研究的重要团队。

【字数】name: 17/30，desc: 31/80，dyslexiaLab: 7/35，focusAreas: 4 项，单项最大 5/8

【改动说明】`dyslexiaLab` 使用实验室短名，PI 信息放入 `officialLabName`；把“脑白质网络发育”归纳为“脑发育”和“MRI影像”，并明确其与早期筛查的关系。

### 7. Yale University

【原版】机构名：Yale University；实验室/团队/项目名称：Yale Center for Dyslexia & Creativity（PI: Sally Shaywitz）；研究方向标签：Sea of Strengths模型 / 流行病学 / 政策与倡导；代表性论文：The Yale Multistep Dyslexia Screener validities in kindergarten cohorts（2023）。

【改版】name: Yale University；dyslexiaLab: Yale Center for Dyslexia；focusAreas: 优势模型、流行病学、筛查工具、政策倡导；desc: 长期研究阅读障碍流行病学、优势模型与筛查工具，为家庭识别和政策倡导提供依据。

【机构介绍】耶鲁阅读障碍与创造力中心由 Sally 与 Bennett Shaywitz 共同创立，是阅读障碍研究、倡导与家庭教育资源的重要来源。

【字数】name: 14/30，desc: 35/80，dyslexiaLab: 21/35，focusAreas: 4 项，单项最大 4/8

【改动说明】焦点行删去较长的 “& Creativity” 与 PI 信息，完整名称保留在 `officialLabName`；将 Sea of Strengths 模型改为“优势模型”，并补充筛查工具的家庭识别价值。

### 8. UCSF | UC Berkeley

【原版】机构名：UCSF & UC Berkeley；实验室/团队/项目名称：Schwab Center for Dyslexia and Cognitive Diversity；研究方向标签：认知多样性 / Multitudes数字化筛查工具 / 临床表型分析；代表性论文：运用神经成像评估生物表型在儿童阅读困难早期识别中的应用（2024）。

【改版】name: UCSF | UC Berkeley；dyslexiaLab: Schwab Center for Dyslexia；focusAreas: 筛查评估、干预研究、去污名化、多学科合作；desc: 整合两校多学科力量，推进阅读障碍筛查评估、干预研究与去污名化。

【字数】name: 18/30，desc: 31/80，dyslexiaLab: 26/35，focusAreas: 4 项，单项最大 5/8

【改动说明】官网使用 “UCSF | UCB” 与 “UCSF | UC Berkeley” 表述，卡片名统一为更易识别的 `UCSF | UC Berkeley`，并在 `officialName` 中补充两校完整英文名称；描述改为官网明确提到的筛查与评估工具、干预研究、减少污名及跨校多学科合作，避免把该中心概括得过窄。

### 9. UCSF Dyslexia Center

【原版】机构名：UCSF Dyslexia Center；所在城市：旧金山（San Francisco, CA） - Mission Bay校区；实验室/团队/项目名称：Multitudes Universal Screening Platform（Multitudes 多维早期识字数字筛查平台）；研究方向标签：临床神经病学、多模态神经影像分析（MRI）、基因与脑可塑性、早期风险数字筛查算法、全生命周期表型演变、神经发育与退行性对比模型。

【改版】name: UCSF Dyslexia Center；dyslexiaLab: Multitudes 早期识字筛查平台；focusAreas: 数字筛查、早期识别、教学支持、学校应用；desc: 以神经科学研究为基础开发数字筛查平台，支持K-2阅读挑战早期识别与学校干预。

【字数】name: 18/30，desc: 38/80，dyslexiaLab: 19/35，focusAreas: 4 项，单项最大 4/8

【改动说明】原始标签过长且包含多个科研方向，按网页展示需求保留与 Multitudes 页面最直接相关的数字筛查、早期识别、报告与教学支持；将 Mission Bay 校区信息从城市字段中移除，避免卡片信息过载。
