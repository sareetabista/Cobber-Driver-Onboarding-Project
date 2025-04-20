const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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

async function getPresignedUrl(bucketName, key, expirationSeconds = 3600) {
  try {
    // Create the command
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });
    
    // Generate pre-signed URL
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: expirationSeconds
    });
    
    console.log('Pre-signed URL:', presignedUrl);
    return presignedUrl;
  } catch (err) {
    console.error('Error generating pre-signed URL:', err);
    throw err;
  }
}

// Example usage
getPresignedUrl(
  'my-bucket',     // Bucket name
  'example.txt',   // Object key (file name in S3)
  3600             // URL expiration time in seconds (1 hour)
);