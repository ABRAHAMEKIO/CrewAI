import Replicate from 'replicate';
import Webhook, { WebhookStep } from '../../../db/models/webhook';
import Prompt from '../../../db/models/prompt';

const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;
export default async (req, res) => {
  const {
    body: { msg, promptId },
  } = req;

  const prompt = await Prompt.findByPk(promptId);

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  const prediction = await replicate.predictions.create({
    version: '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
    input: { prompt },
    webhook: WEBHOOK_OVERRIDE,
    webhook_events_filter: ['completed'],
  });
  // TODO: actually this way there's a possibility of race-condition between hook and create table, hopefully create table finishes first
  await Webhook.create({
    prompt: msg,
    extendedPrompt: msg, // currently the prompt and extendedPrompt are the same for open journey for historical reason
    socketId: prediction.id,
    promptId,
    step: WebhookStep.create,
    modelType: 'openjourney',
  });
  return res.status(200).json(prediction);
};
