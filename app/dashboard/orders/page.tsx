// app/orders/page.tsx
import { auth } from "@clerk/nextjs/server";
import { getOrdersByUserId } from "@/lib/actions/order.actions";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { userId } = auth();

  // if (!userId) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-xl">Please sign in to view your orders.</p>
  //     </div>
  //   );
  // }

  const orders = await getOrdersByUserId(userId);

  return (
    <>
 
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                  <p className="text-lg font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-right font-semibold">
                  ₹{order.total.toFixed(2)}
                </p>
              </div>

              <div className="divide-y">
                {order.items.map((item: any) => (
                  <div key={item.product._id} className="flex gap-4 py-3">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );

}
