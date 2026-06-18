# 医院资源文字优化稿

source_xlsx: `D:\Python_work\dyslexia-awareness_pro\client\public\social resource\hospital\hospital.xlsx`

created: `2026-06-17`

scope: 本文件只处理医院类资源，不改原始 Excel，不改任何代码文件。

ranking_note: 前 3 名按用户指定顺序：北京大学第六医院、上海市精神卫生中心、复旦大学附属儿科医院。第 4 名以后按与阅读障碍服务的直接相关度排序：有明确阅读困难或学习障碍门诊优先，其次是儿童发育行为、临床心理或国际学习障碍评估项目。

style_rules:
- 统一使用全角中文标点。
- 年龄区间统一为 `X-Y岁`。
- 机构名尽量保留全称；若焦点门诊英文名称超过 `dyslexiaUnit` 上限，则使用网页展示短名，并在 `officialUnitName` 保留原名。
- `desc` 统一写成“专业背景 + 可提供的服务”；可保留能说明底蕴的学科定位，避免不可核验或过度夸张的宣传语。
- 字数按网页字段约束复核：`name <= 30`，`desc <= 80`，`dyslexiaUnit <= 25`。

> 注意：本文件用于网页资源展示文案整理，不构成医疗建议；就诊科室、医生排班和预约方式需以前端回填时的医院官方页面为准。

## 可直接回填的结构化数据

