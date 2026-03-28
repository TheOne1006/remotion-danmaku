# remotion-danmaku

[Remotion](https://remotion.dev/) 弹幕库。

## 快速开始

```
pnpm i
pnpm run dev
```

浏览器打开 http://localhost:3000 查看测试页面。
编辑 `packages/danmaku` 来修改库代码，编辑 `packages/example` 来修改测试用例。

## 代码检查

```sh
pnpm run lint
```

## 发布

1. 运行 `pnpm run build` 构建库。
1. 在 `packages/danmaku/package.json` 中更新版本号。
1. 运行 `pnpm recursive publish` 发布到 NPM。

## 清理

```bash
pnpm run clean
```
