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
  sleep: ccxt.sleep,
  // @ts-ignore
  isEmpty: ccxt.isEmpty,
  // @ts-ignore
  iso8601: ccxt.iso8601,
  // @ts-ignore
  parse8601: ccxt.parse8601,
  // ...ccxt
};

// console.log(222, ccxtFunctions);

// console.log(222, Object.keys(ccxtFunctions).join(','))

// export { OrderSide, OrderType } from 'ccxt/js/src/base/types';
export type OrderSide = 'buy' | 'sell';
export type OrderType = 'limit' | 'market';
