import { catchError, of, retry } from 'rxjs';
import { fetchSub } from './fetchSub';
import { isBrowser } from './isBrowser';

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

interface PromiseHasCancel extends Promise<any> {
  cancel?: () => void;
}

export const fetchImplementation = (url: string, options?: RequestInit) => {
  console.log(url);
  const realOptions = { ...options };

  if (!isBrowser) {
    Object.assign(realOptions, {
      // agent, // 有时候不需要代理
    });
  }

  let _resove: undefined | ((value: any) => void) = undefined;
  let _reject: undefined | ((reason?: any) => void) = undefined;

  const p: PromiseHasCancel = new Promise<any>((resove, reject) => {
    _resove = resove;
    _reject = reject;
  });

  const subOb = fetchSub(url, realOptions).pipe(
    retry(2),
    catchError((err) => {
      _reject?.(err);
      return of(err);
    }),
  );
  const sb = subOb.subscribe((res) => {
    try {
      const resClone = res?.clone?.();
      resClone?.json().then((d: any) => {
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
  });

  p.cancel = sb.unsubscribe;
  return p;
};
