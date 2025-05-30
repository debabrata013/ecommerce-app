import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import s3 from "@/lib/s3";

import {  PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET() {
  
  await dbConnect();
  const products = await Product.find();
  return NextResponse.json(products);
}

// export async function POST(req: NextRequest) {
//   // if (!(await isAdmin()))
//   //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   await dbConnect();

//   console.log("req", req);
//   const formData = await req.formData();
//   console.log("formData", formData);
//   const file = formData.get("file") as File;
//   console.log("file", file);

//   if (!file) {
//     return NextResponse.json({ error: "No file provided" }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${Date.now()}-${file.name}`;

//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET!,
//     Key: `products/${filename}`,
//     Body: buffer,
//     ContentType: file.type,
//     ACL: "public-read",
//   };
// let uploadResult:any;
//   try{
//     uploadResult = await s3.upload(params).promise();
//     // return NextResponse.json({ url: uploadResult.Location }, { status: 201 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
//   const data = {
//     title: formData.get("title") as string,
//     description: formData.get("description") as string,
//     price: parseFloat(formData.get("price") as string),
//     image: uploadResult.Location, // S3 URL
//     category: formData.get("category") as string,
//     inStock: formData.get("inStock") === "on", // Convert checkbox to boolean
//   };

//   const newProduct = await Product.create({
//     title: data.title,
//     description: data.description,
//     price: data.price,
//     image: data.image, // S3 URL only
//     category: data.category,
//     inStock: data.inStock,
//   });
//   return NextResponse.json(newProduct, { status: 201 });
// }

export async function POST(req: NextRequest) {
  await dbConnect();

  const formData = await req.formData();

  console.log("formData from server", formData);
  

  const file = formData.get("image") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const inStock = formData.get("inStock") === "true" || formData.get("inStock") === "on";



  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;


  const command = new PutObjectCommand({
  // Bucket: process.env.AWS_S3_BUCKET!,
  Bucket: process.env.AWS_S3_BUCKET_NAME!,
  Key: `products/${filename}`,
  Body: buffer,
  ContentType: file.type,
  // ACL: "public-read",
});
  let uploadResult;
  try {
    uploadResult = await s3.send(command)
  

const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/products/${filename}`;

  const newProduct = await Product.create({
    title,
    description,
    price,
    image: imageUrl,
    category,
    inStock,
  });

  } catch (err: any) {
    console.error("failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }


  return NextResponse.json( { status: 201 });
  // return NextResponse.json(newProduct, { status: 201 });
}