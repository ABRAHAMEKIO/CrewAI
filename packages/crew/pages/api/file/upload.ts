import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { awsId, awsSecret, awsBucket, awsRegion } from '../../../config';

// config: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/modules/credentials.html
const s3 = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsId,
    secretAccessKey: awsSecret,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: awsBucket,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

// ref: https://www.npmjs.com/package/next-connect
interface ExtendedRequest {
  method: string;
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: bigint;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: never;
    contentEncoding: never;
    storageClass: string;
    serverSideEncryption: never;
    metadata: {
      fieldName: string;
    };
    location: string;
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
apiRoute.post(upload.single('file'), (req, res) => {
  res.status(200).json({
    file: {
      location: req.file.location,
    },
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
