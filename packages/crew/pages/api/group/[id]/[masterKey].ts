import { NextApiRequest, NextApiResponse } from 'next';
import Group from '../../../../db/models/group';

const validateMasterKey = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id, masterKey },
  } = req;
  try {
    const group = await Group.findByPk(id.toString());
    const valid = group.masterKey === masterKey;
    if (valid) {
      res.status(200).json(group);
    } else {
      res.status(400).json({ error: 'master key is not valid' });
    }
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export default validateMasterKey;
