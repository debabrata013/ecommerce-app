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
  const router = useRouter();
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
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    title: string;
    price: number;
    image: string;
    description?: string;
  };
  quantity: number;
}

interface CartData {
  _id: string;
  userId: string;
  items: CartItem[];
}

export default function CartPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const { user, isLoaded } = useUser();

  const fetchCart = async () => {
    if (!user || !isLoaded) return;
    
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Add to updating set
    setUpdatingItems(prev => new Set(prev).add(productId));

    try {
      await axios.patch(`/api/cart/${productId}`, { quantity: newQuantity });
      
      // Update local state
      setCartData(prevCart => {
        if (!prevCart) return prevCart;
        
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.productId._id === productId 
              ? { ...item, quantity: newQuantity }
              : item
          )
        };
      });
      
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      // Remove from updating set
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const removeItem = async (productId: string) => {
    // Add to updating set
    setUpdatingItems(prev => new Set(prev).add(productId));

    try {
      await axios.delete(`/api/cart/${productId}`);
      
      // Update local state
      setCartData(prevCart => {
        if (!prevCart) return prevCart;
        
        return {
          ...prevCart,
          items: prevCart.items.filter(item => item.productId._id !== productId)
        };
      });
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    } finally {
      // Remove from updating set
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchCart();
    }
  }, [user, isLoaded]);

  // Calculate totals
  const cartItems = cartData?.items || [];
  const subtotal = cartItems.reduce((total, item) => {
    const price = typeof item.productId.price === 'number' ? item.productId.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return total + (price * quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  // Show loading while checking authentication
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="ml-4 text-gray-500">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900">Please sign in to view your cart</h2>
            <div className="mt-6">
              <Link
                href="/sign-in"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const isUpdating = updatingItems.has(item.productId._id);
                    
                    return (
                      <li key={item._id} className="p-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                          <img 
                            src={item.productId.image || '/placeholder-image.jpg'} 
                            alt={item.productId.title || 'Product'} 
                            className="w-full h-full object-cover object-center" 
                          />
                        </div>
                        
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link 
                                  href={`/products/${item.productId._id}`}
                                  className="hover:text-indigo-600"
                                >
                                  {item.productId.title}
                                </Link>
                              </h3>
                              <p className="ml-4">₹{((item.productId.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">₹{(item.productId.price || 0).toLocaleString()} each</p>
                            {item.productId.description && (
                              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.productId.description}</p>
                            )}
                          </div>
                          
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-3">Qty:</span>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                  disabled={item.quantity <= 1 || isUpdating}
                                  className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 text-gray-700 min-w-[3rem] text-center">
                                  {isUpdating ? '...' : item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                  disabled={isUpdating}
                                  className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId._id)}
                              disabled={isUpdating}
                              className="font-medium text-red-600 hover:text-red-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              {isUpdating ? 'Removing...' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Subtotal ({cartItems.length} items)</p>
                    <p className="text-gray-900 font-medium">₹{subtotal.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-gray-900 font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <Link 
                    href="/dashboard" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
