# ShapeBlur

Three.js shader 效果层。渲染一个基于鼠标位置实时计算 SDF 形状的 WebGL 模糊层，支持多种形状变化。

## 使用方法

```tsx
import ShapeBlur from '@/components/ShapeBlur';

<ShapeBlur
  className="some-wrapper"
  variation={0}
  pixelRatioProp={2}
  shapeSize={1.2}
  roundness={0.4}
  borderSize={0.05}
  circleSize={0.3}
  circleEdge={0.5}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | `''` | 外层 div 类名 |
| `variation` | `number` | `0` | 形状变体：0=圆角矩形描边，1=圆形填充，2=圆形描边，3=三角形 |
| `pixelRatioProp` | `number` | `2` | 像素比 |
| `shapeSize` | `number` | `1.2` | 形状整体大小 |
| `roundness` | `number` | `0.4` | 圆角矩形圆角程度 |
| `borderSize` | `number` | `0.05` | 描边宽度（variation 0/2 时生效） |
| `circleSize` | `number` | `0.3` | 圆形遮罩大小 |
| `circleEdge` | `number` | `0.5` | 圆形边缘软硬程度（越大越柔和） |

## 妙用场景

- **背景装饰层**：叠加在 section 背景上，产生动态模糊形状
- **卡片遮罩**：配合 BorderGlow/SpotlightCard，作为装饰性背景层
- **分区隔断**：用模糊形状作为视觉分区元素
- **Loading 状态**：variation=1 的圆形配合动画，有科幻感的加载指示
- **页面转场元素**：全屏的 ShapeBlur 遮罩作为转场动效