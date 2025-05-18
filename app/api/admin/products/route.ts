import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/adminCheck";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const data = await req.json();
  const newProduct = await Product.create(data);
  return NextResponse.json(newProduct, { status: 201 });
}
