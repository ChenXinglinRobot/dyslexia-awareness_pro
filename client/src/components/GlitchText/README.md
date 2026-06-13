# GlitchText

故障风（Glitch）文字效果。纯 CSS 驱动，通过伪元素叠加产生红/青双色偏移的故障视觉。

## 使用方法

```tsx
import GlitchText from '@/components/GlitchText';

<GlitchText
  speed={0.5}
  enableShadows={true}
  enableOnHover={false}
  className=""
>
  GLITCH
</GlitchText>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `speed` | `number` | `0.5` | 动画速度（数值越大越快） |
| `enableShadows` | `boolean` | `true` | 是否开启红/青双色阴影故障效果 |
| `enableOnHover` | `boolean` | `false` | 是否仅在 hover 时触发动画 |
| `className` | `string` | `''` | 自定义类名 |
| `children` | `string` | — | 文字内容（必须是字符串） |

## 妙用场景

- **科技/赛博朋克主题网站**：标题文字故障效果，强化科技氛围
- **Error 页面**：404/500 错误页面的文字效果
- **游戏网站标题**：游戏类网站的 hero 标题
- **"即将上线"页面**：Coming soon 页面，故障风传达神秘感
- **社交媒体相关**：加密/解密主题的功能展示