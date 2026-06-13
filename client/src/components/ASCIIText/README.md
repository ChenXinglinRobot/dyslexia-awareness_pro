# ASCIIText

ASCII 艺术文字效果。文字渲染为 canvas 纹理，再以 ASCII 字符覆盖层显示，背景带 hue-rotate 色相旋转。

## 使用方法

```tsx
import ASCIIText from '@/components/ASCIIText';

<ASCIIText
  text="David!"
  asciiFontSize={8}
  textFontSize={200}
  textColor="#fdf9f3"
  planeBaseHeight={8}
  enableWaves={true}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | `'David!'` | 显示的主文字 |
| `asciiFontSize` | `number` | `8` | ASCII 字符的像素大小（越小越密集） |
| `textFontSize` | `number` | `200` | 底层文字大小 |
| `textColor` | `string` | `'#fdf9f3'` | 底层文字颜色 |
| `planeBaseHeight` | `number` | `8` | 3D 平面基础高度（影响文字透视大小） |
| `enableWaves` | `boolean` | `true` | 是否开启波浪顶点动画 |

## 妙用场景

- **首页超大标题**：震撼力的 ASCII 艺术标题
- **Loading 页面文字**：Loading 状态的文字展示
- **开发者工具网站**：程序员风格的醒目标题
- **复古终端主题**：终端风网站的标题
- **个人网站封面**：个人品牌展示的视觉冲击