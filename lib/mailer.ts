import nodemailer from "nodemailer";

import { generateInvoicePDF } from "./invoice"; // Assuming you have a function to generate PDF
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmation = async (to: string, orderId: string) => {
  const mailOptions = {
    from: `"Shop" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
        <h1 style="color: #4CAF50;">Thank You for Your Order!</h1>
        <p style="font-size: 18px;">Your order has been successfully placed. We're processing it now and will notify you once it's shipped.</p>
        <div style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; margin-top: 30px;">
          <h2 style="color: #333;">Order ID: <strong style="color: #4CAF50;">${orderId}</strong></h2>
          <p style="font-size: 16px; color: #555;">If you have any questions or need assistance, feel free to <a href="mailto:support@shop.com" style="color: #4CAF50;">contact us</a>.</p>
        </div>
        <footer style="margin-top: 40px; color: #777; font-size: 14px;">
          <p>Shop Inc. | 1234 Main St, Your City</p>
          <p>For support, email us at <a href="mailto:support@shop.com" style="color: #4CAF50;">support@shop.com</a></p>
        </footer>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendInvoiceWithPDF = async (to: string, order: any) => {
  const pdfStream = generateInvoicePDF(order);

  const mailOptions = {
    from: `"Shop" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Order Invoice",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
        <h1 style="color: #4CAF50;">Your Order Invoice</h1>
        <p style="font-size: 18px;">Thank you for shopping with us! Your order details are below:</p>
        <div style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; margin-top: 30px;">
          <h2 style="color: #333;">Invoice for Order ID: <strong style="color: #4CAF50;">${order._id}</strong></h2>
          <p style="font-size: 16px; color: #555;">Total Amount: ₹${order.totalAmount}</p>
          <p style="font-size: 16px; color: #555;">Shipping Address: ${order.shippingAddress}</p>
          <h3 style="color: #333; margin-top: 20px;">Products:</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${order.products.map(
              (item: any) => `<li style="font-size: 16px; color: #555; margin-bottom: 10px;">
                                ${item.productId?.title || "Product"} x${item.quantity} - ₹${item.productId?.price * item.quantity}
                              </li>`
            ).join('')}
          </ul>
        </div>
        <p style="font-size: 16px; color: #555; margin-top: 20px;">Please find your invoice attached below. If you have any questions, do not hesitate to <a href="mailto:support@shop.com" style="color: #4CAF50;">contact us</a>.</p>
        <footer style="margin-top: 40px; color: #777; font-size: 14px;">
          <p>Shop Inc. | 1234 Main St, Your City</p>
          <p>For support, email us at <a href="mailto:support@shop.com" style="color: #4CAF50;">support@shop.com</a></p>
        </footer>
      </div>
    `,
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfStream,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};