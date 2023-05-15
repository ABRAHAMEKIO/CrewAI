import { HookProcessor } from './hookProcessor';
import MidjourneyClient from '../domain/midjourney/midjourneyClient';
import Webhook, { WebhookStep } from '../db/models/webhook';

class MidjourneyHookProcessor implements HookProcessor {
  AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;

  private midjourneyClient: MidjourneyClient;

  constructor() {
    this.midjourneyClient = new MidjourneyClient(this.AUTH_SECRET);
  }

  async process(webhookReq: {
    buttonMessageId: string;
    ref: string;
  }): Promise<Webhook> {
    const webhookTable = await Webhook.findByPk(webhookReq.ref);
    await webhookTable.update({ step: WebhookStep.hook });
    await webhookTable.save();

    const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;
    // replace string "hook" first string found
    const WEBHOOK_BUTTON_OVERRIDE: string = WEBHOOK_OVERRIDE.replace(
      /hook/,
      'hook-button'
    );

    await this.midjourneyClient.button(
      'U1',
      webhookReq?.buttonMessageId,
      webhookTable.id?.toString(),
      WEBHOOK_BUTTON_OVERRIDE
    );
    return webhookTable;
  }
}

export default MidjourneyHookProcessor;
