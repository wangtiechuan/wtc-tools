import * as ccxt from 'ccxt';

export {
  Balance,
  Balances,
  Currency,
  DepositAddress,
  DepositAddressResponse,
  Dictionary,
  Exchange,
  Fee,
  Market,
  MinMax,
  OHLCV,
  Order,
  OrderBook,
  PartialBalances,
  Precise,
  Ticker,
  Tickers,
  Trade,
  Transaction,
  WithdrawalResponse,
  exchanges,
  pro,
} from 'ccxt';

export const ccxtErrors = {
  BaseError: ccxt.BaseError,
  ExchangeError: ccxt.ExchangeError,
};

export const ccxtFunctions = {
  // @ts-ignore
  isBrowser: ccxt.isBrowser,
  // @ts-ignore
  isNode: ccxt.isNode,
  // @ts-ignore
  isEmpty: ccxt.isEmpty,
  // @ts-ignore
  isNumber: ccxt.isNumber,
  // @ts-ignore
  isInteger: ccxt.isInteger,
  // @ts-ignore
  isArray: ccxt.isArray,
  // @ts-ignore
  isString: ccxt.isString,
  // @ts-ignore
  isObject: ccxt.isObject,
  // @ts-ignore
  isDictionary: ccxt.isDictionary,
  // @ts-ignore
  numberToString: ccxt.numberToString,
  // @ts-ignore
  precisionFromString: ccxt.precisionFromString,
  // @ts-ignore
  decimalToPrecision: ccxt.decimalToPrecision,
  // @ts-ignore
  json: ccxt.json,
  // @ts-ignore
  isJsonEncodedObject: ccxt.isJsonEncodedObject,
  // @ts-ignore
  now: ccxt.now,
  // @ts-ignore
  microseconds: ccxt.microseconds,
  // @ts-ignore
  milliseconds: ccxt.milliseconds,
  // @ts-ignore
  seconds: ccxt.seconds,
  // @ts-ignore
  iso8601: ccxt.iso8601,
  // @ts-ignore
  parse8601: ccxt.parse8601,
  // @ts-ignore
  ymdhms: ccxt.ymdhms,
  // @ts-ignore
  sleep: ccxt.sleep,
  // @ts-ignore
  timeout: ccxt.timeout,
  // ...ccxt
};

// console.log(444, ccxtFunctions);
// console.log(444, Object.keys(ccxtFunctions).join(','))
// console.log(444, Object.keys(ccxt).join(','))


// export { OrderSide, OrderType } from 'ccxt/js/src/base/types';
export type OrderSide = 'buy' | 'sell';
export type OrderType = 'limit' | 'market';
