"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const fetchCartWishlist = async () => {
    try {
      const response = await axios.get("/api/user/"); // <- your merged cart + wishlist API
      setCart(Array.isArray(response.data.cart) ? response.data.cart : []);
      setWishlist(Array.isArray(response.data.wishlist) ? response.data.wishlist : []);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      toast.error("Failed to fetch user data");
    }
  };

  const addToCart = async (product: Product) => {
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
    fetchCartWishlist();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        wishlist,
        setCart,
        setWishlist,
        fetchCartWishlist,
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
