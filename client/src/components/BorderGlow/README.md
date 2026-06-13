# BorderGlow

发光边框效果。边框的光晕跟随鼠标移动产生动态扫光，或者 `animated` 为 true 时自动扫过整个边框区域。

## 使用方法

```tsx
import BorderGlow from '@/components/BorderGlow';

<BorderGlow
  glowColor="40 80 80"
  backgroundColor="#120F17"
  borderRadius={28}
  glowRadius={40}
  glowIntensity={1.0}
  coneSpread={25}
  animated={false}
  colors={['#c084fc', '#f472b6', '#38bdf8']}
  fillOpacity={0.5}
  edgeSensitivity={30}
>
  <div>卡片内容</div>
</BorderGlow>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `glowColor` | `string` | `'40 80 80'` | HSL 格式的光晕基础色 |
| `backgroundColor` | `string` | `'#120F17'` | 卡片背景色 |
| `borderRadius` | `number` | `28` | 圆角像素值 |
| `glowRadius` | `number` | `40` | 光晕向外延伸的范围 |
| `glowIntensity` | `number` | `1.0` | 光晕强度倍率 |
| `coneSpread` | `number` | `25` | 光锥扩散角度 |
| `animated` | `boolean` | `false` | 开启自动扫光动画 |
| `colors` | `string[]` | `['#c084fc','#f472b6','#38bdf8']` | 渐变光斑颜色数组 |
| `fillOpacity` | `number` | `0.5` | 背景填充不透明度 |
| `edgeSensitivity` | `number` | `30` | 边缘灵敏度（越高越靠近边缘时光晕越强） |
| `className` | `string` | `''` | 自定义类名 |

## 妙用场景

- **定价卡片**：Pricing 表的每个价格方案，hover 时边框有高级感的扫光
- **特色功能卡片**：功能介绍卡 hover 时呈现科技感光效
- **登录弹窗**：BorderGlow 包裹的登录框，让平淡的表单更有品质感
- **精选项目展示**：Portfolio 网格中每个项目的悬浮态
- **CTA 按钮容器**：包裹主按钮，hover 时边框光效引导点击