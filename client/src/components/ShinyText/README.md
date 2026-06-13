# ShinyText

光泽扫过文字效果。渐变背景配合 CSS background-clip，光泽（shine）从左到右或从右到左循环扫过。

## 使用方法

```tsx
import ShinyText from '@/components/ShinyText';

<ShinyText
  text="Shiny Text Effect"
  disabled={false}
  speed={2}
  color="#b5b5b5"
  shineColor="#ffffff"
  spread={120}
  yoyo={false}
  pauseOnHover={false}
  direction="left"
  delay={0}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | 显示文字 |
| `disabled` | `boolean` | `false` | 禁用动画 |
| `speed` | `number` | `2` | 动画速度（秒为一个完整周期） |
| `color` | `string` | `'#b5b5b5'` | 基础文字颜色 |
| `shineColor` | `string` | `'#ffffff'` | 光泽颜色 |
| `spread` | `number` | `120` | 渐变展开角度（度数） |
| `yoyo` | `boolean` | `false` | 来回往复模式 |
| `pauseOnHover` | `boolean` | `false` | hover 时暂停 |
| `direction` | `'left' \| 'right'` | `'left'` | 光泽扫过方向 |
| `delay` | `number` | `0` | 动画开始延迟（秒） |

## 妙用场景

- **品牌名称展示**：Logo 或品牌名带光泽扫过
- **CTA 按钮文字**：主按钮文字扫光效果提升点击欲望
- **标签/徽章文字**：状态标签光泽效果
- **价格数字**：价格数字扫光突出价格
- **特色功能标题**：功能标题扫光动画