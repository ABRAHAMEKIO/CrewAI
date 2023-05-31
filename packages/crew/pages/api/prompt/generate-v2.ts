// eslint-disable-next-line max-classes-per-file
import Replicate from 'replicate';
import { getServerSession } from 'next-auth/next';
import { Op } from 'sequelize';
import Prompt, { ModelType, PromptAttributes } from '../../../db/models/prompt';
import User from '../../../db/models/user';
import Webhook, { WebhookStep } from '../../../db/models/webhook';
import { creditFee, openjourneyPredictionsVersion } from '../../../config';
import MidjourneyClient from '../../../domain/midjourney/midjourneyClient';
import WalletFactory from '../../../domain/wallet/walletFactory';
import { authOptions } from '../auth/[...nextauth]';

const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;

export interface SuccessResponse {
  success: boolean;
}

export interface FailedResponse {
  success: boolean;
  receipt: null;
}

interface GenerateProcessor {
  process(props: {
    prompt: PromptAttributes;
    socketId: string;
    msg: string;
    creatorAddress: string;
  });
}

class GenerateByMj implements GenerateProcessor {
  // eslint-disable-next-line class-methods-use-this
  async process(props: {
    prompt: PromptAttributes;
    socketId: string;
    msg: string;
    creatorAddress: string;
  }): Promise<Webhook> {
    const { prompt, socketId, msg, creatorAddress } = props;
    const { extendedPrompt } = prompt;
    const searchTerm = '--';
    const indexOfFirst = extendedPrompt.indexOf(searchTerm);
    const promptMessage = `${msg} ${extendedPrompt.slice(indexOfFirst)}`;
    const webhook = await Webhook.create({
      prompt: msg,
      extendedPrompt: promptMessage,
      socketId,
      promptId: prompt.id,
      step: WebhookStep.create,
      modelType: ModelType.midJourney,
      creatorAddress,
    });
    const AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;
    const midjourneyClient = new MidjourneyClient(AUTH_SECRET);
    await midjourneyClient.imagine(
      promptMessage,
      webhook.id.toString(),
      WEBHOOK_OVERRIDE
    );

    return webhook;
  }
}

class GenerateByOj implements GenerateProcessor {
  // eslint-disable-next-line class-methods-use-this
  async process(props: {
    prompt: PromptAttributes;
    socketId: string;
    msg: string;
    creatorAddress: string;
  }) {
    const { prompt, socketId, msg, creatorAddress } = props;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const prediction = await replicate.predictions.create({
      version: openjourneyPredictionsVersion,
      input: { prompt: msg },
      webhook: WEBHOOK_OVERRIDE,
      webhook_events_filter: ['completed'],
    });

    const webhook = await Webhook.create({
      prompt: msg,
      extendedPrompt: msg,
      socketId,
      promptId: prompt.id,
      step: WebhookStep.create,
      modelType: ModelType.midJourney,
      replicatemeGenId: prediction.id,
      creatorAddress,
    });

    return webhook;
  }
}

class GenerateFactory {
  static traverseProcessor(modelType: string): GenerateProcessor {
    if (modelType === ModelType.midJourney) {
      return new GenerateByMj();
    }

    return new GenerateByOj();
  }
}

export default async function handler(
  req,
  res
): Promise<SuccessResponse | FailedResponse> {
  const {
    body: { promptId, msg, socketId }, // '0x916ab96e5fb29e836ffcfc52fc95b6d1f35a761c92e0c6b33d6364d79d4f4c80'
  } = req;
  const session = await getServerSession(req, res, authOptions);
  // @todo need refactor
  if (!session) {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }

  const user = await User.findOne({
    where: {
      email: { [Op.iLike]: session.user.email },
    },
  });
  const wallet = WalletFactory.resolver(user);
  const usage = await wallet.use(creditFee);
  if (!usage) {
    return res.status(200).json({
      isNaughty: true,
      phrase: 'limit exceeded',
    });
  }

  const prompt = await Prompt.findByPk(promptId);
  // @TODO creatorAddress di isi dengan change using Users.issuer
  const creatorAddress = user.issuer;

  const { modelType } = prompt;

  const processor = GenerateFactory.traverseProcessor(modelType);
  await processor.process({
    prompt,
    socketId,
    msg,
    creatorAddress,
  });

  const balance = await wallet.balance();

  return res.status(200).json({
    success: true,
    balance,
  });
}
