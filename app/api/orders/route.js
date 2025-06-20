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
  try {
    console.log("=== Starting order creation ==="); // Debug log
    
    await dbConnect();
    console.log("✅ Database connected"); // Debug log
    
    const user = await currentUser();
    if (!user) {
      console.log("❌ User not authenticated"); // Debug log
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("✅ User authenticated:", user.id); // Debug log

    const requestData = await req.json();
    console.log("✅ Request data received:", JSON.stringify(requestData, null, 2)); // Debug log
    
    const { items, shippingAddress, phone, paymentMethod, totalAmount } = requestData;

    // Validation
    if (!items || items.length === 0) {
      console.log("❌ No items in order"); // Debug log
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (!shippingAddress || !phone) {
      console.log("❌ Missing shipping address or phone"); // Debug log
      return NextResponse.json({ error: "Shipping address and phone are required" }, { status: 400 });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    console.log("✅ Generated order number:", orderNumber); // Debug log

    // Prepare order data
    const orderData = {
      userId: user.id,
      orderNumber,
      items: items.map(item => {
        console.log("Processing item:", item); // Debug log
        return {
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
          title: item.productId.title,
          image: item.productId.image
        };
      }),
      shippingAddress,
      phone,
      paymentMethod: paymentMethod || 'COD',
      totalAmount,
      status: 'pending',
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'paid'
    };
    
    console.log("✅ Order data prepared:", JSON.stringify(orderData, null, 2)); // Debug log

    // Create and save order
    console.log("Creating Order model..."); // Debug log
    const order = new Order(orderData);
    console.log("✅ Order model created"); // Debug log
    
    console.log("Saving order to database..."); // Debug log
    const savedOrder = await order.save();
    console.log("✅ Order saved successfully with ID:", savedOrder._id); // Debug log

    return NextResponse.json(savedOrder, { status: 201 });
    
  } catch (error) {
    console.error("❌ Error creating order:", error);
    console.error("❌ Error name:", error.name); // Debug log
    console.error("❌ Error message:", error.message); // Debug log
    console.error("❌ Error stack:", error.stack); // Debug log
    
    return NextResponse.json({ 
      error: "Failed to create order",
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
