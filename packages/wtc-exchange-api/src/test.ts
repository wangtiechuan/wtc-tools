// import { ExchangeWholeApi } from './api/exchange-api';
import { ExchangeTypes } from './api/exchange-props';
import { ExchangeWholeWatch } from './api/exchange-watch';
import { ccxtCatchError } from './tools/ccxtCatchError';

const TradeSymbol = 'BTC/USDT';

export async function test(TradeSymbol: string) {
  // const exg = new ExchangeWholeApi(ExchangeTypes.spot);
  const exg = new ExchangeWholeWatch(ExchangeTypes.spot);

  // exg
  //   .fetchOHLCV(TradeSymbol, '4h')
  //   .then((res) => {
  //     console.log(res.length);
  //   })
  //   .catch((e) => ccxtCatchError(e));

  let hasError = false;
  while (!hasError) {
    let ticker;
    try {
      ticker = await exg.watchTicker(TradeSymbol);
      console.log(ticker.close);
    } catch (e) {
      hasError = true;
      ccxtCatchError(e);
    }
  }
}

test(TradeSymbol);
