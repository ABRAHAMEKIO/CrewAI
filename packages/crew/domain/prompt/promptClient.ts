/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { PromptAttributes } from '../../db/models/prompt';
import {
  IsNaughtySuccessResponse,
  SuccessResponse,
} from '../midjourney/midjourneyClient';
import { ShareAttributes } from '../../db/models/share';
import { ShareSuccessResponse } from '../../pages/api/prompt/share';

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
      url: `${path}`,
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
    v,
  }: {
    page: number;
    v: string;
  }): Promise<PaginationSuccessResponse | ErrorResponse> {
    const config = this.getConfig({}, `api/prompt/pagination`, 'GET', {
      page,
      v,
    });
    const response = await axios.request<
      PaginationSuccessResponse | ErrorResponse
    >(config);
    return response.data;
  }

  // generate using wallet
  async generate(props: {
    promptId: number;
    msg: string;
    socketId: string;
    transactionHash: string;
    chainId: number;
  }): Promise<SuccessResponse | IsNaughtySuccessResponse> {
    const { promptId, msg, socketId, transactionHash, chainId } = props;

    const data = {
      transactionHash,
      promptId,
      msg,
      socketId,
      chainId,
    };

    const config = this.getConfig(data, 'api/prompt/generate', 'POST', '');

    const response = await axios.request<
      SuccessResponse | IsNaughtySuccessResponse
    >(config);

    return response.data;
  }

  // generate using credit
  async generateV2(props: {
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

    const config = this.getConfig(data, 'api/prompt/generate-v2', 'POST', '');

    const response = await axios.request<
      SuccessResponse | IsNaughtySuccessResponse
    >(config);

    return response.data;
  }

  async share(props: {
    promptId: number;
  }): Promise<ShareSuccessResponse | IsNaughtySuccessResponse> {
    const { promptId } = props;

    const data = { promptId };

    const config = this.getConfig(data, 'api/prompt/share', 'POST', '');

    const response = await axios.request<
      ShareSuccessResponse | IsNaughtySuccessResponse
    >(config);

    return response.data;
  }
}
