const ccxt = require('ccxt');
// export https_proxy=http://127.0.0.1:23457;export http_proxy=http://127.0.0.1:23457;export all_proxy=socks5://127.0.0.1:23456
const https_proxy = 'http://127.0.0.1:23457/';
const ws_proxy = 'socks5://127.0.0.1:23456/';

const Keys = {
  APIKey: 'JZ6FLhM7vtS10i1T8urhL86tbEkBKBSBdSkregfEzctobKBIdk0wA9sXeXPIqWfE',
  SecretKey: 'ue3eG2kk5NTEsiOp4Nlpaj8rpgk2yeAstWcr8jh0C1txWTO7j71s8wEgrhU9LqoC',
};

const ex = new ccxt.binance({
  apiKey: Keys.APIKey,
  secret: Keys.SecretKey,
  timeout: 30000,
  enableRateLimit: true,
  // options: {
  //   defaultType: 'spot',
  // },
});

ex.httpsProxy = https_proxy;

// ex.fetchTicker('BTC/USDT')
//   .then((res) => {
//     console.log(111, res);
//   })
//   .catch((e) => {
//     console.log(222, e);
//   });

const sfunc = () => {
  let preLastItemId = undefined;
  const ofunc = (st) => {
    // 从小到大排序的
    ex.fetchOHLCV('BTC/USDT', '1h', st)
      .then((res) => {
        const resLen = res.length;

        const lastItems = res.slice(resLen - 2);
        const lastItem = lastItems[0];
        console.log('---');
        console.log(res[0], res[res.length - 1]);
        console.log(lastItems);
        console.log(lastItem);
        const lastItemId = lastItem[0];
        if (lastItemId === preLastItemId) {
          return;
        }
        preLastItemId = lastItemId;
        ofunc(lastItemId);
      })
      .catch((e) => {
        console.log(222, e);
      });
  };

  // const preTime = 1000 * 60 * 60 * 24 * 365 * 10;
  const preTime = 1000 * 60 * 60 * 4;
  const since = new Date().getTime() - preTime;
  const st = since - 1000 * 60 * 60 * 8; //  减(东八区)是为了保证数据中包含since
  console.log('st', st);
  ofunc(st);
};

sfunc();

// const bfunc = () => {
//   ex.fetchBalance()
//     .then((res) => {
//       console.log(111, res);
//     })
//     .catch((e) => {
//       console.log(222, e);
//     });
// };

// bfunc();

// ex.loadMarkets()
//   .then((res) => {
//     console.log(111, res);
//   })
//   .catch((e) => {
//     console.log(222, e);
//   });

ex.createOrder('BTC/USDT', 'market', 'buy', 0.1)
  .then((res) => {
    console.log(111, res);
  })
  .catch((e) => {
    console.log(222, e);
  });

const w_ex = new ccxt.pro.binance({
  //   apiKey: API_KEY,
  //   secret: API_SECRET,
  timeout: 30000,
  enableRateLimit: true,
  // options: {
  //   defaultType: 'spot',
  // },
});

w_ex.socksProxy = ws_proxy;
w_ex.wssProxy = ws_proxy;

w_ex
  .loadProxyModules()
  .then((res) => {
    console.log(11, res);

    const func = () => {
      setTimeout(() => {
        w_ex
          .watchTicker('BTC/USDT')
          .then((res) => {
            console.log(111, res.last);
          })
          .catch((e) => {
            console.log(222, e);
          })
          .finally(() => {
            func();
          });
      }, 500);
    };
    // func();

    const func1 = () => {
      setTimeout(() => {
        w_ex
          .watchOHLCV('BTC/USDT', '1m')
          .then((res) => {
            console.log(111, res);
          })
          .catch((e) => {
            console.log(222, e);
          })
          .finally(() => {
            func1();
          });
      }, 500);
    };
    func1();
  })
  .catch((e) => {
    console.log(22, e);
  });
