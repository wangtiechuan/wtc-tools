export const s1 = 1000;
export const m1 = s1 * 60;
export const h1 = 60 * m1;
export const d1 = 24 * h1;
export const w1 = 7 * d1;
export const M1_L = 28 * d1;
export const M1_M = 30 * d1;
export const M1_H = 31 * d1;
export const y1_L = 365 * d1;
export const y1_H = 366 * d1;

export function timeFrameToMS(timeFrame: string): { from: number; to: number } {
  const timeCount = parseInt(timeFrame);
  let type: string;
  let count: string;
  if (isNaN(timeCount)) {
    type = timeFrame[0];
    count = timeFrame.slice(1);
  } else {
    const lastIndex = timeFrame.length - 1;
    type = timeFrame[lastIndex];
    count = timeFrame.slice(0, lastIndex);
  }

  const _count = Number(count!);
  if (type === 'y') {
    return { from: _count * y1_L, to: _count * y1_H };
  }

  if (type === 'M') {
    return { from: _count * M1_L, to: _count * M1_H };
  }

  let baseMS: number;
  if (type === 'w') {
    baseMS = w1;
  } else if (type === 'd') {
    baseMS = d1;
  } else if (type === 'h') {
    baseMS = h1;
  } else if (type === 'm') {
    baseMS = m1;
  } else if (type === 's') {
    baseMS = s1;
  }

  const r = _count * baseMS!;
  return { from: r, to: r };
}
