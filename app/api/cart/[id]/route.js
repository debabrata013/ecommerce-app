// app/api/cart/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params; // item ID (productId)
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== id);
    await cart.save();

    return new Response(JSON.stringify({ message: "Item removed" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
