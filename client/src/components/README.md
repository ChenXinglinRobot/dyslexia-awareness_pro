# React Bits 组件库文档

> 本目录除了包含自己的设计外，还包含 20 个由 `@react-bits` 提供的视觉效果组件，涵盖文字动画、卡片交互、3D 画廊、物理粒子等类别。每个组件均有独立 `README.md` 详细说明。

---

## 目录

- [React Bits 组件库文档](#react-bits-组件库文档)
  - [目录](#目录)
  - [文字动画类](#文字动画类)
    - [GlitchText](#glitchtext)
    - [RotatingText](#rotatingtext)
    - [ScrambledText](#scrambledtext)
    - [DecryptedText](#decryptedtext)
    - [BlurText](#blurtext)
    - [FuzzyText](#fuzzytext)
    - [TextPressure](#textpressure)
    - [ShinyText](#shinytext)
    - [Shuffle](#shuffle)
    - [TrueFocus](#truefocus)
    - [ASCIIText](#asciitext)
    - [FallingText](#fallingtext)
  - [卡片交互类](#卡片交互类)
    - [CardSwap](#cardswap)
    - [BorderGlow](#borderglow)
    - [SpotlightCard](#spotlightcard)
  - [3D / WebGL 类](#3d--webgl-类)
    - [CircularGallery](#circulargallery)
    - [Antigravity](#antigravity)
    - [ShapeBlur](#shapeblur)
  - [氛围叠加类](#氛围叠加类)
    - [Noise](#noise)
  - [场景组合推荐](#场景组合推荐)
  - [依赖说明](#依赖说明)

---

## 文字动画类

### GlitchText

纯 CSS 驱动的故障风（Glitch）文字效果。通过伪元素叠加红/青双色偏移，模拟数字故障视觉。

```tsx
import GlitchText from '@/components/GlitchText';

<GlitchText speed={0.5} enableShadows={true} enableOnHover={false}>
  GLITCH
</GlitchText>
```

**核心参数：** `speed`（速度）、`enableShadows`（双色故障）、`enableOnHover`（hover 触发）

**适用场景：** 科技/赛博朋克网站标题、Error 页面、游戏网站、Coming Soon 页面

---

### RotatingText

Motion 驱动的文字轮换动画，逐字/逐词以弹簧物理感进入。可通过 ref 手动控制。

```tsx
import RotatingText from '@/components/RotatingText';

<RotatingText
  texts={['设计师', '开发者', '创造者']}
  rotationInterval={2000}
  splitBy="characters"
  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
/>
```

**核心参数：** `texts`（文字数组）、`splitBy`（分割方式）、`rotationInterval`（间隔）、`staggerFrom`（动画顺序）

**适用场景：** Hero 副标题轮换、产品特性轮播、职业标签、个人网站标语

---

### ScrambledText

GSAP ScrambleText 插件驱动。鼠标靠近文字时，距离越近打乱程度越大，逐字还原。

```tsx
import ScrambledText from '@/components/ScrambledText';

<ScrambledText radius={100} duration={1.2} scrambleChars=".:">
  Hover me
</ScrambledText>
```

**核心参数：** `radius`（触发范围）、`duration`（还原时长）、`scrambleChars`（打乱字符集）

**适用场景：** 密码揭示、加密/解密主题、神秘彩蛋、程序员风格界面

---

### DecryptedText

文字以乱码开始，逐字/从中心/从两端解密还原。支持 hover / click / inView 多种触发方式。

```tsx
import DecryptedText from '@/components/DecryptedText';

<DecryptedText
  text="Secret Message"
  speed={50}
  sequential={false}
  revealDirection="start"
  animateOn="hover"
/>
```

**核心参数：** `sequential`（顺序解密 vs 随机乱码）、`revealDirection`（方向）、`animateOn`（触发方式）、`characters`（乱码集）

**适用场景：** 密码揭示、机密文件名称、隐藏彩蛋、教育/游戏解密体验

---

### BlurText

IntersectionObserver 驱动，进入可视区时文字从模糊到清晰逐词展开。

```tsx
import BlurText from '@/components/BlurText';

<BlurText
  text="Blur text reveal animation"
  delay={200}
  animateBy="words"
  direction="top"
/>
```

**核心参数：** `delay`（词间延迟）、`animateBy`（words/letters）、`direction`（top/bottom）、`animationFrom/To`（自定义关键帧）

**适用场景：** Section 入口动画、内容加载后展示、滚动叙事、列表逐项动画

---

### FuzzyText

Canvas 逐行绘制，每行随机横向偏移产生毛边模糊效果。支持 hover 增强和 glitch 定期故障模式。

```tsx
import FuzzyText from '@/components/FuzzyText';

<FuzzyText
  fontSize="clamp(2rem, 8vw, 8rem)"
  fontWeight={900}
  baseIntensity={0.18}
  hoverIntensity={0.5}
  glitchMode={false}
  gradient={['#ff6188', '#ffd866']}
>
  FUZZY TEXT
</FuzzyText>
```

**核心参数：** `baseIntensity/hoverIntensity`（强度控制）、`fuzzRange`（偏移范围）、`glitchMode`（故障模式）、`gradient`（渐变）、`direction`（模糊方向）

**适用场景：** Hero 超大标题、故障风格网站、科技/游戏标题、渐变色文字

---

### TextPressure

可变字体（Variable Font）实时形变。鼠标位置改变每个字符的字宽（wdth）、字重（wght）、斜体（ital）轴向值。

> ⚠️ 需要使用支持可变轴向的字体，默认使用 [Compressa PRO GX](https://www.fontspring.com/fonts/exLj?text=Compressa+PRO+GX)。

```tsx
import TextPressure from '@/components/TextPressure';

<TextPressure
  text="Compressa"
  width={true}
  weight={true}
  italic={true}
  textColor="#FFFFFF"
/>
```

**核心参数：** `fontFamily`/`fontUrl`（可变字体）、`width`/`weight`/`italic`/`alpha`（启用哪些轴向）、`stroke`（描边模式）

**适用场景：** 品牌标题、互动 Logo、Hero 超大文字、数字艺术展示

---

### ShinyText

渐变背景配合 `background-clip`，光泽从左到右或从右到左循环扫过。

```tsx
import ShinyText from '@/components/ShinyText';

<ShinyText
  text="Shiny Text Effect"
  speed={2}
  color="#b5b5b5"
  shineColor="#ffffff"
  direction="left"
  yoyo={false}
/>
```

**核心参数：** `speed`（周期时长）、`spread`（渐变角度）、`direction`（方向）、`yoyo`（来回模式）、`pauseOnHover`

**适用场景：** 品牌名称、CTA 按钮文字、价格数字、徽章标签、特色功能标题

---

### Shuffle

GSAP ScrollTrigger 驱动，滚动进入可视区时字符打乱再还原，有红/青双色故障效果。

```tsx
import Shuffle from '@/components/Shuffle';

<Shuffle
  text="Shuffle Animation"
  shuffleDirection="right"
  shuffleTimes={1}
  animationMode="evenodd"
  triggerOnHover={true}
/>
```

**核心参数：** `shuffleDirection`（方向）、`shuffleTimes`（打乱轮次）、`animationMode`（evenodd 交替更自然）、`scrambleCharset`（打乱字符集）、`colorFrom/colorTo`（颜色渐变）

**适用场景：** 页面入口动画、Section 标题、产品名展示、数字滚动效果

---

### TrueFocus

焦点词清晰化 + 发光方框跟随，其余词模糊。按周期自动循环或手动 hover 触发。

```tsx
import TrueFocus from '@/components/TrueFocus';

<TrueFocus
  sentence="True Focus Effect"
  manualMode={false}
  blurAmount={5}
  borderColor="green"
  glowColor="rgba(0, 255, 0, 0.6)"
/>
```

**核心参数：** `blurAmount`（模糊程度）、`borderColor`/`glowColor`（框颜色）、`manualMode`（hover 触发 vs 自动）、`animationDuration`

**适用场景：** 导航当前项高亮、表单标签、标签选择器、功能亮点展示、面包屑

---

### ASCIIText

文字渲染为 Canvas 纹理，再以 ASCII 字符层覆盖，背景带 hue-rotate 色相旋转。

```tsx
import ASCIIText from '@/components/ASCIIText';

<ASCIIText
  text="David!"
  asciiFontSize={8}
  textFontSize={200}
  textColor="#fdf9f3"
  enableWaves={true}
/>
```

**核心参数：** `asciiFontSize`（ASCII 密度，越小越密）、`textFontSize`（底层文字大小）、`enableWaves`（顶点波浪动画）

**适用场景：** 超大标题、Loading 页面、开发者风格网站、复古终端主题、个人品牌封面

---

### FallingText

Matter.js 物理引擎驱动，文字拆分为单词后获得重力自然坠落，支持鼠标拖拽交互。

```tsx
import FallingText from '@/components/FallingText';

<FallingText
  text="Falling text physics effect"
  highlightWords={['physics']}
  trigger="auto"
  gravity={1}
  mouseConstraintStiffness={0.2}
/>
```

**核心参数：** `trigger`（auto/scroll/click/hover）、`gravity`（重力强度）、`highlightWords`（高亮词）、`wireframes`（调试线框）

**适用场景：** 游戏结束动画、删除确认效果、答案揭晓、庆祝动效、页面转场

---

## 卡片交互类

### CardSwap

3D 堆叠卡片定期轮换动画。最前卡片下沉，后面卡片前移，视觉上像洗牌一样。

```tsx
import CardSwap, { Card } from '@/components/CardSwap';

<CardSwap width={500} height={400} cardDistance={60} delay={5000} easing="elastic">
  <Card>卡片 1</Card>
  <Card>卡片 2</Card>
  <Card>卡片 3</Card>
</CardSwap>
```

**核心参数：** `cardDistance`/`verticalDistance`（堆叠偏移）、`delay`（轮换间隔）、`skewAmount`（透视倾斜）、`easing`（elastic/linear）、`pauseOnHover`

**适用场景：** 产品展示轮播、团队成员卡、特性亮点轮播、作品集、客户证言

---

### BorderGlow

发光边框效果，光晕跟随鼠标移动产生扫光，或 `animated=true` 时自动扫过边框。

```tsx
import BorderGlow from '@/components/BorderGlow';

<BorderGlow glowColor="40 80 80" backgroundColor="#120F17" borderRadius={28} animated={false}>
  <div>卡片内容</div>
</BorderGlow>
```

**核心参数：** `glowColor`（HSL 格式）、`glowRadius`/`glowIntensity`（光晕范围/强度）、`animated`（自动扫光）、`colors`（渐变光斑色）、`edgeSensitivity`（边缘灵敏度）

**适用场景：** 定价卡片、特色功能卡、登录弹窗、精选项目展示、CTA 容器

---

### SpotlightCard

鼠标在卡片上移动时产生手电筒聚光灯效果，光斑跟随鼠标位置。

```tsx
import SpotlightCard from '@/components/SpotlightCard';

<SpotlightCard spotlightColor="rgba(255, 255, 255, 0.25)">
  <div>卡片内容</div>
</SpotlightCard>
```

**核心参数：** `spotlightColor`（光斑颜色 RGBA）

**适用场景：** 深色主题产品卡、图片展示、特性介绍卡、导航下拉、数据表格行 hover

---

## 3D / WebGL 类

### CircularGallery

OGL（WebGL）驱动的 3D 环形画廊。支持鼠标/触摸拖拽横向滚动，图片呈弧形排列，有波浪顶点动画。

```tsx
import CircularGallery from '@/components/CircularGallery';

<CircularGallery
  items={[{ image: '/img1.jpg', text: '图片1' }]}
  bend={3}
  textColor="#ffffff"
  borderRadius={0.05}
  scrollSpeed={2}
/>
```

**核心参数：** `items`（图片+文字配置）、`bend`（弯曲程度，正=上弯负=下弯）、`borderRadius`（图片圆角）、`scrollSpeed`/`scrollEase`（滚动手感）、`font`/`fontUrl`（字体）

**适用场景：** Hero 作品集、摄影集、客户 Logo 墙、音乐专辑封面、旅游目的地展示

---

### Antigravity

Three.js 反重力粒子效果。粒子围绕鼠标形成环形轨道运动，类似磁铁吸引/排斥。

```tsx
import Antigravity from '@/components/Antigravity';

<Antigravity
  count={300}
  magnetRadius={10}
  ringRadius={10}
  color="#FF9FFC"
  particleShape="capsule"
  autoAnimate={false}
/>
```

**核心参数：** `count`（粒子数）、`magnetRadius`/`ringRadius`（磁力范围/轨道半径）、`color`（粒子颜色）、`particleShape`（capsule/sphere/box/tetrahedron）、`autoAnimate`（无鼠标时自动）、`lerpSpeed`（跟手速度）

**适用场景：** Hero 背景、Loading 页面、联系表单背景、数据加载、游戏化互动

---

### ShapeBlur

Three.js ShaderMaterial 渲染 SDF 形状的 WebGL 模糊层，鼠标位置实时计算形状变化。

```tsx
import ShapeBlur from '@/components/ShapeBlur';

<ShapeBlur
  variation={0}
  shapeSize={1.2}
  roundness={0.4}
  circleSize={0.3}
  circleEdge={0.5}
/>
```

**核心参数：** `variation`（0=圆角矩形描边，1=圆形填充，2=圆形描边，3=三角形）、`shapeSize`/`roundness`/`borderSize`（形状参数）、`circleSize`/`circleEdge`（圆形遮罩参数）

**适用场景：** 背景装饰层、卡片遮罩、分区隔断、Loading 状态、页面转场元素

---

## 氛围叠加类

### Noise

动态噪点/颗粒覆层。模拟胶片颗粒感，每帧随机生成颗粒，可调刷新间隔和透明度。

```tsx
import Noise from '@/components/Noise';

<Noise patternSize={250} patternRefreshInterval={2} patternAlpha={15} />
```

**核心参数：** `patternSize`（内部 canvas 尺寸）、`patternRefreshInterval`（刷新间隔，越大越省性能）、`patternAlpha`（颗粒透明度 0-255）

**适用场景：** 胶片风格网站、摄影集背景、视频页老电影质感、艺术作品集、暗色 Hero 区

---

## 场景组合推荐

| 页面区域 | 推荐组合 |
|---------|---------|
| **Hero 全屏** | `CircularGallery` + `Antigravity` + `TextPressure` |
| **产品卡片区** | `BorderGlow` + `SpotlightCard` + `CardSwap` |
| **文字标题区** | `Shuffle` + `BlurText` + `FuzzyText` |
| **深色科技区** | `GlitchText` + `Noise` + `ShapeBlur` |
| **游戏化互动** | `FallingText` + `DecryptedText` + `Antigravity` |
| **艺术/摄影集** | `CircularGallery` + `Noise` + `SpotlightCard` |
| **Loading/等待** | `Antigravity` + `ASCIIText` + `FuzzyText` |
| **品牌/Logo 区** | `TextPressure` + `ShinyText` + `ASCIIText` |
| **定价/方案卡** | `BorderGlow` + `ShinyText` + `TrueFocus` |
| **入口转场** | `Shuffle` + `BlurText` + `FallingText` |

---

## 依赖说明

| 组件 | 主要依赖 |
|------|---------|
| `CardSwap` | `gsap` |
| `RotatingText` | `motion` |
| `ScrambledText` | `gsap` (SplitText, ScrambleTextPlugin) |
| `Shuffle` | `gsap` (ScrollTrigger, SplitText) |
| `CircularGallery` | `ogl` |
| `Antigravity` | `@react-three/fiber`, `three` |
| `ShapeBlur` | `three` |
| `FallingText` | `matter-js` |
| `BlurText` | `motion` |
| 其余组件 | 无外部依赖（纯 CSS / Canvas / 原生 React） |