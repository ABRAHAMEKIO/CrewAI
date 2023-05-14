import { HookProcessor } from './hookProcessor';
import Webhook, { WebhookStep } from '../db/models/webhook';
import Prompt from '../db/models/prompt';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import { WebhookSuccessResponse } from '../domain/midjourney/midjourneyClient';

class OpenHookProcessor implements HookProcessor {
  private io: any;

  constructor(io: any) {
    this.io = io;
  }

  async process(webhookReq: {
    id: string;
    output: string[];
  }): Promise<Webhook> {
    const webhookTable = await Webhook.findByPk(webhookReq.id);
    await webhookTable.update({ step: WebhookStep.hookButton });
    await webhookTable.save();

    const parentPrompt = await Prompt.findByPk(webhookTable.promptId);

    const prompt = await Prompt.create({
      prompt: webhookTable.prompt, // so we don't need the body.content and letter we can use for regenerate
      extendedPrompt: webhookTable.extendedPrompt,
      imageUrl: webhookReq.output[0],
      parentId: webhookTable.promptId,
      objectName: parentPrompt.objectName,
      creatorAddress: parentPrompt.creatorAddress,
    });

    this.io
      .to(webhookTable.socketId)
      .emit(MidjourneyCommand.ModelResults.toString(), {
        ...webhookReq,
        prompt,
      } as WebhookSuccessResponse);

    return webhookTable;
  }
}

export default OpenHookProcessor;
