import { coverObject } from '@victor/victor-common-tools';
import ccxt, { Exchange } from 'ccxt';
import Keys from '../keys/local.keys';
import { fetchImplementation } from '../tools/fetchImplementation';
import { s1 } from '../tools/timeFrameToMS';
import { OrderSide, OrderType } from './exchange-entry';
import { ExchangeConfig, ExchangeId, ExchangeTypes } from './exchange-props';

type RealExchange = Exchange;
// type RealExchange = Exchange | binance;
// type RealExchange = binance;

class ExchangeApiBase {
  protected exchangeId: ExchangeId;
  protected exchangeType: ExchangeTypes;
  protected exchangeConfig: ExchangeConfig = {
    apiKey: Keys.APIKey,
    secret: Keys.SecretKey,
    timeout: s1 * 5,
    enableRateLimit: true,
    fetchImplementation,
    AbortError: DOMException, // 设置 fetchImplementation（不是ccxt内的fetch-node时） 的时候，需要同时 AbortError 和 FetchError，否则会报错
    FetchError: TypeError, // 设置 fetchImplementation（不是ccxt内的fetch-node时） 的时候，需要同时 AbortError 和 FetchError，否则会报错
    // verbose: true, // ccxt log打印
    options: {
      recvWindow: s1 * 1,
    },
    // precisionMode: undefined,
    // paddingMode: undefined,
  };

  exchange: RealExchange;

  static exchangeTypeMap: Map<ExchangeTypes, RealExchange> = new Map();

  constructor(
    exchangeType: ExchangeTypes = ExchangeTypes.spot,
    exchangeConfig?: ExchangeConfig,
    exchangeId: ExchangeId = 'binance',
  ) {
    this.exchangeId = exchangeId;
    this.exchangeType = exchangeType;

    this.initExchangeConfig(exchangeConfig);

    this.exchange = this.initExchange();
  }

  protected initExchangeConfig(exchangeConfig?: ExchangeConfig) {
    const _exchangeConfig: ExchangeConfig = {
      options: {
        defaultType: this.exchangeType,
      },
    };

    this.exchangeConfig = coverObject(
      coverObject(this.exchangeConfig, _exchangeConfig),
      exchangeConfig,
    )!;
  }

  protected initExchange() {
    if (ExchangeApiBase.exchangeTypeMap.has(this.exchangeType)) {
      return ExchangeApiBase.exchangeTypeMap.get(this.exchangeType)!;
    }
    const Exg = ccxt[this.exchangeId];
    const newExchange = new Exg(this.exchangeConfig) as RealExchange;
    ExchangeApiBase.exchangeTypeMap.set(this.exchangeType, newExchange);

    return newExchange;
  }
}

