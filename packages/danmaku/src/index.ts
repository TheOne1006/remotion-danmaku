export * from "./use-current-second";

// Zod schemas - for composition in <Composition schema={...}>
export {
  DanmuShadowSchema,
  DanmuStrokeSchema,
  DanmuStyleSchema,
  DanmuItemSchema,
  PositionSchema,
  DanmuGroupSchema,
  DanmuConfigSchema,
} from "./schemas";

// TypeScript types - inferred from schemas
export type {
  DanmuShadow,
  DanmuStroke,
  DanmuStyle,
  DanmuItem,
  Position,
  DanmuGroup,
  DanmuConfig,
  AssignedDanmu,
} from "./types";

// Components
export { DanmuLayer } from "./components";

// Utils
export { allocateTracks, calculateDuration, calculatePathDistance, buildTextStyle } from "./utils";
