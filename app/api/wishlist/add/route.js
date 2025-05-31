// app/api/wishlist/add/route.js
import { dbConnect } from "@/lib/dbConnect";
import Wishlist from "@/models/Wishlist";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse the request body
    const body = await req.json();
    const { productId } = body;
    
    console.log("Received wishlist request body:", body);
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required", receivedData: body }, { status: 400 });
    }

    let wishlist = await Wishlist.findOne({ userId: user.id });

    if (!wishlist) {
      // Create new wishlist if it doesn't exist
      wishlist = await Wishlist.create({
        userId: user.id,
        products: [productId]
      });
    } else {
      // Check if product is already in wishlist
      if (!wishlist.products.includes(productId) && 
          !wishlist.products.some(id => id.toString() === productId.toString())) {
        // Add product to wishlist
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    // Return populated wishlist with product details
    const populatedWishlist = await wishlist.populate("products");
    return NextResponse.json(populatedWishlist, { status: 200 });

  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
