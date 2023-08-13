import { Precise } from '@victor/victor-exchange-api';
import { KlineItem, findManyKline } from '@victor/victor-go-database';
import * as tb from 'talib-binding';

// 用于在talib计算结果时（如ma计算会丢失前面的不够周期计算的数组），补足数组的长度
function fillTaPreRes(taMethodRes: number[], optTime_Period: number) {
  const nanArr: (number | null)[] = [];
  nanArr.length = optTime_Period - 1;
  nanArr.fill(null);
  return nanArr.concat(taMethodRes);
}

type TaMaTypeProps = (
  inReal: number[],
  optTime_Period: number,
) => (number | null)[];

export type TaMaTypeName = 'ma' | 'ema';

export interface TaMaType {
  ma: TaMaTypeProps;
  name: TaMaTypeName;
}

// ma
export const taMa: TaMaType = {
  name: 'ma',
  ma: (inReal: number[], optTime_Period: number) =>
    fillTaPreRes(tb.MA(inReal, optTime_Period), optTime_Period),
};

// ema
export const taEma: TaMaType = {
  name: 'ema',
  ma: (inReal: number[], optTime_Period: number) =>
    fillTaPreRes(tb.EMA(inReal, optTime_Period), optTime_Period),
};

// 对输入的所有 nums 参数进行 Precise库中的方法 累计计算
function cumulativeCalc(
  preciseCalcFunc: (
    string1: string,
    string2: string,
    precision?: number,
  ) => string | undefined,
  nums: (number | string)[],
  precision?: number,
): string | undefined {
  return nums.reduce((v: any, a: any) => {
    if (isNaN(Number(a))) {
      return v;
    }

    const _a = String(a);
    if (v === undefined) {
      return _a;
    }
    return preciseCalcFunc(v, _a, precision);
  }, undefined);
}

// 加法
export function add(...nums: (number | string)[]): string | undefined {
  return cumulativeCalc(Precise.stringAdd, nums);
}

// 减法
export function sub(...nums: (number | string)[]): string | undefined {
  return cumulativeCalc(Precise.stringSub, nums);
}

// 乘法
export function mul(...nums: (number | string)[]): string | undefined {
  return cumulativeCalc(Precise.stringMul, nums);
}

// 除法
export function div(
  nums: (number | string)[],
  precision?: number,
): string | undefined {
  return cumulativeCalc(Precise.stringDiv, nums, precision);
}

// round，保留指定小数
export function floatRound(n: number | string, m: number | string) {
  const mPow = Math.pow(10, Number(m));
  return div([Math.round(Number(mul(n, mPow)!)), mPow]);
}

// floor，保留指定小数
export function floatFloor(n: number | string, m: number | string) {
  const mPow = Math.pow(10, Number(m));
  return div([Math.floor(Number(mul(n, mPow)!)), mPow]);
}

// 一个区间内的随机数
export function intervalRandomNumber(
  min: number | string,
  max: number | string,
) {
  const dis = sub(max, min)!;
  const randomDis = mul(Math.random(), dis)!;
  return add(min, randomDis)!;
}

// 获取数字的精度的值
export function getNumberFixedLen(num?: number | string | null) {
  if (!num) {
    return 0;
  }
  const str = String(num);
  const strArr = str.split('.');
  const len = strArr?.[1]?.length || 0;
  return len;
}

// 从k线数据中分析出精度的值
export function getNumberFixedLenFromData(data: KlineItem[]) {
  const _data = data.slice(data.length - 5);
  return _data.reduce((v, item) => {
    const flen = getNumberFixedLen(item?.close);
    if (v < flen) {
      return flen;
    }
    return v;
  }, 0);
}

// 对开盘和收盘进行排序
export function getCandleMainSort(kline: KlineItem) {
  const candleMainSort = [kline.open, kline.close].sort(
    (a, b) => Number(a) - Number(b),
  );
  return {
    smaller: Number(candleMainSort[0]),
    bigger: Number(candleMainSort[1]),
  };
}

