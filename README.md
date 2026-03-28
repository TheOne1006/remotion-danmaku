# remotion-danmaku

[![npm version](https://img.shields.io/npm/v/remotion-danmaku.svg)](https://www.npmjs.com/package/remotion-danmaku)

[Remotion](https://remotion.dev/) 弹幕库 — 在视频中添加弹幕（barrage comments）动画效果。

## 安装

```bash
pnpm add remotion-danmaku
# or
npm install remotion-danmaku
```

Peer dependencies:

```bash
pnpm add react remotion zod
```

## 快速开始

### 1. 定义弹幕配置

```typescript
import type { DanmuConfig } from 'remotion-danmaku';

const config: DanmuConfig = {
  durationInFrames: 900,
  danmuGroups: [
    {
      id: 'group-1',
      start: [1.0, 0.1],   // 起点：右侧边缘外，距顶部 10%
      end: [-0.2, 0.1],    // 终点：左侧边缘外
      speed: 1.0,
      danmus: [
        {
          id: 'd1',
          text: 'Hello!',
          startFrame: 0,
          fontFamily: 'sans-serif',
          style: {
            color: '#FFFFFF',
            fontSize: 48,
            fontWeight: 700,
            opacity: 1.0,
            shadow: {
              color: '#000000',
              blur: 4,
              offsetX: 1,
              offsetY: 1,
            },
          },
        },
      ],
    },
  ],
};
```

### 2. 在 Remotion 组件中使用

```tsx
import { AbsoluteFill, Composition } from 'remotion';
import { z } from 'zod';
import { DanmuLayer, DanmuConfigSchema } from 'remotion-danmaku';

const schema = z.object({
  config: DanmuConfigSchema,
});

const MyVideo: React.FC<z.infer<typeof schema>> = ({ config }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <DanmuLayer config={config} />
  </AbsoluteFill>
);

// 注册 Composition
<Composition
  id="DanmuVideo"
  component={MyVideo}
  durationInFrames={900}
  fps={30}
  width={1920}
  height={1080}
  schema={schema}
  defaultProps={{ config }}
/>;
```

## API

### 组件

#### `<DanmuLayer config={DanmuConfig} />`

弹幕渲染层，接收配置并渲染所有弹幕动画。

### Schemas & Types

| Schema | Type | 说明 |
|---|---|---|
| `DanmuConfigSchema` | `DanmuConfig` | 顶层配置：`durationInFrames` + `danmuGroups` |
| `DanmuGroupSchema` | `DanmuGroup` | 弹幕组：定义运动路径（`start` / `end`）、速度、弹幕列表 |
| `DanmuItemSchema` | `DanmuItem` | 单条弹幕：`text`、`startFrame`、`fontFamily`、`style` |
| `DanmuStyleSchema` | `DanmuStyle` | 样式：`color`、`fontSize`、`fontWeight`、`opacity`、可选 `shadow` / `stroke` |
| `DanmuShadowSchema` | `DanmuShadow` | 文字阴影：`color`、`blur`、`offsetX`、`offsetY` |
| `DanmuStrokeSchema` | `DanmuStroke` | 文字描边：`color`、`width` |
| `PositionSchema` | `Position` | 坐标 `[x, y]`，百分比 0–1 |

### 工具函数

- **`allocateTracks(danmus, group, width, height)`** — 计算每条弹幕的持续时间并分配轨道
- **`calculateDuration(danmu, group, pathDistance)`** — 计算单条弹幕的动画帧数
- **`calculatePathDistance(group, width, height)`** — 计算路径的像素距离
- **`buildTextStyle(style, fontFamily)`** — 将 `DanmuStyle` 转换为 `React.CSSProperties`

### Hooks

- **`useCurrentSecond()`** — 获取当前播放时间（秒）

## 坐标系统

位置使用百分比坐标（0–1），适配任意视频分辨率：

```typescript
start: [1.0, 0.1]   // x=100%（右边缘外），y=10%（距顶部）
end:   [-0.2, 0.1]  // x=-20%（左边缘外）
```

## 开发

```bash
pnpm i
pnpm run dev        # 启动 Remotion Studio 预览
pnpm run build      # 构建库
pnpm run lint       # 代码检查
```

## License

MIT
