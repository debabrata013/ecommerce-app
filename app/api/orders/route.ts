import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";
import Cart from "@/models/Cart"; // ✅ Assuming you have this
import { NextRequest } from "next/server";
import { sendOrderConfirmation } from "@/lib/mailer";
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { userId, products, totalAmount, shippingAddress, userEmail } = body;

  try {
    const order = await Order.create({
      userId,
      products,
      totalAmount,
      shippingAddress,
    });

    // ✅ Empty cart after placing order
    await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });
await sendOrderConfirmation(userEmail, order._id.toString());
    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), { status: 400 });
  }

  try {
    const orders = await Order.find({ userId }).populate("products.productId");
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