```yaml
hospitals:
  - rank: 1
    id: pku-sixth-hospital
    name: 北京大学第六医院
    city: 北京
    dyslexiaUnit: 儿童心理卫生中心门诊
    officialUnitName: 儿童心理卫生中心门诊
    desc: 国内重要精神专科，儿童心理卫生中心提供学习障碍与注意缺陷多动障碍评估。
    acceptAge: 0-18岁
    officialUrl: https://www.pkuh6.cn/
    unitUrl: https://www.pkuh6.cn/Html/Departments/Main/Index_21207.html
    appointment: 北大六院公众号或 114 平台
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 8/30, desc 33/80, dyslexiaUnit 10/25"

  - rank: 2
    id: shanghai-mental-health-center
    name: 上海市精神卫生中心
    city: 上海
    dyslexiaUnit: 儿少科发展性学习障碍门诊
    officialUnitName: 儿少科发展性学习障碍门诊
    desc: 国家精神疾病医学中心儿少科，提供学习障碍、神经发育与心理行为问题评估。
    acceptAge: 18岁以下
    officialUrl: https://www.smhc.org.cn/
    unitUrl: https://www.smhc.org.cn/lczl/tsks/esk.htm
    appointment: 上海市精神卫生中心微信公众号或患者服务公众号
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 9/30, desc 32/80, dyslexiaUnit 12/25"

  - rank: 3
    id: fudan-childrens-hospital
    name: 复旦大学附属儿科医院
    city: 上海
    dyslexiaUnit: 视觉与阅读障碍专病门诊
    officialUnitName: 视觉与阅读障碍专病门诊
    desc: 眼科开设视觉与阅读障碍专病门诊，评估视觉因素对儿童阅读困难的影响。
    acceptAge: 6-16岁
    officialUrl: https://ch.shmu.edu.cn/
    unitUrl: https://ch.shmu.edu.cn/main/news/content/id/492/pid/16750.html
    appointment: 复旦儿科微信公众号；建议搜索“视觉与阅读障碍”
    sourceStatus: 工作簿链接已保留
    counts: "name 10/30, desc 31/80, dyslexiaUnit 11/25"

  - rank: 4
    id: beijing-childrens-hospital
    name: 首都医科大学附属北京儿童医院
    city: 北京
    dyslexiaUnit: 阅读困难门诊
    officialUnitName: 阅读困难门诊
    desc: 保健中心阅读困难门诊评估注意力、智力、阅读与核心认知能力，制定康复建议。
    acceptAge: 学龄期儿童
    officialUrl: https://www.bch.com.cn/
    unitUrl: https://www.bch.com.cn/Html/News/Articles/19349.html
    appointment: 官方微信
    sourceStatus: 工作簿链接已保留
    counts: "name 14/30, desc 32/80, dyslexiaUnit 6/25"

  - rank: 5
    id: zssy-child-development-center
    name: 中山大学附属第三医院
    city: 广州
    dyslexiaUnit: 儿童发育行为中心
    officialUnitName: 儿童发育行为中心
    desc: 国内首个儿童发育行为障碍专业诊疗机构，评估多动症、语言发育迟缓与学习障碍。
    acceptAge: 0-16岁
    officialUrl: https://zssy.com.cn/
    unitUrl: https://www.zssy.com.cn/node/14067
    appointment: 中山三院 APP
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 10/30, desc 34/80, dyslexiaUnit 8/25"

  - rank: 6
    id: beijing-chaoyang-hospital
    name: 首都医科大学附属北京朝阳医院
    city: 北京
    dyslexiaUnit: 临床心理科学习障碍门诊
    officialUnitName: 学习障碍门诊（临床心理科）
    desc: 临床心理科设学习障碍相关门诊，提供青少年心理、情绪与学习困难评估。
    acceptAge: 6-18岁
    officialUrl: https://www.bjcyh.com.cn/
    unitUrl: https://www.bjcyh.com.cn/Html/Departments/Main/Index_212.html
    appointment: 朝阳医院 APP 或微信公众号
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 14/30, desc 30/80, dyslexiaUnit 11/25"

  - rank: 7
    id: shenzhen-childrens-hospital-longhua
    name: 深圳市儿童医院（龙华院区）
    city: 深圳
    dyslexiaUnit: 儿童保健与心理健康中心
    officialUnitName: 儿童保健与心理健康中心临床心理部
    desc: 儿童保健与心理健康中心开展发育筛查，识别阅读和语言偏离并转介干预。
    acceptAge: 0-17岁
    officialUrl: http://www.szkid.com.cn/
    unitUrl: http://www.szkid.com.cn/jyfw/zkjs/ftyq/lcqt/etbjyxljkzx/
    appointment: 深圳市儿童医院公众号
    sourceStatus: 工作簿链接已保留
    counts: "name 11/30, desc 31/80, dyslexiaUnit 11/25"

  - rank: 8
    id: shanghai-childrens-medical-center
    name: 上海交通大学医学院附属上海儿童医学中心
    city: 上海
    dyslexiaUnit: 发育行为儿科
    officialUnitName: 发育行为儿科
    desc: 发育行为儿科评估注意缺陷多动、语言发育、睡眠和学习相关困难。
    acceptAge: 学龄期至成人
    officialUrl: https://www.scmc.com.cn/
    unitUrl: https://www.scmc.com.cn/list/1436.html
    appointment: 上海儿童医学中心微信号
    sourceStatus: 工作簿链接已保留
    counts: "name 19/30, desc 27/80, dyslexiaUnit 6/25"

  - rank: 9
    id: child-mind-institute
    name: Child Mind Institute
    city: 纽约、旧金山（美国）
    dyslexiaUnit: Gund Learning Center
    officialUnitName: The Gund Learning & Diagnostic Center
    desc: 提供学习障碍与神经心理教育评估，覆盖阅读、书写、数学和执行功能支持。
    acceptAge: 5-26岁
    officialUrl: https://childmind.org/
    unitUrl: https://childmind.org/care/areas-of-expertise/learning-and-development-center/
    appointment: 官网提交预约请求
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 18/30, desc 30/80, dyslexiaUnit 18/25"

  - rank: 10
    id: boston-childrens-hospital
    name: Boston Children's Hospital
    city: 波士顿（美国）
    dyslexiaUnit: 学习障碍项目
    officialUnitName: Learning Disabilities Program
    desc: 学习障碍项目为1-8年级儿童做半日综合评估，形成诊断理解与干预计划。
    acceptAge: 7-15岁
    officialUrl: https://www.childrenshospital.org/
    unitUrl: https://www.childrenshospital.org/services/learning-disabilities-program
    appointment: 官网申请与病历筛查
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 23/30, desc 31/80, dyslexiaUnit 6/25"

  - rank: 11
    id: mayo-clinic
    name: Mayo Clinic（梅奥诊所）
    city: 罗切斯特（美国）
    dyslexiaUnit: 发育行为儿科
    officialUnitName: Developmental Behavioral Pediatrics
    desc: 提供学习障碍科普与儿童健康服务入口，适合作为复杂读写困难就诊参考。
    acceptAge: 婴儿至18岁
    officialUrl: https://www.mayoclinic.org/
    unitUrl: https://www.mayoclinic.org/healthy-lifestyle/childrens-health/in-depth/learning-disorders/art-20046105
    appointment: 官网患者入口在线预约
    sourceStatus: 工作簿链接已保留，官方页面已抽样核验
    counts: "name 14/30, desc 31/80, dyslexiaUnit 6/25"
```

