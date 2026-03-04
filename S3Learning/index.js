import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config();
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.accessKey, // Sahi terika go to IAM and create a node client user
    secretAccessKey: process.env.secretKey, // and use middleware if they are authenticated or not
  },
});
console.log(process.env.accessKey);

async function generatePresignedUrl(bucketName, key, expiresInSeconds) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: expiresInSeconds,
  });
  return url;
}

const url = await generatePresignedUrl(
  "privatebuckets3learningnihardev",
  "laptopScreen.jpeg",
  300, // expires in 5 minutes
);
console.log("Generated presigned URL:", url);
