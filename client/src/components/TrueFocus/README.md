# TrueFocus

焦点文字效果。文字逐词/逐字符模糊，自动循环或 hover 时将当前词清晰化并配上发光方框。

## 使用方法

```tsx
import TrueFocus from '@/components/TrueFocus';

<TrueFocus
  sentence="True Focus Effect"
  separator=" "
  manualMode={false}
  blurAmount={5}
  borderColor="green"
  glowColor="rgba(0, 255, 0, 0.6)"
  animationDuration={0.5}
  pauseBetweenAnimations={1}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sentence` | `string` | `'True Focus'` | 显示的文字 |
| `separator` | `string` | `' '` | 分隔符 |
| `manualMode` | `boolean` | `false` | `true` 时需 hover 才触发，`false` 时自动循环 |
| `blurAmount` | `number` | `5` | 非焦点词的模糊程度（px） |
| `borderColor` | `string` | `'green'` | 焦点框颜色 |
| `glowColor` | `string` | `'rgba(0, 255, 0, 0.6)'` | 焦点框发光颜色 |
| `animationDuration` | `number` | `0.5` | 切换时长（秒） |
| `pauseBetweenAnimations` | `number` | `1` | 动画间停顿（秒） |

## 妙用场景

- **导航当前项高亮**：当前页面名称高亮，其他项模糊
- **表单标签**：当前激活的标签清晰，其他标签视觉降权
- **标签选择器**：多标签中当前选中的突出显示
- **功能亮点展示**：slogan 逐词高亮，吸引阅读注意力
- **面包屑导航**：当前路径清晰，上级路径模糊