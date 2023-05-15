import { KlineItem } from '@victor/victor-go-database';
import {
  ChangePercentResProps,
  OneByOneStateResProps,
  TaMaType,
  TouchWeightPeriod,
  TouchWeightPeriodResProps,
  // changePercent,
  oneByOneState,
  taMa,
} from './calc';

export interface StrategyInfoProps {
  overBar: TouchWeightPeriodResProps;
  outBar: TouchWeightPeriodResProps;
  cp?: ChangePercentResProps;
  obo?: OneByOneStateResProps;
  timeframe?: string;
  symbol?: string;
  // data: KlineItem[];
}

export function createStrategyInfo(
  data: KlineItem[] = [],
  taMaFac: TaMaType = taMa,
  // symbol?: string,
  // timeframe?: string,
) {
  const touchPeriods = new TouchWeightPeriod(taMaFac, data);
  const overBar = touchPeriods.overBarPeriod();
  const outBar = touchPeriods.outBarPeriod();
  // const cp = changePercent(data);
  const obo = oneByOneState(data);
  const info: StrategyInfoProps = {
    overBar,
    outBar,
    // cp,
    obo,
    // timeframe,
    // symbol,
    // data,
  };
  return info;
}
