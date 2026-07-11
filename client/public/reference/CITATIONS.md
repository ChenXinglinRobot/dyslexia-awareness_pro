# 文献引用分布与实施方案

> 目标：在网站科普文字后面像学术论文那样加 `[1]` `[2]` 之类的小数字角标，点击后跳到该页底部的「参考文献」列表。
>
> **本文档只负责"哪篇文献应该挂在哪个 `.tsx` 的哪句话后面"，具体怎么实现（角标组件、跳转锚点、底部列表渲染）由 codex 自行决定。**

---

## 0. 阅读须知 / 现有引用情况

- **#1（王久菊等 2023 专家意见）已经部分被引用：**
  - `client/src/components/HeroSection.tsx:308` 已经在底部写了完整出处。
  - `client/src/components/ActionSection.tsx:2-4` 文件头注释把它作为整段的依据。
  - `client/src/components/ExpertOpinionFlowchart.tsx:32,57` 把它作为诊断流程图的来源。
  - `client/src/components/ResourcesSection.tsx:191` 的参考文献列表里第一项就是它。
  - ⇒ codex 后续加角标时，要和上面这些位置保持一致；尽量复用现有引用，不要重复列条目。

- **#14（CNReader）和 #15（DYPA）已经部分被引用：**
  - `client/src/data/gameInterventions.ts:180-183` 已经引用了 Liu et al. 2025 的 CNReader 论文（DOI: 10.1057/s41599-025-05079-1）。
  - `client/src/data/gameInterventions.ts:204-207` 已经引用了 Zhong et al. 2023 的 DYPA 论文（DOI: 10.1145/3610908）。
  - **注意：** reference 文件夹里的 #14 和 #15 是上述论文对应的「原始设计/工具论文」，不是同一篇引用。codex 需要决定是把两份都列（一份作为应用、一份作为底层研究），还是只留原始论文。**建议**：reference 文件夹的版本作为「设计/工具来源」另起一行，标注区别。

- **#4（Tseng 2023）和 #5（Song 2016）的对应内容目前还没有在网页上展示**——根据用户说明，它们是为了「之后会有」的板块预留的，**现阶段不要写角标**，只在文末「待用文献」列出。

- **#18（"可以作为但是也不太相关4…"）** 是用户标注的"勉强相关但优先级低"的文献，codex 可以视情况决定是否引用。

---

## 1. 文献 ↔ `.tsx` 映射表

