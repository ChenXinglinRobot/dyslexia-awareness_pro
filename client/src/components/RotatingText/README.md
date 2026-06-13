# RotatingText

文字轮换动画。使用 Motion 驱动，文字逐字/逐词地滚动进入，有弹簧物理感。

## 使用方法

```tsx
import RotatingText from '@/components/RotatingText';

// 通过 ref 控制
const ref = useRef<RotatingTextRef>(null);
ref.current?.next();      // 跳到下一个
ref.current?.previous(); // 跳到上一个
ref.current?.jumpTo(2);   // 跳到指定索引
ref.current?.reset();    // 重置到第一个

<RotatingText
  texts={['设计师', '开发者', '创造者']}
  rotationInterval={2000}
  staggerDuration={0}
  staggerFrom="first"
  loop={true}
  auto={true}
  splitBy="characters"
  onNext={(idx) => console.log('now at', idx)}
  animatePresenceMode="wait"
  animatePresenceInitial={false}
  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
  initial={{ y: '100%', opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: '-120%', opacity: 0 }}
  mainClassName=""
  splitLevelClassName=""
  elementLevelClassName=""
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `texts` | `string[]` | — | 轮换文字数组 |
| `rotationInterval` | `number` | `2000` | 自动轮换间隔（毫秒） |
| `staggerDuration` | `number` | `0` | 每个字/词的延迟秒数 |
| `staggerFrom` | `'first' \| 'last' \| 'center' \| 'random' \| number` | `'first'` | stagger 起始方向 |
| `loop` | `boolean` | `true` | 是否循环 |
| `auto` | `boolean` | `true` | 是否自动轮换 |
| `splitBy` | `'characters' \| 'words' \| 'lines' \| string` | `'characters'` | 分割方式 |
| `onNext` | `(idx: number) => void` | — | 切换时回调 |
| `animatePresenceMode` | `'sync' \| 'wait'` | `'wait'` | AnimatePresence 模式 |
| `animatePresenceInitial` | `boolean` | `false` | AnimatePresence 初始状态 |
| `transition` | `Transition` | spring 动画 | 动画过渡配置 |
| `initial` | `Target \| VariantLabels` | `{ y: '100%', opacity: 0 }` | 初始状态 |
| `animate` | `TargetAndTransition` | `{ y: 0, opacity: 1 }` | 进入状态 |
| `exit` | `TargetAndTransition` | `{ y: '-120%', opacity: 0 }` | 退出状态 |

## 妙用场景

- **Hero 标题**：副标题轮换，如 "我们做 X / 我们做 Y / 我们做 Z"
- **产品描述轮换**：同一区域展示不同产品特点
- **职业标签**：个人网站上的身份标签轮换
- **动态标语**：公司 Slogan 轮替展示
- **新闻标题轮播**：媒体网站头条轮换