const fibonacciNumber = [
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
]; // 1000以内的斐波那契数列

interface TouchRes {
  period: number;
  // dataCount: number;
  // touchCount: number;
  touchPercent: number;
}

interface PeriodResProps {
  resDataInfo: {
    distanceMaxFrom?: TouchRes;
    distanceMaxTo?: TouchRes;
    percentResMin?: TouchRes;
    waveFrom?: TouchRes;
    waveto?: TouchRes;
  };
  basePercentRes?: TouchRes;
  wavePercentRes?: TouchRes;
}

interface TouchWeightPeriodCfg {
  taMaFunc?: TaMaType;
  minPeriod?: number;
  maxPeriod?: number;
  periodStep?: number;
  touchPercentMin?: number;
  touchPercentMax?: number;
}

export class TouchWeightPeriod {
  data: KlineItem[];
  taMaFunc = taMa;
  minPeriod: number;
  initMaxPeriod: number;
  periodStep: number;
  touchPercentMin: number;
  touchPercentMax: number;

  constructor(data: KlineItem[], cfg?: TouchWeightPeriodCfg) {
    const {
      taMaFunc = taMa,
      minPeriod = 3,
      maxPeriod = 144,
      periodStep = 1,
      touchPercentMin = 50,
      touchPercentMax = 100,
    } = cfg || {};
    this.data = data;
    this.taMaFunc = taMaFunc;
    this.minPeriod = minPeriod;
    this.initMaxPeriod = maxPeriod;
    this.periodStep = periodStep;
    this.touchPercentMin = touchPercentMin;
    this.touchPercentMax = touchPercentMax;
  }

  get dataLen() {
    return this.data.length;
  }

  destory() {
    this.data = [];
  }

  get lenMaxPeriod() {
    return Math.round(this.dataLen / (this.minPeriod + (this.periodStep - 1)));
  }

  get maxPeriod() {
    return Math.min(this.initMaxPeriod, this.lenMaxPeriod);
  }

  get fibonacciPeriod() {
    return fibonacciNumber.filter(
      (f) => f >= this.minPeriod && f <= this.maxPeriod,
    );
  }

  get periodList() {
    const arr = this.fibonacciPeriod;
    for (
      let period = this.minPeriod;
      period <= this.maxPeriod;
      period = period + this.periodStep
    ) {
      arr.push(period);
    }
    // 从小到大排序的
    return Array.from(new Set(arr)).sort((a, b) => a - b);
  }

  getClosesData() {
    return this.data.map((k) => Number(k.close));
  }

