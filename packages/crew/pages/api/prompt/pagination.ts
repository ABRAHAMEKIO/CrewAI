import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Op } from 'sequelize';
import Prompt, { ModelType } from '../../../db/models/prompt';

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
  const { page, v } = req.query;

  let firstRowParentId = null;

  async function isNotNullParent() {
    if (v) {
      const findParent = await Prompt.findOne({
        where: { id: v },
      });
      if (findParent) {
        if (findParent.parentId) {
          firstRowParentId = findParent.parentId;
        } else {
          firstRowParentId = findParent.id;
        }
      }
    }
  }

  await isNotNullParent();

  const limit = 20;
  const offset = parseInt(page, 10) * limit;

  const where = {
    imageUrlIsUnique: true,
    parentId: null,
    id: { [Op.ne]: null },
  };

  if (firstRowParentId) {
    where.id = { [Op.ne]: firstRowParentId };
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

  if (firstRowParentId) {
    const firstRow = await Prompt.findOne({
      include: [{ model: Prompt, as: 'SubPrompts' }],
      where: {
        imageUrlIsUnique: true,
        id: firstRowParentId,
      },
    });

    if (firstRow) {
      prompt.rows.unshift(firstRow);
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
