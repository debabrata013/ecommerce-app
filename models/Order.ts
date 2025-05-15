// models/Order.ts
import mongoose, { Document, Schema } from "mongoose";

interface IProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  products: IProduct[];
  totalAmount: number;
  shippingAddress: string;
  status: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
