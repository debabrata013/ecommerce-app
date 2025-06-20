// app/api/user/profile/route.js
import { dbConnect } from "@/lib/dbConnect";
import UserProfile from "@/models/UserProfile";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get user profile
export async function GET(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let profile = await UserProfile.findOne({ userId: user.id });
    
    if (!profile) {
      // Create empty profile if doesn't exist
      profile = new UserProfile({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
      await profile.save();
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update user profile
export async function POST(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { address, phone } = await req.json();

    let profile = await UserProfile.findOne({ userId: user.id });
    
    if (!profile) {
      profile = new UserProfile({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }

    if (address) {
      profile.address = address;
    }
    
    if (phone) {
      profile.phone = phone;
    }

    await profile.save();

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
