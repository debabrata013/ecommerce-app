// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { upload } from "@/lib/multer";
import s3 from "@/lib/s3";
import { promisify } from "util";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = (req: any, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, {} as any, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: `products/${filename}`,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read",
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    return NextResponse.json({ url: uploadResult.Location }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
