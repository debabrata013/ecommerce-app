// app/api/wishlist/route.js
import { dbConnect } from "@/lib/dbConnect";
import Wishlist from "@/models/Wishlist";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get user's wishlist
export async function GET(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId: user.id }).populate("products");
    
    if (!wishlist) {
      // Return empty wishlist if none exists
      return NextResponse.json({ userId: user.id, products: [] }, { status: 200 });
    }
    
    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update user's wishlist (add or remove multiple products)
export async function POST(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { products, action = "add" } = await req.json();
    
    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Products array is required" }, { status: 400 });
    }

    let wishlist = await Wishlist.findOne({ userId: user.id });

    if (!wishlist) {
      // Create new wishlist if it doesn't exist
      if (action === "add") {
        wishlist = await Wishlist.create({
          userId: user.id,
          products: products
        });
      } else {
        // Nothing to remove if wishlist doesn't exist
        return NextResponse.json({ userId: user.id, products: [] }, { status: 200 });
      }
    } else {
      if (action === "add") {
        // Add products that aren't already in the wishlist
        for (const productId of products) {
          if (!wishlist.products.some(id => id.toString() === productId.toString())) {
            wishlist.products.push(productId);
          }
        }
      } else if (action === "remove") {
        // Remove products from wishlist
        wishlist.products = wishlist.products.filter(
          id => !products.some(productId => productId.toString() === id.toString())
        );
      }
      
      await wishlist.save();
    }

    // Return populated wishlist with product details
    const populatedWishlist = await wishlist.populate("products");
    return NextResponse.json(populatedWishlist, { status: 200 });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Clear entire wishlist
export async function DELETE(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await Wishlist.findOneAndUpdate(
      { userId: user.id },
      { $set: { products: [] } },
      { new: true }
    );
    
    return NextResponse.json({ message: "Wishlist cleared" }, { status: 200 });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
