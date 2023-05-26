// eslint-disable-next-line max-classes-per-file

import User from '../../../db/models/user';
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
    body: { credit, email, secret },
  } = req;

  try {
    if (atob(secret) !== SECRET)
      return res.status(401).json({ message: 'Not authorized' });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const wallet = WalletFactory.resolver(user);
  const topUp = await wallet.topUp(credit);

  return res.status(200).json({
    success: false,
    topUp,
    balance: await wallet.balance(),
  });
}
