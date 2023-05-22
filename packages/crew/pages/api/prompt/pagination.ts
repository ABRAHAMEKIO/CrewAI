import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Op } from 'sequelize';
import Prompt from '../../../db/models/prompt';

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  query: {
    page: string;
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
  function isNotNullParent(parent) {
    return parent && parent !== '' && parent !== null;
  }

  const { page, v } = req.query;
  const limit = 20;
  const offset = parseInt(page, 10) * limit;

  const where = {
    imageUrlIsUnique: true,
    parentId: null,
    id: { [Op.ne]: null },
  };

  if (isNotNullParent(v)) {
    where.id = { [Op.ne]: v };
  }

  const prompt = await Prompt.findAndCountAll({
    distinct: true,
    include: [{ model: Prompt, as: 'SubPrompts' }],
    where,
    order: [
      ['modelType', 'DESC'],
      ['SubPrompts', 'createdAt', 'ASC'],
    ],
    offset,
    limit,
  });

  if (isNotNullParent(v)) {
    const firstRow = await Prompt.findAndCountAll({
      distinct: true,
      include: [{ model: Prompt, as: 'SubPrompts' }],
      where: {
        imageUrlIsUnique: true,
        id: v,
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
