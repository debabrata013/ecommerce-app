// 'use client';

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// interface Product {
//   _id: string | number;
//   image: string;
//   title: string;
//   description?: string;
//   price: number;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Check if product is in wishlist and cart when component mounts
//   useEffect(() => {
//     const checkWishlistAndCart = async () => {
//       setIsLoading(true);
//       try {
//         // Check wishlist
//         const wishlistResponse = await axios.get(`/api/wishlist/${product._id}`);
//         setIsInWishlist(wishlistResponse.data.inWishlist);
        
//         // Check cart
//         const cartResponse = await axios.get(`/api/cart?productId=${product._id}`);
//         setIsInCart(cartResponse.data.inCart);
//       } catch (error) {
//         console.error('Error checking product status:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     checkWishlistAndCart();
//   }, [product._id]);
  
//   const handleCartAction = async () => {
//     setIsAddingToCart(true);
//     try {
//       if (isInCart) {
//         // Remove from cart
//         const response = await axios.delete(`/api/cart/${product._id}`);
//         console.log('Removed from cart:', response.data);
//         toast.success('Product removed from cart!');
//         setIsInCart(false);
//       } else {
//         // Add to cart
//         const response = await axios.post('/api/cart/add', {
//           productId: product._id,
//           quantity: 1
//         });
//         console.log('Added to cart:', response.data);
//         toast.success('Product added to cart!');
//         setIsInCart(true);
//       }
//     } catch (error) {
//       console.error('Error updating cart:', error);
//       toast.error(isInCart ? 'Failed to remove from cart' : 'Failed to add to cart');
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleWishlistAction = async () => {
//     try {
//       if (isInWishlist) {
//         // Remove from wishlist
//         const response = await axios.delete(`/api/wishlist/${product._id}`);
//         console.log('Removed from wishlist:', response.data);
//         toast.success('Removed from wishlist!');
//         setIsInWishlist(false);
//       } else {
//         // Add to wishlist
//         const response = await axios.post('/api/wishlist/add', {
//           productId: product._id
//         });
//         console.log('Added to wishlist:', response.data);
//         toast.success('Added to wishlist!');
//         setIsInWishlist(true);
//       }
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//       toast.error(isInWishlist ? 'Failed to remove from wishlist' : 'Failed to add to wishlist');
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-4">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="w-full h-48 object-cover rounded"
//       />
//       <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
//       <p className="text-gray-600 text-sm mb-2">{product.description || 'No description available'}</p>
//       <p className="text-indigo-600 font-bold">₹{product.price}</p>
//       <div className="flex gap-2 mt-3">
//         <button 
//           onClick={handleCartAction}
//           disabled={isAddingToCart || isLoading}
//           className={`${
//             isLoading 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : isInCart
//                 ? 'bg-red-600 hover:bg-red-700'
//                 : 'bg-indigo-600 hover:bg-indigo-700'
//           } text-white px-4 py-2 rounded flex-1 transition-colors`}
//         >
//           {isLoading ? 'Loading...' : isAddingToCart ? 'Processing...' : isInCart ? 'Remove from Cart' : 'Add to Cart'}
//         </button>
//         <button 
//           onClick={handleWishlistAction}
//           disabled={isLoading}
//           className={`${
//             isLoading
//               ? 'bg-gray-400 cursor-not-allowed'
//               : isInWishlist
//                 ? 'bg-red-100 text-red-800 hover:bg-red-200'
//                 : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//           } px-4 py-2 rounded flex-1 transition-colors`}
//         >
//           {isLoading ? 'Loading...' : isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
//         </button>
//       </div>
//     </div>
//   );
// }
'use client';

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Product, useGlobal } from "../../context/GlobalContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, wishlist, setCart, setWishlist } = useGlobal();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingo, setIsProcessingo] = useState(false);

  const isInCart = cart.some((p) => p._id === product._id);
  const isInWishlist = wishlist.some((p) => p._id === product._id);

  const handleCartAction = async () => {
    setIsProcessing(true);
    try {
      if (isInCart) {
        await axios.delete(`/api/cart/${product._id}`);
        setCart((prev) => prev.filter((p) => p._id !== product._id));
        toast.success("Removed from cart");
      } else {
        await axios.post("/api/cart/add", { productId: product._id, quantity: 1 });
        setCart((prev) => [...prev, product]);
        toast.success("Added to cart");
      }
    } catch (err) {
      toast.error("Cart action failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWishlistAction = async () => {
    try {
      setIsProcessingo(true);
      if (isInWishlist) {
        await axios.delete(`/api/wishlist/${product._id}`);
        setWishlist((prev) => prev.filter((p) => p._id !== product._id));
        toast.success("Removed from wishlist");
      } else {
        await axios.post("/api/wishlist/add", { productId: product._id });
        setWishlist((prev) => [...prev, product]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error("Wishlist action failed");
    }
    finally {
      setIsProcessingo(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description || "No description"}</p>
      <p className="text-indigo-600 font-bold">₹{product.price}</p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleCartAction}
          disabled={isProcessing}
          className={`${
            isInCart ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-4 py-2 rounded flex-1`}
        >
          {isProcessing ? "Processing..." : isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          onClick={handleWishlistAction}
          disabled={isProcessingo}
          className={`${
            isInWishlist ? "bg-red-100 text-red-800" : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded flex-1`}
        >
          {isProcessingo ? "Processing..." :isInWishlist ? "Remove  Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
