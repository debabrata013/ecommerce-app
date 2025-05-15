// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: "pending" }, // or "shipped", "delivered"
  address: String,
  paymentMethod: String,
  paymentStatus: { type: String, default: "unpaid" },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
