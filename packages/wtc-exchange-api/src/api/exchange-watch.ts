import { coverObject } from '@victor/victor-common-tools';
import { ExchangeWholeApi } from './exchange-api';
import { pro } from './exchange-entry';
import {
  ExchangeConfig,
  ExchangeTypes,
  ExchangeWatchId,
} from './exchange-props';

// type RealExchange = typeof pro[ExchangeWatchId]
type RealExchange = typeof pro.binance.prototype;

class ExchangeWatchBase extends ExchangeWholeApi {
  // @ts-ignore
  exchange: RealExchange;

  static exchangeTypeMap: Map<ExchangeTypes, RealExchange> = new Map();

  constructor(
    exchangeType?: ExchangeTypes,
    exchangeConfig?: ExchangeConfig,
    exchangeId?: ExchangeWatchId,
  ) {
    let proExchangeConfig: ExchangeConfig = { newUpdates: true };
    proExchangeConfig = coverObject(proExchangeConfig, exchangeConfig)!;
    super(exchangeType, proExchangeConfig, exchangeId);
  }

  protected initExchange() {
    if (ExchangeWatchBase.exchangeTypeMap.has(this.exchangeType)) {
      return ExchangeWatchBase.exchangeTypeMap.get(this.exchangeType)!;
    }
    // @ts-ignore
    const Exg = pro[this.exchangeId];
    const newExchange = new Exg(this.exchangeConfig) as RealExchange;
    ExchangeWatchBase.exchangeTypeMap.set(this.exchangeType, newExchange);

    return newExchange;
  }
}

class ExchangeWatch extends ExchangeWatchBase {
  watchOrderBook(symbol: string, limit?: number, params?: any) {
    return this.exchange.watchOrderBook(symbol, limit, params);
  }
  watchTrades(symbol: string, since?: number, limit?: number, params?: any) {
    return this.exchange.watchTrades(symbol, since, limit, params);
  }
  watchOHLCV(
    symbol: string,
    timeframe?: string,
    since?: number,
    limit?: number,
    params?: any,
  ) {
    return this.exchange.watchOHLCV(symbol, timeframe, since, limit, params);
  }
  watchTicker(symbol: string, params?: any) {
    return this.exchange.watchTicker(symbol, params);
  }
  watchTickers(symbols?: string[], params?: any) {
    return this.exchange.watchTickers(symbols, params);
  }
  watchBalance(params?: any) {
    return this.exchange.watchBalance(params);
  }
  watchOrders(symbol: string, since?: number, limit?: number, params?: any) {
    return this.exchange.watchOrders(symbol, since, limit, params);
  }
  watchMyTrades(symbol: string, since?: number, limit?: number, params?: any) {
    return this.exchange.watchMyTrades(symbol, since, limit, params);
  }
}

export class ExchangeWholeWatch extends ExchangeWatch {
  delay(timeout: number, method: any, ...args: any) {
    return this.exchange.delay(timeout, method, ...args);
  }

  close() {
    return this.exchange.close();
  }
}
