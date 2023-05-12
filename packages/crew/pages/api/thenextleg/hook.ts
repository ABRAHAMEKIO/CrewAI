import MidjourneyClient from '../../../domain/midjourney/midjourneyClient';
import Webhook, { WebhookStep } from '../../../db/models/webhook';

const SECRET = process.env.WEBHOOK_THENEXTLEG_SECRET;
export default async function handler(req, res) {
  const secret = req?.query?.hook;
  try {
    if (atob(secret) !== SECRET)
      return res.status(401).json({ message: 'Not authorized' });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  const { body } = req;
  const { ref, buttonMessageId } = body;

  await Webhook.update({ step: WebhookStep.hook }, { where: { id: ref } });
  const webhookTable = await Webhook.findByPk(ref);

  const AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;
  const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;
  // replace string "hook" first string found
  const WEBHOOK_BUTTON_OVERRIDE: string = WEBHOOK_OVERRIDE.replace(
    /hook/,
    'hook-button'
  );

  const webhook = WEBHOOK_BUTTON_OVERRIDE;

  const midjourneyClient = new MidjourneyClient(AUTH_SECRET);

  await midjourneyClient.button(
    'U1',
    buttonMessageId,
    webhookTable.id?.toString(),
    WEBHOOK_BUTTON_OVERRIDE
  );

  return res.status(200).json({ success: true, webhook });
}