  getPeriod(
    judgeFun: (
      maItem: number,
      kline: KlineItem,
      nextKline?: KlineItem,
    ) => boolean,
    betterPeriodIsShorter?: boolean,
  ) {
    const percentRes: TouchRes[] = [];

    const pushFunc = (info: TouchRes) => {
      percentRes.push(info);
    };

    let dontNeedContinueWhenNextPeriod = false; // 当第一个周期就符合条件，后边的周期会越来越不符合条件，因此一旦出现了不符合规则的，那后边应该都不会符合规则，就没必要计算了
    for (let idx = 0; idx < this.periodList.length; idx++) {
      const period = this.periodList[idx];

      const dataMa = this.taMaFunc.ma(this.getClosesData(), period);
      const touchCount = this.data.reduce((v, kline, index) => {
        if (index === 0) {
          return v;
        }
        const maItem = dataMa[index]; // 当前的ma值
        if (maItem === null) {
          return v;
        }
        const preKline = this.data[index - 1]; // 上一个Kline
        return judgeFun(maItem, kline, preKline) ? v + 1 : v;
      }, 0);

      const percentDecimal = 1;

      const touchPercent = Number(
        floatRound(Number((touchCount / this.dataLen) * 100), percentDecimal)!,
      );

      const info: TouchRes = {
        period,
        // dataCount: this.dataLen,
        // touchCount,
        touchPercent,
      };

      if (
        touchPercent > this.touchPercentMin &&
        touchPercent < this.touchPercentMax
      ) {
        if (idx === 0) {
          dontNeedContinueWhenNextPeriod = true;
        }
        pushFunc(info);
      } else {
        if (dontNeedContinueWhenNextPeriod) {
          break;
        }
      }
    }

    percentRes.sort((a: TouchRes, b: TouchRes) => {
      if (a.touchPercent !== b.touchPercent) {
        // 从小到大排序的
        return a.touchPercent - b.touchPercent;
      }
      if (betterPeriodIsShorter) {
        // 从大到小排序的
        return b.period - a.period;
      }
      // 从小到大排序的
      return a.period - b.period;
    }); // 先按概率，再按周期长度排序

    let percentFilterRes = percentRes;
    // 过滤相邻周期出现相同概率的周期
    if (percentRes.length > 1) {
      const percentResFilter: TouchRes[][] = [];

      let pretempRes: TouchRes[] = [];
      percentRes.forEach((p, index) => {
        if (pretempRes.length === 0) {
          pretempRes.push(p);
          return;
        }
        if (pretempRes[pretempRes.length - 1].touchPercent === p.touchPercent) {
          pretempRes.push(p);
        } else {
          percentResFilter.push(pretempRes);
          if (index === percentRes.length - 1) {
            percentResFilter.push([p]);
            // @ts-ignore
            pretempRes = null;
          } else {
            pretempRes = [p];
          }
        }
      });

      percentFilterRes = percentResFilter.reduce((v, item) => {
        v.push(item[item.length - 1]);
        return v;
      }, []);
    }

    // console.log('percentFilterRes', percentFilterRes);

    // 离指定最小概率（如50%，相当于临界概率周期）最近的周期
    const percentResMin = percentFilterRes[0];

    // 找出平稳概率区间
    interface PercentMapRes {
      count: number;
      arr: TouchRes[];
    }
    const percentMap = new Map<number, PercentMapRes>(); // 概率打平并统计次数来判断是否平稳
    percentFilterRes.forEach((item) => {
      const simplePercent = Math.round(item.touchPercent);
      if (percentMap.has(simplePercent)) {
        const percentMapRes = percentMap.get(simplePercent)!;
        percentMapRes.count = percentMapRes.count + 1;
        percentMapRes.arr.push(item);
        percentMap.set(simplePercent, percentMapRes);
      } else {
        percentMap.set(simplePercent, {
          count: 1,
          arr: [item],
        });
      }
    });

    const percentMapVal = Array.from(percentMap.values());

    let distanceMaxIndex = 0; // 计算概率变化跨度最大的周期
    let distancePercentSub = 0;
    percentMapVal.forEach((item, index) => {
      const itemArr = item.arr;
      const nextItemArr = percentMapVal[index + 1]?.arr;
      if (nextItemArr) {
        const itemSub = Math.abs(
          nextItemArr[0].touchPercent - itemArr[0].touchPercent,
        );
        if (itemSub > distancePercentSub) {
          distancePercentSub = itemSub;
          distanceMaxIndex = index;
        }
      }
    });
    const distanceMaxFrom = percentMapVal?.[distanceMaxIndex]?.arr?.[0]; // 概率变化跨度最大的周期（从）
    const distanceMaxTo = percentMapVal?.[distanceMaxIndex + 1]?.arr?.[0]; // 概率变化跨度最大的周期（到）

    let waveFrom: TouchRes | undefined = undefined; // 状态开始变化（变平稳或者变不平稳）的转折点
    let waveto: TouchRes | undefined = undefined; // 平稳状态初始周期

    const firstPercentMapVal = percentMapVal[0];
    const isAllEqual = percentMapVal.every(
      (item) => item.count === firstPercentMapVal.count,
    );
    if (isAllEqual) {
      // percentMapVal.length === 1 或者 count 都相等时
      const percentMapValFromArrPre =
        percentMapVal?.[percentMapVal.length - 2]?.arr;
      const percentMapValFromArr =
        percentMapVal?.[percentMapVal.length - 1]?.arr;

      if (percentMapValFromArrPre) {
        waveFrom = percentMapValFromArrPre[percentMapValFromArrPre?.length - 1];
        waveto = percentMapValFromArr?.[0];
      } else {
        waveFrom = percentMapValFromArr?.[0];
        waveto = percentMapValFromArr?.[1] || percentMapValFromArr?.[0];
      }
    } else if (percentMapVal.length > 1) {
      let avgIndex = -1;
      let tempMaxCount = -1;
      percentMapVal.forEach((item, index: number) => {
        if (item.count > tempMaxCount) {
          tempMaxCount = item.count;
          avgIndex = index;
        }
      });

      if (avgIndex === 0) {
        //  从平稳到波动
        const percentMapValFromArr = percentMapVal?.[avgIndex]?.arr;
        const percentMapValFromArrNext = percentMapVal?.[avgIndex + 1]?.arr;

        waveFrom = percentMapValFromArr?.[percentMapValFromArr?.length - 1];
        waveto = percentMapValFromArrNext?.[0];
      } else {
        //  从波动到平稳
        const percentMapValFromArrPre = percentMapVal?.[avgIndex - 1]?.arr;
        const percentMapValFromArr = percentMapVal?.[avgIndex]?.arr;
        waveFrom =
          percentMapValFromArrPre?.[percentMapValFromArrPre?.length - 1];
        waveto = percentMapValFromArr?.[0];
      }
    }

    const basePercentRes = (
      betterPeriodIsShorter
        ? distanceMaxFrom?.period < percentResMin?.period
        : distanceMaxFrom?.period > percentResMin?.period
    )
      ? percentResMin
      : distanceMaxFrom;
    const wavePercentRes = waveFrom;

    const resDataInfo = {
      distanceMaxFrom,
      distanceMaxTo,
      percentResMin,
      waveFrom,
      waveto,
    };

    const res: PeriodResProps = {
      resDataInfo,
      basePercentRes,
      wavePercentRes,
    };

    return res;
  }

