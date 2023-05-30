import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Magic } from '@magic-sdk/admin';
import User from '../../../db/models/user';

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  body: string;
}

const magic = new Magic(process.env.MAGIC_LINK_SECRET_KEY);

const apiRoute = nextConnect<ExtendedRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  const { token } = JSON.parse(req.body);
  if (token) {
    try {
      const metaData = await magic.users.getMetadataByToken(token);
      const user = await User.findOne({
        where: { issuer: metaData.issuer },
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
    res.status(501).json({ error: `Missing token` });
  }
});

export default apiRoute;
