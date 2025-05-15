// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String], // URLs
  category: String,
  stock: Number,
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
