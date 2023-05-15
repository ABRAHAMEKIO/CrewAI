import HookFactory from '../../../generativeModels/hookFactory';

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

  const processor = HookFactory.resolveHookProcessor(body, io);
  const webhook = processor.process(body);

  // hanya untuk debug
  // const prompt = await Prompt.findByPk(webhookTable.promptId);
  //
  // io.to(webhookTable.socketId).emit(MidjourneyCommand.ModelResults.toString(), {
  //   ...body,
  //   prompt: {
  //     ...prompt,
  //     imageUrl,
  //     parentId: webhookTable.promptId,
  //   },
  // } as WebhookSuccessResponse);

  return res.status(200).json({ success: true, webhook });
}
