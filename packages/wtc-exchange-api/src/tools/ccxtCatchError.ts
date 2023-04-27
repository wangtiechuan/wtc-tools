import { BaseError } from "ccxt";

export function ccxtCatchError(e?: any, onerr?: (e?: any) => void): any {
  if (e instanceof BaseError) {
    console.log(`警告:请求失败 ${e.constructor.name}  ${e.message}`);
  } else {
    console.log(
      `警告:请求失败 ${e.url} ${e.message || e.statusText || e.status}`
    );
  }
  onerr?.(e);
}
