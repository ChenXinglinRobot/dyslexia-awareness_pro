# TextPressure

可变字体（Variable Font）压力效果。鼠标位置实时改变每个字符的字宽（wdth）、字重（wght）、斜体（ital）等轴向值，产生类似挤压变形的流体感。

> 注意：需要使用支持可变轴向的字体（如 Compressa VF）。默认字体为 [Compressa PRO GX](https://www.fontspring.com/fonts/exLj?text=Compressa+PRO+GX)。

## 使用方法

```tsx
import TextPressure from '@/components/TextPressure';

<TextPressure
  text="Compressa"
  fontFamily="Compressa VF"
  fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
  width={true}
  weight={true}
  italic={true}
  alpha={false}
  flex={true}
  stroke={false}
  scale={false}
  textColor="#FFFFFF"
  strokeColor="#FF0000"
  minFontSize={24}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | `'Compressa'` | 显示文字 |
| `fontFamily` | `string` | `'Compressa VF'` | 字体名 |
| `fontUrl` | `string` | Compressa PRO GX woff2 | 字体文件 URL |
| `width` | `boolean` | `true` | 启用字宽轴（wdth: 5-200） |
| `weight` | `boolean` | `true` | 启用字重轴（wght: 100-900） |
| `italic` | `boolean` | `true` | 启用斜体轴（ital: 0-1） |
| `alpha` | `boolean` | `false` | 启用透明度轴 |
| `flex` | `boolean` | `true` | flex 布局 |
| `stroke` | `boolean` | `false` | 描边模式（描边颜色用 strokeColor） |
| `scale` | `boolean` | `false` | Y 轴缩放适配容器高度 |
| `textColor` | `string` | `'#FFFFFF'` | 文字颜色 |
| `strokeColor` | `string` | `'#FF0000'` | 描边颜色 |
| `minFontSize` | `number` | `24` | 最小字号 |

## 妙用场景

- **品牌标题**：独特字体形变效果，强化品牌记忆
- **Hero 超大标题**：鼠标在标题区域移动时产生流体挤压感
- **互动文字标签**：用户操作时文字产生挤压反馈
- **动态 Logo**：配合鼠标位置产生动态变化的 Logo 效果
- **创意数字展示**：数字形变效果，有艺术感