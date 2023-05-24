import csvtojson from 'csvtojson';
import multer from 'multer';

import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import PromptSeeder, {
  DeploymentStatus,
} from '../../../db/models/promptseeder';
import { ModelType } from '../../../db/models/prompt';
import seederPromptHelper from '../../../helpers/seederPromptHelper';

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  query: {
    secret: string;
  };
  file: {
    fieldname: string; // "file",
    originalname: string; // "400-hover.png",
    encoding: string; // "7bit",
    mimetype: string; // "image/png",
    destination: string; // "./tmp",
    filename: string; // "1684810130909-949069739_400-hover.png",
    path: string; // "tmp/1684810130909-949069739_400-hover.png",
    size: number;
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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './tmp');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const upload = multer({ storage });

interface CsvJson {
  content_id: string; // "1171",
  creator_address: string; // "0x2ab35CA8EFEbD8663B709160ACAcb160692dBfB1",
  object_name: string; // "Neoclassical Elegance",
  object_name_is_unique: string; // "FALSE",
  prompt: string; // "Discover the elegance of Neoclassicism combined with the convenience of self-cleaning dishes. --ar 4:3 --quality=1",
  show_prompt_fee: string; // "0.01",
  maximum_mint: string; // "",
  mint_fee: string; // "0.01",
  image_url: string; // "",
  ipfs_url: string; // "",
  image_url_is_unique: string; // "FALSE",
  model_type: string; // ""
  extended_prompt: string; // ""
}

async function csvToJson(filePath: string): Promise<CsvJson[]> {
  return csvtojson()
    .fromFile(filePath)
    .then((jsonObj) => {
      return jsonObj;
      /**
       * [
       *  {a:"1", b:"2", c:"3"},
       *  {a:"4", b:"5". c:"6"}
       * ]
       */
    });
}

const SECRET = process.env.WEBHOOK_THENEXTLEG_SECRET;

apiRoute.post(upload.single('file'), async (req, res) => {
  const secret = req?.query?.secret;
  try {
    if (atob(secret) !== SECRET)
      return res.status(401).json({ message: 'Not authorized' });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  return res.status(299).json({ message: 'Only for localhost' });

  const json = await csvToJson(req.file.path);
  const payloads = json.map((j) => ({
    id: parseInt(j.content_id, 10),
    prompt: `mdjrny-v4 ${j.prompt}`,
    imageUrl: j.image_url,
    creatorAddress: j.creator_address,
    objectName: j.object_name,
    objectNameIsUnique: j.object_name_is_unique === 'TRUE',
    showPromptFee: parseFloat(j.show_prompt_fee) || null,
    maximumMint: parseFloat(j.maximum_mint) || null,
    mintFee: parseFloat(j.mint_fee) || null,
    ipfsUrl: j.ipfs_url,
    imageUrlIsUnique: true,
    extendedPrompt: `mdjrny-v4 ${j.prompt}`,
    modelType: ModelType.openJourney,
    deploymentStatus: DeploymentStatus.created,
  }));

  let insert = [];
  if (payloads.length) {
    insert = await PromptSeeder.bulkCreate(payloads, {
      ignoreDuplicates: true,
    });
  }

  // await seederPromptHelper.nextSeeder();

  return res.status(200).json({
    file: req.file,
    insert,
  });
});

apiRoute.get(async (req, res) => {
  const secret = req?.query?.secret;
  try {
    if (atob(secret) !== SECRET)
      return res.status(401).json({ message: 'Not authorized' });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  await seederPromptHelper.nextSeeder();
  return res.status(200).json({
    file: req.file,
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
