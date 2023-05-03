import { NextApiRequest, NextApiResponse } from 'next';
import Group from '../../../db/models/group';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = await Group.create({
      name: req.body.name,
      prompt: req.body.prompt,
      masterKey: req.body.masterKey,
      parametersFormPrompt: req.body.parametersFormPrompt,
      userId: req.body.userId,
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export default create;
