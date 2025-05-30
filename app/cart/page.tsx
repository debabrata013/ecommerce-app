// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Trash2, Plus, Minus } from 'lucide-react';

// // Mock cart data for initial development
// const initialCartItems = [
//   {
//     id: '1',
//     name: 'Premium Wireless Earbuds',
//     price: 2999,
//     quantity: 1,
//     image: '/images/products/earbuds-thumbnail.jpg',
//   },
//   {
//     id: '2',
//     name: 'Men\'s Casual Shirt',
//     price: 1499,
//     quantity: 2,
//     image: '/images/products/shirt-thumbnail.jpg',
//   },
// ];

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
    
//     setCartItems(cartItems.map(item => 
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const removeItem = (id: string) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const shipping = subtotal > 0 ? 99 : 0;
//   const total = subtotal + shipping;

//   return (
//     <div className="bg-white">
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Shopping Cart</h1>

//         {cartItems.length === 0 ? (
//           <div className="mt-12 text-center py-12">
//             <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
//             <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
//             <div className="mt-6">
//               <Link href="/products" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-12">
//             <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
//               <div className="lg:col-span-7">
//                 <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
//                   {cartItems.map((item) => (
//                     <li key={item.id} className="py-6 flex">
//                       <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           fill
//                           className="object-cover object-center"
//                         />
//                       </div>

//                       <div className="ml-4 flex-1 flex flex-col">
//                         <div>
//                           <div className="flex justify-between text-base font-medium text-gray-900">
//                             <h3>
//                               <Link href={`/products/${item.id}`}>{item.name}</Link>
//                             </h3>
//                             <p className="ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500">₹{item.price.toLocaleString()} each</p>
//                         </div>
//                         <div className="flex-1 flex items-end justify-between text-sm">
//                           <div className="flex items-center border border-gray-300 rounded-md">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="p-2 text-gray-600 hover:bg-gray-100"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-4 py-2 text-gray-700">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="p-2 text-gray-600 hover:bg-gray-100"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <button
//                             type="button"
//                             onClick={() => removeItem(item.id)}
//                             className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
//                           >
//                             <Trash2 className="h-4 w-4 mr-1" />
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="mt-10 lg:mt-0 lg:col-span-5">
//                 <div className="bg-gray-50 rounded-lg px-6 py-8">
//                   <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
//                   <div className="mt-6 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <p className="text-gray-600">Subtotal</p>
//                       <p className="text-gray-900 font-medium">₹{subtotal.toLocaleString()}</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-gray-600">Shipping</p>
//                       <p className="text-gray-900 font-medium">₹{shipping.toLocaleString()}</p>
//                     </div>
//                     <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
//                       <p className="text-lg font-medium text-gray-900">Total</p>
//                       <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
//                     </div>
//                   </div>
//                   <div className="mt-8">
//                     <button
//                       type="button"
//                       className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                       Proceed to Checkout
//                     </button>
//                   </div>
//                   <div className="mt-4 text-center">
//                     <Link href="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                       Continue Shopping
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import axios from 'axios';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await axios.patch(`/api/cart/${id}`, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Shopping Cart</h1>

        {loading ? (
          <p className="mt-12 text-center text-gray-500">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div className="mt-12 text-center py-12">
            <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
              <div className="lg:col-span-7">
                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover object-center" />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/products/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">₹{item.price.toLocaleString()} each</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-gray-600 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-700">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-span-5">
                <div className="bg-gray-50 rounded-lg px-6 py-8">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-gray-900 font-medium">₹{subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="text-gray-900 font-medium">₹{shipping.toLocaleString()}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <p className="text-lg font-medium text-gray-900">Total</p>
                      <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
