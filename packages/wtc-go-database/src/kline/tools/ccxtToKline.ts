import { OHLCV } from "../../../../exchange_api/src/api/exchangeApi";
import { createKlineId } from "./createKlineId";

export type NumberLikeType = number | string;

export interface KlineItem {
  id?: string;
  timestamp: NumberLikeType | bigint;
  open: NumberLikeType;
  high: NumberLikeType;
  low: NumberLikeType;
  close: NumberLikeType;
  volume: NumberLikeType;
  symbol: string;
  timeframe: string;
}

export function ccxtToKline(
  item: OHLCV,
  symbol: string,
  timeframe: string
): KlineItem {
  const [timestamp, open, high, low, close, volume] = item;
  const info: KlineItem = {
    timestamp,
    open,
    high,
    low,
    close,
    volume,
    symbol,
    timeframe,
  };
  return {
    id: createKlineId(info),
    ...info,
  };
}

export function klineToCcxt(kline: KlineItem) {
  const { timestamp, open, high, low, close, volume } = kline;
  return [timestamp, open, high, low, close, volume] as OHLCV;
}
