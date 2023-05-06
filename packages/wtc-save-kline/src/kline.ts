import { OHLCV, timeFrameToMS } from '@victor/victor-exchange-api';
import { KlineItem } from '@victor/victor-go-database';

export type FetchOHLCVFunc = (since?: number) => Promise<OHLCV[]>;
export type ToSaveDataFunc = (
  data: OHLCV[],
  count: number,
) => void | Promise<void>;

export function cycleFillKlineData(
  fromSince: number,
  fetchOHLCV: FetchOHLCVFunc,
  toSaveData: ToSaveDataFunc,
  endSince?: number,
) {
  let since = fromSince;
  return new Promise<boolean>((resolve, reject) => {
    let count = 0;
    let timeMark = 0;
    const func = () => {
      fetchOHLCV(Number(since) - 1000 * 60 * 60 * 8) //  减(东八区)是为了保证数据中包含since
        .then(async (data) => {
          const dataLen = data?.length;
          // console.log(`timeframe:${timeframe} K线数据长度:${dataLen}`);
          if (!dataLen) {
            resolve(dataLen === 0);
            return;
          }
          count += 1;
          // console.log(
          //   `timeframe:${timeframe} since:${since},第一个:${
          //     data?.[0]?.[0]
          //   },第二个:${data?.[1]?.[0]}，倒数第一个:${
          //     data?.[dataLen - 1]?.[0]
          //   },倒数第二个:${data?.[dataLen - 2]?.[0]}`,
          // );

          if (toSaveData instanceof Promise) {
            await toSaveData(data, count);
          } else {
            toSaveData(data, count);
          }

          if (dataLen === 1) {
            resolve(true);
            return;
          }

          const last1Time = data[dataLen - 1][0];

          if (since === last1Time) {
            // update
            resolve(true);
            return;
          }

          const last2 = data[dataLen - 2];
          if (!last2) {
            resolve(true);
            return;
          }

          const last2Time = last2[0];
          if (last2Time === timeMark) {
            // update
            resolve(true);
            return;
          }
          timeMark = last2Time;

          since = last1Time;
          if (endSince !== undefined) {
            if (since > endSince) {
              resolve(true);
              return;
            }
          }
          func();
        })
        .catch((e) => {
          reject(e);
        });
    };
    func();
  });
}

export interface CheckKlineFullRes {
  index: number;
  reverseIndex: number;
  during: number;
  otherDuring: number;
  kline: KlineItem;
  borKline: KlineItem;
  weight: number;
}
export function checkKlineFull(klines?: KlineItem[], timeframe?: string) {
  if (!klines || !klines.length) {
    return;
  }

  const len = klines.length;

  let during = timeframe ? timeFrameToMS(timeframe).to : 0;

  const errIndexs: CheckKlineFullRes[] = [];

  let index = -1;
  for (const kline of klines) {
    index += 1;

    const borKline = klines[index + 1];
    if (!borKline) {
      break;
    }

    const cTime = Number(kline.timestamp);
    const bTime = Number(borKline.timestamp);

    if (during === 0) {
      if (index === 0) {
        during = Math.abs(cTime - bTime);
      }
      continue;
    }

    const otherDuring = Math.abs(cTime - bTime);
    if (otherDuring <= during) {
      continue;
    }

    const weightRel = otherDuring / during;

    errIndexs.push({
      index,
      reverseIndex: len - index - 1,
      during,
      otherDuring,
      kline,
      borKline,
      weight: weightRel,
    });
  }

  return errIndexs;
}

export async function checKlineAndFill(
  fetchOHLCV: FetchOHLCVFunc,
  toSaveData: ToSaveDataFunc,
  klines?: KlineItem[],
  timeframe?: string,
) {
  if (!klines || !klines.length) {
    return;
  }

  const warnArr = checkKlineFull(klines, timeframe);

  if (!warnArr || !warnArr.length) {
    return;
  }

  let hasWarn = false;
  for (let warnItem of warnArr) {
    const t1 = Number(warnItem.kline.timestamp);
    const t2 = Number(warnItem.borKline.timestamp);
    if (t1 === t2) {
      continue;
    }

    const warnFrom = Math.min(t1, t2);
    const warnTo = Math.max(t1, t2);

    const res = await cycleFillKlineData(
      warnFrom,
      fetchOHLCV,
      toSaveData,
      warnTo,
    );
    if (!res) {
      hasWarn = true;
    }
  }

  return !hasWarn;
}
