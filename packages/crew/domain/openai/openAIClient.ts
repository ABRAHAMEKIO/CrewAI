import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';

export interface Choice {
  text: string;
  index: number;
  logprobs: number | null;
  finishReason: string;
}
export interface CompletionSuccessResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<Choice>;
}

interface ServerCompletionSuccessResponse {
  data: CompletionSuccessResponse;
}

export interface Request {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: number;
  stop: string;
}

export default class OpenAIClient {
  BASE_URL = 'https://api.openai.com/v1';

  apiKey: string;

  proxyUrl: string;

  constructor(apiKey: string, proxyUrl = '') {
    this.apiKey = apiKey;
    this.proxyUrl = proxyUrl;
  }

  completions = async (
    prompt: string,
    model?: string,
    maxTokens?: number,
    temperature?: number,
    topP?: number,
    n?: number,
    stream?: boolean,
    logprobs?: number,
    stop?: string
  ): Promise<CompletionSuccessResponse> => {
    let data;
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    if (this.proxyUrl) {
      delete headers.Authorization;
      data = {
        model: model ?? 'text-davinci-003',
        prompt,
        maxTokens: maxTokens ?? 60,
        temperature: temperature ?? 0,
        topP: topP ?? 1,
        n: n ?? 1,
        stream: stream ?? false,
        logprobs,
        stop: stop ?? '\n',
      };
      console.log('client req:');
      console.log(data);
    } else {
      data = {
        model: model ?? 'text-davinci-003',
        prompt,
        max_tokens: maxTokens ?? 256,
        temperature: temperature ?? 0,
        top_p: topP ?? 1,
        n: n ?? 1,
        stream: stream ?? false,
        logprobs,
        stop: stop ?? '\n',
      };
      console.log('server req:');
      console.log(data);
    }

    const config = {
      method: 'POST',
      url: `${this.proxyUrl || this.BASE_URL}/completions`,
      headers,
      data,
      // transformResponse: (r: ServerCompletionSuccessResponse) => r.data,
    };

    console.log('config:');
    console.log(config);

    const response: AxiosResponse<CompletionSuccessResponse> =
      await axios.request(config);
    console.log('proxyUrl:');
    console.log(this.proxyUrl);
    if (this.proxyUrl) {
      console.log('response: (from next server)');
      console.log(response);
    } else {
      console.log('response: (from openapi server)');
      console.log(response);
    }

    return response.data;
  };
}
