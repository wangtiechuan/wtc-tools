import { KlineItem } from './ccxtToKline';

export function createKlineId(kline: KlineItem) {
  return `${kline.symbol}_${kline.timeframe}_${Number(kline.timestamp)}`;
}
