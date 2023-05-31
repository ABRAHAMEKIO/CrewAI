import { HookProcessor } from './hookProcessor';
import Webhook, { WebhookStep } from '../db/models/webhook';
import Prompt from '../db/models/prompt';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import {
  IsNaughtySuccessResponse,
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import { imageUploadByUrl } from '../domain/image/upload';
import PromptSeeder, { DeploymentStatus } from '../db/models/promptseeder';
import seederPromptHelper from '../helpers/seederPromptHelper';
import User from '../db/models/user';
import WalletFactory from '../domain/wallet/walletFactory';
import { creditFee } from '../config';

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
    try {
      const webhookTable = await Webhook.findOne({
        where: { replicatemeGenId: webhookReq.id },
      });
      if (webhookTable) {
        await webhookTable.update({ step: WebhookStep.hookButton });
        await webhookTable.save();

        const parentPrompt = await Prompt.findByPk(webhookTable.promptId);

        let imageUrl = webhookReq.output[0];
        const s3Data = await imageUploadByUrl(imageUrl);

        if ('Location' in s3Data) {
          imageUrl = s3Data.Location;
        }

        const prompt = await Prompt.create({
          prompt: webhookTable.prompt || webhookReq.input?.prompt, // so we don't need the body.content and letter we can use for regenerate
          extendedPrompt:
            webhookTable.extendedPrompt || webhookReq.input?.prompt,
          imageUrl,
          parentId: webhookTable.promptId,
          objectName: parentPrompt ? parentPrompt?.objectName : null,
          creatorAddress: webhookTable?.creatorAddress,
          modelType: 'openjourney',
        });

        if (this.io) {
          // eslint-disable-next-line no-console
          console.log(`Sending to the socketId: ${webhookTable.socketId}`);
          this.io
            .to(webhookTable.socketId)
            .emit(MidjourneyCommand.ModelResults.toString(), {
              ...webhookReq,
              prompt,
            } as WebhookSuccessResponse);
        }
      } else {
        await this.processFromSeeder(webhookReq);
      }

      return webhookTable;
    } catch (e) {
      const webhookTable = await Webhook.findOne({
        where: { replicatemeGenId: webhookReq.id },
      });
      if (webhookTable) {
        await webhookTable.update({ step: WebhookStep.fail });
        await webhookTable.save();

        const user = await User.findOne({
          where: { issuer: webhookTable.creatorAddress },
        });
        if (user) {
          const wallet = WalletFactory.resolver(user);
          await wallet.topUp(creditFee);
        }
        this.io
          .to(webhookTable.socketId)
          .emit(MidjourneyCommand.ModelResults.toString(), {
            isNaughty: true,
            phrase: e.message,
          } as IsNaughtySuccessResponse);
      }
      return webhookTable;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async processFromSeeder(webhookReq: {
    id: string;
    output: string[];
    input: { prompt: string };
  }): Promise<PromptSeeder> {
    const seeder = await PromptSeeder.findOne({
      where: { replicatemeGenId: webhookReq.id },
    });

    if (seeder) {
      let imageUrl = webhookReq.output[0];
      const s3Data = await imageUploadByUrl(imageUrl);

      if ('Location' in s3Data) {
        imageUrl = s3Data.Location;
      }
      await Prompt.create({
        id: seeder.id,
        prompt: seeder.prompt,
        extendedPrompt: seeder.extendedPrompt,
        parentId: null,
        objectName: seeder.objectName,
        creatorAddress: seeder.creatorAddress,
        imageUrl,
        modelType: 'openjourney',
      });

      await seeder.update({ deploymentStatus: DeploymentStatus.published });
      await seeder.save();

      await seederPromptHelper.nextSeeder();
    }

    return seeder;
  }
}

export default OpenHookProcessor;
