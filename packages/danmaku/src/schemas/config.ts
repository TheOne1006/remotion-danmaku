import { z } from 'zod';
import { DanmuItemSchema } from './danmu';

export const PositionSchema = z.tuple([z.number(), z.number()]);

export const DanmuGroupSchema = z.object({
  id: z.string(),
  start: PositionSchema,
  end: PositionSchema,
  speed: z.number().min(0.1).max(5).step(0.1).optional(),
  danmus: z.array(DanmuItemSchema),
});

export const DanmuConfigSchema = z.object({
  durationInFrames: z.number().min(1).step(1),
  danmuGroups: z.array(DanmuGroupSchema),
});
