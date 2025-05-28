import { useState, useEffect } from 'react';

// Mock dashboard data
const mockStats = {
  revenue: 125430.50,
  orders: 1247,
  products: 89,
  customers: 423
};

const mockRecentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    total: 299.98,
    status: 'processing',
    date: '2 hours ago'
  },
  {
    id: 'ORD-002',
    customer: 'Emily Johnson',
    total: 49.99,
    status: 'completed',
    date: '4 hours ago'
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    total: 89.97,
    status: 'pending',
    date: '6 hours ago'
  }
];

const mockTopProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    sales: 45,
    revenue: 8999.55,
    image: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'Cotton Blend T-Shirt',
    sales: 38,
    revenue: 1139.62,
    image: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'JavaScript Programming Book',
    sales: 29,
    revenue: 1449.71,
    image: '/api/placeholder/60/60'
  }
];

export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setTopProducts(mockTopProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    stats,
    recentOrders,
    topProducts,
    isLoading
  };
};