'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { log } from 'console';
import Cart from '../components/ui/card';
import {useGlobal } from "../context/GlobalContext";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const { user, isLoaded } = useUser();
  const router = useRouter();
const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,fetchCartWishlist,
    toggleWishlist,
  } = useGlobal();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
fetchCartWishlist();
    fetchProducts();
  }, []);
  console.log(products)

  useEffect(() => {
    if (!isLoaded) return; // Wait for user to load

    if (!user) {
      router.push('/sign-in');
    } else if (user.publicMetadata?.isAdmin === 'true') {
      router.push('/admin');
    }
  }, [user, isLoaded, router]);

  return (
    <main className="min-h-screen">
    

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Account Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your personal details and preferences.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.id}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Active
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Your Products
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your products below.
            </p>
          </div>
          <main className="p-8 grid place-items-center min-h-screen bg-gray-50">
    <h1 className="text-2xl font-bold mb-6">Your Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Cart key={product._id} product={product} />
      ))}
    </div>
  </main>
          {/* <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {products.map((product) => (
                <cart key={product._id} product={product} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
