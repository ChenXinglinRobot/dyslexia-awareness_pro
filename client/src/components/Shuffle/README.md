# Shuffle

GSAP ScrollTrigger 驱动的文字洗牌动画。页面滚动到可视区时，字符被打乱再还原，支持多种方向和颜色变化。

## 使用方法

```tsx
import Shuffle from '@/components/Shuffle';

<Shuffle
  text="Shuffle Animation"
  shuffleDirection="right"
  duration={0.35}
  maxDelay={0}
  ease="power3.out"
  threshold={0.1}
  rootMargin="-100px"
  tag="h2"
  textAlign="center"
  onShuffleComplete={() => {}}
  shuffleTimes={1}
  animationMode="evenodd"
  loop={false}
  loopDelay={0}
  stagger={0.03}
  scrambleCharset=""
  colorFrom=""
  colorTo=""
  triggerOnce={true}
  respectReducedMotion={true}
  triggerOnHover={true}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | 显示文字 |
| `shuffleDirection` | `'left' \| 'right' \| 'up' \| 'down'` | `'right'` | 打乱方向 |
| `duration` | `number` | `0.35` | 单字符动画时长（秒） |
| `maxDelay` | `number` | `0` | 最大随机延迟（秒） |
| `ease` | `string \| (t: number) => number` | `'power3.out'` | 缓动函数 |
| `threshold` | `number` | `0.1` | 触发阈值（0-1，越大越早触发） |
| `rootMargin` | `string` | `'-100px'` | 触发边界偏移 |
| `tag` | `'h1' \| 'h2' \| ... \| 'span'` | `'p'` | 渲染的 HTML 标签 |
| `textAlign` | `CSSProperties['textAlign']` | `'center'` | 文字对齐 |
| `onShuffleComplete` | `() => void` | — | 动画完成回调 |
| `shuffleTimes` | `number` | `1` | 打乱轮次（数字越大打乱越久） |
| `animationMode` | `'random' \| 'evenodd'` | `'evenodd'` | evenodd 交替动画更自然 |
| `loop` | `boolean` | `false` | 是否循环 |
| `loopDelay` | `number` | `0` | 循环停顿（秒） |
| `stagger` | `number` | `0.03` | 字符间隔（秒） |
| `scrambleCharset` | `string` | `''` | 打乱字符集（空则不用打乱） |
| `colorFrom` | `string` | — | 动画起始颜色 |
| `colorTo` | `string` | — | 动画结束颜色 |
| `triggerOnce` | `boolean` | `true` | 是否只触发一次 |
| `respectReducedMotion` | `boolean` | `true` | 尊重系统减少动画偏好 |
| `triggerOnHover` | `boolean` | `true` | hover 时再次触发动画 |

## 妙用场景

- **页面入口动画**：首屏文字滚动进入时打乱还原
- **Section 标题动画**：每个 section 标题依次动画
- **产品名洗牌**：产品名称打乱还原，强调记忆点
- **数字滚动效果**：统计数据滚动时数字洗牌
- **多语言网站**：不同语言切换时文字打乱还原