> 表中「引用位置」给出该篇文献最自然应该出现的 `.tsx` 文件 + 行号 + 那段文字在讲什么。「PRIMARY / SECONDARY」是建议优先级——PRIMARY 表示该处不引就显得不严谨；SECONDARY 表示锦上添花，codex 可自行取舍。
>
> 文件路径相对于 `d:\Python_work\dyslexia-awareness_pro\`。

### 主题 A：定义、流行病学、专家共识

| # | 文件名（简） | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#1** | `1阅读障碍专家意见发表版本（2023带封面和目录）.pdf` | `client/src/components/HeroSection.tsx:302` —— 「我国学龄儿童汉语阅读障碍患病率约为 3.45%～8%」这个数字 | **PRIMARY**（必引，已经有出处，但要改成角标） |
| **#1** | 同上 | `client/src/components/UnderstandSection.tsx` —— 「阅读障碍并非单纯的视力问题」（约 134 行附近）以及「几乎不会自愈，干预越早越好」（约 708 行附近「误解 vs 事实」段落） | PRIMARY |
| **#1** | 同上 | `client/src/components/ActionSection.tsx` —— 整段「5 步支持路径 / 4 类社会支持」背后都引自《专家意见》，建议在段落标题或首句加一个角标 | PRIMARY |
| **#1** | 同上 | `client/src/components/ExpertOpinionFlowchart.tsx:32` —— 流程图标题已经是「《专家意见》中的诊断流程」，可改为加 `[1]` 角标 | PRIMARY |
| **#1** | 同上 | `client/src/components/ResourcesSection.tsx` —— 「观察线索」清单末尾的免责声明（约 145 行） | SECONDARY |

### 主题 B：阅读的理论模型（简单阅读观、解码瓶颈）

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#6.1** | `6.1The Simple View of Reading.pdf` | `client/src/components/UnderstandSection.tsx:460` —— 「阅读 = 字符识别 × 言语理解」这条公式 | **PRIMARY**（这条公式几乎一定要引出处） |
| **#6 (Stanovich)** | `6Decoding, Reading, and Reading Disability.pdf` | `client/src/components/UnderstandSection.tsx:572` —— 「字符识别归零——即使理解力完好，阅读也无法进行」这一句解释"乘法归零" | **PRIMARY**（"解码是阅读瓶颈"的来源） |
| **#6.1** 或 **#6 (Stanovich)** | 二选一 | `client/src/components/UnderstandSection.tsx` CoordinatePlane 象限说明处（`components/CoordinatePlane.tsx:40-43` 也算） | SECONDARY |

### 主题 C：中文阅读特有的认知因素（语音、命名、语素、部件）

> 这些是用来支持 "UnderstandSection.tsx 里『与拼音文字以语音缺陷为主不同，汉语阅读障碍儿童更突出地缺乏以下四种意识』" 这一段（约 644-695 行）。

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#4** ⏳ | `4Tseng 等 - 2023 - Learning to read Chinese the roles of phonologica.pdf` | **未来板块**——目前网站没有相关科普文字。预留位置：`client/src/components/UnderstandSection.tsx` "汉语阅读的特殊性" 子区块扩展处（约 659 行后） | PRIMARY（待启用） |
| **#5** ⏳ | `5Song 等 - 2016 - How Well Do Phonological Awareness and Rapid Autom.pdf` | **未来板块**——同上，预留位置 `client/src/components/UnderstandSection.tsx` 644-695 行区域 | PRIMARY（待启用） |
| **#6 (Shu)** | `6Reading Research Quarterly - 2011 - Shu - Role of Radical Awareness in the Character and Word Acquisition of Chinese.pdf` | `client/src/components/UnderstandSection.tsx:644-647` —— 「形旁意识」一项（约 647 行） | **PRIMARY** |
| **#7** | `7Understanding Chinese Developmental Dyslexia Morphological Awarenessas a Core Cognitive Construct.pdf` | `client/src/components/UnderstandSection.tsx:644-647` —— 「同音语素意识 / 同形语素意识 / 复合词意识」三项（644-646 行） | **PRIMARY** |

### 主题 D：视觉拥挤理论

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#3** | `3Crowding, reading, and developmental dyslexia.pdf` | `client/src/components/UnderstandSection.tsx:230` —— 「拉大字间距 → 拥挤消解：这正是'无障碍排版'能够帮到阅读障碍者的原因」 | **PRIMARY** |
| **#3** | 同上 | `client/src/components/UnderstandSection.tsx:134` —— 「阅读障碍并非单纯的视力问题」——用来和"视觉拥挤理论"形成对照 | SECONDARY |
| **#18** | `可以作为但是也不太相关4The impact of visual crowding on Chinese character recognition…pdf` | `client/src/components/UnderstandSection.tsx:230` 紧接 #3 之后，作为"中文语境下的视觉拥挤"补强 | SECONDARY（用户标注"不太相关"，codex 自定） |

### 主题 E：排版与字体干预

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#2** | `2Extra-large letter spacing improves reading in dyslexia.pdf` | `client/src/components/ReadabilityLab.tsx` —— 整体介绍段（约 241 行「字体和排版不能'治疗'阅读障碍，但清晰、稳定、可调节的文本设计，可能帮助一些读者减少阅读负担」） | **PRIMARY** |
| **#10** | `10Inter-letter spacing, inter-word spacing, and font with dyslexia-friendly features testing text readability in people with and without dyslexia.pdf` | `client/src/components/ReadabilityLab.tsx` —— 字距/行距/段落控制器的说明文字里 | PRIMARY |
| **#9** | `9Dyslexie font does not benefit reading in childrenwith or without dyslexia.pdf` | `client/src/components/ReadabilityLab.tsx:452` —— 「没有一种字体适合所有人。真正友好的设计，是允许文本被调整」——这一段如果强调"Dyslexie 字体并不神奇"，就把 #9 引上 | **PRIMARY**（"破除神话"很关键） |
| **#9** 或 **#10** | 二选一 | `client/src/components/ReadabilityLab.tsx:512-514` —— 衬线 vs 非衬线说明段，作为延伸阅读 | SECONDARY |

### 主题 F：辅助技术与工具

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#8** | `8does-use-of-text-to-speech-and-related-read-aloud-tools-2ia9vnjst1.pdf` | `client/src/components/ActionSection.tsx` —— 「提供合理便利」列表（约 75-95 行）里提到「分段阅读材料 / 口头回答」之类时，加 #8 作为依据 | **PRIMARY** |
| **#14** | `14CNReader a reading practice tool designed forChinese children with developmental dyslexia.pdf` | `client/src/data/gameInterventions.ts:180-192` —— CNReader 条目，与既有 Liu et al. 2025 的引用并列（作为工具设计论文） | SECONDARY（已有一份引用了，#14 是补充） |
| **#15** | `15DYPA A Machine Learning Dyslexia Prescreening Mobile Application for Chinese Children.pdf` | `client/src/data/gameInterventions.ts:204-217` —— DYPA 条目，与既有 Zhong et al. 2023 引用并列 | SECONDARY（同上） |
| **#15** | 同上 | `client/src/components/ResourcesSection.tsx` —— 「观察线索 / 筛查」区段（约 27-145 行）作为「专业筛查」工具之一 | SECONDARY |
| **#15** | 同上 | `client/src/data/onlineResources.ts` —— 「Multitudes Newsletter」条目（line 56）介绍页 | SECONDARY |

### 主题 G：创造力与阅读障碍（"阅读障碍 = 天才"这个误解的破除 / 校准）

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#11** | `11NoEvidenceofCreativeBenefitinDyslexia_Researchgate.pdf` | `client/src/components/FamousDyslexicsModal.tsx:97` —— 收尾那句「阅读障碍不等于天才，也不等于失败」 | **PRIMARY**（破除神话需要引证） |
| **#11** | 同上 | `client/src/components/FamousDyslexicsModal.tsx:75` —— 开篇说明「这些经历…不是'天才证明'」 | SECONDARY |
| **#12** | `12Dyslexia - 2021 - Majeed - Developmental dyslexia and creativity  A meta‐analysis.pdf` | 同 #11 的位置，作为元分析的对位证据 | SECONDARY |
| **#11** 或 **#12** | 二选一 | `client/src/components/UnderstandSection.tsx` —— 「误解 vs 事实」区域（约 707-710 行）的「看不懂字 = 笨」一行 | SECONDARY |

### 主题 H：风险与韧性（cumulative risk 模型）

| # | 文件名 | 引用位置 | PRIMARY/SECONDARY |
|---|---|---|---|
| **#13** | `13cumulativeriskandresilience.inpress.pdf` | `client/src/components/UnderstandSection.tsx:695` —— 「小学一至三年级，是阅读障碍筛查与早期干预的黄金期」后，可补一句多因素累积风险的说明，引 #13 | SECONDARY（codex 自定是否需要） |
| **#13** | 同上 | `client/src/components/ActionSection.tsx` —— 「5 步支持路径」或「4 类社会支持」段的过渡处 | SECONDARY |

---

## 2. 全文「参考文献」总表（建议格式）

codex 在最终落地时，无论每页怎么排版，建议**全站共享同一个编号体系**，方便跨页跳转。下面是建议的编号方案：

```
[1]  王久菊, 孟祥芝, 李红, 等. 汉语发展性阅读障碍诊断与干预的专家意见[J]. 中国心理卫生杂志, 2023, 37(3): 185-191. DOI: 10.3969/j.issn.1000-6729.2023.03.001
[2]  Zorzi M, et al. Extra-large letter spacing improves reading in dyslexia. PNAS, 2012.（请 codex 打开 PDF 确认完整作者与卷期）
[3]  Whitney D, Levi DM. Crowding, reading, and developmental dyslexia. Vision Research, 2011.（同上）
[4]  Tseng W-Y, et al. Learning to read Chinese: the roles of phonological… 2023.（待启用）
[5]  Song M, et al. How well do phonological awareness and rapid automatized naming… 2016.（待启用）
[6]  Hoover WA, Gough PB. The Simple View of Reading. (1990, RRA) —— 引用文件名 6.1
[7]  Stanovich KE. Decoding, Reading, and Reading Disability. —— 引用文件名 6（Stanovich 篇）
[8]  Shu H, Wu N, Anderson RC, et al. The role of radical awareness in the character and word acquisition of Chinese. Reading Research Quarterly, 2011. —— 引用文件名 6（Shu 篇）
[9]  [作者]. Understanding Chinese developmental dyslexia: morphological awareness as a core cognitive construct. —— 文件名 7
[10] [作者]. Does use of text-to-speech and related read-aloud tools… —— 文件名 8
[11] Kuster SM, et al. Dyslexie font does not benefit reading in children with or without dyslexia. —— 文件名 9
[12] [作者]. Inter-letter spacing, inter-word spacing, and font with dyslexia-friendly features… —— 文件名 10
[13] [作者]. No evidence of creative benefit in dyslexia. —— 文件名 11
[14] Majeed NM, et al. Developmental dyslexia and creativity: a meta-analysis. Dyslexia, 2021. —— 文件名 12
[15] [作者]. Cumulative risk and resilience in dyslexia. (in press) —— 文件名 13
[16] Liu Z, et al. CNReader: a reading practice tool designed for Chinese children with developmental dyslexia. HSSC, 2025, 12: 751. DOI: 10.1057/s41599-025-05079-1 —— 文件名 14
[17] Zhong B, et al. DYPA: a machine learning dyslexia prescreening mobile application for Chinese children. ACM IMWUT, 2023, 7(3): 143. DOI: 10.1145/3610908 —— 文件名 15
[18] [作者]. The impact of visual crowding on Chinese character recognition…（次要） —— 用户标注的"勉强相关"那篇
```

> ⚠️ **codex 必做：** 上述格式中所有"（请 codex 打开 PDF 确认完整作者与卷期）"和"\[作者\]"占位，都需要打开对应 PDF 校对、补全，再正式落到网站上。这步是诚实性问题。

---

## 3. 实施方案建议（给 codex）

> **只是建议，不是死命令。codex 可以按项目现有风格自行决定。**

### 3.1 角标组件

- 在 `client/src/components/ui/` 下新增 `CitationRef.tsx`（或类似）：
  - props: `n: number`（对应参考文献序号）、可选 `label?: string`（如悬停 tooltip 显示作者+年份）。
  - 渲染：`<sup><a href={\`#ref-\${n}\`} className="text-primary no-underline">[\${n}]</a></sup>`。
- 现有 Tailwind 主题下，sup 用 `text-xs`、颜色取 primary 即可。

### 3.2 跳转锚点

- 每个参考文献项渲染时给一个 `id={\`ref-\${n}\`}` 的锚点。
- 浏览器自动滚动即可，不需要 JS。codex 想用平滑滚动的话加 `scroll-behavior: smooth` 在 `html` 或组件级。

### 3.3 角标放在哪

- **正解**：放在含事实性陈述的那一句文字结尾、句号**之前**（学术惯例）。codex 实际操作时**不要破坏现有 JSX 结构**，最好把长段落拆出变量再插入角标。
- **避免**：把角标塞在标题上、把整段堆 5 个角标、把 `[1][2][3]` 写成一长串难看的字符串。

### 3.4 参考文献列表的位置

- **每个 section 单独放一份**：section 自己的角标只能跳到自己的列表。优点：实现简单、不跨 section。
- **全站共享一份**（推荐）：放在 Footer 上方或单独的「参考文献」页面。优点：避免重复，但角标要带页 id（如 `#hero-ref-1`）。
- 怎么选由 codex 决定，但**编号体系要全站一致**（即本文档第 2 节的编号）。

### 3.5 「待启用」文献的处理

- **#4、#5** 现阶段不要在任何 `.tsx` 里加角标。
- 在「参考文献」总表里**保留**这两条，并加一行说明：「（本文献对应内容将在后续板块上线后引用）」。
- 等内容上线时，codex 只需要在那个位置加角标即可，不需要重排编号。

---

## 4. codex 执行 checklist

- [ ] 打开 `client/public/reference/` 下所有 PDF，把第 2 节里所有 `[作者]` 占位补全（**先做这步，不要带着错误信息上线**）。
- [ ] 根据第 3 节实施方案，在 `client/src/components/ui/` 里加 `CitationRef` 组件。
- [ ] 按第 1 节映射表，把 PRIMARY 级别的角标全部加上。
- [ ] SECONDARY 级别由 codex 自己判断要不要加（建议加 2-3 个最具说服力的，其余保持页面简洁）。
- [ ] 在每个 section 末尾或全站共享位置，渲染第 2 节的参考文献列表，带锚点。
- [ ] 跑 `pnpm build`（参考 `CLAUDE.md`），确认无 TS / lint 报错。
- [ ] 在浏览器里点击几个角标验证跳转正常。

---

## 5. 备注

- 文档中没有涵盖 .ts 数据文件（如 `onlineResources.ts`、`institutions.ts`）里逐条资源/机构的引用——这些属于"机构/人物介绍"性质，已经自带出处，不需要再加角标。
- 「AboutSection.tsx」「Footer.tsx」「NotFound.tsx」是项目说明 / 导航 / 兜底页面，不需要文献引用。
- 如果 codex 在执行过程中发现某条 PRIMARY 引用放上去读起来很奇怪（例如角标打断了排版），可以重新和用户确认，不必死板执行。