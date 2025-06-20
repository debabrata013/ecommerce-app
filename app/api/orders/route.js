// app/api/orders/route.js
import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get user orders
export async function GET(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await Order.find({ userId: user.id })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create new order
export async function POST(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { items, shippingAddress, phone, paymentMethod, totalAmount } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (!shippingAddress || !phone) {
      return NextResponse.json({ error: "Shipping address and phone are required" }, { status: 400 });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = new Order({
      userId: user.id,
      orderNumber,
      items: items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
        title: item.productId.title,
        image: item.productId.image
      })),
      shippingAddress,
      phone,
      paymentMethod: paymentMethod || 'COD',
      totalAmount,
      status: 'pending',
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'paid'
    });

    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
