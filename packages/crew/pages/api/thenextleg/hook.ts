import MidjourneyCommand from '../../../domain/midjourney/wsCommands';
import { WebhookSuccessResponse } from '../../../domain/midjourney/midjourneyClient';
import Prompt from '../../../db/models/prompt';

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
  const { ref } = body;

  // socketId;button
  const [socketId] = ref.split(';');

  const prompt = await Prompt.create({
    prompt: body.content,
    imageUrl: body.imageUrl,
    parentId: 1,
  });

  io.to(socketId).emit(MidjourneyCommand.ModelResults.toString(), {
    ...body,
    prompt,
  } as WebhookSuccessResponse);

  return res.status(200).json({ success: true, prompt });
}
