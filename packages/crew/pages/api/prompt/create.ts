import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import Prompt from '../../../db/models/prompt';

interface ExtendedRequest {
  method: string;
  body: object;
}

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
  const prompt = await Prompt.create(req.body);
  res.status(200).json({
    prompt,
  });
});

export default apiRoute;
