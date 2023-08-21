/* eslint-disable no-param-reassign */
import { add, div, multi, sub } from '../math/calc';

type XY = [number, number];

type DotXY = [XY, XY];

export function arrayMinAndMax(arr: number[]): [number, number] {
  return [Math.min(...arr), Math.max(...arr)];
}

/**
 * 小数四舍五入
 * @param number 数字
 * @param d 小数点后保留的位数
 * @returns {number}
 */
export const round = (number: number, d = 4) => {
  return parseFloat(Number.prototype.toFixed.call(number, parseInt(d)));
};

/**
 * 判断点是否在线段上
 * @param x 点x坐标
 * @param y 点y坐标
 * @param x1 线段端点1x坐标
 * @param y1 线段端点1y坐标
 * @param x2 线段端点2x坐标
 * @param y2 线段端点2y坐标
 * @param t 偏差值(有时非常接近线段也认为在线段上，而且浮点数计算不精准)
 * @returns {boolean} 返回判断结果
 */
export const pointOnLine = (
  [x, y]: XY,
  [[x1, y1], [x2, y2]]: DotXY,
  t: number = 0.01,
) => {
  const rangeX = arrayMinAndMax([x1, x2]);
  const rangeY = arrayMinAndMax([y1, y2]);
  t = t || 0.01;
  if (x < rangeX[0] || x > rangeX[1] || y < rangeY[0] || y > rangeY[1]) {
    return false;
  } else {
    if (Math.abs(sub(y1, y2)) < Math.abs(sub(x1, x2))) {
      [x, y] = [y, x];
      [x1, y1] = [y1, x1];
      [x2, y2] = [y2, x2];
    }
    return (
      Math.abs(
        sub(div(sub(x, x1), sub(y, y1)), div(sub(x1, x2), sub(y1, y2))),
      ) < t ||
      Math.abs(
        sub(div(sub(x, x2), sub(y, y2)), div(sub(x1, x2), sub(y1, y2))),
      ) < t
    );
  }
};

/**
 * 求斜截式y=k*x+b的k与b
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @returns {*} 返回k与b，在直线与y轴平行的情况下，返回null
 */
export const getKB = ([[x1, y1], [x2, y2]]: DotXY) => {
  if (x1 !== x2) {
    const k = round(div(sub(y1, y2), sub(x1, x2)), 5);
    const b = round(sub(y1, multi(k, x1)), 5);
    return {
      k,
      b,
    };
  } else {
    return null;
  }
};

/**
 * 求过点[x,y]并与直线垂直的长度为l的线段两端点坐标(所求线段被点[x,y]平分)
 * @param x 垂足x坐标
 * @param y 垂足y坐标
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @param l 所求线段长度
 */
export const getVertical = (
  [x, y]: XY,
  [[x1, y1], [x2, y2]]: DotXY,
  l: number,
): XY => {
  const kb = getKB([
    [x1, y1],
    [x2, y2],
  ]);
  let pairX: XY, pairY: XY;
  if (kb) {
    if (kb.k) {
      const k = round(-div(1, kb.k), 5);
      const b = round(sub(y, multi(k, x)), 5);
      const t = round(div(l, 2, Math.sqrt(add(1, Math.pow(k, 2)))), 5);
      pairX = [round(sub(x, t), 3), round(add(x, t), 3)];
      // @ts-ignore
      pairY = pairX.map((v) => round(add(multi(k, v), b), 3));
    } else {
      pairX = [x, x];
      pairY = [sub(y, div(l, 2)), add(y, div(l, 2))];
    }
  } else {
    pairX = [sub(x, div(l, 2)), add(x, div(l, 2))];
    pairY = [y, y];
  }
  // @ts-ignore
  return pairX.map((v, i) => [v, pairY[i]]);
};

/**
 *
 * 求过点[x,y]作与直线平行的线段，线段长度为l
 * @param x 点x坐标
 * @param y 点y坐标
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @param l 长度
 */
export const getParallel = (
  [x, y]: XY,
  [[x1, y1], [x2, y2]]: DotXY,
  l: number,
): XY => {
  const kb = getKB([
    [x1, y1],
    [x2, y2],
  ]);
  let pairX: XY, pairY: XY;
  if (kb) {
    const t = round(div(l, 2, Math.sqrt(add(1, Math.pow(kb.k, 2)))), 5);
    const b = round(sub(y, multi(kb.k, x)), 5);
    pairX = [round(sub(x, t), 3), round(add(x, t), 3)];
    // @ts-ignore
    pairY = pairX.map((v) => round(add(multi(kb.k, v), b), 3));
  } else {
    pairX = [x, x];
    pairY = [sub(y, div(l, 2)), add(y, div(l, 2))];
  }
  // @ts-ignore
  return pairX.map((v, i) => [v, pairY[i]]);
};

/**
 * 求直线上与点[x,y]的距离为l的点的坐标(点[x,y]也在直线上)
 * @param x 点x坐标
 * @param y 点y坐标
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @param l 距离
 */
export const getExtension = (
  [x, y]: XY,
  [[x1, y1], [x2, y2]]: DotXY,
  l: number,
): XY => {
  const kb = getKB([
    [x1, y1],
    [x2, y2],
  ]);
  let pairX: XY, pairY: XY;
  if (kb) {
    const t = round(div(l, Math.sqrt(add(1, Math.pow(kb.k, 2)))), 5);
    pairX = [round(sub(x, t), 3), round(add(x, t), 3)];
    // @ts-ignore
    pairY = pairX.map((v) => round(add(multi(kb.k, v), kb.b), 3));
  } else {
    pairX = [x, x];
    pairY = [sub(y, div(l, 2)), add(y, div(l, 2))];
  }
  // @ts-ignore
  return pairX.map((v, i) => [v, pairY[i]]);
};

