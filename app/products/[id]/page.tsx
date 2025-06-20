'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Minus, 
  Plus, 
  Share2, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  createdAt?: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { cart, wishlist, addToCart, removeFromCart, toggleWishlist } = useGlobal();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');

  // Mock reviews for demonstration
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent product! Highly recommended. Great quality and fast delivery.',
      date: '2024-01-15'
    },
    {
      id: '2',
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good value for money. Product matches the description perfectly.',
      date: '2024-01-10'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      rating: 5,
      comment: 'Amazing quality! Will definitely buy again. Customer service was also great.',
      date: '2024-01-05'
    }
  ]);

  const productId = params.id as string;
  const isInCart = cart.some((p) => p._id === productId);
  const isInWishlist = wishlist.some((p) => p._id === productId);

  // Mock additional images for carousel
  const productImages = product ? [
    product.image,
    product.image, // In real app, these would be different images
    product.image,
    product.image
  ] : [];

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
      
      // Fetch related products
      const relatedResponse = await axios.get('/api/products');
      const filtered = relatedResponse.data
        .filter((p: Product) => p._id !== productId && p.category === response.data.category)
        .slice(0, 4);
      setRelatedProducts(filtered);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      router.push('/sign-in');
      return;
    }

    setIsAddingToCart(true);
    try {
      if (isInCart) {
        await removeFromCart(productId);
      } else {
        // Add multiple quantities if selected
        for (let i = 0; i < quantity; i++) {
          await addToCart(product!);
        }
        toast.success(`Added ${quantity} item(s) to cart`);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      router.push('/sign-in');
      return;
    }

    setIsAddingToWishlist(true);
    try {
      await toggleWishlist(product!);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-300 aspect-square rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/dashboard" className="hover:text-indigo-600">Products</Link>
          <span>/</span>
          <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-indigo-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={productImages[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Out of Stock</span>
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-indigo-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(Number(calculateAverageRating()), 'w-5 h-5')}
                  <span className="text-sm text-gray-600 ml-2">
                    {calculateAverageRating()} ({reviews.length} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500">|</span>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <p className="text-4xl font-bold text-indigo-600 mb-4">₹{product.price.toLocaleString()}</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${
                    product.inStock
                      ? isInCart
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAddingToCart ? 'Processing...' : isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                  className={`px-4 py-3 rounded-md border transition-colors ${
                    isInWishlist
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="px-4 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {!user && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-blue-800 text-sm">
                    <Link href="/sign-in" className="font-medium underline">Sign in</Link> to add items to cart and wishlist
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'reviews', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>High-quality materials and construction</li>
                    <li>Designed for durability and performance</li>
                    <li>Easy to use and maintain</li>
                    <li>Comes with manufacturer warranty</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    {renderStars(Number(calculateAverageRating()), 'w-5 h-5')}
                    <span className="text-lg font-semibold">{calculateAverageRating()}</span>
                    <span className="text-gray-500">({reviews.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.user}</span>
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">General</h4>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category:</dt>
                        <dd className="font-medium">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Availability:</dt>
                        <dd className="font-medium">{product.inStock ? 'In Stock' : 'Out of Stock'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">SKU:</dt>
                        <dd className="font-medium">{product._id.slice(-8).toUpperCase()}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{relatedProduct.title}</h3>
                  <p className="text-indigo-600 font-bold">₹{relatedProduct.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
