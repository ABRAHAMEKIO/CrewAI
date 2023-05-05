/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { Json } from 'sequelize/types/utils';
import process from 'process';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4200';

export interface ErrorResponse {
  error: string;
}

export interface SuccessResponse {
  id: string;
  name: string;
  prompt: Text;
  masterKey: string;
  parametersFromPrompt: Json;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class GroupClient {
  getConfig(data: object | string, path: string, reqMethod: string) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const config = {
      method: reqMethod,
      url: `${BASE_URL}/${path}`,
      headers,
      data,
      validateStatus(status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    return config;
  }

  async create(data: object): Promise<SuccessResponse | ErrorResponse> {
    const config = this.getConfig(data, 'api/group/create', 'POST');
    const response = await axios.request<SuccessResponse | ErrorResponse>(
      config
    );
    return response.data;
  }

  async get(id: string): Promise<SuccessResponse | ErrorResponse> {
    const config = this.getConfig(id, `api/group/${id}`, 'GET');
    const response = await axios.request<SuccessResponse | ErrorResponse>(
      config
    );
    return response.data;
  }
}