/**
 * 求直线的角度（从X轴正向逆时针旋转的角度）
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @returns {number}
 */
export const getAngle = ([[x1, y1], [x2, y2]]: DotXY) => {
  return div(multi(Math.atan2(sub(x1, x2), sub(y1, y2)), 180), Math.PI);
};

/**
 * 已知直线上两点和第三点的x坐标，求出第三点的y坐标
 * @param x 第三点的x坐标
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @returns {*} 如果直线与y轴平行，返回null，否则返回y坐标
 */
export const getYFromX = (x: number, [[x1, y1], [x2, y2]]: DotXY) => {
  const kb = getKB([
    [x1, y1],
    [x2, y2],
  ]);
  if (kb) {
    return round(add(multi(kb.k, x), kb.b), 3);
  } else {
    return null;
  }
};

/**
 * 已知直线上两点和第三点的y坐标，求出第三点的x坐标
 * @param y 第三点的y坐标
 * @param x1 直线点1x坐标
 * @param y1 直线点1y坐标
 * @param x2 直线点2x坐标
 * @param y2 直线点2y坐标
 * @returns {*} 如果直线与x轴平行，返回null，否则返回x坐标
 */
export const getXFromY = (y: number, [[x1, y1], [x2, y2]]: DotXY) => {
  const kb = getKB([
    [x1, y1],
    [x2, y2],
  ]);
  if (kb) {
    return kb.k ? round(div(sub(y, kb.b), kb.k), 3) : null;
  } else {
    return x1;
  }
};

/**
 * 判断两线段是否相交，相交返回交点(点1与点2组成线段1，点3与点4组成线段2)
 * @param x1 线段端点1x坐标
 * @param y1 线段端点1y坐标
 * @param x2 线段端点2x坐标
 * @param y2 线段端点2y坐标
 * @param x3 线段端点3x坐标
 * @param y3 线段端点3y坐标
 * @param x4 线段端点4x坐标
 * @param y4 线段端点4y坐标
 * @returns {*} 如果相交返回交点[x,y]，否则返回false
 */
export const lineCross = (
  [[x1, y1], [x2, y2]]: DotXY,
  [[x3, y3], [x4, y4]]: DotXY,
): false | XY => {
  // 三角形abc面积的2倍
  const area123 = sub(
    multi(sub(x1, x3), sub(y2, y3)),
    multi(sub(y1, y3), sub(x2, x3)),
  );
  // 三角形abd面积的2倍
  const area124 = sub(
    multi(sub(x1, x4), sub(y2, y4)),
    multi(sub(y1, y4), sub(x2, x4)),
  );
  // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,当作不相交处理)
  if (multi(area123, area124) >= 0) {
    return false;
  }
  // 三角形cda面积的2倍
  const area341 = sub(
    multi(sub(x3, x1), sub(y4, y1)),
    multi(sub(y3, y1), sub(x4, x1)),
  );
  // 三角形cdb面积的2倍(这里有一个小优化，不需要再用公式计算面积，而是通过已知的三个面积加减得出)
  const area342 = add(area341, area123, -area124);
  if (multi(area341, area342) >= 0) {
    return false;
  }
  // 计算交点坐标
  const t = div(area341, sub(area124, area123));
  const dx = multi(t, sub(x2, x1)),
    dy = multi(t, sub(y2, y1));
  // @ts-ignore
  return [add(x1, dx), add(y1, dy)].map((v) => round(v, 3));
};

/**
 * 找出点集合pointGroup中距离点[x,y]最近的点下标，要满足距离小于minDist
 * @param x 点x值
 * @param y 点y值
 * @param pointGroup 点集合
 * @param minDist 最小距离
 * @returns {number} 找到返回下标，失败返回-1
 */
export const getClosestPointIdx = (
  [x, y]: XY,
  pointGroup: DotXY[],
  minDist: number,
) => {
  const distances2 = pointGroup.map((v) => {
    return round(add(Math.pow(sub(v[0], x), 2), Math.pow(sub(v[1], y), 2)), 3);
  });
  const min = Math.min(...distances2);
  if (min > Math.pow(minDist, 2)) {
    return -1;
  }
  return distances2.findIndex((v) => v === min);
};

/**
 * 找出线集合lineGroup中距离点[x,y]最近的线下标，要满足距离小于minDist
 * @param x 点x值
 * @param y 点y值
 * @param lineGroup 线集合
 * @param minDist 最小距离
 * @returns {number} 找到返回下标，失败返回-1
 */
export const getClosetLineIdx = (
  [x, y]: XY,
  lineGroup: DotXY[],
  minDist: number,
) => {
  const distances2 = lineGroup.map((v) => {
    const kb = getKB([v[0], v[v.length - 1]]);
    if (kb) {
      if (kb.k) {
        const k = round(-div(1, kb.k), 5);
        const b = round(sub(y, multi(k, x)), 5);
        const crossX = round(div(sub(b, kb.b), sub(kb.k, k)), 5);
        const crossY = round(add(multi(kb.k, crossX), kb.b), 5);
        return round(
          add(Math.pow(sub(crossX, x), 2), Math.pow(sub(crossY, y), 2)),
          3,
        );
      } else {
        return round(Math.pow(sub(v[0][1], y), 2), 3);
      }
    } else {
      return round(Math.pow(sub(v[0][0], x), 2), 3);
    }
  });
  const min = Math.min(...distances2);
  if (min > Math.pow(minDist, 2)) {
    return -1;
  }
  return distances2.findIndex((v) => v === min);
};
