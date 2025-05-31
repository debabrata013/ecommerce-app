// import { dbConnect } from "@/lib/dbConnect";
// import Product from "@/models/Product";

// import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(req: NextRequest, { params }: any) {


//   await dbConnect();
//   const data = await req.json();
//   const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
//   return NextResponse.json(updated);
// }

// export async function DELETE(_req: NextRequest, { params }: any) {


//   await dbConnect();
//   await Product.findByIdAndDelete(params.id);
//   return NextResponse.json({ message: "Product deleted" });
// }

import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import  s3  from "@/lib/s3";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();
  const { params } = context;

  const formData = await req.formData();
  const file = formData.get("image") as File | null;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const inStock = formData.get("inStock") === "true" || formData.get("inStock") === "on";

  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  let imageUrl = product.image;

  // 🧨 If new image uploaded
  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `products/${filename}`,
      Body: buffer,
      ContentType: file.type,
    });

    try {
      await s3.send(uploadCommand);
    } catch (err) {
      console.error("Image upload failed:", err);
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }

    // Delete old image from S3 if exists
    if (product.image) {
      const oldKey = product.image.split(".amazonaws.com/")[1]; // extract key
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: oldKey,
      });

      try {
        await s3.send(deleteCommand);
      } catch (err) {
        console.warn("Old image delete failed:", err); // not critical
      }
    }

    // Set new image URL
    const bucket = process.env.AWS_S3_BUCKET_NAME!;
    const region = process.env.AWS_REGION!;
    imageUrl = `https://${bucket}.s3.${region}.amazonaws.com/products/${filename}`;
  }

  // Update product
  const updated = await Product.findByIdAndUpdate(
    params.id,
    { title, description, price, image: imageUrl, category, inStock },
    { new: true }
  );

  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(_req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();
  const { params } = await context;
  const id = params.id;

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Delete image from S3 if exists
  if (product.image) {
    const oldKey = product.image.split(".amazonaws.com/")[1]; // extract key
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: oldKey,
    });

    try {
      await s3.send(deleteCommand);
    } catch (err) {
      console.error("Old image delete failed:", err); // not critical
    }
  }

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}


