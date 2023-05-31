// eslint-disable-next-line max-classes-per-file
import { getServerSession } from 'next-auth/next';
import { Op } from 'sequelize';
import User from '../../../db/models/user';
import { authOptions } from '../auth/[...nextauth]';
import Share, { ShareAttributes } from '../../../db/models/share';
import Prompt from '../../../db/models/prompt';
import { IsNaughtySuccessResponse } from '../../../domain/midjourney/midjourneyClient';

export interface ShareSuccessResponse {
  success: boolean;
  share: ShareAttributes;
}

export default async function handler(
  req,
  res
): Promise<ShareSuccessResponse | IsNaughtySuccessResponse> {
  const {
    body: { promptId },
  } = req;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(200).json({
      isNaughty: true,
      phrase:
        'You must be signed in to view the protected content on this page.',
    });
  }

  const user = await User.findOne({
    where: {
      email: { [Op.iLike]: session.user.email },
    },
  });

  if (!user) {
    return res.status(200).json({
      isNaughty: true,
      phrase: 'User Not Found!',
    });
  }

  const prompt = await Prompt.findByPk(promptId);

  if (!prompt) {
    return res.status(200).json({
      isNaughty: true,
      phrase: 'Prompt Not Found!',
    });
  }

  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const share = await Share.create({
    creatorId: user.id,
    promptId,
    code: makeid(3),
  });

  return res.status(200).json({
    success: true,
    share,
  });
}
