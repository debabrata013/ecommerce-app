import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to E-Shop
            </h1>
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              Your one-stop destination for all your shopping needs.
            </p>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      <Hero/>
      

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Electronics", "Clothing", "Home & Kitchen"].map((category) => (
            <div
              key={category}
              className="bg-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900">{category}</h3>
              <p className="mt-2 text-gray-600">
                Explore our {category.toLowerCase()} collection
              </p>
              <div className="mt-4">
                <Link
                  href={`/categories/${category.toLowerCase().replace(" & ", "-")}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse Products →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer
      />
    </main>
  );
}
