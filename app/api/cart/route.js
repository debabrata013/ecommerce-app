// app/api/cart/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  try {
    const cart = await Cart.findOne({ userId: user.id });
    
    // If checking for a specific product
    if (productId) {
      if (!cart) {
        return NextResponse.json({ inCart: false }, { status: 200 });
      }
      
      const inCart = cart.items.some(
        item => item.productId.toString() === productId
      );
      
      return NextResponse.json({ inCart }, { status: 200 });
    }
    
    // Return full cart
    if (!cart) {
      return NextResponse.json({ userId: user.id, items: [] }, { status: 200 });
    }
    
    const populatedCart = await cart.populate("items.productId");
    return NextResponse.json(populatedCart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
