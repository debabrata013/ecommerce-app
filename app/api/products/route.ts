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

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  // Filter products by category if provided
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;
    
  return NextResponse.json(filteredProducts);
}

// Protected route for creating new products (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, validate the user is an admin here
    // and save to a database
    
    // For demo purposes, just return the submitted product with an ID
    const newProduct = {
      id: (products.length + 1).toString(),
      ...body,
    };
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
