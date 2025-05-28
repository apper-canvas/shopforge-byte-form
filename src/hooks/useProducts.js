import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
    setProducts(prev => {
      const updated = prev.map(product => 
        product.id === productId 
          ? { ...product, ...productData }
          : product
      );
      
      // Check for stock level changes and show notifications
      const updatedProduct = updated.find(p => p.id === productId);
      const originalProduct = prev.find(p => p.id === productId);
      
      if (originalProduct && updatedProduct && originalProduct.inventory !== updatedProduct.inventory) {
        const change = updatedProduct.inventory - originalProduct.inventory;
        if (change !== 0) {
          const message = change > 0 
            ? `Stock increased by ${change} units for ${updatedProduct.name}`
            : `Stock decreased by ${Math.abs(change)} units for ${updatedProduct.name}`;
          
          toast.success(message);
        }
        
        // Check for low stock warning
        if (updatedProduct.inventory <= 10 && updatedProduct.inventory > 0) {
          toast.warning(`Low stock alert: ${updatedProduct.name} has only ${updatedProduct.inventory} units remaining`);
        } else if (updatedProduct.inventory === 0) {
          toast.error(`${updatedProduct.name} is now out of stock`);
        }
      }
      
      return updated;
    });
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
    getProductsByCategory: (category) => {
      return products.filter(product => product.category === category);
    },
    getLowStockProducts: (threshold = 10) => {
      return products.filter(product => product.inventory <= threshold && product.inventory > 0);
    },
    getOutOfStockProducts: () => {
      return products.filter(product => product.inventory === 0);
    },
    getTotalInventoryValue: () => {
      return products.reduce((total, product) => total + (product.price * product.inventory), 0);
    },
