import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { DanmuLayer, DanmuConfigSchema, useCurrentSecond } from "remotion-danmaku";

export const danmuExampleSchema = z.object({
  config: DanmuConfigSchema,
});

export const DanmuExample: React.FC<z.infer<typeof danmuExampleSchema>> = ({
  config,
}) => {
  const second = useCurrentSecond();
  const frame = useCurrentFrame();

  const bgHue = interpolate(frame % 300, [0, 300], [220, 260]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${bgHue}, 30%, 12%) 0%, hsl(${bgHue + 30}, 40%, 18%) 100%)`,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: 120,
          fontFamily: "sans-serif",
          color: "rgba(255,255,255,0.3)",
          margin: 0,
        }}
      >
        Second {second.toFixed(2)}
      </h1>
      <DanmuLayer config={config} />
    </AbsoluteFill>
  );
};
