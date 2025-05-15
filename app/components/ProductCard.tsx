'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs text-indigo-600 uppercase font-semibold tracking-wider">{category}</span>
        <Link href={`/products/${id}`}>
          <h3 className="mt-1 text-lg font-medium text-gray-900 hover:text-indigo-600 truncate">{name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-gray-700 font-bold">₹{price.toLocaleString()}</p>
          <button 
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
