// // models/User.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   clerkId: { type: String, required: true, unique: true }, // Clerk user ID
//   name: String,
//   email: String,
//   address: String,
//   phone: String,
//   isAdmin: { type: Boolean, default: false },
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  address: String,
  phone: String,
  role: { type: String, default: "customer" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
