// lib/s3.ts
// import AWS from "aws-sdk";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   region: process.env.AWS_REGION!,
// });

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}); 
export default s3;
