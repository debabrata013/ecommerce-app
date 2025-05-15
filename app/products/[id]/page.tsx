"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useUser } from "@clerk/nextjs";

// This would typically come from an API call using the ID
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation. Features include Bluetooth 5.0 connectivity, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals who need clear audio.",
      price: 199.99,
      category: "electronics",
      imageUrl: "https://placehold.co/600x400?text=Headphones",
      stock: 15,
    },
    {
      id: "2",
      name: "Fitness Smartwatch",
      description: "Track your fitness goals with this advanced smartwatch. Includes heart rate monitoring, step counting, sleep tracking, and water resistance up to 50 meters. Compatible with both iOS and Android devices.",
      price: 149.99,
      category: "electronics",
      imageUrl: "https://placehold.co/600x400?text=Smartwatch",
      stock: 20,
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      description: "Comfortable, eco-friendly t-shirt made from 100% organic cotton. Available in multiple sizes and colors. Ethically sourced and produced with environmentally friendly manufacturing processes.",
      price: 29.99,
      category: "clothing",
      imageUrl: "https://placehold.co/600x400?text=T-Shirt",
      stock: 50,
    },
  ];
  
  return products.find(p => p.id === id);
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-900">Product not found</p>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    
    // In a real app, this would call the cart API
    alert(`Added ${quantity} ${product.name} to cart`);
  };
  
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-4 text-xl text-gray-900">${product.price.toFixed(2)}</p>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Availability</h2>
              <p className="mt-2 text-gray-600">
                {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
              </p>
            </div>
            
            {product.stock > 0 && (
              <div className="mt-6">
                <label htmlFor="quantity" className="block text-lg font-medium text-gray-900">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium ${
                  product.stock === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
