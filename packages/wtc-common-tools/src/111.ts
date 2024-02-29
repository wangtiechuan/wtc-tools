// 已知d1、d2、d3、d4四个点，点的x和y坐标可以是任意值（包括0），d1和d2计算得出的直线l1，d3和d4得出的直线l2,求l1与l2的交点d5（若无交点计作null）,d1和d3计算的直线l3，求d5到l3的距离，用js表示

export interface Dot {
  x: number;
  y: number;
}

export interface Line {
  d1: Dot;
  d2: Dot;
}

function calculateIntersection(l1: Line, l2: Line) {
  const { d1, d2 } = l1;
  const { d1: d3, d2: d4 } = l2;

  // 计算直线l1和l2的交点
  const x1 = d1.x;
  const y1 = d1.y;
  const x2 = d2.x;
  const y2 = d2.y;
  const x3 = d3.x;
  const y3 = d3.y;
  const x4 = d4.x;
  const y4 = d4.y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (denominator === 0) {
    // 直线平行，无交点
    return null;
  } else {
    const intersectionX =
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
      denominator;
    const intersectionY =
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
      denominator;

    const res: Dot = { x: intersectionX, y: intersectionY };
    return res;
  }
}

function calculateDistance(l: Line, d: Dot) {
  const { d1, d2 } = l;

  // 计算点d到直线l的距离
  const x1 = d1.x;
  const y1 = d1.y;
  const x2 = d2.x;
  const y2 = d2.y;
  const x3 = d.x;
  const y3 = d.y;

  const distance =
    Math.abs((y1 - y2) * x3 - (x1 - x2) * y3 + x1 * y2 - y1 * x2) /
    Math.sqrt((y1 - y2) * (y1 - y2) + (x1 - x2) * (x1 - x2));

  return distance;
}

// 示例数据
const d1 = { x: 0, y: 3 };
const d2 = { x: 0, y: 0 };
const d3 = { x: 4, y: 0 };
const d4 = { x: 0, y: 0 };

// 计算交点
const d5 = calculateIntersection({ d1, d2 }, { d1: d3, d2: d4 });

if (d5 === null) {
  console.log('l1和l2平行，无交点');
} else {
  console.log('交点d5的坐标：', d5);
  // 计算距离
  const distance = calculateDistance({ d1, d2: d3 }, d5);
  console.log('d5到l3的距离：', distance);
}
