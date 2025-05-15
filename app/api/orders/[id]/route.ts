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

// Get a specific order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  const order = orders.find(o => o.id === params.id);
  
  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }
  
  // Ensure the user can only access their own orders
  if (order.userId !== userId) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  
  return NextResponse.json(order);
}

// Update order status (could be restricted to admin in a real app)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    const order = orders.find(o => o.id === params.id);
    
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }
    
    // In a real app, update in database
    
    return NextResponse.json({ ...order, ...body });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
