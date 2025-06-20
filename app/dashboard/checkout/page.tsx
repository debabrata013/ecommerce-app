'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserDetails {
  address: string;
  phone: string;
}

export default function CheckoutPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    fetchUserDetails();
    fetchCartItems();
  }, [user]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/${user?.id}`);
      setUserDetails(response.data);
      setNewAddress(response.data.address || '');
      setNewPhone(response.data.phone || '');
      // Show address form if user doesn't have address or phone
      setShowAddressForm(!response.data.address || !response.data.phone);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to load user details');
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCartItems(response.data.products);
      setTotalAmount(response.data.total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart items');
      setLoading(false);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      await axios.put(`/api/users/${user?.id}`, {
        address: newAddress,
        phone: newPhone
      });
      setUserDetails(prev => ({
        ...prev!,
        address: newAddress,
        phone: newPhone
      }));
      setShowAddressForm(false);
      toast.success('Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address');
    }
  };

  const handlePlaceOrder = async () => {
    if (!userDetails?.address || !userDetails?.phone) {
      toast.error('Please provide delivery address and phone number');
      return;
    }

    try {
      await axios.post('/api/orders', {
        userId: user?.id,
        products: cartItems,
        totalAmount,
        shippingAddress: userDetails.address,
        paymentMethod: 'COD'
      });
      
      toast.success('Order placed successfully!');
      router.push('/dashboard/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
        
        {!showAddressForm && userDetails?.address && (
          <div className="mb-4">
            <p className="mb-2">{userDetails.address}</p>
            <p className="mb-4">{userDetails.phone}</p>
            <button
              onClick={() => setShowAddressForm(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Change Address
            </button>
          </div>
        )}

        {showAddressForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full border rounded-md p-2"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <button
              onClick={handleUpdateAddress}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Address
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item: any) => (
            <div key={item.product._id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <p>Total Amount</p>
              <p>₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <p className="text-gray-600">Cash on Delivery (COD)</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={!userDetails?.address || !userDetails?.phone}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Place Order
      </button>
    </div>
  );
}