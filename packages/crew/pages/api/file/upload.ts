import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import { awsId, awsSecret, awsBucket } from '../../../config';

const s3 = new AWS.S3({
  accessKeyId: awsId,
  secretAccessKey: awsSecret,
});

const s3Upload = async (req, res) => {
  const { path } = req.file;
  const params = {
    ACL: 'public-read',
    Bucket: awsBucket,
    Body: fs.createReadStream(path),
    Key: `${req.file.originalname}`,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(404).json({ error: `Error Upload Image` });
    }
    if (!data) {
      return res.status(404).json({ error: `Error Upload Image` });
    }
    fs.unlinkSync(path);
    return res.status(200).json({
      url: data.Location,
    });
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
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
apiRoute.use(upload.single('file'));

apiRoute.post(s3Upload);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
