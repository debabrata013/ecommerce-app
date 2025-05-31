// create a route that collect user data and save it to the database
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import Wishlist from '@/models/Wishlist';
import Cart from '@/models/Cart';
import { currentUser } from "@clerk/nextjs/server";
export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const userId = user.id;

  try {
    // Fetch wishlist and cart data
    const wishlistData = await Wishlist.findOne({ userId }).populate("products");
    const cartData = await Cart.findOne({ userId }).populate("items.productId");

    // Format the data to return arrays
    const wishlist = wishlistData ? wishlistData.products : [];
    const cart = cartData ? cartData.items.map((item: { productId: { _doc: any; }; quantity: any; }) => ({
      ...item.productId._doc,
      quantity: item.quantity,
    })) : [];

    return NextResponse.json({ wishlist, cart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
