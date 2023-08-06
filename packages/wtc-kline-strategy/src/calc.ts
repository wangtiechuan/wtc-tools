import * as tb from 'talib-binding';
import { Precise } from '@victor/victor-exchange-api';
import { KlineItem } from '@victor/victor-go-database';

// 用于在talib计算结果时（如ma计算会丢失前面的不够周期计算的数组），补足数组的长度
function fillTaPreRes(taMethodRes: number[], optTime_Period: number) {
  const nanArr: (number | null)[] = [];
  nanArr.length = optTime_Period - 1;
  nanArr.fill(null);
  return nanArr.concat(taMethodRes);
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
export function getNumberFixedLen(num: number | string) {
  const str = String(num);
  const strArr = str.split('.');
  const len = strArr?.[1].length || 0;
  return len;
}

export interface ProbabilityCalcRes<T = number> {
  bottom: T[];
  mid: T[];
  top: T[];
  innermid: T[];
  left: T[];
  right: T[];
}
// (从小到大)根据概率原则计算上中下区间,并对中区间进行再次划分，在取右边时左边和右边分别是什么
export function probabilityCalc(
  probability: number,
): ProbabilityCalcRes<number> {
  const sideHalf = Number(div([probability, 2])!);
  const sideHalfFloor = Math.floor(sideHalf);
  const sideHalfRound = Math.round(sideHalf);

  const mainRound = Number(sub(100, sideHalfFloor)!);
  const mainFloor = Number(sub(100, sideHalfRound)!);

  const mid = [sideHalfFloor, mainRound];
  const dis = sub(mid[1], mid[0])!;
  const per = div([dis, 100])!;
  const leftNum = sub(mid[1], dis)!;
  const innermid = [
    Number(add(leftNum, mul(per, mid[0])!)),
    Number(add(leftNum, mul(per, mid[1])!)),
  ];

  const demarcation = {
    bottom: [0, sideHalfRound], // 取中间时的左边
    mid, // 取中间
    top: [mainFloor, 100], // 取中间时的右边
    innermid, // 取中间后对中间进行再取中间
    left: [0, probability], // 取右边时的左边
    right: [probability, 100], // 取右边时的右边
  };
  return demarcation;
}

// 二八原则，三七，四六，一九。。。
type MiddleProbability = 90 | 80 | 70 | 60;

export interface ProbabilityCalcReverseRes<T = number> {
  reverseBottom: T[];
  reverseMid: T[];
  reverseTop: T[];
  reverseInnermid: T[];
  reverseLeft: T[];
  reverseRight: T[];
}
export interface ProbabilityDemarcationRes<T = number, M = number>
  extends ProbabilityCalcRes<T>,
    ProbabilityCalcReverseRes<T> {
  demarcations: M[];
  hasInnerDemarcations: M[];
}

// 概率划分和反向概率的上中下概率及整合概率
export const getProbabilityDemarcation = (
  middleProbability: MiddleProbability = 80,
): ProbabilityDemarcationRes<number, number> => {
  const baseDemarcation = probabilityCalc(Number(sub(100, middleProbability)!)); // 概率划分
  const rDemarcation = probabilityCalc(middleProbability); // 反向概率划分

  const reverseDemarcation: ProbabilityCalcReverseRes = {
    reverseBottom: rDemarcation.bottom,
    reverseMid: rDemarcation.mid,
    reverseTop: rDemarcation.top,
    reverseInnermid: rDemarcation.innermid,
    reverseLeft: rDemarcation.left,
    reverseRight: rDemarcation.right,
  };

  const mergeDemarcation = { ...baseDemarcation, ...reverseDemarcation };

  const getDemarcations = (hasInnermid?: boolean) =>
    Array.from(
      new Set([
        ...Object.keys(mergeDemarcation).reduce((v, k) => {
          if (!hasInnermid && k.endsWith('nnermid')) {
            return v;
          }
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          v = v.concat(mergeDemarcation[k] as number[]);
          return v;
        }, [] as number[]),
      ]),
    ).sort((a, b) => a - b);
  const demarcations = getDemarcations(); // 不包含中间再划分的其他划分的集合
  const hasInnerDemarcations = getDemarcations(true); // 包含中间再划分的所有划分的集合

  return {
    ...mergeDemarcation,
    demarcations,
    hasInnerDemarcations,
  };
};

// 概率划分和反向概率的上中下概率及整合概率
export const probabilityDemarcation = getProbabilityDemarcation();

// 根据上述计算的概率数据进行对数组数据(需要先正向排序)的概率分组
export function arrayProbabilityDemarcation<T>(data: T[]) {
  const len = data.length;
  const per = div([len, 100])!;
  const func = (fnum: number, dnum: number) => {
    const findex = Math.round(Number(mul(fnum, per)!));
    const dindex = Math.round(Number(mul(dnum, per)!));
    return data.slice(findex, dindex);
  };

  return Object.keys(probabilityDemarcation).reduce((vk, k) => {
    // @ts-ignore
    const indexArr = probabilityDemarcation[k] as number[];
    // @ts-ignore
    vk[k] = indexArr.reduce((v, item, index) => {
      if (index > 0) {
        const preItme = indexArr[index - 1];
        v.push(func(preItme, item));
      }
      return v;
    }, [] as T[][]);
    // @ts-ignore
    if (vk[k].length === 1) {
      // @ts-ignore
      vk[k] = vk[k][0];
    }
    return vk;
  }, {} as ProbabilityDemarcationRes<T, T[]>);
}

// 根据上述计算的概率数据进行对区间内数值的计算
export function sectionProbabilityDemarcation(
  min: number | string,
  max: number | string,
) {
  const dis = sub(max, min)!;
  const per = div([dis, 100])!;
  const leftNum = sub(max, dis)!;

  const res: ProbabilityDemarcationRes<number, number> = {
    ...probabilityDemarcation,
  };
  Object.keys(probabilityDemarcation).forEach((k) => {
    // @ts-ignore
    const indexArr = probabilityDemarcation[k] as number[];
    // @ts-ignore
    res[k] = indexArr.map((num) => {
      return Number(add(leftNum, mul(per, num)!));
    });
  });
  return res;
}

// 将k线的高低变成一条价格数据(根据涨跌选择概率相对更高或更低的数据)
export function mergeHLKline(klines: KlineItem[]) {
  return klines.map((item, index) => {
    const { open, high, low, close } = item;

    const demarcation = sectionProbabilityDemarcation(low, high);
    const moreLow = demarcation.innermid[0];
    const moreHigh = demarcation.innermid[1];

    if (index === 0) {
      return close;
    } else {
      if (close < open) {
        return moreLow;
      } else {
        return moreHigh;
      }
    }
  });
}

export interface ChangePercentResProps {
  top: ProbabilityDemarcationRes<number, number>;
  main: ProbabilityDemarcationRes<number, number>;
  bottom: ProbabilityDemarcationRes<number, number>;
  whole: ProbabilityDemarcationRes<number, number>;
}

// 单个Kline图形上影线、主体、下影线、全部kline的变化幅度及区间分组
export function changePercent(
  klines: KlineItem[],
): ChangePercentResProps | undefined {
  if (klines.length === 0) {
    return undefined;
  }

  const topInfo = { min: Infinity, max: -Infinity };
  const mainInfo = { min: Infinity, max: -Infinity };
  const bottomInfo = { min: Infinity, max: -Infinity };
  const wholeInfo = { min: Infinity, max: -Infinity };

  klines.forEach((kline) => {
    // @ts-ignore
    const candleMainSort = [kline.open, kline.close].sort((a, b) => a - b);
    const mBottom = candleMainSort[0];
    const mTop = candleMainSort[1];

    const top = Number(div([sub(kline.high, mTop)!, kline.high])).toFixed(4);
    const main = Number(div([sub(mTop, mBottom)!, kline.open])).toFixed(4);
    const bottom = Number(div([sub(mBottom, kline.low)!, kline.low])).toFixed(
      4,
    );
    const whole = Number(div([sub(kline.high, kline.low)!, kline.low])).toFixed(
      4,
    );

    const saveMaxMin = (num: number, obj: { min: number; max: number }) => {
      if (num < obj.min) {
        obj.min = num;
      }
      if (num > obj.max) {
        obj.max = num;
      }
    };
    saveMaxMin(Number(top), topInfo);
    saveMaxMin(Number(main), mainInfo);
    saveMaxMin(Number(bottom), bottomInfo);
    saveMaxMin(Number(whole), wholeInfo);
  });

  return {
    top: sectionProbabilityDemarcation(topInfo.min, topInfo.max),
    main: sectionProbabilityDemarcation(mainInfo.min, mainInfo.max),
    bottom: sectionProbabilityDemarcation(bottomInfo.min, bottomInfo.max),
    whole: sectionProbabilityDemarcation(wholeInfo.min, wholeInfo.max),
  };
}

export interface OneByOneStateKline extends KlineItem {
  state: 0 | 1 | -1; // 1 上涨 -1下跌 0 不变
}

interface OneByOneStateResDetailItem {
  per: number;
  scale: number;
  size: number;
  count: number;
  state: 0 | 1 | -1;
  range: ProbabilityDemarcationRes<number, number>;
}

interface OneByOneStateResDetail {
  demarcation: ProbabilityDemarcationRes<number, number[]>;
  list: OneByOneStateResDetailItem[];
  performance: OneByOneStateResDetailItem[];
}

export interface OneByOneStateResProps {
  up: OneByOneStateResDetail;
  down: OneByOneStateResDetail;
}

// 多个kline柱连续上涨和下跌的数量（size）、概率（per）及对应的总幅度（rang）
export function oneByOneState(
  klines: KlineItem[],
): OneByOneStateResProps | undefined {
  if (klines.length === 0) {
    return undefined;
  }

  const { tempKline } = klines.reduce(
    (v, kline, index) => {
      const { open, close } = kline;
      const dir = Number(sub(close, open));
      const tState = dir === 0 ? 0 : dir > 0 ? 1 : -1; // 状态

      const upFun = () => {
        v.preState = tState;
        v.tempKline.push([
          {
            ...kline,
            state: tState,
          },
        ]);
      };

      if (index === 0) {
        upFun();
        return v;
      }

      if (v.preState === tState) {
        v.tempKline[v.tempKline.length - 1].push({
          ...kline,
          state: tState,
        });
      } else {
        upFun();
      }
      return v;
    },
    {
      tempKline: [] as OneByOneStateKline[][],
      preState: 0,
    },
  ); // 对Kline数据进行状态（上涨还是下跌的判断标记）

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [goUpKline, goDownKline, equalLine] = tempKline.reduce(
    (v, item) => {
      const state = item[0].state;

      switch (state) {
        case 1:
          v[0].push(item);
          break;
        case -1:
          v[1].push(item);
          break;
        case 0:
          v[2].push(item);
          break;
        default:
      }

      return v;
    },
    [[], [], []] as [
      OneByOneStateKline[][],
      OneByOneStateKline[][],
      OneByOneStateKline[][],
    ],
  ); // 根据状态分类

  const func = (stateKlines: OneByOneStateKline[][]) => {
    const sizeMap: Map<
      number,
      {
        range: number[];
        state: 0 | 1 | -1;
      }
    > = new Map(); // 存储kline的变化幅度
    stateKlines.forEach((klines) => {
      const size = klines.length;
      const state = klines[0].state;

      const range = (() => {
        const last = klines[klines.length - 1];
        const first = klines[0];
        return Number(
          Math.abs(
            Number(div([sub(last.close, first.open)!, first.open])!),
          ).toFixed(4),
        );
      })(); // Kline的变化幅度

      if (!sizeMap.has(size)) {
        sizeMap.set(size, {
          range: [range],
          state,
        });
        return;
      }
      const nMap = sizeMap.get(size)!;
      nMap.range.push(range);
    });

    const sizeArr = Array.from(sizeMap.keys()).sort((a, b) => a - b); // 所有上涨或下跌数量size 排序

    let sizeSumCount = 0; // 所有上涨或下跌数量size 所有柱子的总和

    const sizeRangeInfo = sizeArr.map((size) => {
      const mp = sizeMap.get(size)!;
      const range = mp.range.slice(0);
      const count = range.length;
      const state = mp.state;

      sizeSumCount = sizeSumCount + count;

      range.sort((a, b) => a - b);
      return {
        size,
        count,
        state,
        range: sectionProbabilityDemarcation(range[0], range[count - 1]),
      };
    });
    sizeRangeInfo.sort((a, b) => b.count - a.count); // 所有上涨或下跌数量size 按比重排序

    const list = sizeRangeInfo.map((sizeInfo, index) => {
      const per = Number(
        Number(div([sizeInfo.count, sizeSumCount]))!.toFixed(2),
      );
      const scale = (() => {
        const nextSizeInfo = sizeRangeInfo[index + 1];
        if (nextSizeInfo === undefined) {
          return 1;
        }
        const nextPer = div([nextSizeInfo.count, sizeSumCount])!;
        return Number(Number(div([per, nextPer])).toFixed(2));
      })(); // 后一个概率比前一个概率的倍数（用以找出变化最大的size，性价比）
      return {
        ...sizeInfo,
        per,
        scale,
      };
    }); // 按概率排序的连续变化的数量及对应的概率（从大到小）

    const performance = list.slice(0);
    performance.sort((a, b) => b.scale - a.scale); // 按性价比排序的连续变化的数量及对应的概率（从大到小）

    return {
      demarcation: arrayProbabilityDemarcation(sizeArr),
      list,
      performance,
    };
  };

  const up = func(goUpKline);
  const down = func(goDownKline);

  return { up, down };
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

export interface TouchRes {
  period: number;
  touchCount: number;
  touchPercent: number;
}
export interface MergePercentMaRes {
  ma: (number | null)[];
  last?: {
    period: number;
    ma: (number | null)[];
  };
}
// 聚合计算ma及概率最高的ma，与touchWeightPeriod配合使用
export function mergePercentMa(
  taMa: TaMaType,
  demarcationRight: TouchRes[],
  mergePercent: number,
  data: KlineItem[],
): MergePercentMaRes | undefined {
  const len = demarcationRight.length;

  if (len === 0) {
    return undefined;
  }

  const closes = data.map((k) => Number(k.close));

  let lastMa: any; // 概率最高的ma数据
  const lastIndex = len - 1;
  const ma = demarcationRight.reduce((v, item, index) => {
    let dataMa = taMa.ma(closes, item.period)!;
    dataMa.forEach((d, index) => {
      if (d === null) {
        v[index] = null;
        return;
      }

      const preItem = v[index];

      const calcWeight = !mergePercent
        ? Number(div([1, len]))
        : Number(div([item.touchPercent, mergePercent])!); // 计算权重

      const vtNum = Number(mul(d, calcWeight));
      if (preItem === undefined) {
        v[index] = vtNum;
        return;
      }
      if (preItem === null) {
        v[index] = null;
        return;
      }
      v[index] = Number(add(preItem, vtNum));
    });
    if (index === lastIndex) {
      lastMa = {
        period: item.period,
        ma: dataMa,
      };
    }
    return v;
  }, [] as (number | null)[]); // 按照概率数据权重计算的整合ma

  return {
    ma,
    last: lastMa as
      | {
          period: number;
          ma: (number | null)[];
        }
      | undefined,
  };
} // 计算满足权重的ma

export interface TouchWeightPeriodResProps {
  weightPeriod: TouchRes[];
  mergePercent: number;
}
export type BetterPeriodDir = 'longer' | 'shorter'; // 周期排序，概率相同时，优先选择长周期还是短周期
export type JudgeFunType = (
  preCount: number,
  maItem: number,
  kline: KlineItem,
  nextKline?: KlineItem,
) => number;
// 均线满足输入条件的周期,及计算权重下的ma
export class TouchWeightPeriod {
  private taMa: TaMaType;
  private data: KlineItem[];
  private minPeriod = 3;
  private normalDataLen = 500; // 假定基础数据长度一般为500
  constructor(taMa: TaMaType, data: KlineItem[]) {
    this.taMa = taMa;
    this.data = data;
  }
  private get periodStep() {
    return this.minPeriod - 1;
  }
  private get dataLen() {
    return this.data.length;
  }
  private get maxPeriod() {
    return Math.max(
      this.minPeriod,
      Math.round(
        Math.min(
          ((this.dataLen - this.minPeriod) *
            probabilityDemarcation.innermid[0]) /
            100,
          (this.normalDataLen * probabilityDemarcation.reverseInnermid[0]) /
            100,
        ),
      ),
    );
  }
  private touchCountFunc = (period: number, judgeFun: JudgeFunType) => {
    const closes = this.data.map((k) => Number(k.close));

    const dataMa = this.taMa.ma(closes, period);
    return this.data.reduce((v, kline, index) => {
      if (index === 0) {
        return v;
      }
      const maItem = dataMa[index]; // 当前的ma值
      if (maItem === null) {
        return v;
      }
      const preKline = this.data[index - 1]; // 上一个Kline
      return judgeFun(v, maItem, kline, preKline);
    }, 0);
  }; // 计算输入周期满足条件的数量及比例
  private lToB(
    judgeFun: JudgeFunType,
    betterPeriodDir: BetterPeriodDir = 'longer',
  ): TouchWeightPeriodResProps {
    const percentRes: TouchRes[] = [];

    for (
      let period = this.minPeriod;
      period <= this.maxPeriod;
      period =
        period +
        (period < this.minPeriod + this.periodStep
          ? this.periodStep - 1
          : this.periodStep)
    ) {
      const touchCount = this.touchCountFunc(period, judgeFun);

      const touchPercent = Number(
        floatRound(Number((touchCount / this.dataLen) * 100), 1)!,
      );

      const info: TouchRes = {
        period,
        touchCount,
        touchPercent,
      };
      const pushFunc = () => {
        percentRes.push(info);
      };

      if (touchPercent >= 51 && touchPercent <= 99) {
        const lastIndex = percentRes.length - 1;
        const lastInfo = percentRes[lastIndex];
        if (lastIndex >= 0) {
          if (touchPercent !== lastInfo.touchPercent) {
            pushFunc();
          } else {
            if (betterPeriodDir === 'shorter') {
            } else {
              percentRes[lastIndex] = info;
            }
          }
        } else {
          pushFunc();
        }
      }
    }

    percentRes.sort((a: TouchRes, b: TouchRes) => {
      if (a.touchPercent !== b.touchPercent) {
        return a.touchPercent - b.touchPercent;
      }
      if (betterPeriodDir === 'shorter') {
        return b.period - a.period;
      }
      return a.period - b.period;
    }); // 先按概率，再按周期长度排序

    const aDemarcation = arrayProbabilityDemarcation(percentRes); // 概率进行分类
    const demarcationRight = aDemarcation.reverseRight.slice(0); // 取概率最高那个小类

    if (demarcationRight.length <= 1) {
      const demarcationRightLeftLast =
        aDemarcation.reverseLeft[aDemarcation.reverseLeft.length - 1]; // 当概率最高那类过少时，从剩下的去概率相对更高的数据
      if (demarcationRightLeftLast !== undefined) {
        demarcationRight.unshift(demarcationRightLeftLast);
      }
    }

    const mergePercent = Number(
      demarcationRight.reduce((v, item) => add(v, item.touchPercent)!, '0'),
    );

    return {
      weightPeriod: demarcationRight,
      mergePercent,
    };
  }
  overBarPeriod() {
    // 均线大多数在柱或引线上的周期
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.lToB((preCount, maItem, kline, nextKline) => {
      if (maItem >= Number(kline.low) && maItem <= Number(kline.high)) {
        return preCount + 1;
      }
      return preCount;
    });
  }
  outBarPeriod() {
    // 均线大多数不会触及的周期
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.lToB((preCount, maItem, kline, nextKline) => {
      const candleMainSort = [kline.open, kline.close].sort(
        (a, b) => Number(a) - Number(b),
      ) as [number, number];
      if (maItem > candleMainSort[1] || maItem < candleMainSort[0]) {
        return preCount + 1;
      }
      return preCount;
    }, 'shorter');
  }
}
