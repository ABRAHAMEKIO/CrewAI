import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import Prompt, { PromptAttributes } from '../../../db/models/prompt';

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  query: {
    page: string;
  };
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

// 'file' is params name
apiRoute.get(async (req, res) => {
  const { page } = req.query;
  const limit = 20;
  const offset = parseInt(page, 10) * limit;
  const prompt = await Prompt.findAndCountAll({
    offset,
    limit,
  });
  res.status(200).json({
    prompt,
    page: parseInt(page, 10),
    limit,
  });
});

export default apiRoute;
