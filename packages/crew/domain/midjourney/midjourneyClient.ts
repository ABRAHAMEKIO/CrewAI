import axios from "axios";

export interface Request {
  cmd: string;
  msg: string;
  ref: string;
  webhookOverride: string;
}

export interface SuccessResponse {
  success: boolean;
  messageId: string;
  createdAt: string;
}

export interface WebhookSuccessResponse {
  content: string;
  imageUrl: string;
  buttons: string[];
  createdAt: string;
  responseAt: string;
  ref: string;
  originatingMessageId: string;
  buttonMessageId: string;
}
export default class MidjourneyClient {
  BASE_URL: string = "https://api.thenextleg.io";
  authToken: string;
  proxyUrl: string;

  constructor(authToken: string, proxyUrl = "") {
    this.authToken = authToken;
    this.proxyUrl = proxyUrl;
  }

  async imagine(msg: string, ref: string, webhookOverride: string): Promise<SuccessResponse> {
    const data : Request = {
      "cmd": "imagine",
      msg,
      ref,
      webhookOverride
    }

    const headers = {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      };

    if(this.proxyUrl) {
      delete headers["Authorization"];
    }

    const config = {
      method: "POST",
      url: this.proxyUrl || this.BASE_URL,
      headers,
      data
    }

    const response : Promise<Promise<{ data: SuccessResponse }>> | any = await axios(config);
    return response.data;
  }

}
