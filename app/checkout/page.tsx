'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { 
  MapPin, 
  Phone, 
  CreditCard, 
  ShoppingBag, 
  Edit3, 
  Check,
  ArrowLeft,
  Truck,
  Shield
} from 'lucide-react';

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface CartData {
  _id: string;
  userId: string;
  items: CartItem[];
}

interface UserAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CheckoutData {
  address: UserAddress;
  phone: string;
}

import { useGlobal } from '../context/GlobalContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { clearCart } = useGlobal();
  
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userHasAddress, setUserHasAddress] = useState(false);
  
  // Form states
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    phone: ''
  });
  
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Fetch cart data
  const fetchCart = async () => {
    if (!user || !isLoaded) return;
    
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartData(response.data);
      
      if (!response.data || response.data.items.length === 0) {
        toast.error('Your cart is empty');
        router.push('/dashboard');
        return;
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get('/api/user/profile');
      const profile = response.data;
      
      if (profile.address && profile.phone) {
        setUserHasAddress(true);
        setCheckoutData({
          address: profile.address,
          phone: profile.phone
        });
      } else {
        setShowAddressForm(true);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setShowAddressForm(true);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    console.log('Validating form with data:', checkoutData); // Debug log
    
    if (!checkoutData.address.street.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!checkoutData.address.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!checkoutData.address.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!checkoutData.address.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5,6}$/.test(checkoutData.address.zipCode)) {
      errors.zipCode = 'ZIP code must be 5-6 digits';
    }
    
    if (!checkoutData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(checkoutData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    console.log('Validation errors:', errors); // Debug log
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setCheckoutData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setCheckoutData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Submit order
  const handleSubmitOrder = async () => {
    console.log('Submit order clicked'); // Debug log
    console.log('Current checkout data:', checkoutData); // Debug log
    
    if (!validateForm()) {
      console.log('Form validation failed:', formErrors); // Debug log
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setSubmitting(true);
    
    try {
      console.log('Saving user profile...'); // Debug log
      // Save/update user profile
      await axios.post('/api/user/profile', {
        address: checkoutData.address,
        phone: checkoutData.phone
      });
      
      console.log('Creating order...'); // Debug log
      // Create order
      const orderData = {
        items: cartData?.items || [],
        shippingAddress: checkoutData.address,
        phone: checkoutData.phone,
        paymentMethod: 'COD',
        totalAmount: total
      };
      
      console.log('Order data:', orderData); // Debug log
      const response = await axios.post('/api/orders', orderData);
      console.log('Order created:', response.data); // Debug log
      
      // Clear cart after successful order
      console.log('Clearing cart...'); // Debug log
      await axios.delete('/api/cart/clear');
      clearCart(); // Also clear from global context
      console.log('✅ Cart cleared successfully'); // Debug log
      
      toast.success('Order placed successfully!');
      router.push(`/orders/${response.data._id}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      console.error('Error details:', error.response?.data); // Debug log
      toast.error('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/sign-in');
        return;
      }
      fetchCart();
      fetchUserProfile();
    }
  }, [user, isLoaded]);

  // Calculate totals
  const cartItems = cartData?.items || [];
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.productId.price * item.quantity);
  }, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="ml-4 text-gray-500">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/cart"
              className="flex items-center text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Cart
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              
              {/* Shipping Address Section */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                    Shipping Address
                  </h2>
                  {userHasAddress && !showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Change Address
                    </button>
                  )}
                </div>

                {userHasAddress && !showAddressForm ? (
                  // Display existing address
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{checkoutData.address.street}</p>
                      <p className="text-gray-600">
                        {checkoutData.address.city}, {checkoutData.address.state} {checkoutData.address.zipCode}
                      </p>
                      <p className="text-gray-600">{checkoutData.address.country}</p>
                      <div className="flex items-center mt-3">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{checkoutData.phone}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Address form
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.address.street}
                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          formErrors.street ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your street address"
                      />
                      {formErrors.street && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.street}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={checkoutData.address.city}
                          onChange={(e) => handleInputChange('address.city', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            formErrors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="City"
                        />
                        {formErrors.city && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={checkoutData.address.state}
                          onChange={(e) => handleInputChange('address.state', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            formErrors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="State"
                        />
                        {formErrors.state && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={checkoutData.address.zipCode}
                          onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            formErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="ZIP Code"
                          maxLength={6}
                        />
                        {formErrors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.zipCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={checkoutData.address.country}
                          onChange={(e) => handleInputChange('address.country', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Country"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={checkoutData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="10-digit phone number"
                        maxLength={10}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>

                    {userHasAddress && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowAddressForm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method Section */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center mb-6">
                  <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                  Payment Method
                </h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Cash on Delivery (COD)</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Pay when your order is delivered to your doorstep
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-green-600 ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white shadow-sm rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.productId.title}
                      </h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(item.productId.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-medium border-t border-gray-200 pt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Secure checkout
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-4 h-4 mr-2 text-blue-600" />
                  Free delivery on orders above ₹500
                </div>
              </div>

              {/* Debug Info - Remove this after testing */}
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs">
                <p><strong>Debug Info:</strong></p>
                <p>User has address: {userHasAddress.toString()}</p>
                <p>Show address form: {showAddressForm.toString()}</p>
                <p>Street: "{checkoutData.address.street}"</p>
                <p>City: "{checkoutData.address.city}"</p>
                <p>State: "{checkoutData.address.state}"</p>
                <p>ZIP: "{checkoutData.address.zipCode}"</p>
                <p>Phone: "{checkoutData.phone}"</p>
                <p>Form errors: {JSON.stringify(formErrors)}</p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitOrder}
                disabled={submitting}
                className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Placing Order...
                  </div>
                ) : (
                  'Confirm Order'
                )}
              </button>

              {/* Test Button - Remove after debugging */}
              <button
                onClick={() => {
                  console.log('Test button clicked');
                  console.log('Current form data:', checkoutData);
                  const isValid = validateForm();
                  console.log('Form is valid:', isValid);
                  if (!isValid) {
                    console.log('Validation errors:', formErrors);
                  }
                }}
                className="w-full mt-2 bg-gray-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-gray-700"
              >
                Test Validation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
