import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(product);
}
