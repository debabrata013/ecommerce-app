// app/api/cart/add/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse the request body only once
    const body = await req.json();
    const { productId, quantity = 1 } = body;
    
    console.log("Received request body:", body);
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required", receivedData: body }, { status: 400 });
    }

    let cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = await Cart.create({
        userId: user.id,
        items: [{ productId, quantity }],
      });
    } else {
      // Update existing cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (itemIndex > -1) {
        // If item exists, increment quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If item doesn't exist, add it
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    // Return populated cart with product details
    const populatedCart = await cart.populate("items.productId");
    return NextResponse.json(populatedCart, { status: 200 });

  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
