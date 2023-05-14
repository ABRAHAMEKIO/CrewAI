import MidjourneyCommand from '../../../domain/midjourney/wsCommands';
import { WebhookSuccessResponse } from '../../../domain/midjourney/midjourneyClient';
import Prompt from '../../../db/models/prompt';
import Webhook, { WebhookStep } from '../../../db/models/webhook';

const SECRET = process.env.WEBHOOK_THENEXTLEG_SECRET;
export default async function handler(req, res) {
  const secret = req?.query?.hook;
  const { io } = res.socket.server;
  try {
    if (atob(secret) !== SECRET)
      return res.status(401).json({ message: 'Not authorized' });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  const { body } = req;
  const { ref, imageUrl } = body;

  await Webhook.update(
    { step: WebhookStep.hookButton },
    { where: { id: ref } }
  );

  const webhookTable = await Webhook.findByPk(ref);
  const parentPrompt = await Prompt.findByPk(webhookTable.promptId);

  const prompt = await Prompt.create({
    prompt: webhookTable.prompt, // so we don't need the body.content and letter we can use for regenerate
    extendedPrompt: webhookTable.extendedPrompt,
    imageUrl,
    parentId: webhookTable.promptId,
    objectName: parentPrompt.objectName,
    creatorAddress: parentPrompt.creatorAddress,
    modelType: 'midjourney',
  });

  io.to(webhookTable.socketId).emit(MidjourneyCommand.ModelResults.toString(), {
    ...body,
    prompt,
  } as WebhookSuccessResponse);

  return res.status(200).json({ success: true, webhookTable, prompt });
}
