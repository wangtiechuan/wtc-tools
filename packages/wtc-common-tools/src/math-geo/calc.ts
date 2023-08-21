/**
 * 数字(浮点数)相加
 * @param args
 * @returns {number}
 */
export const add = (...args: number[]) => {
  if (!args.length) {
    return 0;
  }
  const r = new Array(args.length);
  for (let [key, value] of Object.entries(args)) {
    try {
      // @ts-ignore
      r[key] = value.toString().split('.')[1].length;
    } catch (e) {
      // @ts-ignore
      r[key] = 0;
    }
  }
  const m = Math.pow(10, Math.max(...r));
  let t = 0;
  for (let arg of args) {
    t += arg * m;
  }
  return t / m;
};

/**
 * 数字(浮点数)相减
 * @param args
 * @returns {number}
 */
export const sub = (...args: number[]) => {
  const n = args.map((v, i) => {
    return i ? -v : v;
  });
  return add(...n);
};

/**
 * 数字(浮点数)相乘
 * @param args
 * @returns {number}
 */
export const multi = (...args: number[]) => {
  if (!args.length) {
    return 0;
  }
  const r = new Array(args.length);
  let m = 0,
    t = 1;
  for (let [key, value] of Object.entries(args)) {
    try {
      // @ts-ignore
      r[key] = value.toString().split('.')[1].length;
    } catch (e) {
      // @ts-ignore
      r[key] = 0;
    }
    // @ts-ignore
    m += r[key];
    // @ts-ignore
    t *= value * Math.pow(10, r[key]);
  }
  return t / Math.pow(10, m);
};

/**
 * 数字(浮点数)相除
 * @param args
 * @returns {number}
 */
export const div = (...args: number[]) => {
  if (!args.length) {
    return 0;
  }
  let d = args[0];
  for (let i = 0; i < args.length - 1; i++) {
    let r1, r2;
    try {
      r1 = d.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = args[i + 1].toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    const r = Math.max(r1, r2);
    d = (d * Math.pow(10, r)) / (args[i + 1] * Math.pow(10, r));
  }
  return d;
};
