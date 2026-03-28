import React, { useMemo } from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { DanmuConfig, DanmuGroup } from '../types';
import type { AssignedDanmu } from '../utils';
import { allocateTracks } from '../utils';
import { buildTextStyle } from '../utils/style';

interface DanmuLayerProps {
  config: DanmuConfig;
}

interface DanmuGroupLayerProps {
  group: DanmuGroup;
  assignedDanmus: AssignedDanmu[];
  currentFrame: number;
}

const DanmuGroupLayer: React.FC<DanmuGroupLayerProps> = ({
  group,
  assignedDanmus,
  currentFrame,
}) => {
  const { width, height } = useVideoConfig();

  return (
    <>
      {assignedDanmus.map((danmu) => {
        const effectiveStartFrame = danmu.startFrame + (danmu.delay ?? 0);
        const endFrame = effectiveStartFrame + danmu.durationInFrames;

        if (currentFrame < effectiveStartFrame || currentFrame >= endFrame) {
          return null;
        }

        const progress = (currentFrame - effectiveStartFrame) / danmu.durationInFrames;

        const x = interpolate(progress, [0, 1], [group.start[0] * width, group.end[0] * width]);
        const y = interpolate(progress, [0, 1], [group.start[1] * height, group.end[1] * height]);

        const textStyle = buildTextStyle(danmu.style, danmu.fontFamily);

        return (
          <div
            key={danmu.id}
            style={{
              ...textStyle,
              position: 'absolute',
              left: x,
              top: y,
              transform: 'translateY(-50%)',
            }}
          >
            {danmu.text}
          </div>
        );
      })}
    </>
  );
};

export const DanmuLayer: React.FC<DanmuLayerProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const groupAllocations = useMemo(() => {
    return config.danmuGroups.map((group) => {
      const assignedDanmus = allocateTracks(group.danmus, group, width, height);
      return { group, assignedDanmus };
    });
  }, [config.danmuGroups, width, height]);

  return (
    <AbsoluteFill>
      {groupAllocations.map(({ group, assignedDanmus }) => {
        const latestExit = Math.max(
          ...assignedDanmus.map((d) => d.startFrame + d.durationInFrames),
          0,
        );

        return (
          <Sequence key={group.id} durationInFrames={latestExit}>
            <DanmuGroupLayer
              group={group}
              assignedDanmus={assignedDanmus}
              currentFrame={frame}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
