import MidjourneyClient, {
  IsNaughtySuccessResponse,
} from '../../../domain/midjourney/midjourneyClient';

const AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;
export default async function handler(
  req,
  res
): Promise<IsNaughtySuccessResponse> {
  const {
    body: { msg },
  } = req;

  const midjourneyClient = new MidjourneyClient(AUTH_SECRET);
  const imageCommandResponse = await midjourneyClient.isThisNaughty(msg);
  return res.status(200).json(imageCommandResponse);
}