## 逐条审核记录

### 1. 北京大学第六医院

【原版】国内顶尖精神专科，提供特定学习技能发育障碍、ADHD的深度鉴别诊断。门诊位于六院北院区门诊楼。

【改版】国内重要精神专科，儿童心理卫生中心提供学习障碍与注意缺陷多动障碍评估。

【字数】name: 8/30，desc: 33/80，dyslexiaUnit: 10/25

【改动说明】保留“国内重要精神专科”来说明医院底蕴，把“顶尖”“深度”等较强评价词改成克制表述；ADHD 改为家长更容易理解的“注意缺陷多动障碍”。

### 2. 上海市精神卫生中心

【原版】作为国家精神疾病医学中心，其儿少专科是国内标杆。科室具备完备的神经心理与智力测试工具（如韦氏智力测验），在特定学习技能障碍的评估与干预上经验丰富。在国内率先推行了适合中国国情的“医生—家庭—教师—社区”多方共同参与的综合干预模式，不仅提供临床诊断，还注重医教结合，帮助学龄期儿童获得更系统的支持。

【改版】国家精神疾病医学中心儿少科，提供学习障碍、神经发育与心理行为问题评估。

【字数】name: 9/30，desc: 32/80，dyslexiaUnit: 12/25

【改动说明】保留“国家精神疾病医学中心儿少科”作为专业背景，把“国内标杆”“经验丰富”收束为更可读的服务说明，适合卡片短文案。

### 3. 复旦大学附属儿科医院

【原版】自2024年6月3日上午起，复旦大学附属儿科医院眼科每周一上午开设视觉与阅读障碍专病门诊。

【改版】眼科开设视觉与阅读障碍专病门诊，评估视觉因素对儿童阅读困难的影响。

【字数】name: 10/30，desc: 31/80，dyslexiaUnit: 11/25

【改动说明】删去具体开诊日期与排班信息，避免后续过期；保留“眼科”“视觉与阅读障碍专病门诊”和对家长有用的就诊方向。

### 4. 首都医科大学附属北京儿童医院

【原版】专门针对智力正常但在生字记忆、单词识别、阅读流畅度及应用题理解等方面存在显著困难的儿童。门诊通过对孩子的注意力、智力、阅读能力以及基础/核心认知能力进行全面医学评估，深入挖掘困难根源。由专业医生与康复师团队联合，综合学龄期儿童的全面发展状况，量身定制个性化的诊疗与心理康复干预方案。

【改版】保健中心阅读困难门诊评估注意力、智力、阅读与核心认知能力，制定康复建议。

【字数】name: 14/30，desc: 32/80，dyslexiaUnit: 6/25

【改动说明】压缩长段落，保留评估维度与康复建议；删除“深入挖掘”“量身定制”等不适合卡片展示的表达。

### 5. 中山大学附属第三医院

【原版】我国首个儿童发育行为障碍疾病专业诊疗机构。聚焦多动症、语言发育迟缓与学习障碍。

