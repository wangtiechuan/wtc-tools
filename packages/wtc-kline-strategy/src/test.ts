import { findManyKline } from '@victor/victor-go-database';
import { createStrategyInfo } from './createStrategyInfo';

export async function test() {
  findManyKline('BTC/USDT', '1d').then((data: any) => {
    const info = createStrategyInfo(data);
    console.log(JSON.stringify(info, null, 2));
  });
}

test();
