import { ccxtErrors } from '../api/exchange-entry';

export function ccxtCatchError(e?: any, onerr?: (e?: any) => void): any {
  const errorName = e.constructor.name || '';
  const errorMsg = e.message || e.statusText || e.status || '';
  const errorUrl = e.url || '';

  let errorType = '';
  if (e instanceof ccxtErrors.BaseError) {
    errorType = 'BaseError';
  } else if (e instanceof ccxtErrors.ExchangeError) {
    errorType = 'ExchangeError';
  } else {
    errorType = 'OtherError';
  }

  console.log(
    `警告:请求失败 ${errorType} ${errorName} ${errorMsg} ${errorUrl} `,
  );

  // console.log(e);

  onerr?.(e);
}
