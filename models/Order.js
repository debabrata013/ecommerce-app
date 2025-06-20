// models/Order.js
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'India'
  }
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  items: [OrderItemSchema],
  shippingAddress: {
    type: AddressSchema,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'CARD', 'UPI'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
