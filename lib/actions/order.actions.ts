// lib/actions/order.actions.ts
import Order from "@/models/Order";
import { dbConnect} from "../dbConnect";

export const getOrdersByUserId = async (userId: string) => {
  await dbConnect();
  const orders = await Order.find({ userId })
    .populate("items.product")
    .sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(orders));
};
