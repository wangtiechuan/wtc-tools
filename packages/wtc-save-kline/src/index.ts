import {
  ExchangeTypes,
  ExchangeWholeWatch,
  ccxtCatchError,
} from '@victor/victor-exchange-api';
import { findLastKline } from '@victor/victor-go-database';

const TradeSymbol = 'BTC/USDT';

export async function saveKline() {
  const res2 = await findLastKline(TradeSymbol, '1d');
  console.log(44, res2);

  const exg = new ExchangeWholeWatch(ExchangeTypes.spot);
  while (true) {
    let ticker;
    try {
      ticker = await exg.watchTicker(TradeSymbol);
      console.log(ticker.close);
    } catch (e) {
      ccxtCatchError(e);
    }
  }
}

saveKline();