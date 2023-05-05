/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { Json } from 'sequelize/types/utils';
import process from 'process';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4200';

export interface ErrorResponse {
  error: string;
}

export interface CreateSuccessResponse {
  id: string;
  name: string;
  prompt: Text;
  masterKey: string;
  parametersFromPrompt: Json;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class CreateGroupClient {
  getConfig(data: object) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const path = 'api/group/create';

    const config = {
      method: 'POST',
      url: `${BASE_URL}/${path}`,
      headers,
      data,
      validateStatus(status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    return config;
  }

  async imagine(data: object): Promise<CreateSuccessResponse | ErrorResponse> {
    const config = this.getConfig(data);
    const response = await axios.request<CreateSuccessResponse | ErrorResponse>(
      config
    );
    return response.data;
  }
}
