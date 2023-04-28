
const myTimeframes = [
  // "1m", // 太多不能查会出问题 Failed to convert rust `String` into napi `string`
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "12h",
  "1d",
  "3d",
  "1w",
];
export async function test() {
  const exg = new ExchangeApi();

  const timeframes = exg.timeframes();

  const realTimeframes = myTimeframes.map((item) => timeframes[item]);

  // console.log(timeframes);

  const klineDataSince = new Date().getTime() - 10 * 365 * d1;

  realTimeframes.forEach(async (timeframe: any) => {
    const fetchOHLCV: FetchOHLCVFunc = (since) => {
      return exg.fetchOHLCV(TradeSymbol, timeframe, since);
    };
    const toSaveData: ToSaveDataFunc = (d) => {
      // console.log(d[0], d[d.length - 1]);
      d.forEach((item) => {
        upsertCcxtKline(item, TradeSymbol, timeframe);
      });
      // appendIntoFile("./aa.json", JSON.stringify(d));
    };

    // const res = await findManyKline(TradeSymbol, timeframe);
    // const res1 = await findFirstKline(TradeSymbol, timeframe);
    const res2 = await findLastKline(TradeSymbol, timeframe);
    // const res3 = await findKline({ id: res?.id! });

    const klineDataSinceReal = Number(res2?.timestamp || klineDataSince);
    const fillFullRes = await cycleFillKlineData(
      klineDataSinceReal,
      fetchOHLCV,
      toSaveData
    );
    console.log(fillFullRes);

    // console.log(res);
    // console.log(res?.map(item=>item.timestamp));

    // const res2 = checkKlineFull(res as any, timeframe);
    // console.log(timeframe, res2?.length);

    // appendIntoFile(
    //   "./bb.json",
    //   JSON.stringify(
    //     res2?.map((item) => {
    //       item.kline.timestamp = Number(item.kline.timestamp);
    //       item.borKline.timestamp = Number(item.borKline.timestamp);
    //       return {
    //         ...item,
    //       };
    //     })
    //   )
    // );

    // const fillRes = await checKlineAndFill(
    //   fetchOHLCV,
    //   toSaveData,
    //   res as any,
    //   timeframe
    // );

    // console.log(fillRes);
  });
}

test();
