// import Link from "next/link";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import ProductCard from "./components/ProductCard";

// export default function Home() {
//   return (
//     <main className="min-h-screen">
//       <Navbar />
      
      
//       <Hero/>
      

//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {["Electronics", "Clothing", "Home & Kitchen"].map((category) => (
//             <div
//               key={category}
//               className="bg-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
//             >
//               <h3 className="text-lg font-medium text-gray-900">{category}</h3>
//               <p className="mt-2 text-gray-600">
//                 Explore our {category.toLowerCase()} collection
//               </p>
//               <div className="mt-4">
//                 <Link
//                   href={`/categories/${category.toLowerCase().replace(" & ", "-")}`}
//                   className="text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Browse Products →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer
//       />
//     </main>
//   );
// }
"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

// Featured Categories Component with animation
const FeaturedCategory = ({ category, description, imagePath, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Stagger the animation of each category card
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 * index);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/70 z-10 rounded-xl hover:from-transparent hover:to-black/80 transition-all duration-300"></div>
      <img 
        src={imagePath || `/api/placeholder/600/400`} 
        alt={`${category} category`}
        className="w-full h-64 object-cover rounded-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <h3 className="text-xl font-bold">{category}</h3>
        <p className="mt-2 text-gray-100 text-sm">
          {description || `Explore our ${category.toLowerCase()} collection`}
        </p>
        <div className="mt-4">
          <Link
            href={`/categories/${category.toLowerCase().replace(/\s+&\s+|\s+/g, "-")}`}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Browse Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Trending Products Section
const TrendingProducts = () => {
  const trendingProducts = [
    { id: 1, name: "Wireless Earbuds", price: 79.99, rating: 4.8, image: "/api/placeholder/280/320" },
    { id: 2, name: "Smart Watch Series 5", price: 299.99, rating: 4.9, image: "/api/placeholder/280/320" },
    { id: 3, name: "Premium Backpack", price: 89.99, rating: 4.7, image: "/api/placeholder/280/320" },
    { id: 4, name: "Organic Cotton T-shirt", price: 24.99, rating: 4.5, image: "/api/placeholder/280/320" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <Link href="/products/trending" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-gray-900">${product.price}</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Component
const Newsletter = () => {
  return (
    <section className="bg-indigo-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Join Our Newsletter
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Stay updated with our latest offers and products.
          </p>
          <div className="mt-8 flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 appearance-none rounded-l-md border-0 bg-white/90 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
            />
            <button
              type="button"
              className="inline-flex items-center rounded-r-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      title: "Free Shipping",
      description: "On all orders above $50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      title: "Easy Returns",
      description: "30-day return policy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      ),
    },
    {
      title: "Secure Payment",
      description: "100% secure checkout",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      description: "Dedicated support team",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Home Page Component
export default function Home() {
  // Featured Categories Data
  const featuredCategories = [
    {
      name: "Electronics",
      description: "Latest gadgets and tech accessories at the best prices",
      imagePath: "/api/placeholder/600/400"
    },
    {
      name: "Fashion",
      description: "Trendy clothing, shoes, and accessories for all styles",
      imagePath: "/api/placeholder/600/400"
    },
    {
      name: "Home & Kitchen",
      description: "Quality products to make your house feel like home",
      imagePath: "/api/placeholder/600/400"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />

        {/* Featured Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
                <p className="mt-1 text-gray-500">Explore our most popular product categories</p>
              </div>
              <Link href="/categories" className="mt-2 sm:mt-0 text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm">
                View All Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category, index) => (
                <FeaturedCategory 
                  key={category.name} 
                  category={category.name} 
                  description={category.description}
                  imagePath={category.imagePath}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <TrendingProducts />

        {/* Features Section */}
        <Features />

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}