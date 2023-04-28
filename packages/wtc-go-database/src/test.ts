import { prismaClicent } from './client';

export async function test() {
  // const d = {
  //   id: "BTC/USDT_4h_1675915200000",
  //   timestamp: 1675915200000,
  //   open: 22519.56,
  //   high: 22737.48,
  //   low: 22353.71,
  //   close: 22672.25,
  //   volume: 53551.92656,
  //   symbol: "BTC/USDT",
  //   timeframe: "4h",
  // };

  // const res1 = await prismaClicent.klineBian.upsert({
  //   where: {
  //     id: d.id,
  //   },
  //   create: d,
  //   update: d,
  // });

  // console.log(res1);

  // const all = await prismaClicent.klineBian.findMany();
  // console.log(all);
  // all.forEach((item) => {
  //   Object.keys(item).forEach((k) => {
  //     // @ts-ignore
  //     const v = item[k];
  //     console.log(k, v, typeof v, Number(v));
  //     try {
  //       // @ts-ignore
  //       console.log(v + 1);
  //     } catch (e) {
  //       console.log(k, v, e);
  //     }
  //   });
  // });

  const all = await prismaClicent.klineBian.findMany({
    where: {
      timeframe: '1h',
    },
  });
  console.log(all);

  // const all1 = await prismaClicent.klineBian.delete({
  //   where: {
  //     id: "BTC/USDT_4h_1675929600000",
  //   },
  // });
  // console.log(all1);

  // const all = await findManyKline()
  // console.log(all)

  // const all = await deleteKline({ id: "BTC/USDT_4h_1675915200000" });
  // console.log(all);
}

test();
