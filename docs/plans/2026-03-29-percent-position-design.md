# PositionSchema: 百分比坐标设计

## 背景

当前 `PositionSchema` 使用绝对像素值（如 `[2200, 60]`），导致配置 JSON 绑定特定视频分辨率（1920x1080）。切换为百分比坐标后，同一套弹幕配置可适用于任意分辨率，无需逐一计算宽高。

## 设计决策

- **坐标语义**：`[x, y]` 中 `x` 和 `y` 均为百分比值。`x=0` 表示视频左边缘，`x=1` 表示右边缘；`y=0` 表示顶部，`y=1` 表示底部。
- **允许超出 0-1 范围**：`x=1.15` 表示屏幕右侧外 15%，`x=-0.15` 表示左侧外 15%。支持弹幕从屏幕外飞入/飞出。
- **fontSize 保持像素值**：仅改 Position，字体大小等样式字段不变。
- **不保留像素模式**：统一使用百分比，不做向后兼容。

## 影响范围

### 1. Schema（`config.ts`）

`PositionSchema` 的类型定义不变（`z.tuple([z.number(), z.number()])`），语义从像素改为百分比。

### 2. 渲染层（`DanmuLayer.tsx`）

在 `DanmuGroupLayer` 中通过 `useVideoConfig()` 获取视频宽高，将百分比转换为像素：

```typescript
const { width, height } = useVideoConfig();
const x = interpolate(progress, [0, 1], [group.start[0] * width, group.end[0] * width]);
const y = interpolate(progress, [0, 1], [group.start[1] * height, group.end[1] * height]);
```

### 3. Allocator（`allocator.ts`）

`calculatePathDistance` 和 `allocateTracks` 增加 `width` / `height` 参数，将百分比坐标转换为像素距离：

```typescript
export const calculatePathDistance = (group: DanmuGroup, width: number, height: number): number => {
  const dx = (group.end[0] - group.start[0]) * width;
  const dy = (group.end[1] - group.start[1]) * height;
  return Math.sqrt(dx * dx + dy * dy);
};

export const allocateTracks = (danmus: DanmuItem[], group: DanmuGroup, width: number, height: number): AssignedDanmu[] => {
  const pathDistance = calculatePathDistance(group, width, height);
  // ...
};
```

### 4. 示例数据（`example-danmu.json`）

以 1920x1080 为基准转换所有位置值。示例：
- `[2200, 60]` -> `[1.146, 0.056]`
- `[-300, 60]` -> `[-0.156, 0.056]`

## 不变的部分

- `DanmuStyleSchema` 中的 `fontSize`、`shadow` 偏移等保持像素值
- `Position` TypeScript 类型仍然是 `[number, number]`
- 对外导出的 Schema 和类型结构不变
