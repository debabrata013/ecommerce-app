// app/api/orders/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get a single order by ID
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const order = await Order.findOne({ 
      _id: id, 
      userId: user.id 
    }).populate('items.productId');
    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
