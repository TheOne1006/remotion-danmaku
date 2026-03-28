# Zod Schemas for remotion-danmaku

## Goal

Migrate the type system from the previous implementation (`remotion-danmu/src/danmu/types/`) to Zod schemas using `@remotion/zod-types`. Export layered schemas so users can compose them in their own `<Composition schema={...}>` for visual editing in Remotion Studio.

## Scope

- **Phase 1 (this design)**: Zod schema definitions + type exports only
- **Phase 2 (future)**: Components (DanmuLayer) and utils (allocator, style builder)

## Architecture

### File structure

```
packages/danmaku/src/
├── schemas/
│   ├── styles.ts      # DanmuShadowSchema, DanmuStrokeSchema, DanmuStyleSchema
│   ├── danmu.ts       # DanmuItemSchema
│   ├── config.ts      # PositionSchema, DanmuGroupSchema, DanmuConfigSchema
│   └── index.ts       # Re-export all schemas
├── types/
│   └── index.ts       # TypeScript types inferred from schemas (z.infer)
├── index.ts           # Main entry - export schemas + types
└── use-current-second.ts
```

### Schema definitions

#### styles.ts

```ts
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
```

#### danmu.ts

```ts
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
```

#### config.ts

```ts
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
```

### Type exports

All TypeScript types are inferred from schemas:

```ts
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
```

## User experience

Users import schemas and compose them in their Compositions:

```tsx
import { DanmuConfigSchema } from 'remotion-danmaku';
import { z } from 'zod';

// Use directly
<Composition schema={DanmuConfigSchema} defaultProps={...} />

// Or extend
const mySchema = DanmuConfigSchema.extend({
  videoSrc: z.string(),
});
<Composition schema={mySchema} defaultProps={...} />
```

## Dependencies

- `zod` (peer dependency, version compatible with Remotion)
- `@remotion/zod-types` (dependency for `zColor()`)

## Decisions

- **zColor()** for all color fields - enables color picker in Remotion Studio
- **z.string()** for danmu text (not zTextarea) - danmu are typically short single-line
- **.min()/.max()/.step()** constraints on numeric fields - improves Studio editor UX
- **Layered exports** - users can import and compose any sub-schema
- **Same type structure** as previous implementation - no breaking conceptual changes
