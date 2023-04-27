import BigNumber from 'bignumber.js';

function ma(data: number[], n: number): BigNumber[] {
  const result: BigNumber[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < n - 1) {
      result.push(new BigNumber('0'));
      continue;
    }
    const sum = data.slice(i - n + 1, i + 1).reduce((acc, cur) => acc + cur);
    const avg = new BigNumber(sum).dividedBy(n);
    result.push(avg);
  }

  return result;
}

function ema(data: number[], n: number): BigNumber[] {
  const result: BigNumber[] = [];

  const k = new BigNumber(2).dividedBy(n + 1);
  let ema = new BigNumber(data[0]);

  result.push(ema);

  for (let i = 1; i < data.length; i++) {
    ema = new BigNumber(data[i])
      .times(k)
      .plus(ema.times(new BigNumber(1).minus(k)));
    result.push(ema);
  }

  return result;
}

function macd(
  data: number[],
  fast: number,
  slow: number,
  signal: number,
): [BigNumber[], BigNumber[]] {
  const emaFast = ema(data, fast);
  const emaSlow = ema(data, slow);
  const dif: BigNumber[] = [];
  const dea: BigNumber[] = [];

  for (let i = 0; i < data.length; i++) {
    const d = emaFast[i].minus(emaSlow[i]);
    dif.push(d);

    if (i === 0) {
      dea.push(d);
    } else {
      const prevDea = dea[i - 1];
      const currDea = prevDea
        .times(new BigNumber(signal - 1))
        .dividedBy(signal + 1)
        .plus(d.times(2).dividedBy(signal + 1));
      dea.push(currDea);
    }
  }

  return [dif, dea];
}
