import { prismaClicent } from '../client';
import { ccxtToKline, KlineItem, OHLCV } from './tools/ccxtToKline';

export async function upsertKline(kline: KlineItem) {
  try {
    const res = await prismaClicent.klineBian.upsert({
      where: {
        id: kline.id,
      },
      // @ts-ignore
      create: kline,
      // @ts-ignore
      update: kline,
    });
    return res;
  } catch (e) {
    console.log('upsertKline');
    console.log(kline);
    console.log(e);
  }
}

export async function upsertCcxtKline(
  item: OHLCV,
  symbol: string,
  timeframe: string,
) {
  const kline = ccxtToKline(item, symbol, timeframe);

  return await upsertKline(kline);
}

export async function findManyKline(symbol?: string, timeframe?: string) {
  try {
    const res = await prismaClicent.klineBian.findMany({
      where: {
        symbol,
        timeframe,
      },
      orderBy: {
        timestamp: 'asc',
      },
      // take: 3,
    });
    return res;
  } catch (e) {
    console.log('findManyKline');
    console.log(symbol, timeframe);
    console.log(e);
  }
}

export async function findKline({ id }: { id: string }) {
  try {
    const res = await prismaClicent.klineBian.findUnique({
      where: {
        id,
      },
    });
    return res;
  } catch (e) {
    console.log('findKline');
    console.log(id);
    console.log(e);
  }
}

export async function findFirstKline(symbol?: string, timeframe?: string) {
  try {
    const res = await prismaClicent.klineBian.findFirst({
      where: {
        symbol,
        timeframe,
      },
      orderBy: {
        timestamp: 'asc',
      },
    });
    return res;
  } catch (e) {
    console.log('findFirstKline');
    console.log(symbol, timeframe);
    console.log(e);
  }
}

export async function findLastKline(symbol?: string, timeframe?: string) {
  try {
    const res = await prismaClicent.klineBian.findFirst({
      where: {
        symbol,
        timeframe,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
    return res;
  } catch (e) {
    console.log('findLastKline');
    console.log(symbol, timeframe);
    console.log(e);
  }
}

export async function deleteKline({ id }: { id: string }) {
  try {
    const res = await prismaClicent.klineBian.delete({
      where: {
        id,
      },
    });
    return res;
  } catch (e) {
    console.log('deleteKline');
    console.log(id);
    console.log(e);
  }
}
