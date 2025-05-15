// app/api/save-user/route.ts (Next.js App Router example)

import { NextRequest, NextResponse } from "next/server";
import {  dbConnect} from "@/lib/dbConnect"; // your DB connection
import User from "@/models/User"; // your Mongoose model

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clerkId, email, name, address, role, phone } = body;

    await dbConnect();

    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    const newUser = new User({
      clerkId,
      email,
      name,
      address,
      role: role || "clerk",
      phone,
    });

    await newUser.save();

    return NextResponse.json({ message: "User saved successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
