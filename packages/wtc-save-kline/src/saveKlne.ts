import {
  Dictionary,
  ExchangeTypes,
  ExchangeWholeApi,
  ExchangeWholeWatch,
  ccxtCatchError,
  y1_H,
} from '@victor/victor-exchange-api';
import { findLastKline, upsertCcxtKline } from '@victor/victor-go-database';
import { cycleFillKlineData } from './kline';

const defaultsymbol = 'BTC/USDT';

const defaultTimeframes = [
  '1s',
  '1m', // 太多不能查会出问题 Failed to convert rust `String` into napi `string`
  '3m',
  '5m',
  '15m',
  '30m',
  '1h',
  '2h',
  '4h',
  '6h',
  '8h',
  '12h',
  '1d',
  '3d',
  '1w',
  '1M',
];

const defaultEndSince = () => new Date().getTime();
const defaultFormSince = () => defaultEndSince() - 10 * y1_H;

export class SaveKlineData {
  protected exchange: ExchangeWholeApi;
  protected timeframes: string[];
  constructor(
    exchange: ExchangeWholeApi,
    timeframes: string[] = defaultTimeframes,
  ) {
    this.exchange = exchange;
    // @ts-ignore
    this.timeframes = exchange.realTimeframes(timeframes);
  }
  save(
    onEnd?: (res: Dictionary<any>) => void,
    fromSince?: number,
    endSince?: number,
    symbol = defaultsymbol,
  ) {
    const resMark: Dictionary<any> = {};
    const func = async (tfIndex = 0) => {
      const tf = this.timeframes?.[tfIndex];
      if (!tf) {
        onEnd?.(resMark);
        return;
      }
      let klineDataSinceReal: number | undefined = undefined;
      if (!fromSince) {
        const latestItem = await findLastKline(symbol, tf);
        klineDataSinceReal =
          Number(latestItem?.timestamp) || defaultFormSince();
      }

      let klineDataEndSinceReal: number | undefined = undefined;
      if (!endSince) {
        klineDataEndSinceReal = defaultEndSince();
      }

      cycleFillKlineData(
        klineDataSinceReal!,
        (since?: number) => {
          return this.exchange
            .fetchOHLCV(symbol, tf, since, 1000)
            .catch(ccxtCatchError);
        },
        (d) => {
          d.forEach((item) => {
            upsertCcxtKline(item, symbol, tf);
          });
        },
        klineDataEndSinceReal,
      )
        .finally(() => {
          func(tfIndex + 1);
        })
        .then((res) => {
          resMark[tf] = { res };
        })
        .catch((e) => {
          resMark[tf] = { res: null, e };
        });
    };
    func(0);
  }
}

export function saveKline() {
  const exg = new ExchangeWholeWatch(ExchangeTypes.spot);
  const skd = new SaveKlineData(exg);
  skd.save((res) => {
    console.log('saveKline', res);
  });
}
