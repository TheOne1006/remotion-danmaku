import { z } from 'zod';
import { DanmuStyleSchema } from './styles';

export const DanmuItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  startFrame: z.number().min(0).step(1),
  delay: z.number().min(0).step(1).optional(),
  fontFamily: z.string(),
  style: DanmuStyleSchema,
});
