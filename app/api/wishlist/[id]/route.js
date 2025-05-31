// app/api/wishlist/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Wishlist from "@/models/Wishlist";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Check if product is in wishlist
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId: user.id });
    
    if (!wishlist) {
      return NextResponse.json({ inWishlist: false }, { status: 200 });
    }
    
    const inWishlist = wishlist.products.some(
      productId => productId.toString() === id
    );
    
    return NextResponse.json({ inWishlist }, { status: 200 });
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Remove a product from wishlist
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = await params;

  const user = await currentUser();
  if (!user) {  
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId: user.id });

    if (!wishlist) {
      return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      productId => productId.toString() !== id
    );
    
    await wishlist.save();

    return NextResponse.json({ 
      message: "Removed from wishlist",
      productId: id
    }, { status: 200 });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
