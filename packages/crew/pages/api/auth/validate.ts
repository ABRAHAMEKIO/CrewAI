import { Magic } from '@magic-sdk/admin';
import User from '../../../db/models/user';

const magic = new Magic(process.env.MAGIC_LINK_SECRET_KEY);

const validate = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const didToken = req.headers.authorization.substring(7);
      const metaData = await magic.users.getMetadataByToken(didToken);
      const username = req.body.email.match(/^([^@]*)@/);
      const user = await User.findOne({
        where: { issuer: metaData.issuer },
      });

      res.setHeader(
        'set-cookie',
        `is_logged_on=${didToken}; path=/; samesite=lax; httponly; Max-Age=28800`
      );

      if (user) {
        return res.status(200).json({
          newUser: false,
        });
      }
      const newUser = await User.create({
        issuer: metaData.issuer,
        email: req.body.email,
        username: username
          ? username[1]
          : `crewai_${(Math.random() + 1).toString(36).substring(7)}`,
      });
      return res.status(200).json({
        newUser: true,
      });
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
