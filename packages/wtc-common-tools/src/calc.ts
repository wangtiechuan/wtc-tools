// 获取小数位数
export function getDecimalDigits(number: number) {
  const match = ('' + number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0),
  );
}

// 加法
export function add(a: number, b: number) {
  const precision = Math.max(getDecimalDigits(a), getDecimalDigits(b));
  const factor = Math.pow(10, precision);
  return (a * factor + b * factor) / factor;
}

// 减法
export function subtract(a: number, b: number) {
  const precision = Math.max(getDecimalDigits(a), getDecimalDigits(b));
  const factor = Math.pow(10, precision);
  return (a * factor - b * factor) / factor;
}

// 乘法
export function multiply(a: number, b: number) {
  const precision = getDecimalDigits(a) + getDecimalDigits(b);
  const factor = Math.pow(10, precision);
  return (a * factor * (b * factor)) / (factor * factor);
}

// 除法
export function divide(a: number, b: number) {
  const precision = getDecimalDigits(a) - getDecimalDigits(b);
  const factor = Math.pow(10, precision);
  return (a * factor) / (b * factor);
}

// 求和
export function sum(numbers: number[]) {
  return numbers.reduce((acc, num) => add(acc, num), 0);
}

// 平均值
export function mean(numbers: number[]) {
  return divide(sum(numbers), numbers.length);
}

// 取余数
export function mod(a: number, b: number) {
  return subtract(a, multiply(b, Math.floor(divide(a, b))));
}
