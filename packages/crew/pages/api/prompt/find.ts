import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import Prompt, { ModelType } from '../../../db/models/prompt';

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  query: {
    v?: string;
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

apiRoute.get(async (req, res) => {
  const { v } = req.query;
  if (v) {
    const prompt = await Prompt.findOne({
      where: { id: v, modelType: ModelType.openJourney },
    });
    if (prompt) {
      res.status(200).json({
        metaTags: {
          id: prompt.id,
          title: prompt.objectName,
          description: prompt.prompt,
          imageUrl: prompt.imageUrl,
        },
      });
    } else {
      res.status(200).json({
        metaTags: {},
      });
    }
  } else {
    res.status(200).json({
      metaTags: {},
    });
  }
});

export default apiRoute;