【改版】国内首个儿童发育行为障碍专业诊疗机构，评估多动症、语言发育迟缓与学习障碍。

【字数】name: 10/30，desc: 34/80，dyslexiaUnit: 8/25

【改动说明】保留“国内首个”来说明学科积累，同时删去“专业团队”等额外修饰，句尾落到可评估的具体问题。

### 6. 首都医科大学附属北京朝阳医院

【原版】开展青少年情绪障碍团体治疗、失眠团体治疗、沙盘治疗、心理咨询/治疗门诊等；开展抑郁、焦虑、失眠等专病门诊、青少年情绪障碍门诊、学习障碍门诊、互联网门诊、MDT、联络会诊、综合医院病房会诊创新服务模式等。

【改版】临床心理科设学习障碍相关门诊，提供青少年心理、情绪与学习困难评估。

【字数】name: 14/30，desc: 30/80，dyslexiaUnit: 11/25

【改动说明】删去与阅读障碍关系较弱的治疗项目和 MDT 细节，聚焦临床心理科、学习障碍门诊和青少年评估。

### 7. 深圳市儿童医院（龙华院区）

【原版】基于不同年龄体格生长及神经心理发育特点定制筛查套餐，确诊阅读及语言发育偏离并转介干预。

【改版】儿童保健与心理健康中心开展发育筛查，识别阅读和语言偏离并转介干预。

【字数】name: 11/30，desc: 31/80，dyslexiaUnit: 11/25

【改动说明】保留筛查、阅读和语言偏离、转介干预；把“定制筛查套餐”改为更中性的“开展发育筛查”。

### 8. 上海交通大学医学院附属上海儿童医学中心

【原版】科室诊疗范围包括精神发育迟缓、语言发育障碍、童年孤独症、注意缺陷多动障碍、喂养困难、营养不良、非器质性遗尿症、睡眠障碍、抽动障碍、佝偻病等等。

【改版】发育行为儿科评估注意缺陷多动、语言发育、睡眠和学习相关困难。

【字数】name: 19/30，desc: 27/80，dyslexiaUnit: 6/25

【改动说明】删除与阅读障碍关联较弱的疾病清单，保留发育行为儿科和对学习困难常见共病的评估方向。

### 9. Child Mind Institute

【原版】全球顶尖神经心理测评中心。提供耗时约10小时的深度教育/神经心理学测验体系，为升学与干预提供金标准报告。

【改版】提供学习障碍与神经心理教育评估，覆盖阅读、书写、数学和执行功能支持。

【字数】name: 18/30，desc: 30/80，dyslexiaUnit: 18/25

【改动说明】删除“全球顶尖”“金标准”等评价性词语；保留学习障碍、神经心理教育评估和支持方向。官方中心名较长，因此 `dyslexiaUnit` 用短名，`officialUnitName` 保留全称。

### 10. Boston Children's Hospital

【原版】哈佛医学院附属医院神经内科下设项目。提供神经学、心理学与特殊教育学的交叉会诊，专注疑难读写障碍。

【改版】学习障碍项目为1-8年级儿童做半日综合评估，形成诊断理解与干预计划。

【字数】name: 23/30，desc: 31/80，dyslexiaUnit: 6/25

【改动说明】改用项目官方页面强调的服务方式和适用学段，减少“疑难”“交叉会诊”等容易显得过重的表达。

### 11. Mayo Clinic（梅奥诊所）

【原版】评估复杂性学习障碍（Dyslexia/Dysgraphia）。关注环境毒素、早产、遗传等高危因素导致的读写困难与多重共病。

【改版】提供学习障碍科普与儿童健康服务入口，适合作为复杂读写困难就诊参考。

【字数】name: 14/30，desc: 31/80，dyslexiaUnit: 6/25

【改动说明】原链接更偏学习障碍科普页面，不是明确专病门诊页，因此降低医疗承诺强度，改为“就诊参考”。
