/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { PromptAttributes } from '../../db/models/prompt';

export interface ErrorResponse {
  error: string;
}

export interface PaginationSuccessResponse {
  prompt: {
    count: number;
    limit: number;
    rows: PromptAttributes[];
  };
}

export default class PromptClient {
  getConfig(
    data: object | string,
    path: string,
    reqMethod: string,
    params: object | string
  ) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const config = {
      method: reqMethod,
      url: `/${path}`,
      headers,
      data,
      params,
      validateStatus(status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    return config;
  }

  async pagination({
    page,
  }: {
    page: number;
  }): Promise<PaginationSuccessResponse | ErrorResponse> {
    const config = this.getConfig({}, `api/prompt/pagination`, 'GET', {
      page,
    });
    const response = await axios.request<
      PaginationSuccessResponse | ErrorResponse
    >(config);
    return response.data;
  }
}
