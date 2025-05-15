// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart } from 'lucide-react';

// interface ProductCardProps {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
// }

// export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
//       <Link href={`/products/${id}`}>
//         <div className="relative h-64 w-full">
//           <Image
//             src={image}
//             alt={name}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//         </div>
//       </Link>
//       <div className="p-4">
//         <span className="text-xs text-indigo-600 uppercase font-semibold tracking-wider">{category}</span>
//         <Link href={`/products/${id}`}>
//           <h3 className="mt-1 text-lg font-medium text-gray-900 hover:text-indigo-600 truncate">{name}</h3>
//         </Link>
//         <div className="mt-2 flex items-center justify-between">
//           <p className="text-gray-700 font-bold">₹{price.toLocaleString()}</p>
//           <button 
//             className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors"
//             aria-label="Add to cart"
//           >
//             <ShoppingCart className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  discount?: number;
  isNew?: boolean;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  rating = 4.5, 
  discount, 
  isNew = false 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  // Format currency to INR
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Product Image with overlay options */}
      <div className="relative aspect-square w-full overflow-hidden">
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        
        {/* Product Image */}
        <Link href={`/products/${id}`} aria-label={`View ${name} details`}>
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Link>
        
        {/* Badges - New, Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-md">
              NEW
            </span>
          )}
          {discount && discount > 0 && (
            <span className="px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-md">
              {discount}% OFF
            </span>
          )}
        </div>
        
        {/* Quick action buttons */}
        <div 
          className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <button 
            className={`p-2 rounded-full bg-white shadow-md transition-colors ${
              isWishlisted ? 'text-rose-500' : 'text-gray-600 hover:text-rose-500'
            }`}
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <Link 
            href={`/products/${id}`}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-emerald-500 transition-colors"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
        
        {/* Add to cart button overlay (shown on hover) */}
        <div className={`absolute inset-x-0 bottom-0 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button 
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
      {/* Product details */}
      <div className="p-4">
        {/* Category */}
        <Link 
          href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-xs text-emerald-600 uppercase font-medium tracking-wider hover:underline"
        >
          {category}
        </Link>
        
        {/* Product Name */}
        <Link href={`/products/${id}`} className="block mt-1 group-hover:text-emerald-600 transition-colors">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2" title={name}>
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <p className="font-bold text-gray-900">{formatPrice(discountedPrice)}</p>
          {discount && discount > 0 && (
            <p className="text-sm text-gray-500 line-through">{formatPrice(price)}</p>
          )}
        </div>
      </div>
    </div>
  );
}