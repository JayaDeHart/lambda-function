# lambda-function
#### a description of how to use your lambda.
Lambda function runs automatically any time you upload an object to an s3 bucket. Pushes the image metadata to an images.json file stored in another bucket to prevent recursive calling
#### a description of any issues you encountered during deployment of this lambda.
It wasn't working due to some error I was having parsing the images.json file from JSON. Testing was also hard because I was having to zip up the file and upload it every time I made a change
#### a link to your images.json file
Couldn't successfully create one
