// app/api/user/profile/route.js
import { dbConnect } from "@/lib/dbConnect";
import UserProfile from "@/models/UserProfile";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get user profile
export async function GET(req) {
  try {
    console.log("=== Fetching user profile ==="); // Debug log
    
    await dbConnect();
    console.log("✅ Database connected"); // Debug log
    
    const user = await currentUser();
    if (!user) {
      console.log("❌ User not authenticated"); // Debug log
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("✅ User authenticated:", user.id); // Debug log

    let profile = await UserProfile.findOne({ userId: user.id });
    console.log("Profile found:", !!profile); // Debug log
    
    if (!profile) {
      console.log("Creating new profile..."); // Debug log
      // Create empty profile if doesn't exist
      profile = new UserProfile({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
      await profile.save();
      console.log("✅ New profile created"); // Debug log
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update user profile
export async function POST(req) {
  try {
    console.log("=== Updating user profile ==="); // Debug log
    
    await dbConnect();
    console.log("✅ Database connected"); // Debug log
    
    const user = await currentUser();
    if (!user) {
      console.log("❌ User not authenticated"); // Debug log
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("✅ User authenticated:", user.id); // Debug log

    const { address, phone } = await req.json();
    console.log("✅ Profile update data:", { address, phone }); // Debug log

    let profile = await UserProfile.findOne({ userId: user.id });
    console.log("Existing profile found:", !!profile); // Debug log
    
    if (!profile) {
      console.log("Creating new profile..."); // Debug log
      profile = new UserProfile({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }

    if (address) {
      profile.address = address;
      console.log("✅ Address updated"); // Debug log
    }
    
    if (phone) {
      profile.phone = phone;
      console.log("✅ Phone updated"); // Debug log
    }

    const savedProfile = await profile.save();
    console.log("✅ Profile saved successfully"); // Debug log

    return NextResponse.json(savedProfile, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
