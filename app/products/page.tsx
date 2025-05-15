import Navbar from "../components/Navbar";
import Link from "next/link";

// This would typically come from an API call
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    category: "electronics",
    imageUrl: "https://placehold.co/300x300?text=Headphones",
    stock: 15,
  },
  {
    id: "2",
    name: "Fitness Smartwatch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 149.99,
    category: "electronics",
    imageUrl: "https://placehold.co/300x300?text=Smartwatch",
    stock: 20,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, eco-friendly t-shirt made from organic cotton",
    price: 29.99,
    category: "clothing",
    imageUrl: "https://placehold.co/300x300?text=T-Shirt",
    stock: 50,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
                <p className="mt-1 text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-900 font-medium">${product.price.toFixed(2)}</span>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
