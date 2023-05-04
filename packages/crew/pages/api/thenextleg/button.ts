import MidjourneyClient, {
  SuccessResponse,
} from '../../../domain/midjourney/midjourneyClient';

const AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;
const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;
export default async function handler(req, res): Promise<SuccessResponse> {
  const {
    body: { button, buttonMessageId, ref },
  } = req;

  const midjourneyClient = new MidjourneyClient(AUTH_SECRET);
  const imageCommandResponse = await midjourneyClient.button(
    button,
    buttonMessageId,
    ref,
    WEBHOOK_OVERRIDE || ''
  );
  return res.status(200).json(imageCommandResponse);
}
