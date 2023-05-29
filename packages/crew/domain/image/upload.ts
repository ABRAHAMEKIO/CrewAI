import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { awsId, awsSecret, awsBucket } from '../../config';

const s3 = new AWS.S3({
  accessKeyId: awsId,
  secretAccessKey: awsSecret,
});

export async function imageUploadByUrl(
  url: string
): Promise<ManagedUpload.SendData> {
  const { pathname } = new URL(url);
  const Key = pathname.replace(/\//gi, '_');

  return fetch(url).then(async (response) => {
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const params = {
      ACL: 'public-read',
      Bucket: awsBucket,
      Body: Buffer.from(arrayBuffer),
      Key,
    };
    return s3
      .upload(params, async (err, data) => {
        // @todo butuh error handling
        if (err) {
          throw err;
        }
        if (!data) {
          throw new Error('Error Upload Image');
        }
        return data;
      })
      .promise();
  });
}

export default imageUploadByUrl;
