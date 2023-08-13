export interface AnyObject {
  [k: string]: any;
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}

export function isArrayLike(value: unknown): value is ArrayLike<any> {
  return isObject(value) && typeof (value as any).length === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isNumeric(value: unknown): value is number | string {
  return typeof value === 'number' || (isString(value) && !isNaN(+value));
}

export function isEmpty(value: unknown): boolean {
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  } else if (isArrayLike(value)) {
    return value.length === 0;
  } else {
    return !value;
  }
}
