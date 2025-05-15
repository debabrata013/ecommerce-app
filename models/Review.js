// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: Number,
  comment: String
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
