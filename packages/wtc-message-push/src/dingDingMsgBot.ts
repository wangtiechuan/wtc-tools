import axios from 'axios';
import crypto from 'crypto';

interface AnyObject {
  [k: string]: any;
}

export function dingDingSign(secret: string, content: string) {
  const str = crypto
    .createHmac('sha256', secret)
    .update(content)
    .digest()
    .toString('base64');
  return encodeURIComponent(str);
}

export interface DingDingMsgBotOptions {
  webhook: string; // 完整的接口地址
  baseUrl: string; // 接口地址
  accessToken: string; // accessToken
  secret: string; // secret
}

export enum DingDingMsgBotSendMsgtype {
  text = 'text',
  link = 'link',
  markdown = 'markdown',
  actionCard = 'actionCard',
  feedCard = 'feedCard',
}

export interface DingDingMsgBotSendText extends AnyObject {
  content: string;
}

export interface DingDingMsgBotSendAt extends AnyObject {
  atMobiles?: string[];
  atUserIds?: string[];
  isAtAll?: boolean;
}

export interface DingDingMsgBotSendLink extends AnyObject {
  title: string; // 标题
  text: string; // 消息内容
  messageUrl: string; // 跳转的Url
  picUrl: string; // 图片的链接
}

export interface DingDingMsgBotSendMarkdown extends AnyObject {
  title: string;
  text: string; // 消息内容(支持Markdown)
}

export interface DingDingMsgBotSendActionCard extends AnyObject {
  title: string; // 标题
  text: string; // 消息内容
  btnOrientation: '0' | '1'; // 按钮排列的方向(0竖直，1横向，默认为0)
  hideAvatar: '0' | '1'; // 是否显示消息发送者头像。(0：正常发消息者头像, 1：隐藏发消息者头像)
  btns?: {
    title: string; // 某个按钮标题
    actionURL: string; // 某个按钮链接
  }[];
}

export interface DingDingMsgBotSendFeedCardLinkItem extends AnyObject {
  title: string; // 标题
  messageURL: string; // 跳转的Url
  picURL: string; // 图片的链接
}

export interface DingDingMsgBotSendFeedCard extends AnyObject {
  links?: DingDingMsgBotSendFeedCardLinkItem[];
}

export interface DingDingMsgBotSendProps extends AnyObject {
  msgtype: DingDingMsgBotSendMsgtype | string;
  at?: DingDingMsgBotSendAt;
  text?: DingDingMsgBotSendText;
  link?: DingDingMsgBotSendLink;
  markdown?: DingDingMsgBotSendMarkdown;
  actionCard?: DingDingMsgBotSendActionCard;
  feedCard?: DingDingMsgBotSendFeedCard;
}

export class DingDingMsgBot {
  private httpclient = axios;
  private webhook: string;
  private secret: string;
  limitCountOneMin = 20;
  private msgList: DingDingMsgBotSendProps[] = [];
  private timer: undefined | NodeJS.Timeout = undefined;

  constructor(options: DingDingMsgBotOptions) {
    this.webhook =
      options.webhook ||
      `${options.baseUrl}?access_token=${options.accessToken}`;
    this.secret = options.secret;
  }

  // 发送钉钉消息
  realSend(content: DingDingMsgBotSendProps) {
    let signStr = '';
    if (this.secret) {
      const timestamp = Date.now();
      signStr =
        '&timestamp=' +
        timestamp +
        '&sign=' +
        dingDingSign(this.secret, timestamp + '\n' + this.secret);
    }
    return this.httpclient({
      url: this.webhook + signStr,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(content),
    });
  }

  get limitTimerTime() {
    return (60 / this.limitCountOneMin) * 1001;
  }

  private send(content: DingDingMsgBotSendProps) {
    this.msgList.push(content);

    if (!this.timer && this.msgList.length === 1) {
      const message = this.msgList.shift();
      if (message) {
        this.realSend(message);
      }
    }

    this.timer =
      this.timer ||
      setInterval(() => {
        const message = this.msgList.shift();
        if (message) {
          this.realSend(message);
        } else {
          clearInterval(this.timer);
          this.timer = undefined;
        }
      }, this.limitTimerTime);
  }
  // 发送纯文本消息，支持@群内成员
  text(text: string, at: DingDingMsgBotSendAt = {}) {
    return this.send({
      msgtype: DingDingMsgBotSendMsgtype.text,
      text: {
        content: text,
      },
      at,
    });
  }

  // 发送单个图文链接
  link(link: DingDingMsgBotSendLink) {
    return this.send({
      msgtype: DingDingMsgBotSendMsgtype.link,
      link,
    });
  }

  // 发送Markdown消息
  markdown(
    title: string,
    text: string, // 消息内容(支持Markdown)
    at: DingDingMsgBotSendAt = {},
  ) {
    return this.send({
      msgtype: DingDingMsgBotSendMsgtype.markdown,
      markdown: {
        title,
        text,
      },
      at,
    });
  }

  // 发送actionCard(动作卡片) 支持多个按钮，支持Markdown
  actionCard(card: DingDingMsgBotSendActionCard) {
    return this.send({
      msgtype: DingDingMsgBotSendMsgtype.actionCard,
      actionCard: card,
    });
  }

  // 发送feedCard，支持多图文链接 links可包含多个link，建议不要超过4个
  feedCard(links: DingDingMsgBotSendFeedCardLinkItem[]) {
    return this.send({
      msgtype: DingDingMsgBotSendMsgtype.feedCard,
      feedCard: {
        links,
      },
    });
  }
}
