// models/Wishlist.js
import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
