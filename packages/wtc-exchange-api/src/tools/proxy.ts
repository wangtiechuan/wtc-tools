import * as HttpsProxyAgent from "https-proxy-agent";

const agentUri = "http://127.0.0.1:1087";
// @ts-ignore
export const agent = new HttpsProxyAgent(agentUri);
