import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
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

async function getUrlofAlreadyExistingObject() {
  const url = await generatePresignedUrl(
    "privatebuckets3learningnihardev",
    "upload/file/firstUpload.jpeg",
    300, // expires in 5 minutes
  );
  console.log("Presigned URL:", url);
  return url;
}

async function uploadObjectToS3SignedURL(
  bucketName,
  key,
  expiresInSeconds,
  type,
) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: type,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: expiresInSeconds,
  });
  console.log("Presigned URL for upload:", url);
  return url;
}

getUrlofAlreadyExistingObject();
uploadObjectToS3SignedURL(
  "privatebuckets3learningnihardev",
  "upload/file/firstUpload.jpeg", // key  i.e we will name it using file type.
  300,
  "image/jpeg",
);
