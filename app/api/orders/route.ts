import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Mock data for orders (in a real app, this would come from a database)
const orders = [
  {
    id: "1",
    userId: "user_123",
    products: [
      { productId: "1", quantity: 1 },
      { productId: "3", quantity: 2 },
    ],
    totalAmount: 259.97,
    status: "completed",
    createdAt: "2025-05-10T10:30:00Z",
  },
  {
    id: "2",
    userId: "user_456",
    products: [
      { productId: "2", quantity: 1 },
    ],
    totalAmount: 149.99,
    status: "processing",
    createdAt: "2025-05-14T15:45:00Z",
  },
];

// Get orders for the authenticated user
export async function GET(request: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // In a real app, fetch from database for the specific user
  // For demo, we'll filter our mock data
  const userOrders = orders.filter(order => order.userId === userId);
  
  return NextResponse.json(userOrders);
}

// Create a new order
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
    
    // In a real app, validate the order data and save to database
    
    const newOrder = {
      id: (orders.length + 1).toString(),
      userId,
      ...body,
      status: "processing",
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