  getInnerLow2High() {
    return this.getPeriod((maItem, kline) => {
      return maItem >= Number(kline.low) && maItem <= Number(kline.high);
    });
  }

  getOutOpenAndClose() {
    return this.getPeriod((maItem, kline) => {
      const candleMainSort = getCandleMainSort(kline);
      return (
        maItem >= candleMainSort.bigger || maItem <= candleMainSort.smaller
      );
    }, true);
  }

  getInnerOpen2Close() {
    return this.getPeriod((maItem, kline) => {
      const candleMainSort = getCandleMainSort(kline);
      return (
        maItem >= candleMainSort.smaller && maItem <= candleMainSort.bigger
      );
    });
  }

  getOutLowAndHigh() {
    return this.getPeriod((maItem, kline) => {
      return maItem <= Number(kline.low) || maItem >= Number(kline.high);
    }, true);
  }

  getInnerOpen2LowAndClose2High() {
    return this.getPeriod((maItem, kline) => {
      const candleMainSort = getCandleMainSort(kline);
      return (
        (maItem >= candleMainSort.bigger && maItem <= Number(kline.high)) ||
        (maItem <= candleMainSort.smaller && maItem >= Number(kline.low))
      );
    });
  }
}

findManyKline('BTC/USDT', '1d')
  .then((data: any) => {
    const twp = new TouchWeightPeriod(data, {
      // touchPercentMin: 30,
      // touchPercentMax: 90
    });
    console.log(twp.getInnerLow2High());
    console.log(twp.getOutOpenAndClose());
    console.log(twp.getInnerOpen2Close());
    console.log(twp.getOutLowAndHigh());
    console.log(twp.getInnerOpen2LowAndClose2High());
  })
  .catch((e) => {
    console.log(e);
  });
