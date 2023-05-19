import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Op } from 'sequelize';
import Prompt from '../../../db/models/prompt';

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  query: {
    page: string;
    parent?: string;
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
  const { page, parent } = req.query;
  const limit = 20;
  const offset = parseInt(page, 10) * limit;

  const prompt = await Prompt.findAndCountAll({
    distinct: true,
    include: [{ model: Prompt, as: 'SubPrompts' }],
    where: {
      imageUrlIsUnique: true,
      parentId: null,
      id: {
        [Op.ne]: parent && parent !== '' && parent !== null ? parent : null,
      },
    },
    order: [
      ['modelType', 'DESC'],
      ['SubPrompts', 'createdAt', 'ASC'],
    ],
    offset,
    limit,
  });

  if (parent && parent !== '' && parent !== null) {
    const firstRow = await Prompt.findAndCountAll({
      distinct: true,
      include: [{ model: Prompt, as: 'SubPrompts' }],
      where: {
        imageUrlIsUnique: true,
        id: parent,
      },
      order: [
        ['modelType', 'DESC'],
        ['SubPrompts', 'createdAt', 'ASC'],
      ],
      offset,
      limit,
    });
    if (firstRow.count !== 0) {
      prompt.rows.unshift(firstRow.rows[0]);
      prompt.count += 1;
    }
  }

  res.status(200).json({
    prompt,
    page: parseInt(page, 10),
    limit,
  });
});

export default apiRoute;
