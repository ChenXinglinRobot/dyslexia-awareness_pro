import {
  FC,
  ReactNode,
  CSSProperties,
  isValidElement,
  createElement,
} from 'react';
import './GlitchText.css';
import { useSimulation } from '@/contexts/SimulationContext';

/**
 * 从任意 ReactNode 中提取纯文本字符串。
 * 用于 `data-text` 属性,供伪元素的双色幽灵层显示。
 */
function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return '';
}

interface GlitchTextProps {
  /** 子节点。可以是纯字符串,也可以是带有 <span>/<br> 等富内容的 ReactNode。 */
  children: ReactNode;
  /**
   * 显式提供给伪元素的纯文本。未提供时自动从 children 提取。
   *
   * ⚠️ 多行文本必须用 JS 表达式(花括号)包裹,不能写 JSX 字面量:
   *   ✅ dataText={"第一行\n第二行"}  // 真换行符 U+000A
   *   ❌ dataText="第一行\n第二行"    // 字面 `\n`,CSS pre-wrap 不识别
   * 原因:`content: attr(data-text)` 拿到的是属性字符串本身,
   *      white-space: pre-wrap 只认 U+000A,不认字面 `\n`。
   *      注意:Prettier 会把"字面字符串外的冗余花括号"自动去掉,务必保留花括号或加 prettier-ignore。
   */
  dataText?: string;
  /** 动画速度倍数,默认 0.5。 */
  speed?: number;
  /** 是否启用红/青双色文字阴影,默认 true。 */
  enableShadows?: boolean;
  /** 旧 API:hover 才抖动,静息停。与 respectSimulation 互斥(后者优先)。 */
  enableOnHover?: boolean;
  /**
   * 是否响应全局 SimulationContext。当为 true 且 useSimulation().enabled=true 时:
   * - 标题"常态抖动"(隐喻孩子持续被文字干扰)
   * - 鼠标悬停时"停止抖动"(隐喻孩子努力集中注意力的瞬间)
   * 当 SimulationContext.enabled=false 时,完全不抖动 — 严格遵守 PRODUCT.md opt-in 约束。
   */
  respectSimulation?: boolean;
  /** 渲染的 HTML 标签,默认 'div'。用于保持语义(h1/h2/h3 等)。 */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  style?: CSSProperties;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  dataText,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  respectSimulation = false,
  as = 'div',
  className = '',
  style,
}) => {
  const { enabled: simEnabled } = useSimulation();
  const textForGhost = dataText ?? extractText(children);

  const inlineStyles: CustomCSSProperties = {
    ...style,
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
  };

  // 关键:respectSimulation 只有在 Context.enabled=true 时才挂 class,否则完全不抖动
  // 与 enableOnHover 互斥时 respectSimulation 优先,避免 CSS 优先级打架
  const shouldGlitchAtRest = respectSimulation && simEnabled;
  const shouldGlitchByHover = enableOnHover && !shouldGlitchAtRest;

  const cls = [
    'glitch',
    shouldGlitchByHover ? 'enable-on-hover' : '',
    shouldGlitchAtRest ? 'respect-simulation' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createElement(
    as,
    { className: cls, style: inlineStyles, 'data-text': textForGhost },
    children,
  );
};

export default GlitchText;