class ExchangeApi extends ExchangeApiBase {
  setSandboxMode(enabled: any) {
    return this.exchange.setSandboxMode(enabled);
  }
  market(symbol: string) {
    return this.exchange.market(symbol);
  }
  safeMarket(marketId?: any, market?: any, delimiter?: any, marketType?: any) {
    return this.exchange.safeMarket(marketId, market, delimiter, marketType);
  }
  amountToPrecision(symbol: string, amount: any) {
    return this.exchange.amountToPrecision(symbol, amount);
  }
  priceToPrecision(symbol: string, price: any) {
    return this.exchange.priceToPrecision(symbol, price);
  }
  costToPrecision(symbol: string, cost: any) {
    return this.exchange.costToPrecision(symbol, cost);
  }
  currencyToPrecision(code: string, fee: any, networkCode?: any) {
    return this.exchange.currencyToPrecision(code, fee, networkCode);
  }
  nonce() {
    return this.exchange.nonce();
  }
  fetchTime(params?: any) {
    return this.exchange.fetchTime(params);
  }
  fetchCurrencies(params?: any) {
    return this.exchange.fetchCurrencies(params);
  }
  fetchMarkets(params?: any) {
    return this.exchange.fetchMarkets(params);
  }
  fetchBalance(params?: any) {
    return this.exchange.fetchBalance(params);
  }
  fetchOrderBook(symbol: string, limit?: number, params?: any) {
    return this.exchange.fetchOrderBook(symbol, limit, params);
  }
  fetchStatus(params?: any) {
    return this.exchange.fetchStatus(params);
  }
  fetchTicker(symbol: string, params?: any) {
    return this.exchange.fetchTicker(symbol, params);
  }
  fetchBidsAsks(symbols?: string[], params?: any) {
    return this.exchange.fetchBidsAsks(symbols, params);
  }
  fetchLastPrices(symbols?: string[], params?: any) {
    return this.exchange.fetchLastPrices(symbols, params);
  }
  fetchTickers(symbols?: string[], params?: any) {
    return this.exchange.fetchTickers(symbols, params);
  }
  fetchOHLCV(
    symbol: string,
    timeframe?: string,
    since?: number,
    limit?: number,
    params?: any,
  ) {
    return this.exchange.fetchOHLCV(symbol, timeframe, since, limit, params);
  }
  fetchTrades(symbol: string, since?: number, limit?: number, params?: any) {
    return this.exchange.fetchTrades(symbol, since, limit, params);
  }
  editOrder(
    id: string,
    symbol: any,
    type: any,
    side: any,
    amount: any,
    price?: any,
    params?: any,
  ) {
    return this.exchange.editOrder(
      id,
      symbol,
      type,
      side,
      amount,
      price,
      params,
    );
  }
  createOrder(
    symbol: string,
    type: OrderType,
    side: OrderSide,
    amount: any,
    price?: any,
    params?: any,
  ) {
    return this.exchange.createOrder(symbol, type, side, amount, price, params);
  }
  fetchOrder(id: string, symbol?: string, params?: any) {
    return this.exchange.fetchOrder(id, symbol, params);
  }
  fetchOrders(symbol?: string, since?: number, limit?: number, params?: any) {
    return this.exchange.fetchOrders(symbol, since, limit, params);
  }
  fetchOpenOrders(
    symbol?: string,
    since?: number,
    limit?: number,
    params?: any,
  ) {
    return this.exchange.fetchOpenOrders(symbol, since, limit, params);
  }
  fetchClosedOrders(
    symbol?: string,
    since?: number,
    limit?: number,
    params?: any,
  ) {
    return this.exchange.fetchClosedOrders(symbol, since, limit, params);
  }
  cancelOrder(id: string, symbol?: string, params?: any) {
    return this.exchange.cancelOrder(id, symbol, params);
  }
  cancelAllOrders(symbol?: string, params?: any) {
    return this.exchange.cancelAllOrders(symbol, params);
  }
  fetchOrderTrades(
    id: string,
    symbol?: string,
    since?: number,
    limit?: number,
    params?: any,
  ) {
    return this.exchange.fetchOrderTrades(id, symbol, since, limit, params);
  }
  fetchMyTrades(symbol?: string, since?: number, limit?: number, params?: any) {
    return this.exchange.fetchMyTrades(symbol, since, limit, params);
  }
  fetchDeposits(symbol?: string, since?: number, limit?: number, params?: any) {
    return this.exchange.fetchDeposits(symbol, since, limit, params);
  }
  fetchWithdrawals(
    symbol?: string,
    since?: number,
    limit?: number,
    params?: any,
  ) {
    return this.exchange.fetchWithdrawals(symbol, since, limit, params);
  }
  transfer(
    code: string,
    amount: any,
    fromAccount: any,
    toAccount: any,
    params?: any,
  ) {
    return this.exchange.transfer(code, amount, fromAccount, toAccount, params);
  }
  //   fetchTransfers(code?: string, since?: number, limit?: number, params?: any) {
  //     return this.exchange.fetchTransfers(code, since, limit, params);
  //   }
  fetchDepositAddress(code: string, params?: any) {
    return this.exchange.fetchDepositAddress(code, params);
  }
  fetchTransactionFees(codes?: string[], params?: any) {
    return this.exchange.fetchTransactionFees(codes, params);
  }
  fetchDepositWithdrawFees(codes?: string[], params?: any) {
    return this.exchange.fetchDepositWithdrawFees(codes, params);
  }
  withdraw(code: string, amount: any, address: any, tag?: any, params?: any) {
    return this.exchange.withdraw(code, amount, address, tag, params);
  }
  fetchTradingFee(symbol: string, params?: any) {
    return this.exchange.fetchTradingFee(symbol, params);
  }
  fetchTradingFees(params?: any) {
    return this.exchange.fetchTradingFees(params);
  }
  //   futuresTransfer(code: string, amount: any, type: any, params?: any) {
  //     return this.exchange.futuresTransfer(code, amount, type, params);
  //   }
  fetchFundingRate(symbol: string, params?: any) {
    return this.exchange.fetchFundingRate(symbol, params);
  }
  //   fetchFundingRateHistory(
  //     symbol?: string,
  //     since?: number,
  //     limit?: number,
  //     params?: any,
  //   ) {
  //     return this.exchange.fetchFundingRateHistory(symbol, since, limit, params);
  //   }
  fetchFundingRates(symbols?: string[], params?: any) {
    return this.exchange.fetchFundingRates(symbols, params);
  }
  //   loadLeverageBrackets(reload?: boolean, params?: any) {
  //     return this.exchange.loadLeverageBrackets(reload, params);
  //   }
  fetchLeverageTiers(symbols?: string[], params?: any) {
    return this.exchange.fetchLeverageTiers(symbols, params);
  }
  fetchPositions(symbols?: string[], params?: any) {
    return this.exchange.fetchPositions(symbols, params);
  }
  //   fetchAccountPositions(symbols?: string[], params?: any) {
  //     return this.exchange.fetchAccountPositions(symbols, params);
  //   }
  fetchPositionsRisk(symbols?: string[], params?: any) {
    return this.exchange.fetchPositionsRisk(symbols, params);
  }
  //   fetchFundingHistory(
  //     symbol?: string,
  //     since?: number,
  //     limit?: number,
  //     params?: any,
  //   ) {
  //     return this.exchange.fetchFundingHistory(symbol, since, limit, params);
  //   }
  setLeverage(leverage: any, symbol?: string, params?: any) {
    return this.exchange.setLeverage(leverage, symbol, params);
  }
  //   setMarginMode(marginMode: string, symbol?: string, params?: any) {
  //     return this.exchange.setMarginMode(marginMode, symbol, params);
  //   }
  //   setPositionMode(hedged: any, symbol?: string, params?: any) {
  //     return this.exchange.setPositionMode(hedged, symbol, params);
  //   }
  //   fetchSettlementHistory(
  //     symbol?: string,
  //     since?: number,
  //     limit?: number,
  //     params?: any,
  //   ) {
  //     return this.exchange.fetchSettlementHistory(symbol, since, limit, params);
  //   }
  //   fetchLedger(code?: string, since?: number, limit?: number, params?: any) {
  //     return this.exchange.fetchLedger(code, since, limit, params);
  //   }
  //   reduceMargin(symbol: string, amount: any, params?: any) {
  //     return this.exchange.reduceMargin(symbol, amount, params);
  //   }
  //   addMargin(symbol: string, amount: any, params?: any) {
  //     return this.exchange.addMargin(symbol, amount, params);
  //   }
  fetchBorrowRate(code: string, params?: any) {
    return this.exchange.fetchBorrowRate(code, params);
  }
  //   fetchBorrowRateHistory(
  //     code: string,
  //     since?: number,
  //     limit?: number,
  //     params?: any,
  //   ) {
  //     return this.exchange.fetchBorrowRateHistory(code, since, limit, params);
  //   }
  //   fetchBorrowInterest(
  //     code?: string,
  //     symbol?: string,
  //     since?: number,
  //     limit?: number,
  //     params?: any,
  //   ) {
  //     return this.exchange.fetchBorrowInterest(
  //       code,
  //       symbol,
  //       since,
  //       limit,
  //       params,
  //     );
  //   }
  //   repayMargin(code: string, amount: any, symbol?: string, params?: any) {
  //     return this.exchange.repayMargin(code, amount, symbol, params);
  //   }
  //   borrowMargin(code: string, amount: any, symbol?: string, params?: any) {
  //     return this.exchange.borrowMargin(code, amount, symbol, params);
  //   }
  //   fetchOpenInterestHistory(
  //     symbol: string,
  //     timeframe?: string,
  //     since?: number,
  //     limit?: number,
  //     params?: any,
  //   ) {
  //     return this.exchange.fetchOpenInterestHistory(
  //       symbol,
  //       timeframe,
  //       since,
  //       limit,
  //       params,
  //     );
  //   }
  //   fetchOpenInterest(symbol: string, params?: any) {
  //     return this.exchange.fetchOpenInterest(symbol, params);
  //   }
}

