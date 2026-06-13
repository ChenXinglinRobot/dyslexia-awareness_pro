# FallingText

物理坠落文字。使用 Matter.js 物理引擎，文字拆分为单词后获得重力效果自然坠落，支持鼠标拖拽交互。

## 使用方法

```tsx
import FallingText from '@/components/FallingText';

<FallingText
  text="Falling text physics effect"
  highlightWords={['physics']}
  highlightClass="highlighted"
  trigger="auto"
  backgroundColor="transparent"
  wireframes={false}
  gravity={1}
  mouseConstraintStiffness={0.2}
  fontSize="1rem"
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | `''` | 显示的文字 |
| `highlightWords` | `string[]` | `[]` | 高亮单词（数组前缀匹配） |
| `highlightClass` | `string` | `'highlighted'` | 高亮词添加的类名 |
| `trigger` | `'auto' \| 'scroll' \| 'click' \| 'hover'` | `'auto'` | 触发方式 |
| `backgroundColor` | `string` | `'transparent'` | 物理引擎 canvas 背景 |
| `wireframes` | `boolean` | `false` | Matter.js 是否显示线框（调试用） |
| `gravity` | `number` | `1` | 重力强度 |
| `mouseConstraintStiffness` | `number` | `0.2` | 鼠标拽住文字的弹簧刚度 |
| `fontSize` | `string` | `'1rem'` | 文字字号 |

## 妙用场景

- **游戏结束动画**：答题结束答案坠落
- **互动展示区**：用户点击后文字散落，趣味性强
- **数据删除效果**：确认删除时文字坠落表示"没了"
- **庆祝动效**：正确答案揭晓时文字坠落
- **页面转场**：section 切换时文字自然下落过渡