import Webhook from '../db/models/webhook';

export interface HookProcessor {
  process(
    webhookReq:
      | { buttonMessageId: string; ref: string }
      | { id: string; output: string[]; input: { prompt: string } },
    io?: any
  ): Promise<Webhook>;
}
