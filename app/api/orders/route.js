// app/api/orders/route.js
import { dbConnect } from "@/lib/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

// Use a simple approach - define everything inline without complex nesting
const OrderSchema = new mongoose.Schema({
  userId: String,
  orderNumber: { type: String, unique: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  // Store address as individual fields to avoid nesting issues
  addressStreet: String,
  addressCity: String,
  addressState: String,
  addressZipCode: String,
  addressCountry: String,
  phone: String,
  paymentMethod: { type: String, default: 'COD' },
  paymentStatus: { type: String, default: 'pending' },
  status: { type: String, default: 'pending' },
  totalAmount: Number,
  notes: { type: String, default: '' }
}, { timestamps: true });

// Clear any existing model to avoid conflicts
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

const Order = mongoose.model('Order', OrderSchema);

// Create new order
export async function POST(req) {
  try {
    console.log("=== Starting order creation ===");
    
    await dbConnect();
    console.log("✅ Database connected");
    
    const user = await currentUser();
    if (!user) {
      console.log("❌ User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("✅ User authenticated:", user.id);

    const requestData = await req.json();
    console.log("✅ Request data parsed successfully");
    console.log("Request data:", JSON.stringify(requestData, null, 2));
    
    const { items, shippingAddress, phone, paymentMethod, totalAmount } = requestData;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("❌ No items in order");
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (!shippingAddress || !phone || !totalAmount) {
      console.log("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    console.log("✅ Generated order number:", orderNumber);

    // Process items
    const processedItems = items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity || 1,
      price: item.productId.price || 0,
      title: item.productId.title || 'Unknown Product',
      image: item.productId.image || ''
    }));

    // Prepare order data with flattened address
    const orderData = {
      userId: user.id,
      orderNumber,
      items: processedItems,
      // Flatten address to avoid nesting issues
      addressStreet: shippingAddress.street,
      addressCity: shippingAddress.city,
      addressState: shippingAddress.state,
      addressZipCode: shippingAddress.zipCode,
      addressCountry: shippingAddress.country || 'India',
      phone: phone,
      paymentMethod: paymentMethod || 'COD',
      totalAmount: totalAmount,
      status: 'pending',
      paymentStatus: 'pending'
    };
    
    console.log("✅ Order data prepared");
    console.log("Final order data:", JSON.stringify(orderData, null, 2));

    // Create and save order
    console.log("Creating and saving order...");
    const savedOrder = await Order.create(orderData);
    console.log("✅ Order saved successfully with ID:", savedOrder._id);

    // Return order with reconstructed address for frontend
    const responseOrder = {
      ...savedOrder.toObject(),
      shippingAddress: {
        street: savedOrder.addressStreet,
        city: savedOrder.addressCity,
        state: savedOrder.addressState,
        zipCode: savedOrder.addressZipCode,
        country: savedOrder.addressCountry
      }
    };

    return NextResponse.json(responseOrder, { status: 201 });
    
  } catch (error) {
    console.error("❌ Error creating order:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return NextResponse.json({ 
      error: "Failed to create order",
      message: error.message
    }, { status: 500 });
  }
}

// Get user orders
export async function GET(req) {
  try {
    console.log("=== Fetching user orders ===");
    
    await dbConnect();
    const user = await currentUser();
    if (!user) {
      console.log("❌ User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ User authenticated:", user.id);
    console.log("Searching for orders with userId:", user.id);

    const orders = await Order.find({ userId: user.id })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    console.log("✅ Found orders:", orders.length);
    console.log("Orders data:", JSON.stringify(orders, null, 2));
    
    // Reconstruct address structure for each order
    const ordersWithAddress = orders.map(order => ({
      ...order.toObject(),
      shippingAddress: {
        street: order.addressStreet,
        city: order.addressCity,
        state: order.addressState,
        zipCode: order.addressZipCode,
        country: order.addressCountry
      }
    }));
    
    console.log("✅ Returning orders with reconstructed addresses:", ordersWithAddress.length);
    return NextResponse.json(ordersWithAddress, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
