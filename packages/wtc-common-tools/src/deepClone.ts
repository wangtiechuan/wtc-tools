export function deepClone<T = any>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    clone[key] = deepClone(obj[key]);
  });

  // @ts-ignore
  return clone;
}
