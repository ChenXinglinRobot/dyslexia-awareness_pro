# BlurText

模糊展开文字。进入可视区时，文字从模糊到清晰逐词/逐字母展开，使用 Motion 实现。

## 使用方法

```tsx
import BlurText from '@/components/BlurText';

<BlurText
  text="Blur text reveal animation"
  delay={200}
  animateBy="words"
  direction="top"
  threshold={0.1}
  rootMargin="0px"
  animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
  animationTo={[
    { filter: 'blur(5px)', opacity: 0.5, y: 5 },
    { filter: 'blur(0px)', opacity: 1, y: 0 }
  ]}
  easing={(t) => t}
  onAnimationComplete={() => {}}
  stepDuration={0.35}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | `''` | 显示文字 |
| `delay` | `number` | `200` | 每个词/字母的延迟（毫秒） |
| `animateBy` | `'words' \| 'letters'` | `'words'` | 分割方式 |
| `direction` | `'top' \| 'bottom'` | `'top'` | 展开方向 |
| `threshold` | `number` | `0.1` | IntersectionObserver 阈值 |
| `rootMargin` | `string` | `'0px'` | 观察边界偏移 |
| `animationFrom` | `Record<string, string \| number>` | 见下文 | 初始状态（默认从顶部模糊进入） |
| `animationTo` | `Array<Record<string, string \| number>>` | 见下文 | 关键帧数组 |
| `easing` | `(t: number) => number` | `(t) => t` | 缓动函数 |
| `onAnimationComplete` | `() => void` | — | 全部动画完成回调 |
| `stepDuration` | `number` | `0.35` | 每步时长（秒） |

**默认 animationFrom（direction=top）：**
```ts
{ filter: 'blur(10px)', opacity: 0, y: -50 }
```
**默认 animationTo：**
```ts
[
  { filter: 'blur(5px)', opacity: 0.5, y: 5 },
  { filter: 'blur(0px)', opacity: 1, y: 0 }
]
```

## 妙用场景

- **Section 入口动画**：每个 section 的标题/正文逐词模糊展开
- **内容加载后展示**：数据加载完成后文字依次清晰化
- **页面滚动叙事**：配合滚动叙事的内容展示
- **列表项动画**：列表每项依次模糊展开
- **对比展示**：Before/After 切换后的文字展示动画