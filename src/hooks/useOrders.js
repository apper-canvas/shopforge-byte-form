import { useState, useEffect } from 'react';
import { generateId } from '../utils/formatUtils';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    total: 299.98,
    status: 'processing',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    items: [
      {
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 199.99,
        image: '/api/placeholder/60/60'
      },
      {
        name: 'Cotton Blend T-Shirt',
        quantity: 2,
        price: 29.99,
        image: '/api/placeholder/60/60'
      }
    ]
  },
  {
    id: 'ORD-002',
    customer: 'Emily Johnson',
    total: 49.99,
    status: 'completed',
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    items: [
      {
        name: 'JavaScript Programming Book',
        quantity: 1,
        price: 49.99,
        image: '/api/placeholder/60/60'
      }
    ]
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    total: 89.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    items: [
      {
        name: 'Cotton Blend T-Shirt',
        quantity: 3,
        price: 29.99,
        image: '/api/placeholder/60/60'
      }
    ]
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const createOrder = async (orderData) => {
    const newOrder = {
      ...orderData,
      id: generateId(),
      createdAt: new Date()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return {
    orders,
    updateOrderStatus,
    createOrder,
    isLoading
  };
};