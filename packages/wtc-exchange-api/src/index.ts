// import { ccxtToKline } from "../database/src/kline/tools/ccxtToKline";
// import { upsertCcxtKline } from "../database/src/kline";

import { NetworkError } from 'ccxt';
import { ExchangeTypes } from './api/exchange-props';
import { ExchangeWholeWatch } from './api/exchange-watch';
import { ccxtCatchError } from './tools/ccxtCatchError';

export * from './api/exchange-entry'

const TradeSymbol = 'BTC/USDT';

export async function test(TradeSymbol: string) {
  // const exg = new ExchangeApi(ExchangeTypes.spot);

  const exg = new ExchangeWholeWatch(ExchangeTypes.spot);
  // const exg2 = new ExchangeWatch(ExchangeTypes.spot);

  // exg
  //   .fetchOHLCV(TradeSymbol, '4h')
  //   .then((res) => {
  //     console.log(res.length);
  //     // console.log(ccxtToKline(res[res.length - 1], TradeSymbol, '4h'));
  //     // console.log(
  //     //   await upsertCcxtKline(res[res.length - 1], TradeSymbol, "4h")
  //     // );
  //   })
  //   .catch((e) => ccxtCatchError(e));

  while (true) {
    let ticker;
    try {
      ticker = await exg.watchTicker(TradeSymbol);
      console.log(ticker.close);
    } catch (e) {
      ccxtCatchError(e);
      if (!(e instanceof NetworkError)) {
        throw e;
      }
    }
  }

  // exg.toWatchTicker({ symbol: TradeSymbol }, (t) => {
  //   console.log(t.close);
  // });
}

test(TradeSymbol);
