import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { NextRequest } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  await dbConnect();
  try {
    const order = await Order.findById(params.id).populate("products.productId");
    if (!order) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  await dbConnect();
  const { status } = await req.json();

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
