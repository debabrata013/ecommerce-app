// app/api/wishlist/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Wishlist from "@/models/Wishlist";

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return new Response(JSON.stringify({ error: "Wishlist not found" }), { status: 404 });
    }

    wishlist.products = wishlist.products.filter(
      (productId) => productId.toString() !== id
    );
    await wishlist.save();

    return new Response(JSON.stringify({ message: "Removed from wishlist" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
