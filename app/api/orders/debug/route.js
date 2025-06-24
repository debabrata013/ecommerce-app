// app/api/orders/debug/route.js
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

// Use the same schema as in the main orders route
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

// Debug endpoint to check all orders
export async function GET(req) {
  try {
    console.log("=== DEBUG: Fetching ALL orders ===");
    
    await dbConnect();
    
    const allOrders = await Order.find({}).sort({ createdAt: -1 });
    
    console.log("✅ Total orders in database:", allOrders.length);
    
    const orderSummary = allOrders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      userId: order.userId,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      itemsCount: order.items.length
    }));
    
    console.log("Orders summary:", JSON.stringify(orderSummary, null, 2));
    
    return NextResponse.json({
      totalOrders: allOrders.length,
      orders: orderSummary
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in debug endpoint:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
