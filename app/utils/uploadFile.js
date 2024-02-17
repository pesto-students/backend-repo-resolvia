const AWS = require('aws-sdk');

const uploadFile = async file => {
  if (!file) return;
  // Create unique bucket name
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  // Create name for uploaded object key
  const filenamearray = file.originalname.split('.');
  const uniquename =
    filenamearray[0].split(' ').join('') + Math.random().toString(9).slice(-4);
  const keyName = uniquename + '.' + filenamearray[filenamearray.length - 1];
  // Create a promise on S3 service object
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  const uploadParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype,
  };

  // call S3 to retrieve upload file to specified bucket
  const response = await s3.upload(uploadParams).promise();
  const url = response.Location.includes(process.env.S3_COMPLETE_BASE_URL)
    ? response.Location.replace(
        process.env.S3_COMPLETE_BASE_URL,
        process.env.CLOUDFRONT_BASE_URL
      )
    : response.Location.replace(
        process.env.S3_BASE_URL,
        process.env.CLOUDFRONT_BASE_URL
      );
  return url;
};

module.exports = { uploadFile };
