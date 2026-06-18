import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
  /** 'pressure'(默认)= 原始可变字体挤压; 'crowding' = 反转映射, 模拟视觉拥挤(注视点清晰, 外围挤作一团) */
  mode?: 'pressure' | 'crowding';
  /** crowding 模式外围形变强度 0..1 */
  intensity?: number;
  /** crowding 模式清晰注视圈半径(px) */
  focusRadius?: number;
  /** crowding 模式字间距(px), 拉大可缓解拥挤 */
  letterSpacing?: number;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/** crowding 模式: 注视圈外缘到最拥挤的过渡距离(px) */
const CROWDING_FALLOFF = 200;

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24,
  mode = 'pressure',
  intensity = 1,
  focusRadius = 50,
  letterSpacing = 0
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const reduceMotion = useReducedMotion();

  const chars = text.split('');

  // crowding 模式默认衬线标题字体(Latin 可变字体 Compressa 无汉字字形)
  const resolvedFontFamily =
    mode === 'crowding' && fontFamily === 'Compressa VF' ? "'Noto Serif SC', serif" : fontFamily;

  // 注视点 → 外围逐字应用: scaleX 重叠 + 加重 + 轻微淡出(反转 pressure 的"近重远轻")
  const applyCrowding = useCallback(() => {
    if (!containerRef.current) return;
    // 注视圈半径随字间距同步: 间距越小 → 清晰范围越小(更贴近"一次只看清一个字"的拥挤体感)
    const effFocus = focusRadius + letterSpacing;
    spansRef.current.forEach((span) => {
      if (!span) return;
      const rect = span.getBoundingClientRect();
      const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      const d = dist(mouseRef.current, charCenter);
      const peripheral = Math.max(0, Math.min(1, (d - effFocus) / CROWDING_FALLOFF));
      const p = peripheral * intensity;
      // scaleX 上限 2.0: 字间距为 0、强度拉满时相邻字视觉重合,模拟"挤作一团"
      const scaleX = 1 + p;
      // Noto Serif SC 仅加载 400/500/700: 注视点 400(轻、清晰) → 外围 700(重、挤作一团)
      const wght = Math.round(400 + p * 300);
      const opacity = 1 - p * 0.3;
      span.style.transform = `scaleX(${scaleX.toFixed(3)})`;
      span.style.fontWeight = String(wght);
      span.style.opacity = opacity.toFixed(3);
    });
  }, [focusRadius, intensity, letterSpacing]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (mode !== 'pressure') return;
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale, mode]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    // ===== crowding 模式 =====
    if (mode === 'crowding') {
      // 减弱动效: 静态居中注视, 不跟随光标
      if (reduceMotion) {
        if (containerRef.current) {
          const r = containerRef.current.getBoundingClientRect();
          mouseRef.current.x = r.left + r.width / 2;
          mouseRef.current.y = r.top + r.height / 2;
        }
        applyCrowding();
        return;
      }
      let rafId: number;
      const animate = () => {
        mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
        mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
        applyCrowding();
        rafId = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(rafId);
    }

    // ===== pressure 模式(原始可变字体挤压) =====
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : '0';
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : '1';

          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [mode, reduceMotion, width, weight, italic, alpha, applyCrowding, letterSpacing, text]);

  const styleElement = useMemo(() => {
    if (mode === 'crowding') return null;
    return (
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
    );
  }, [mode, fontFamily, fontUrl, flex, stroke, textColor, strokeColor]);

  // ===== crowding 模式渲染: 居中可换行, 逐字 scaleX 重叠 =====
  if (mode === 'crowding') {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent'
        }}
      >
        <div
          style={{
            fontFamily: resolvedFontFamily,
            color: textColor,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: `${letterSpacing}px`,
            lineHeight: 1.4,
            userSelect: 'none',
            fontWeight: 500
          }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              ref={el => {
                spansRef.current[i] = el;
              }}
              style={{
                display: 'inline-block',
                transformOrigin: 'center center'
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ===== pressure 模式渲染(原始) =====
  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
