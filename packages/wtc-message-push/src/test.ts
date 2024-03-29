import { dingDingMsgClient } from './dingDingMsgClient';

export async function test() {
  dingDingMsgClient.realSend({
    msgtype: 'text',
    text: {
      content: '我就是我, 是不一样的烟火',
    },
    at: {
      atMobiles: ['156xxxx8827', '189xxxx8325'],
      isAtAll: false,
    },
  });
  dingDingMsgClient.text('我就是我, 是不一样的烟火2', {
    atMobiles: ['156xxxx8827', '189xxxx8325'],
    isAtAll: false,
  });
  dingDingMsgClient.link({
    text: '这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？',
    title: '时代的火车向前开',
    picUrl: '',
    messageUrl:
      'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
  });
  dingDingMsgClient.markdown(
    '杭州天气',
    '#### 杭州天气 @156xxxx8827\n' +
      '> 9度，西北风1级，空气良89，相对温度73%\n\n' +
      '> ![screenshot](http://image.jpg)\n' +
      '> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n',
    {
      atMobiles: ['156xxxx8827', '189xxxx8325'],
    },
  );
  dingDingMsgClient.actionCard({
    title: '乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身',
    text: `![screenshot](@lADOpwk3K80C0M0FoA)
                    ### 乔布斯 20 年前想打造的苹果咖啡厅
                    Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
    hideAvatar: '0',
    btnOrientation: '0',
    btns: [
      {
        title: '内容不错',
        actionURL: 'https://www.dingtalk.com/',
      },
      {
        title: '不感兴趣',
        actionURL: 'https://www.dingtalk.com/',
      },
    ],
  });
  dingDingMsgClient.feedCard([
    {
      title: '时代的火车向前开',
      messageURL:
        'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
      picURL: 'https://www.dingtalk.com/',
    },
    {
      title: '时代的火车向前开2',
      messageURL:
        'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
      picURL: 'https://www.dingtalk.com/',
    },
    {
      title: '时代的火车向前开3',
      messageURL:
        'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
      picURL: 'https://www.dingtalk.com/',
    },
    {
      title: '时代的火车向前开4',
      messageURL:
        'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
      picURL: 'https://www.dingtalk.com/',
    },
  ]);
}

test();
test();
test();
test();
test();
test();

