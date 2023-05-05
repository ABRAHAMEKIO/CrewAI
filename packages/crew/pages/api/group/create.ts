import { NextApiRequest, NextApiResponse } from 'next';
import RandomStringGenerator from 'random-string-generator';
import Group from '../../../db/models/group';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const randomMasterKey = RandomStringGenerator(6);

  try {
    const post = await Group.create({
      name: req.body.name,
      prompt: req.body.prompt,
      masterKey: randomMasterKey,
      parametersFromPrompt: req.body.parametersFromPrompt,
      imageUrl: req.body.imageUrl,
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export default create;
