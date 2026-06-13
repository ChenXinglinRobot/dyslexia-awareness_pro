# CardSwap

3D 堆叠卡片轮换动画。Cards 以阶梯状堆叠，定期自动交换位置（最前面的卡片下沉，后面卡片前移），视觉上像洗牌一样。

## 使用方法

```tsx
import CardSwap, { Card } from '@/components/CardSwap';

<CardSwap
  width={500}
  height={400}
  cardDistance={60}
  verticalDistance={70}
  delay={5000}
  pauseOnHover={false}
  skewAmount={6}
  easing="elastic"
  onCardClick={(idx) => console.log('clicked', idx)}
>
  <Card>卡片 1</Card>
  <Card>卡片 2</Card>
  <Card>卡片 3</Card>
</CardSwap>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number \| string` | `500` | 容器宽度 |
| `height` | `number \| string` | `400` | 容器高度 |
| `cardDistance` | `number` | `60` | 水平间距（每张卡片向右偏移的距离） |
| `verticalDistance` | `number` | `70` | 垂直间距（每张卡片向上偏移的距离） |
| `delay` | `number` | `5000` | 轮换间隔时间（毫秒） |
| `pauseOnHover` | `boolean` | `false` | 鼠标悬停时暂停动画 |
| `skewAmount` | `number` | `6` | Y 轴 skew 角度，制造透视倾斜感 |
| `easing` | `'linear' \| 'elastic'` | `'elastic'` | 缓动函数；`elastic` 更弹跳有活力，`linear` 更干净利落 |
| `onCardClick` | `(idx: number) => void` | — | 点击卡片时回调，传入卡片索引 |
| `children` | `ReactNode` | — | 必须传入 ≥2 个 `<Card>` 子元素 |

## 妙用场景

- **产品展示轮播**：多张产品卡片以 3D 堆叠呈现，定期自动切换，适合首页 hero 区
- **团队成员展示**：团队成员卡片依次浮现，强调团队多样性
- **特性亮点轮播**：3 个核心卖点用卡片依次展示，配合延迟形成视觉焦点转移
- **作品集展示**：作品缩略图以堆叠卡片呈现，轮流上升到最前
- **客户证言轮播**：用户推荐语卡片，弹性的 elastic 动画强化情感氛围