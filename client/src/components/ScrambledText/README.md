# ScrambledText

GSAP ScrambleText 插件驱动。鼠标靠近文字时触发打乱→还原的动画效果，距离越近打乱程度越大。

## 使用方法

```tsx
import ScrambledText from '@/components/ScrambledText';

<ScrambledText
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:"
  className=""
  style={{}}
>
  Hover me
</ScrambledText>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `radius` | `number` | `100` | 触发范围（鼠标距离文字多近时开始生效） |
| `duration` | `number` | `1.2` | 单个字符还原动画时长 |
| `speed` | `number` | `0.5` | 打乱字符的替换速度 |
| `scrambleChars` | `string` | `'.:'` | 打乱时显示的字符集 |
| `className` | `string` | `''` | 根元素类名 |
| `style` | `CSSProperties` | `{}` | 根元素样式 |
| `children` | `ReactNode` | — | 文字内容（需放在 `<p>` 标签内） |

## 妙用场景

- **密码输入框提示**：加密相关功能的描述文字
- **代码编辑器界面**：程序员/开发者工具界面
- **神秘主题 CTA**：hover 时文字"解密"的体验感
- **游戏网站**：答案/线索揭示效果
- **隐藏信息展示**：需要交互才完整显示的信息