// interface Kline {
//   h: number;
//   l: number;
//   o: number;
//   c: number;
// }

// function calculateEMA(n: number, klines: Kline[]): number[] {
//   const emaValues: number[] = [];

//   let sma = 0;
//   for (let i = 0; i < n; i++) {
//     sma += klines[i].c;
//   }
//   sma /= n;

//   emaValues.push(sma);

//   const multiplier = 2 / (n + 1);
//   for (let i = n; i < klines.length; i++) {
//     const ema =
//       (klines[i].c - emaValues[i - n]) * multiplier + emaValues[i - n];
//     emaValues.push(ema);
//   }

//   return emaValues;
// }

// function calculateEMAOnKline(n: number, kline: Kline): number {
//   return (2 / (n + 1)) * (kline.c - kline.o) + kline.o;
// }

// function calculateEMAOnAllKlines(n: number, klines: Kline[]): number[] {
//   const emaValues = calculateEMA(n, klines);

//   const emaOnKlines: number[] = [];
//   for (let i = 0; i < klines.length; i++) {
//     const ema = calculateEMAOnKline(n, klines[i]);
//     emaOnKlines.push(ema);
//   }

//   return emaOnKlines;
// }

// function compareEMAAndKline(ema: number, kline: Kline): boolean {
//   return ema >= kline.h || ema <= kline.l;
// }

// function sortNValuesByEMAIntersection(
//   nValues: number[],
//   klines: Kline[],
// ): number[] {
//   const nValueEmaIntersectionRatios: number[] = [];

//   for (let i = 0; i < nValues.length; i++) {
//     const emaOnKlines = calculateEMAOnAllKlines(nValues[i], klines);
//     let emaIntersectionCount = 0;

//     for (let j = 0; j < klines.length; j++) {
//       if (compareEMAAndKline(emaOnKlines[j], klines[j])) {
//         emaIntersectionCount++;
//       }
//     }

//     const emaIntersectionRatio = emaIntersectionCount / klines.length;
//     nValueEmaIntersectionRatios.push(emaIntersectionRatio);
//   }

//   const sortedNValues = [...nValues].sort((a, b) => {
//     const aRatio = nValueEmaIntersectionRatios[nValues.indexOf(a)];
//     const bRatio = nValueEmaIntersectionRatios[nValues.indexOf(b)];
//     return bRatio - aRatio;
//   });

//   return sortedNValues;
// }
