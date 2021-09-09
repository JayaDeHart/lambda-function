const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  //extract the metadata from the uploaded image
  let { key, size } = event.Records[0].s3.object;
  let imageData = { key, size };
  //get the metaData JSON from our bucket
  let metaData = await s3.getObject({
    Bucket: 'codefellows-lambda-output',
    Key: 'images.json',
  });
  let metaDataUsable = JSON.parse(metaData);
  console.log(metaDataUsable);
  //add our new imageData in
  metaDataUsable.push(imageData);

  console.log(metaDataUsable);

  const uploadParams = {
    Bucket: 'codefellows-lambda-output',
    // Add the required 'Key' parameter using the 'path' module.
    Key: 'images.json',
    // Add the required 'Body' parameter
    Body: JSON.stringify(metaDataUsable),
  };

  //upload the modified JSON file
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log('Success', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
