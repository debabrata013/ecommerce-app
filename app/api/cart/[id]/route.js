// app/api/cart/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Remove a product from cart
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Remove product from cart
    cart.items = cart.items.filter(
      item => item.productId.toString() !== id
    );
    
    await cart.save();

    return NextResponse.json({ 
      message: "Removed from cart",
      productId: id
    }, { status: 200 });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update quantity of a product in cart
export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = params;
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { quantity } = await req.json();
    
    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Find and update the item quantity
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === id
    );
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Product not found in cart" }, { status: 404 });
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return NextResponse.json({ 
      message: "Quantity updated",
      productId: id,
      quantity: quantity
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get specific product in cart (with quantity)
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cart = await Cart.findOne({ userId: user.id });
    
    if (!cart) {
      return NextResponse.json({ inCart: false, quantity: 0 }, { status: 200 });
    }
    
    const cartItem = cart.items.find(
      item => item.productId.toString() === id
    );
    
    if (cartItem) {
      return NextResponse.json({ 
        inCart: true, 
        quantity: cartItem.quantity 
      }, { status: 200 });
    } else {
      return NextResponse.json({ inCart: false, quantity: 0 }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking cart:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
