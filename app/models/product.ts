export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  features?: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Mock data for initial development
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation and long battery life. Perfect for music lovers and professionals on the go.",
    price: 2999,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: "SoundMax",
    category: "Electronics",
    thumbnail: "/images/products/earbuds-thumbnail.jpg",
    images: [
      "/images/products/earbuds-1.jpg",
      "/images/products/earbuds-2.jpg",
      "/images/products/earbuds-3.jpg"
    ],
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.2",
      "8 hours battery life",
      "IPX5 water resistance",
      "Touch controls"
    ],
    specifications: {
      "Connectivity": "Bluetooth 5.2",
      "Battery Life": "8 hours (earbuds) + 24 hours (case)",
      "Charging": "USB-C, Wireless Qi",
      "Weight": "5g per earbud",
      "Warranty": "1 year"
    },
    reviews: [
      {
        id: "r1",
        userId: "u123",
        userName: "Rahul S.",
        rating: 5,
        comment: "Best earbuds I've ever owned! The sound quality is amazing.",
        createdAt: "2023-10-15T14:30:00Z"
      },
      {
        id: "r2",
        userId: "u456",
        userName: "Priya M.",
        rating: 4,
        comment: "Great sound, but battery life could be better.",
        createdAt: "2023-11-02T09:15:00Z"
      }
    ],
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2023-09-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Men's Casual Shirt",
    description: "Comfortable and stylish casual shirt for men. Made from 100% cotton with a modern fit.",
    price: 1499,
    discountPercentage: 15,
    rating: 4.2,
    stock: 100,
    brand: "FashionPlus",
    category: "Clothing",
    thumbnail: "/images/products/shirt-thumbnail.jpg",
    images: [
      "/images/products/shirt-1.jpg",
      "/images/products/shirt-2.jpg",
      "/images/products/shirt-3.jpg"
    ],
    features: [
      "100% cotton",
      "Modern fit",
      "Button-down collar",
      "Machine washable",
      "Available in multiple colors"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Care": "Machine wash cold",
      "Fit": "Modern fit",
      "Collar": "Button-down",
      "Closure": "Button front"
    },
    reviews: [
      {
        id: "r3",
        userId: "u789",
        userName: "Amit K.",
        rating: 5,
        comment: "Perfect fit and very comfortable material.",
        createdAt: "2023-10-20T18:45:00Z"
      }
    ],
    createdAt: "2023-09-05T00:00:00Z",
    updatedAt: "2023-09-05T00:00:00Z"
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, step counting, and smartphone notifications.",
    price: 3999,
    discountPercentage: 5,
    rating: 4.7,
    stock: 30,
    brand: "FitTech",
    category: "Electronics",
    thumbnail: "/images/products/watch-thumbnail.jpg",
    images: [
      "/images/products/watch-1.jpg",
      "/images/products/watch-2.jpg",
      "/images/products/watch-3.jpg"
    ],
    features: [
      "Heart rate monitoring",
      "Step counter",
      "Sleep tracking",
      "Smartphone notifications",
      "5 days battery life",
      "Water resistant"
    ],
    specifications: {
      "Display": "1.3 inch AMOLED",
      "Battery": "5 days typical use",
      "Connectivity": "Bluetooth 5.0",
      "Compatibility": "Android 6.0+, iOS 10.0+",
      "Water Resistance": "5 ATM",
      "Sensors": "Heart rate, Accelerometer, Gyroscope"
    },
    reviews: [
      {
        id: "r4",
        userId: "u101",
        userName: "Neha G.",
        rating: 5,
        comment: "Amazing battery life and accurate fitness tracking!",
        createdAt: "2023-11-05T10:20:00Z"
      },
      {
        id: "r5",
        userId: "u202",
        userName: "Vikram S.",
        rating: 4,
        comment: "Great watch, but the app could be more user-friendly.",
        createdAt: "2023-11-10T16:30:00Z"
      }
    ],
    createdAt: "2023-09-10T00:00:00Z",
    updatedAt: "2023-09-10T00:00:00Z"
  }
];
