import PDFDocument from "pdfkit";
import { IOrder } from "@/models/Order";
import { Readable } from "stream";

export const generateInvoicePDF = (order: IOrder): Readable => {
  const doc = new PDFDocument();
  const stream = new Readable({
    read() {}
  });

  doc.on("data", (chunk) => {
    stream.push(chunk);
  });

  doc.on("end", () => {
    stream.push(null);
  });

  doc.fontSize(20).text("Order Invoice", { align: "center" });
  doc.moveDown();
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Total: ₹${order.totalAmount}`);
  doc.text(`Status: ${order.status}`);
  doc.text(`Shipping Address: ${order.shippingAddress}`);

  doc.moveDown();
  doc.text("Products:");
  order.products.forEach((item: any) => {
    doc.text(`- ${item.productId?.title || "Product"} x${item.quantity}`);
  });

  doc.end();
  return stream;
};
