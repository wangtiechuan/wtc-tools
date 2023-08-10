import { DingDingMsgBot } from './dingDingMsgBot';
import Keys from './keys/local.keys';

export const dingDingMsgClient = new DingDingMsgBot({
  webhook: Keys.webhook,
  secret: Keys.secret,
  baseUrl: '',
  accessToken: '',
  //   baseUrl: Keys.baseUrl,
  //   accessToken: Keys.accessToken,
});
