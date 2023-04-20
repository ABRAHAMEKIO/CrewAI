import axios, { AxiosResponse } from 'axios';

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
  maxTokens: number;
  temperature: number;
  topP: number;
  n: number;
  stream: boolean;
  logprobs: number;
  stop: string;
}

export default class OpenAIClient {
  BASE_URL = 'https://api.openai.com/v1';

  apiKey: string;

  proxyUrl: string | null;

  constructor(apiKey: string, proxyUrl?: string) {
    this.apiKey = apiKey;
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
    const data: Request = {
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

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    if (this.proxyUrl) {
      delete headers.Authorization;
    }

    const config = {
      method: 'POST',
      url: this.proxyUrl ?? this.BASE_URL,
      headers,
      data,
      transformResponse: (r: ServerCompletionSuccessResponse) => r.data,
    };

    const response: AxiosResponse<CompletionSuccessResponse> =
      await axios.request<CompletionSuccessResponse>(config);
    return response.data;
  };
}
