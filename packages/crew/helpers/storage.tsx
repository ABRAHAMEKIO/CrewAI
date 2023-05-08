import { WebhookSuccessResponse } from '../domain/midjourney/midjourneyClient';

export interface PromptHistory {
  webhookSuccessResponse: WebhookSuccessResponse;
  prompt: string;
}

export function setItem(name: string, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

export function getItem(name: string) {
  return JSON.parse(localStorage.getItem(name));
}

export function removeItem(name: string) {
  localStorage.removeItem(name);
}

export const storagePromptHistory = {
  save: (value: PromptHistory[]) => {
    setItem('crew-histories', value);
  },
  all: () => {
    return getItem('crew-histories');
  },
  destroy: () => {
    removeItem('crew-histories');
  },
};
