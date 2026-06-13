# FuzzyText

模糊毛边文字。使用 Canvas 逐行绘制文字，每行随机横向偏移产生模糊毛边效果，支持 hover 增强和 glitch 模式。

## 使用方法

```tsx
import FuzzyText from '@/components/FuzzyText';

<FuzzyText
  fontSize="clamp(2rem, 8vw, 8rem)"
  fontWeight={900}
  fontFamily="inherit"
  color="#fff"
  enableHover={true}
  baseIntensity={0.18}
  hoverIntensity={0.5}
  fuzzRange={30}
  fps={60}
  direction="horizontal"
  transitionDuration={0}
  clickEffect={false}
  glitchMode={false}
  glitchInterval={2000}
  glitchDuration={200}
  gradient={null}
  letterSpacing={0}
  className=""
>
  FUZZY TEXT
</FuzzyText>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fontSize` | `number \| string` | `'clamp(2rem, 8vw, 8rem)'` | 字号 |
| `fontWeight` | `string \| number` | `900` | 字重 |
| `fontFamily` | `string` | `'inherit'` | 字体 |
| `color` | `string` | `'#fff'` | 文字颜色 |
| `enableHover` | `boolean` | `true` | 鼠标 hover 时增强模糊效果 |
| `baseIntensity` | `number` | `0.18` | 基础模糊强度（0-1） |
| `hoverIntensity` | `number` | `0.5` | hover 时的模糊强度 |
| `fuzzRange` | `number` | `30` | 横向偏移范围（像素） |
| `fps` | `number` | `60` | 动画帧率 |
| `direction` | `'horizontal' \| 'vertical' \| 'both'` | `'horizontal'` | 模糊方向 |
| `transitionDuration` | `number` | `0` | 强度过渡时长（毫秒） |
| `clickEffect` | `boolean` | `false` | 点击时增强模糊 |
| `glitchMode` | `boolean` | `false` | 开启定期故障模式 |
| `glitchInterval` | `number` | `2000` | 故障间隔（毫秒） |
| `glitchDuration` | `number` | `200` | 故障持续时长（毫秒） |
| `gradient` | `string[] \| null` | `null` | 渐变色数组（≥2 色） |
| `letterSpacing` | `number` | `0` | 字间距调整 |

## 妙用场景

- **Hero 大标题**：超大字号毛边效果文字，视觉冲击力强
- **故障风格网站**：glitchMode 开启定期故障
- **科技/游戏标题**：hover 时模糊增强，互动感强
- **渐变色标题**：gradient 多色渐变标题
- **文字蒙太奇**：多行文字叠加毛边效果