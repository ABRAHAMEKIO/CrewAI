import Webhook from '../db/models/webhook';
import PromptSeeder from '../db/models/promptseeder';

export interface HookProcessor {
  process(
    webhookReq:
      | { buttonMessageId: string; ref: string }
      | { id: string; output: string[]; input: { prompt: string } },
    io?: any
  ): Promise<Webhook | PromptSeeder>;
}
