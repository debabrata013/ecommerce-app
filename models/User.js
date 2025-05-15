// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  name: String,
  email: String,
  address: String,
  phone: String,
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
