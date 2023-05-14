import Webhook from '../db/models/webhook';

export interface HookProcessor {
  process(
    webhookReq:
      | { buttonMessageId: string; ref: string }
      | { id: string; output: string[] },
    io?: any
  ): Promise<Webhook>;
}