export class ExchangeFuncApi extends ExchangeApi {
  timeframes() {
    return this.exchange.timeframes;
  }
  loadMarkets(reload?: boolean | undefined, params?: any) {
    return this.exchange.loadMarkets(reload, params);
  }
  markets(reload?: boolean | undefined, params?: any) {
    return this.loadMarkets(reload, params);
  }
  async currencies(params?: any) {
    if (
      !this.exchange.currencies ||
      !Object.keys(this.exchange.currencies).length
    ) {
      await this.fetchCurrencies(params);
    }
    return this.exchange.currencies;
  }
  parse8601(x: any) {
    return this.exchange.parse8601(x);
  }
  iso8601(timestamp: any) {
    return this.exchange.iso8601(timestamp);
  }
  seconds() {
    return this.exchange.seconds();
  }
  milliseconds() {
    return this.exchange.milliseconds();
  }
  microseconds() {
    return this.exchange.microseconds();
  }
  calculateFee(
    symbol: string,
    type: string,
    side: string,
    amount: number,
    price: number,
    takerOrMaker?: string,
    params?: any,
  ) {
    return this.exchange.calculateFee(
      symbol,
      type,
      side,
      amount,
      price,
      takerOrMaker,
      params,
    );
  }
  decimalToPrecision(
    x: any,
    roundingMode: any,
    numPrecisionDigits: any,
    countingMode?: number,
    paddingMode?: number,
  ) {
    return this.exchange.decimalToPrecision(
      x,
      roundingMode,
      numPrecisionDigits,
      countingMode,
      paddingMode,
    );
  }
  isEmpty(object: any) {
    return this.exchange.isEmpty(object);
  }
  uuid(a?: any) {
    return this.exchange.uuid(a);
  }
  precisionFromString(str?: any) {
    return this.exchange.precisionFromString(str);
  }
  now() {
    return this.exchange.now();
  }
  ymdhms(timestamp: any, infix: any) {
    return this.exchange.ymdhms(timestamp, infix);
  }
  numberToString(x: any) {
    return this.exchange.numberToString(x);
  }
  delay(timeout: any, method: any, ...args: any[]) {
    return this.exchange.delay(timeout, method, ...args);
  }
  parseNumber(value: any, d?: number) {
    return this.exchange.parseNumber(value, d);
  }
  realTimeframes(myTimeframes?: string[]) {
    const timeframes = this.timeframes();
    if (!myTimeframes?.length) {
      return Object.values(timeframes);
    }
    return myTimeframes?.reduce((v, item) => {
      const realTimeframe = timeframes[item];
      if (realTimeframe) {
        v.push(realTimeframe);
      }
      return v;
    }, [] as (string | number)[]);
  }
}

export class ExchangeWholeApi extends ExchangeFuncApi {}
