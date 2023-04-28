// interface KLine {
//   time: number;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// }

// function convertKLineToNMinutes(kLines: KLine[], interval: number): KLine[] {
//   const nMinutesKLines: KLine[] = [];
//   const n = interval / 1; // 因为原始数据是1分钟K线，所以n等于目标间隔除以1分钟
//   let startTime = kLines[0].time;
//   let endTime = startTime + interval * 60 * 1000; // 目标间隔的结束时间
//   let high = kLines[0].high;
//   let low = kLines[0].low;
//   let open = kLines[0].open;
//   let close = kLines[0].close;
//   let volume = kLines[0].volume;
//   let count = 0;

//   for (let i = 1; i < kLines.length; i++) {
//     const kLine = kLines[i];

//     if (kLine.time < endTime) {
//       high = Math.max(high, kLine.high);
//       low = Math.min(low, kLine.low);
//       close = kLine.close;
//       volume += kLine.volume;
//       count++;
//     } else {
//       nMinutesKLines.push({
//         time: startTime,
//         open,
//         high,
//         low,
//         close,
//         volume,
//       });

//       startTime = endTime;
//       endTime = startTime + interval * 60 * 1000;
//       high = kLine.high;
//       low = kLine.low;
//       open = kLine.open;
//       close = kLine.close;
//       volume = kLine.volume;
//       count = 0;
//     }

//     if (i === kLines.length - 1 && count < n) {
//       nMinutesKLines.push({
//         time: startTime,
//         open,
//         high,
//         low,

//         close,
//         volume,
//       });
//     }
//   }

//   return nMinutesKLines;
// }
