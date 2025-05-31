// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
// import { ShoppingCart, Menu } from "lucide-react";
// import { useState } from "react";

// export default function Navbar() {
//   const { isSignedIn } = useUser();
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Products", href: "/products" },
//     { name: "Categories", href: "/categories" },
//   ];

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0 flex items-center">
//               <span className="text-xl font-bold text-gray-800">E-Shop</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`px-3 py-2 rounded-md text-sm font-medium ${
//                   pathname === link.href
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             {isSignedIn ? (
//               <>
//                 <Link
//                   href="/cart"
//                   className="p-2 rounded-full hover:bg-gray-100"
//                 >
//                   <ShoppingCart className="h-6 w-6 text-gray-600" />
//                 </Link>
//                 <Link
//                   href="/orders"
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   My Orders
//                 </Link>
//                 <UserButton afterSignOutUrl="/" />
//               </>
//             ) : (
//               <>
//                 <SignInButton mode="modal">
//                   <button className="text-gray-600 hover:text-gray-900">
//                     Sign In
//                   </button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                     Sign Up
//                   </button>
//                 </SignUpButton>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`block px-3 py-2 rounded-md text-base font-medium ${
//                   pathname === link.href
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             {isSignedIn ? (
//               <>
//                 <Link
//                   href="/cart"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Cart
//                 </Link>
//                 <Link
//                   href="/orders"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   My Orders
//                 </Link>
//               </>
//             ) : (
//               <div className="px-3 py-2">
//                 <SignInButton mode="modal">
//                   <button className="w-full text-left py-2 text-gray-600 hover:text-gray-900">
//                     Sign In
//                   </button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <button className="w-full text-left py-2 text-gray-600 hover:text-gray-900">
//                     Sign Up
//                   </button>
//                 </SignUpButton>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { ShoppingCart, Menu, X, Search, ChevronDown } from 'lucide-react';
import { Product, useGlobal } from "../context/GlobalContext";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  const { cart } = useGlobal();

  
  // Track scrolling for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { 
      name: 'Categories', 
      href: '/categories',
      children: [
        { name: 'Electronics', href: '/categories/electronics' },
        { name: 'Clothing', href: '/categories/clothing' },
        { name: 'Home & Kitchen', href: '/categories/home' }
      ]
    },
    { name: 'New Arrivals', href: '/new-arrivals' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-white shadow-md'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo area */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2" 
              aria-label="E-Shop, go to homepage"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="text-xl font-bold text-gray-800">E-Shop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation links">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors ${
                    pathname === link.href
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.name}
                  {link.children && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                
                {/* Dropdown for categories */}
                {link.children && (
                  <div className="absolute left-0 mt-1 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                          role="menuitem"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search bar - new addition */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-1.5 pl-10 pr-4 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* User actions area */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/cart"
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-700" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  My Orders
                </Link>
                <div className="pl-2 border-l border-gray-200">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8"
                      }
                    }} 
                  />
                </div>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 border-t border-gray-200' : 'max-h-0'
        }`}
        id="mobile-menu"
      >
        {/* Mobile search - new addition */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              aria-label="Search products"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <nav className="px-2 pt-2 pb-3 space-y-1" aria-label="Mobile navigation menu">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.name}
              </Link>
              
              {/* Show subcategories as indented links on mobile */}
              {link.children && (
                <div className="pl-6 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isSignedIn ? (
            <>
              <Link
                href="/cart"
                className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
              >
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="bg-emerald-600 text-white text-xs py-0.5 px-2 rounded-full">
                    {cart.length} items
                  </span>
                )}
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
              >
                My Orders
              </Link>
              <div className="px-3 py-3 flex items-center justify-between border-t border-gray-200 mt-2">
                <div className="flex items-center">
                  <div className="mr-3">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {user?.firstName || 'My Account'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-3 py-3 space-y-2 border-t border-gray-200 mt-2">
              <SignInButton mode="modal">
                <button className="w-full text-center py-2 text-gray-700 hover:text-emerald-600 font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full text-center py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
