import { Exchange, exchanges, pro } from './exchange-entry';

export interface AnyObject {
  [k: string]: any;
}

export type ExchangeId = keyof typeof exchanges;
export type ExchangeWatchId = keyof typeof pro;

export enum ExchangeTypes {
  'future' = 'future',
  'spot' = 'spot',
  'contract' = 'contract',
  'margin' = 'margin',
  'swap' = 'swap',
  'delivery' = 'delivery',
  'linear' = 'linear',
  'inverse' = 'inverse',
  'option' = 'option',
}

export enum MarginMode {
  'isolated' = 'isolated',
  'cross' = 'cross',
}

export type ExchangeConfig = { [key in keyof Exchange]?: Exchange[key] };
