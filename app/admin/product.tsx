// components/ProductsContent.tsx
"use client";

import React, { useEffect, useState } from "react";
import {toast, ToastContainer}from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
import axios from "axios";
import { Plus, Search, Filter, Eye, Edit, Trash2, X } from "lucide-react";

interface ProductFormData {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image: File | null;
  imageUrl?: string;
  category: string;
  inStock: boolean;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export default function ProductsContent() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showViewCard, setShowViewCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '', 
    price: 0,
    image: null,
    category: '',
    inStock: true
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '', 
      price: 0,
      image: null,
      category: '',
      inStock: true
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('price', String(formData.price));
      if (formData.image) {
        form.append('image', formData.image);
      }
      form.append('category', formData.category);
      form.append('inStock', String(formData.inStock));

      let response;
      if (isEditing && formData._id) {
        response = await axios.patch(`http://localhost:3000/api/admin/products/${formData._id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post('http://localhost:3000/api/admin/products', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed to save product');
      }
      setShowForm(false);
      resetForm();
      fetchProducts();
      toast.success(isEditing ? 'Product updated successfully' : 'Product added successfully');
    } catch (error) {
      toast.error('Error saving product');
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        setFormData(prev => ({
          ...prev,
          image: fileInput.files![0],
        }));
      }
    } else {
      const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [products, setProducts] = useState<Product[]>([]);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/admin/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setFormData({
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: null,
      imageUrl: product.image,
      category: product.category,
      inStock: product.inStock
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/products/${id}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product._id !== id));
        toast.success('Product deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowViewCard(true);
  };

  return (
    <div className="space-y-6 relative">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-lg">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-blue-600 font-semibold">Loading...</span>
          </div>
        </div>
      )}

      {/* View Product Card Modal */}
      {showViewCard && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Product Details</h3>
              <button onClick={() => setShowViewCard(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedProduct.image && (
                <div className="flex justify-center">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title} 
                    className="h-48 object-contain"
                  />
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-semibold">{selectedProduct.title}</h4>
                <p className="text-gray-600 mt-1">{selectedProduct.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">₹{selectedProduct.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock Status</p>
                  <p className="font-medium">{selectedProduct.inStock ? "In Stock" : "Out of Stock"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Product ID</p>
                  <p className="font-medium text-xs">{selectedProduct._id}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <button 
                  onClick={() => {
                    handleEdit(selectedProduct);
                    setShowViewCard(false);
                  }}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    handleDelete(selectedProduct._id);
                    setShowViewCard(false);
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                {isEditing && formData.imageUrl && !formData.image && (
                  <div className="mb-2">
                    <img 
                      src={formData.imageUrl} 
                      alt="Current product image" 
                      className="h-20 object-contain"
                    />
                    <p className="text-xs text-gray-500">Current image (upload a new one to replace)</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="image" 
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  {...(!isEditing && { required: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">In Stock</label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <button 
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.inStock ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleView(product)} 
                      className="text-blue-600 hover:text-blue-700"
                      title="View Product"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEdit(product)} 
                      className="text-green-600 hover:text-green-700"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="text-red-600 hover:text-red-700"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
