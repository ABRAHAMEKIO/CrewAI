import { Magic } from '@magic-sdk/admin';
import { parse } from 'cookie';
import User from '../../../db/models/user';

const magic = new Magic(process.env.MAGIC_LINK_SECRET_KEY);

const validate = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { body } = req;
      const cookie = parse(req.headers.cookie);
      const metaData = await magic.users.getMetadataByToken(
        cookie.is_logged_on
      );
      const user = await User.findOne({
        where: { issuer: metaData.issuer },
      });
      if (user) {
        await user.update(body);
        return res.status(200).json({ user });
      }
      return res.status(405).json({ error: 'User not found' });
    } catch (e) {
      return res.status(405).json({ error: e.message });
    }
  } else {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default validate;
