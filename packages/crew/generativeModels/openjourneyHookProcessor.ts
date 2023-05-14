import { HookProcessor } from './hookProcessor';
import Webhook, { WebhookStep } from '../db/models/webhook';
import Prompt from '../db/models/prompt';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import { WebhookSuccessResponse } from '../domain/midjourney/midjourneyClient';

class OpenHookProcessor implements HookProcessor {
  private readonly io: any;

  constructor(io: any) {
    this.io = io;
  }

  async process(webhookReq: {
    id: string;
    output: string[];
    input: { prompt: string };
  }): Promise<Webhook> {
    const webhookTable = await Webhook.findOne({
      where: { replicatemeGenId: webhookReq.id },
    });
    if (webhookTable) {
      await webhookTable.update({ step: WebhookStep.hookButton });
      await webhookTable.save();

      const parentPrompt = await Prompt.findByPk(webhookTable.promptId);

      const prompt = await Prompt.create({
        prompt: webhookTable.prompt || webhookReq.input?.prompt, // so we don't need the body.content and letter we can use for regenerate
        extendedPrompt: webhookTable.extendedPrompt || webhookReq.input?.prompt,
        imageUrl: webhookReq.output[0],
        parentId: webhookTable.promptId,
        objectName: parentPrompt ? parentPrompt?.objectName : null,
        creatorAddress: parentPrompt ? parentPrompt?.creatorAddress : null,
        modelType: 'openjourney',
      });

      if (this.io) {
        console.log(`Sending to the socketId: ${webhookTable.socketId}`);
        this.io
          .to(webhookTable.socketId)
          .emit(MidjourneyCommand.ModelResults.toString(), {
            ...webhookReq,
            prompt,
          } as WebhookSuccessResponse);
      }
    }

    return webhookTable;
  }
}

export default OpenHookProcessor;
