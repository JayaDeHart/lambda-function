const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  //extract the metadata from the uploaded image
  let { key, size } = event.Records[0].s3.object;
  let imageData = { key, size };
  //get the metaData JSON from our bucket
  let data = await s3
    .getObject({
      Bucket: 'codefellows-lambda-output',
      Key: 'images.json',
    })
    .promise();
  let metaDataUsable = JSON.parse(data.Body);

  //add our new imageData in
  metaDataUsable.push(imageData);

  const uploadParams = {
    Bucket: 'codefellows-lambda-output',
    // Add the required 'Key' parameter using the 'path' module.
    Key: 'images.json',
    // Add the required 'Body' parameter
    Body: JSON.stringify(metaDataUsable),
  };

  //upload the modified JSON file
  try {
    const data = await s3.upload(uploadParams);
    console.log('Success', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
