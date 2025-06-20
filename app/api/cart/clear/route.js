// app/api/cart/clear/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Clear user's cart
export async function DELETE(req) {
  await dbConnect();
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cart = await Cart.findOne({ userId: user.id });
    
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
