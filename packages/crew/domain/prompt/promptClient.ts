/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { PromptAttributes } from '../../db/models/prompt';
import {
  IsNaughtySuccessResponse,
  SuccessResponse,
} from '../midjourney/midjourneyClient';

export interface ErrorResponse {
  error: string;
}

export interface PaginationSuccessResponse {
  prompt: {
    count: number;
    rows: PromptAttributes[];
  };
  page: number;
  limit: number;
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

    return {
      method: reqMethod,
      url: `api/prompt/${path}`,
      headers,
      data,
      params,
      validateStatus(status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
  }

  async pagination({
    page,
  }: {
    page: number;
  }): Promise<PaginationSuccessResponse | ErrorResponse> {
    const config = this.getConfig({}, `pagination`, 'GET', {
      page,
    });
    const response = await axios.request<
      PaginationSuccessResponse | ErrorResponse
    >(config);
    return response.data;
  }

  async generate(props: {
    promptId: number;
    msg: string;
    socketId: string;
  }): Promise<SuccessResponse | IsNaughtySuccessResponse> {
    const { promptId, msg, socketId } = props;

    const data = {
      promptId,
      msg,
      socketId,
    };

    const config = this.getConfig(data, 'imagine', 'POST', '');

    const response = await axios.request<
      SuccessResponse | IsNaughtySuccessResponse
    >(config);

    return response.data;
  }
}
