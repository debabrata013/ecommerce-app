// app/api/cart/route.js
import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function POST(req) {
  await dbConnect();
  const { userId, productId, quantity } = await req.json();

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
