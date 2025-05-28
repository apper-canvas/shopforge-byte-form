import { useState, useEffect } from 'react';
import { generateId } from '../utils/formatUtils';

// Mock data for demonstration
const mockProducts = [
  {
    id: 'prod-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    inventory: 25,
    category: 'electronics',
    images: ['/api/placeholder/300/300'],
    isActive: true
  },
  {
    id: 'prod-2',
    name: 'Cotton Blend T-Shirt',
    description: 'Comfortable cotton blend t-shirt available in multiple colors and sizes.',
    price: 29.99,
    inventory: 50,
    category: 'clothing',
    images: ['/api/placeholder/300/300'],
    isActive: true
  },
  {
    id: 'prod-3',
    name: 'JavaScript Programming Book',
    description: 'Complete guide to modern JavaScript programming with practical examples.',
    price: 49.99,
    inventory: 15,
    category: 'books',
    images: ['/api/placeholder/300/300'],
    isActive: true
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: generateId(),
      isActive: true
    };
    
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (productId, productData) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, ...productData }
          : product
      )
    );
  };

  const deleteProduct = async (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading
  };
};