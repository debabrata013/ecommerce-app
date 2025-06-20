// app/api/cart/clear/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Clear user's cart
export async function DELETE(req) {
  try {
    console.log("=== Starting cart clear ==="); // Debug log
    
    await dbConnect();
    console.log("✅ Database connected"); // Debug log
    
    const user = await currentUser();
    if (!user) {
      console.log("❌ User not authenticated"); // Debug log
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("✅ User authenticated:", user.id); // Debug log

    const cart = await Cart.findOne({ userId: user.id });
    console.log("Cart found:", !!cart); // Debug log
    
    if (cart) {
      cart.items = [];
      await cart.save();
      console.log("✅ Cart cleared successfully"); // Debug log
    } else {
      console.log("ℹ️ No cart found to clear"); // Debug log
    }

    return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
