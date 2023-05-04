import { NextApiRequest, NextApiResponse } from 'next';
import Group from '../../../db/models/group';

const getById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  try {
    const get = await Group.findByPk(id.toString());
    res.status(200).json(get);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export default getById;
