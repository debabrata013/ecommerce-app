// app/api/wishlist/route.js
import { dbConnect } from "@/lib/dbConnect";
import Wishlist from "@/models/Wishlist";

export async function POST(req) {
  await dbConnect();
  const { userId, productId } = await req.json();

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    return new Response(JSON.stringify(wishlist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate("products");
    return new Response(JSON.stringify(wishlist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
