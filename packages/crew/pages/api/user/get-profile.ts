/* eslint-disable consistent-return */
import { getServerSession } from 'next-auth/next';
import User from '../../../db/models/user';
import { authOptions } from '../auth/[...nextauth]';

const getProfile = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: 'You must be logged in.' });
      }
      const user = await User.findOne({
        where: { email: session.user.email },
      });
      if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(200).json({
          user: null,
        });
      }
    } catch (error) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    }
  } else {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default getProfile;
