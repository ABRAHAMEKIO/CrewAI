import axios, { AxiosResponse } from 'axios';

export interface Request {
  cmd?: string;
  msg: string;
  ref?: string;
  webhookOverride?: string;
}

export interface SuccessResponse {
  success: boolean;
  messageId: string;
  createdAt: string;
}

interface ServerSuccessResponse {
  data: SuccessResponse;
}

export interface IsNaughtySuccessResponse {
  isNaughty: boolean;
  phrase: string;
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
  BASE_URL = 'https://api.thenextleg.io/v2';

  authToken: string;

  proxyUrl: string;

  constructor(authToken: string, proxyUrl = '') {
    this.authToken = authToken;
    this.proxyUrl = proxyUrl;
  }

  getConfig(data, path = null) {
    const headers = {
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    };

    if (this.proxyUrl) {
      delete headers.Authorization;
    }

    const baseUrl = this.proxyUrl || this.BASE_URL;

    const config = {
      method: 'POST',
      // add path to url only if it is not call to proxy
      url: path ? `${baseUrl}/${path}` : baseUrl,
      headers,
      data,
      transformResponse: (r: ServerSuccessResponse) => r.data,
    };
    return config;
  }

  async imagine(
    msg: string,
    ref: string,
    webhookOverride: string,
    quality?: number
  ): Promise<SuccessResponse> {
    const data: Request = {
      msg: quality ? `${msg} --quality=${quality}` : msg,
      ref,
      webhookOverride,
    };

    const config = this.getConfig(data, 'imagine');

    const response: AxiosResponse<SuccessResponse> =
      await axios.request<SuccessResponse>(config);
    return response.data;
  }

  async relax(
    msg: string,
    ref: string,
    webhookOverride: string
  ): Promise<SuccessResponse> {
    const data: Request = {
      cmd: 'relax',
      msg,
      ref,
      webhookOverride,
    };

    const config = this.getConfig(data, 'slash-commands');

    const response: AxiosResponse<SuccessResponse> =
      await axios.request<SuccessResponse>(config);
    return response.data;
  }

  async isThisNaughty(msg: string): Promise<IsNaughtySuccessResponse> {
    const data: Request = {
      msg,
    };

    const config = this.getConfig(data, 'isThisNaughty');

    const response: AxiosResponse<IsNaughtySuccessResponse> =
      await axios.request<IsNaughtySuccessResponse>(config);
    return response.data;
  }
}
