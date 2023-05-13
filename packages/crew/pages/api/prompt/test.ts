import {
  IsNaughtySuccessResponse,
  SuccessResponse,
} from '../../../domain/midjourney/midjourneyClient';
import MidjourneyCommand from '../../../domain/midjourney/wsCommands';

// @todo hapus ini karena cuma buat test
export default async function handler(
  req,
  res
): Promise<SuccessResponse | IsNaughtySuccessResponse> {
  const { io } = res.socket.server;
  const {
    body: { socketId, prompt },
  } = req;

  io.to(socketId).emit(MidjourneyCommand.ModelResults.toString(), {
    content: 'string',
    imageUrl: 'string',
    buttons: ['string'],
    createdAt: 'string',
    responseAt: 'string',
    ref: 'string',
    originatingMessageId: 'string',
    buttonMessageId: 'string',
    prompt,
  });

  return res.status(200).json({
    socketId,
  });
}
