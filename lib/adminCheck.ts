// lib/adminCheck.ts
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "./dbConnect";
import User from "@/models/User";

export async function isAdmin() {
  // const { userId} = auth();

  // if (!userId) return false;

  await dbConnect();
  const user = await User.findOne({ clerkId: userId });

  return user?.role === "admin";
}
