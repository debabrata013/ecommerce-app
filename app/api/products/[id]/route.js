// app/api/products/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// Get a single product by ID
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
