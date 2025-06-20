"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";

export interface Product {
  _id: string;
  title: string;
  description : string;
  category: string;
  inStock: boolean;
  image: string;
  price: number;
}

interface GlobalContextType {
  cart: Product[];
  wishlist: Product[];

  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchCartWishlist: () => Promise<void>;
  clearCart: () => void;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user, isLoaded } = useUser();

  const fetchCartWishlist = async () => {
    // Only fetch if user is authenticated
    if (!user || !isLoaded) return;
    
    try {
      const response = await axios.get("/api/user/"); // <- your merged cart + wishlist API
      setCart(Array.isArray(response.data.cart) ? response.data.cart : []);
      setWishlist(Array.isArray(response.data.wishlist) ? response.data.wishlist : []);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      // Don't show toast error if user is not authenticated
      if (user) {
        // toast.error("Failed to fetch user data");
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = async (product: Product) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    
    try {
      await axios.post("/api/cart/add", { productId: product._id, quantity: 1 });
      setCart((prev) => [...prev, product]);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Failed to add to cart", err);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) {
      toast.error("Please sign in to manage cart");
      return;
    }
    
    try {
      await axios.delete(`/api/cart/${productId}`);
      setCart((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Failed to remove from cart", err);
      toast.error("Failed to remove from cart");
    }
  };

  const toggleWishlist = async (product: Product) => {
    if (!user) {
      toast.error("Please sign in to manage wishlist");
      return;
    }
    
    try {
      if (wishlist.find((p) => p._id === product._id)) {
        await axios.delete(`/api/wishlist/${product._id}`);
        setWishlist((prev) => prev.filter((p) => p._id !== product._id));
        toast.success("Removed from wishlist");
      } else {
        await axios.post("/api/wishlist/add", { productId: product._id });
        setWishlist((prev) => [...prev, product]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Failed to update wishlist", err);
      toast.error("Failed to update wishlist");
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchCartWishlist();
    }
  }, [user, isLoaded]);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        wishlist,
        setCart,
        setWishlist,
        fetchCartWishlist,
        clearCart,
        addToCart,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within GlobalProvider");
  return context;
};
