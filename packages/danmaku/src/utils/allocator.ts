import { measureText } from '@remotion/layout-utils';
import type { DanmuItem, DanmuGroup } from '../types';

const BASE_PIXELS_PER_FRAME = 4;

export interface AssignedDanmu extends DanmuItem {
  durationInFrames: number;
}

const estimateTextWidth = (text: string, fontSize: number): number => {
  return text.length * fontSize * 0.65;
};

/** Calculate path distance (Euclidean) from percentage-based positions */
export const calculatePathDistance = (group: DanmuGroup, width: number, height: number): number => {
  const dx = (group.end[0] - group.start[0]) * width;
  const dy = (group.end[1] - group.start[1]) * height;
  return Math.sqrt(dx * dx + dy * dy);
};

/** Calculate duration based on path distance and speed */
export const calculateDuration = (
  danmu: DanmuItem,
  group: DanmuGroup,
  pathDistance: number,
): number => {
  let textWidth: number;

  try {
    const result = measureText({
      text: danmu.text,
      fontFamily: danmu.fontFamily,
      fontSize: danmu.style.fontSize,
      fontWeight: String(danmu.style.fontWeight),
    });
    textWidth = result.width;
  } catch {
    textWidth = estimateTextWidth(danmu.text, danmu.style.fontSize);
  }

  const actualSpeed = BASE_PIXELS_PER_FRAME * (danmu.style.speed ?? group.speed ?? 1.0);
  const totalDistance = pathDistance + textWidth;

  return Math.ceil(totalDistance / actualSpeed);
};

/**
 * Prepare danmu with calculated duration.
 * All danmu in a group share the same path.
 */
export const allocateTracks = (
  danmus: DanmuItem[],
  group: DanmuGroup,
  width: number,
  height: number,
): AssignedDanmu[] => {
  if (danmus.length === 0) return [];

  const pathDistance = calculatePathDistance(group, width, height);

  return danmus.map((danmu) => ({
    ...danmu,
    durationInFrames: calculateDuration(danmu, group, pathDistance),
  }));
};
