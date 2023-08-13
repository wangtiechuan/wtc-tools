import { AnyObject } from './props';

export function filterUndefinedParams<T = AnyObject>(
  params?: T,
): T | undefined {
  if (!params) {
    return params;
  }
  const paramsKeys = Object.keys(params);
  if (!paramsKeys.length) {
    return params;
  }

  const nParams: any = paramsKeys.reduce((v, k) => {
    // @ts-ignore
    const val = params[k];
    if (val !== undefined) {
      // @ts-ignore
      v[k] = val;
    }
    return v;
  }, {});

  if (Object.keys(nParams).length === paramsKeys.length) {
    return params;
  }
  return nParams;
}
