import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Mock data for user carts (in a real app, this would come from a database)
const carts = [
  {
    userId: "user_123",
    items: [
      { productId: "1", quantity: 1 },
      { productId: "3", quantity: 2 },
    ],
  },
  {
    userId: "user_456",
    items: [
      { productId: "2", quantity: 1 },
    ],
  },
];

// Get cart for the authenticated user
export async function GET(request: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // Find user's cart or return empty cart
  const userCart = carts.find(cart => cart.userId === userId) || { userId, items: [] };
  
  return NextResponse.json(userCart);
}

// Update user's cart
export async function POST(request: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    
    // In a real app, validate the cart data and save to database
    
    // Find existing cart index
    const cartIndex = carts.findIndex(cart => cart.userId === userId);
    
    if (cartIndex >= 0) {
      // Update existing cart
      carts[cartIndex] = { userId, items: body.items };
      return NextResponse.json(carts[cartIndex]);
    } else {
      // Create new cart
      const newCart = { userId, items: body.items };
      carts.push(newCart);
      return NextResponse.json(newCart);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
