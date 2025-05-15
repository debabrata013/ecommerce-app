import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct, { status: 201 });
}
// app/api/products/route.js (Next.js 13+ with app router)
// import { dbConnect } from "@/lib/dbConnect";
// import Product from "@/models/Product";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const product = await Product.create(body);
//     return new Response(JSON.stringify(product), { status: 201 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }
