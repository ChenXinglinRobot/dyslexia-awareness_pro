# CircularGallery

3D 环形画廊。使用 OGL（WebGL）渲染，支持鼠标/触摸拖拽横向滚动，图片呈弧形排列，有波浪顶点动画。

## 使用方法

```tsx
import CircularGallery from '@/components/CircularGallery';

<CircularGallery
  items={[
    { image: '/img1.jpg', text: '图片1' },
    { image: '/img2.jpg', text: '图片2' },
  ]}
  bend={3}
  textColor="#ffffff"
  borderRadius={0.05}
  font="bold 30px Figtree"
  fontUrl="https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap"
  scrollSpeed={2}
  scrollEase={0.05}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `{ image: string; text: string }[]` | 内置 12 张示例图片 | 图片和文字配置 |
| `bend` | `number` | `3` | 弯曲程度，正值向上弯，负值向下弯，0 为直线 |
| `textColor` | `string` | `'#ffffff'` | 图片下方文字颜色 |
| `borderRadius` | `number` | `0.05` | 图片圆角 |
| `font` | `string` | `'bold 30px Figtree'` | 文字字体配置 |
| `fontUrl` | `string` | Google Fonts Figtree | 字体加载 URL |
| `scrollSpeed` | `number` | `2` | 滚动速度倍率 |
| `scrollEase` | `number` | `0.05` | 滚动惯性（越小越跟手） |

## 妙用场景

- **首页 Hero 区域**：横向滚动的产品/作品集画廊，营造沉浸感
- **摄影作品集**：弯曲的画廊非常适合展示摄影作品
- **客户 Logo 墙**：用弯曲画廊展示合作品牌
- **音乐专辑封面展示**：唱片/音乐类网站的作品浏览
- **旅游目的地展示**：弧形排列的旅行照片，有深度感