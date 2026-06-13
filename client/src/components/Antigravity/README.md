# Antigravity

Three.js 反重力粒子效果。粒子围绕鼠标形成环形轨道运动，产生类似磁铁吸引/排斥的视觉效果。

## 使用方法

```tsx
import Antigravity from '@/components/Antigravity';

<Antigravity
  count={300}
  magnetRadius={10}
  ringRadius={10}
  waveSpeed={0.4}
  waveAmplitude={1}
  particleSize={2}
  lerpSpeed={0.1}
  color="#FF9FFC"
  autoAnimate={false}
  particleVariance={1}
  rotationSpeed={0}
  depthFactor={1}
  pulseSpeed={3}
  particleShape="capsule"
  fieldStrength={10}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `count` | `number` | `300` | 粒子数量 |
| `magnetRadius` | `number` | `10` | 磁力吸引范围半径 |
| `ringRadius` | `number` | `10` | 粒子环绕轨道半径 |
| `waveSpeed` | `number` | `0.4` | 波浪速度 |
| `waveAmplitude` | `number` | `1` | 波浪振幅 |
| `particleSize` | `number` | `2` | 粒子尺寸 |
| `lerpSpeed` | `number` | `0.1` | 粒子跟随鼠标的插值速度（越小越跟手） |
| `color` | `string` | `'#FF9FFC'` | 粒子颜色 |
| `autoAnimate` | `boolean` | `false` | 无鼠标操作时自动动画 |
| `particleVariance` | `number` | `1` | 粒子大小变化幅度 |
| `rotationSpeed` | `number` | `0` | 全局旋转速度 |
| `depthFactor` | `number` | `1` | Z 轴深度因子 |
| `pulseSpeed` | `number` | `3` | 脉冲速度 |
| `particleShape` | `'capsule' \| 'sphere' \| 'box' \| 'tetrahedron'` | `'capsule'` | 粒子形状 |

## 妙用场景

- **Hero 背景**：全屏的粒子效果，配合主标题文字
- **联系表单区域背景**：鼠标与粒子互动，增加趣味性
- **Loading 页面**：大量粒子聚散动画作为加载等待体验
- **数据可视化**：代替传统的 loading spinner，展示数据正在加载
- **游戏化元素**：参与感强的交互，适合教育/儿童类产品