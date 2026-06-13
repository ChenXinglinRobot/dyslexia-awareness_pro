# Noise

动态噪点/颗粒覆盖层。模拟胶片颗粒感，每帧随机生成颗粒，可调刷新间隔和透明度。

## 使用方法

```tsx
import Noise from '@/components/Noise';

<Noise
  patternSize={250}
  patternScaleX={1}
  patternScaleY={1}
  patternRefreshInterval={2}
  patternAlpha={15}
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `patternSize` | `number` | `250` | 噪点图案尺寸（内部 canvas 大小） |
| `patternScaleX` | `number` | `1` | 水平缩放 |
| `patternScaleY` | `number` | `1` | 垂直缩放 |
| `patternRefreshInterval` | `number` | `2` | 每隔 N 帧刷新一次颗粒（越大刷新越慢，越省性能） |
| `patternAlpha` | `number` | `15` | 颗粒透明度（0-255） |

## 妙用场景

- **胶片风格网站**：给整个页面叠加细微颗粒感，营造复古胶片氛围
- **照片展示区背景**：照片墙 behind the scenes 的氛围加成
- **视频播放页**：视频区域叠加噪点，模拟老电影质感
- **艺术/摄影作品集**：增强艺术气息
- **暗色调 Hero 区**：深色背景上的噪点层增加质感深度