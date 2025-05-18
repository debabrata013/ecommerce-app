import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/adminCheck";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: any) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: any) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Product deleted" });
}
