'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col lg:flex-row items-center pt-16 pb-20 lg:min-h-[600px]">
          {/* Hero content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
              <span className="block">Shop the latest</span>
              <span className="block text-emerald-600 mt-2">trends online </span>
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Discover our curated collection of premium products at unbeatable prices. 
              From fashion to electronics, we have everything you need.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link 
                href="/products" 
                className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-medium transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Shop Now"
              >
                Shop Now
              </Link>
              
              <Link 
                href="/categories" 
                className="px-8 py-3 rounded-lg bg-white text-emerald-600 font-medium border border-emerald-200 transition-all hover:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Browse Categories"
              >
                Browse Categories
              </Link>
            </div>
            
            {/* Hero badges - new addition */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Free Shipping</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">24/7 Support</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
          
          {/* Hero image */}
          <div className={`w-full lg:w-1/2 lg:pl-10 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative h-64 sm:h-72 md:h-96 lg:h-full w-full overflow-hidden rounded-2xl shadow-xl">
              <Image 
                src="/images/hero-image.jpg" 
                alt="Showcasing premium products from our collection" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                priority
                onLoad={() => setIsLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating shape decorations - new addition */}
      <div className="hidden md:block absolute top-20 left-4 w-20 h-20 rounded-full bg-emerald-100/50 blur-xl"></div>
      <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 rounded-full bg-emerald-100/50 blur-xl"></div>
      <div className="hidden md:block absolute bottom-40 left-1/4 w-16 h-16 rounded-full bg-emerald-200/40 blur-lg"></div>
    </section>
  );
}