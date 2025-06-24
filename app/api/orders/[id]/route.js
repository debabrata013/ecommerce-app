// app/api/orders/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
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

// Get a single order by ID
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  
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

    // Return order with reconstructed address for frontend compatibility
    const responseOrder = {
      ...order.toObject(),
      shippingAddress: {
        street: order.addressStreet,
        city: order.addressCity,
        state: order.addressState,
        zipCode: order.addressZipCode,
        country: order.addressCountry
      }
    };

    return NextResponse.json(responseOrder, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
