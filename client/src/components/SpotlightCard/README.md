# SpotlightCard

聚光灯卡片。鼠标在卡片上移动时，光斑会跟随鼠标位置，产生类似手电筒照在表面的效果。

## 使用方法

```tsx
import SpotlightCard from '@/components/SpotlightCard';

<SpotlightCard
  className="my-card"
  spotlightColor="rgba(255, 255, 255, 0.25)"
>
  <div>卡片内容</div>
</SpotlightCard>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | `''` | 自定义类名 |
| `spotlightColor` | `rgba(...)` | `'rgba(255, 255, 255, 0.25)'` | 聚光灯颜色（RGBA 格式） |
| `children` | `ReactNode` | — | 卡片内容 |

## 妙用场景

- **深色主题产品卡片**：鼠标划过时产生聚焦感，引导用户注意力
- **图片展示卡**：在图片上移动时产生类似放大镜的局部高亮效果
- **特性介绍卡**：配合图标和文字，hover 时高亮区域跟随鼠标
- **导航下拉项**：下拉菜单选项 hover 时有光斑跟随
- **表格行 hover**：数据表格行 hover 时产生 spotlight 效果