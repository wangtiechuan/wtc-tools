import { isObject } from './props';

export function coverObject<T = Record<string, any>>(
  initObj?: T,
  coverObj?: T,
) {
  if (!coverObj) {
    return initObj;
  }
  if (!initObj) {
    return coverObj;
  }
  if (!isObject(coverObj) || !isObject(initObj)) {
    return undefined;
  }
  const coverObjKeys: any[] = Object.keys(coverObj);
  if (coverObjKeys.length === 0) {
    return initObj;
  }
  const initObjKeys = Object.keys(initObj);

  const resObj = {
    ...initObj,
  };

  coverObjKeys.forEach((k) => {
    // @ts-ignore
    const coverVal = coverObj[k];
    if (coverVal === undefined) {
      return;
    }
    if (!initObjKeys.includes(k)) {
      // @ts-ignore
      resObj[k] = coverVal;
    } else {
      if (!isObject(coverVal)) {
        // @ts-ignore
        resObj[k] = coverVal;
      } else {
        // @ts-ignore
        const initVal = initObj[k];
        // @ts-ignore
        resObj[k] = coverObject(initVal, coverVal);
      }
    }
  });

  return resObj;
}
