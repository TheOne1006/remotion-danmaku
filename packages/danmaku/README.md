## `remotion-danmaku`

[Remotion](https://remotion.dev/) 弹幕库。

### 安装

```sh
npm install remotion-danmaku
```

### 使用

```tsx
import { useCurrentSecond } from "remotion-danmaku";
import { AbsoluteFill } from "remotion";

export const Example: React.FC = () => {
  const second = useCurrentSecond();

  return (
    <AbsoluteFill>
      <h1>秒数: {second}</h1>
    </AbsoluteFill>
  );
};
```

## 许可证

请查看 [LICENSE.md](LICENSE.md) 了解本仓库的许可证信息。
部分实体使用 Remotion 需要公司许可证，[请阅读相关条款](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)。
