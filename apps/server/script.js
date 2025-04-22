const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

// Configure the S3 client for LocalStack
const s3Client = new S3Client({
  region: 'us-east-1', // Region doesn't matter for LocalStack
  endpoint: 'http://localhost:4566',
  forcePathStyle: true, // Required for LocalStack
  credentials: {
    accessKeyId: 'test',     // Any value works for LocalStack
    secretAccessKey: 'test'  // Any value works for LocalStack
  }
});

async function uploadFile(filePath, bucketName, key) {
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath);
    
    // Set parameters
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent
    };
    
    // Upload file
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    
    console.log(`File uploaded successfully. ETag: ${response.ETag}`);
    return response;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}

// Example usage
uploadFile(
  './example.txt',   // Path to your file
  'my-bucket',       // Bucket name
  'example.txt'      // Object key (file name in S3)
);

// aws --endpoint-url=http://localhost:4566 s3 mb s3://my-test-bucket
