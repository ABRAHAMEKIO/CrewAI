import axios, { AxiosResponse } from 'axios';
import { PromptAttributes } from '../../db/models/prompt';

export interface Request {
  cmd?: string;
  msg: string;
  ref?: string;
  webhookOverride?: string;
}

export interface ButtonRequest {
  button: string;
  buttonMessageId: string;
  ref?: string;
  webhookOverride?: string;
}

export interface SuccessResponse {
  success: boolean;
  messageId: string;
  createdAt: string;
}

export interface IsNaughtySuccessResponse {
  isNaughty: boolean;
  phrase: string;
}

// TODO: need to separate it from the OpenJourney usage in openjourneyHookProcessor.js
export interface WebhookSuccessResponse {
  content?: string;
  imageUrl?: string;
  buttons?: string[];
  createdAt?: string;
  responseAt?: string;
  ref?: string;
  originatingMessageId?: string;
  buttonMessageId?: string;
  prompt?: PromptAttributes;
  output?: string[];
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
      validateStatus(status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    return config;
  }

  async imagine(
    msg: string,
    ref: string,
    webhookOverride: string,
    quality?: number
  ): Promise<SuccessResponse | IsNaughtySuccessResponse> {
    const data: Request = {
      msg: quality ? `${msg} --quality=${quality}` : msg,
      ref,
      webhookOverride,
    };

    const config = this.getConfig(data, 'imagine');
    const response = await axios.request<
      SuccessResponse | IsNaughtySuccessResponse
    >(config);
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

  async button(
    button: string,
    buttonMessageId: string,
    ref: string,
    webhookOverride: string
  ): Promise<SuccessResponse | IsNaughtySuccessResponse> {
    const data: ButtonRequest = {
      button,
      buttonMessageId,
      ref,
      webhookOverride,
    };

    const config = this.getConfig(data, 'button');
    const response = await axios.request<
      SuccessResponse | IsNaughtySuccessResponse
    >(config);
    return response.data;
  }
}
