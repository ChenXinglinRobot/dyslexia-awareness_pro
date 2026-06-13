# DecryptedText

解密文字动画。文字以乱码字符开始，逐字/从中心/从两端还原为真实文字，支持 hover / click / inView 触发。

## 使用方法

```tsx
import DecryptedText from '@/components/DecryptedText';

<DecryptedText
  text="Secret Message"
  speed={50}
  maxIterations={10}
  sequential={false}
  revealDirection="start"
  useOriginalCharsOnly={false}
  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
  animateOn="hover"
  clickMode="once"
  className="decrypted-char"
  parentClassName=""
  encryptedClassName="encrypted"
/>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | 显示的文字 |
| `speed` | `number` | `50` | 每次迭代间隔（毫秒，越小越快） |
| `maxIterations` | `number` | `10` | 最大迭代次数（非顺序模式） |
| `sequential` | `boolean` | `false` | `true` 顺序解密，`false` 随机乱码 |
| `revealDirection` | `'start' \| 'end' \| 'center'` | `'start'` | 解密方向 |
| `useOriginalCharsOnly` | `boolean` | `false` | 是否只用原文出现的字符 |
| `characters` | `string` | 大写字母+符号集 | 乱码字符集 |
| `animateOn` | `'view' \| 'hover' \| 'inViewHover' \| 'click'` | `'hover'` | 触发方式 |
| `clickMode` | `'once' \| 'toggle'` | `'once'` | click 模式 |
| `className` | `string` | `''` | 已解密字符的类名 |
| `encryptedClassName` | `string` | `''` | 乱码字符的类名 |

## 妙用场景

- **密码揭示**：密码强度指示器，从乱码还原为显示密码
- **机密文件预览**：机密/加密文件名称的揭示动画
- **隐藏彩蛋**：用户交互后才揭示的隐藏信息
- **解密游戏**：教育/游戏网站的解密体验
- **Loading 完成提示**：数据加载完成后文字解密显示