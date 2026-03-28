import type { DanmuStyle } from '../types';

export const buildTextStyle = (
  style: DanmuStyle,
  fontFamily: string,
): React.CSSProperties => ({
  color: style.color,
  fontSize: style.fontSize,
  fontFamily,
  fontWeight: style.fontWeight,
  opacity: style.opacity,
  WebkitTextStroke: style.stroke
    ? `${style.stroke.width}px ${style.stroke.color}`
    : undefined,
  textShadow: style.shadow
    ? `${style.shadow.offsetX}px ${style.shadow.offsetY}px ${style.shadow.blur}px ${style.shadow.color}`
    : undefined,
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
});
