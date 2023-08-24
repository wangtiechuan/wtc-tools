import Decimal from 'decimal.js';

// 数字(浮点数)相加
export const add = (...args: Decimal.Value[]) => {
  const len = args?.length || 0;
  if (!len) {
    return new Decimal(0).toNumber();
  }

  if (len === 1) {
    return new Decimal(args[0]).toNumber();
  }

  return args
    .reduce((v: Decimal, item, index) => {
      if (index === 0) {
        return v;
      }
      return v.add(item);
    }, new Decimal(args[0]))
    .toNumber();
};

// 数字(浮点数)相减
export const sub = (...args: Decimal.Value[]) => {
  const len = args?.length || 0;
  if (!len) {
    return new Decimal(0).toNumber();
  }

  if (len === 1) {
    return new Decimal(args[0]).toNumber();
  }

  return args
    .reduce((v: Decimal, item, index) => {
      if (index === 0) {
        return v;
      }
      return v.sub(item);
    }, new Decimal(args[0]))
    .toNumber();
};

// 数字(浮点数)相乘
export const multi = (...args: Decimal.Value[]) => {
  const len = args?.length || 0;
  if (!len) {
    return new Decimal(0).toNumber();
  }

  if (len === 1) {
    return new Decimal(args[0]).toNumber();
  }

  return args
    .reduce((v: Decimal, item, index) => {
      if (index === 0) {
        return v;
      }
      return v.mul(item);
    }, new Decimal(args[0]))
    .toNumber();
};

// 数字(浮点数)相除
export const div = (...args: Decimal.Value[]) => {
  const len = args?.length || 0;
  if (!len) {
    return new Decimal(0).toNumber();
  }

  if (len === 1) {
    return new Decimal(args[0]).toNumber();
  }

  return args
    .reduce((v: Decimal, item, index) => {
      if (index === 0) {
        return v;
      }
      return v.div(item);
    }, new Decimal(args[0]))
    .toNumber();
};

export function min(...n: Decimal.Value[]) {
  return Decimal.min(...n).toNumber();
}

export function max(...n: Decimal.Value[]) {
  return Decimal.max(...n).toNumber();
}

export function minAndMax(arr: Decimal.Value[]): [number, number] {
  return [min(...arr), max(...arr)];
}

export function abs(n: Decimal.Value) {
  return Decimal.abs(n).toNumber();
}

export function sqrt(n: Decimal.Value) {
  return Decimal.sqrt(n).toNumber();
}

export function pow(base: Decimal.Value, exponent: Decimal.Value) {
  return Decimal.pow(base, exponent).toNumber();
}

export function atan2(y: Decimal.Value, x: Decimal.Value) {
  return Decimal.atan2(y, x).toNumber();
}

export function round(n: Decimal.Value) {
  return Decimal.round(n).toNumber();
}

export function toFixed(n: Decimal.Value, decimalPlaces?: number) {
  return new Decimal(new Decimal(n).toFixed(decimalPlaces)).toNumber();
}
