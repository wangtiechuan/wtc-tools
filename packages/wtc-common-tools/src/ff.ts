interface Kline {
  h: number;
  l: number;
  o: number;
  c: number;
}

function calculateEMA(n: number, klines: Kline[]): number[] {
  const ema: number[] = [];
  const closes = klines.map((kline) => kline.c);
  const sma = closes.slice(0, n).reduce((acc, close) => acc + close, 0) / n;
  ema[n - 1] = sma;
  const multiplier = 2 / (n + 1);
  for (let i = n; i < klines.length; i++) {
    ema[i] = (closes[i] - ema[i - 1]) * multiplier + ema[i - 1];
  }
  return ema;
}

function isEMAOnShadow(ema: number, kline: Kline): boolean {
  const upperShadow = kline.h - Math.max(kline.o, kline.c);
  const lowerShadow = Math.min(kline.o, kline.c) - kline.l;
  return ema >= kline.h - upperShadow || ema <= kline.l + lowerShadow;
}

function sortNValues(nValues: number[], klines: Kline[]): number[] {
  const emaValues = nValues.map((n) => calculateEMA(n, klines));
  const emaCounts = emaValues.map(
    (emas) => klines.filter((kline, i) => isEMAOnShadow(emas[i], kline)).length,
  );
  const nValueCounts = nValues.map((n, i) => ({ n, count: emaCounts[i] }));
  nValueCounts.sort((a, b) => b.count - a.count);
  return nValueCounts.map((nValue) => nValue.n);
}

// const klines: Kline[] = [
//   { h: 10, l: 5, o: 8, c: 7 },
//   { h: 12, l: 6, o: 9, c: 10 },
//   { h: 15, l: 8, o: 11, c: 12 },
//   { h: 18, l: 10, o: 13, c: 15 },
//   { h: 20, l: 12, o: 16, c: 18 },
//   { h: 22, l: 11, o: 17, c: 13 },
//   { h: 20, l: 9, o: 14, c: 10 },
//   { h: 17, l: 7, o: 11, c: 12 },
//   { h: 14, l: 5, o: 9, c: 8 },
//   { h: 12, l: 4, o: 7, c: 5 },
// ];

// const nValues = [3, 5, 7, 10];
// const sortedNValues = sortNValues(nValues, klines);
// console.log(sortedNValues); // [10, 7, 5, 3]
