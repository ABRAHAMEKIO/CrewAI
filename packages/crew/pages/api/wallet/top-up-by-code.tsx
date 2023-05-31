// eslint-disable-next-line max-classes-per-file

import User from '../../../db/models/user';
import Share, { CreditStatus } from '../../../db/models/share';
import WalletFactory from '../../../domain/wallet/walletFactory';

export interface SuccessResponse {
  success: boolean;
}

export interface FailedResponse {
  success: boolean;
  receipt: null;
}

const SECRET = process.env.WEBHOOK_THENEXTLEG_SECRET;

export default async function handler(
  req,
  res
): Promise<SuccessResponse | FailedResponse> {
  const {
    body: { code, promptId, secret, credit },
  } = req;

  try {
    if (atob(secret) !== SECRET)
      return res.status(401).json({ message: 'Not authorized' });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  const share = await Share.findOne({
    where: {
      code,
      promptId,
      creditStatus: CreditStatus.pending,
    },
  });

  if (!share) {
    return res.status(400).json({ message: 'Share code not found' });
  }

  const user = await User.findByPk(share.creatorId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const wallet = WalletFactory.resolver(user);
  const topUp = await wallet.topUp(credit);

  await share.update({ creditStatus: CreditStatus.topUp });
  await share.save();

  return res.status(200).json({
    success: false,
    topUp,
    balance: await wallet.balance(),
  });
}
