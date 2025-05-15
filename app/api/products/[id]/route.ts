import { NextRequest, NextResponse } from "next/server";

// Mock data for products (in a real app, this would come from a database)
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    category: "electronics",
    imageUrl: "/images/headphones.jpg",
    stock: 15,
  },
  {
    id: "2",
    name: "Fitness Smartwatch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 149.99,
    category: "electronics",
    imageUrl: "/images/smartwatch.jpg",
    stock: 20,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, eco-friendly t-shirt made from organic cotton",
    price: 29.99,
    category: "clothing",
    imageUrl: "/images/tshirt.jpg",
    stock: 50,
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // In a real app, validate the user is an admin here
    // and update in a database
    
    return NextResponse.json({ id: params.id, ...body });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // In a real app, validate the user is an admin here
  // and delete from a database
  
  return NextResponse.json({ success: true });
}
