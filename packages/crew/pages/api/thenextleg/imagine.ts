import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
} from '../../../domain/midjourney/midjourneyClient';
import Webhook, { WebhookStep } from '../../../db/models/webhook';
import Prompt from '../../../db/models/prompt';

const AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;
const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;

export default async function handler(
  req,
  res
): Promise<SuccessResponse | IsNaughtySuccessResponse> {
  const {
    body: { msg, promptId, socketId },
  } = req;

  const prompt = await Prompt.findByPk(promptId);
  const { extendedPrompt } = prompt;
  const searchTerm = '--';
  const indexOfFirst = extendedPrompt.indexOf(searchTerm);
  const promptMessage = `${msg} ${extendedPrompt.slice(indexOfFirst)}`;

  const webhookTable = await Webhook.create({
    prompt: msg,
    extendedPrompt: promptMessage,
    socketId,
    promptId,
    step: WebhookStep.create,
    modelType: 'midjourney',
  });

  const midjourneyClient = new MidjourneyClient(AUTH_SECRET);
  const imageCommandResponse = await midjourneyClient.imagine(
    promptMessage,
    webhookTable.id.toString(),
    WEBHOOK_OVERRIDE || '',
    0.5 // lower the quality for free user
  );
  return res.status(200).json(imageCommandResponse);
}
