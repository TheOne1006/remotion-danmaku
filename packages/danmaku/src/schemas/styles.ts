import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const DanmuShadowSchema = z.object({
  color: zColor(),
  blur: z.number().min(0),
  offsetX: z.number(),
  offsetY: z.number(),
});

export const DanmuStrokeSchema = z.object({
  color: zColor(),
  width: z.number().min(0),
});

export const DanmuStyleSchema = z.object({
  color: zColor(),
  fontSize: z.number().min(1),
  fontWeight: z.number().min(100).max(900).step(100),
  opacity: z.number().min(0).max(1).step(0.01),
  speed: z.number().min(0.1).max(5).step(0.1).optional(),
  shadow: DanmuShadowSchema.optional(),
  stroke: DanmuStrokeSchema.optional(),
});
