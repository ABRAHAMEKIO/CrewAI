import MidjourneyCommand from '../../../domain/midjourney/wsCommands';
import { WebhookSuccessResponse } from '../../../domain/midjourney/midjourneyClient';

const SECRET = process.env.WEBHOOK_THENEXTLEG_SECRET;
export default function handler(req, res) {
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

  io.to(socketId).emit(
    MidjourneyCommand.ModelResults.toString(),
    body as WebhookSuccessResponse
  );

  return res.status(200).json({ success: true });
}
