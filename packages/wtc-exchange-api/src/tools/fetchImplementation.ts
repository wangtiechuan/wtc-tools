import { ccxtFunctions } from '../api/exchange-entry';
// import { agent } from './proxy';
// @ts-ignore
// import { fetch } from 'ccxt/js/src/static_dependencies/node-fetch';
const fetchInstance = fetch;

export function tinyViewRes(jsonData: any, noIsTinyMark?: boolean) {
  let isTiny = false;
  const func = () => {
    if (typeof jsonData === 'object') {
      if (Array.isArray(jsonData)) {
        if (jsonData.length > 1) {
          isTiny = true;
          return [jsonData[0]];
        }
        return jsonData;
      }
      const cpRes = {} as any;
      Object.keys(jsonData).forEach((k) => {
        cpRes[k] = tinyViewRes(jsonData[k], true);
      });
      return cpRes;
    }
    return jsonData;
  };
  if (noIsTinyMark) {
    return func();
  }
  return { isTiny, data: func() };
}

export const fetchImplementation = (url: string, options?: RequestInit) => {
  const realOptions: any = { ...options };

  if (!ccxtFunctions.isBrowser) {
    Object.assign(realOptions, {
      // agent, // 有时候不需要代理
    });
  }

  let _resove: undefined | ((value: any) => void) = undefined;
  let _reject: undefined | ((reason?: any) => void) = undefined;

  const p = new Promise<any>((resove, reject) => {
    _resove = resove;
    _reject = reject;
  });

  fetchInstance(url, realOptions)
    .then((res) => {
      if (!res.ok) {
        _reject?.(res);
        return;
      }
      try {
        const resClone = res?.clone?.();
        resClone?.json().then((d) => {
          const tinyMsg = tinyViewRes(d);

          console.log(`----`);
          console.log(`url: ${url}`);
          console.log(
            `res: tiny(${tinyMsg.isTiny}) ${JSON.stringify(tinyMsg.data)}`,
          );
          return d;
        });
      } catch (e) {
        console.log(`url: ${url} res 克隆异常`);
        console.log(e);
      }
      _resove?.(res);
    })
    .catch((error) => {
      _reject?.(error);
    });

  return p;
};
