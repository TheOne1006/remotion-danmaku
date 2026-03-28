import { z } from 'zod';
import {
  DanmuShadowSchema,
  DanmuStrokeSchema,
  DanmuStyleSchema,
  DanmuItemSchema,
  PositionSchema,
  DanmuGroupSchema,
  DanmuConfigSchema,
} from '../schemas';

export type DanmuShadow = z.infer<typeof DanmuShadowSchema>;
export type DanmuStroke = z.infer<typeof DanmuStrokeSchema>;
export type DanmuStyle = z.infer<typeof DanmuStyleSchema>;
export type DanmuItem = z.infer<typeof DanmuItemSchema>;
export type Position = z.infer<typeof PositionSchema>;
export type DanmuGroup = z.infer<typeof DanmuGroupSchema>;
export type DanmuConfig = z.infer<typeof DanmuConfigSchema>;

export type { AssignedDanmu } from '../utils';
