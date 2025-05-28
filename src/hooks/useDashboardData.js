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

const mockRevenueData = [
  { month: 'Jan', revenue: 98420 },
  { month: 'Feb', revenue: 105230 },
  { month: 'Mar', revenue: 112560 },
  { month: 'Apr', revenue: 108940 },
  { month: 'May', revenue: 118760 },
  { month: 'Jun', revenue: 125430 },
  { month: 'Jul', revenue: 132180 },
  { month: 'Aug', revenue: 128950 },
  { month: 'Sep', revenue: 134670 },
  { month: 'Oct', revenue: 142380 },
  { month: 'Nov', revenue: 138920 },
  { month: 'Dec', revenue: 145650 }
];

const mockSalesByCategory = [
  { category: 'Electronics', sales: 35, color: '#0ea5e9' },
  { category: 'Clothing', sales: 28, color: '#a855f7' },
  { category: 'Books', sales: 18, color: '#22c55e' },
  { category: 'Home & Garden', sales: 12, color: '#f59e0b' },
  { category: 'Sports', sales: 7, color: '#ef4444' }
];

const mockMonthlySales = [
  { month: 'Jan', orders: 1156, revenue: 98420 },
  { month: 'Feb', orders: 1203, revenue: 105230 },
  { month: 'Mar', orders: 1289, revenue: 112560 },
  { month: 'Apr', orders: 1175, revenue: 108940 },
  { month: 'May', orders: 1342, revenue: 118760 },
  { month: 'Jun', orders: 1247, revenue: 125430 }
];

];

export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [chartData, setChartData] = useState({
    revenueData: [],
    salesByCategory: [],
    monthlySales: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setTopProducts(mockTopProducts);
      setChartData({
        revenueData: mockRevenueData,
        salesByCategory: mockSalesByCategory,
        monthlySales: mockMonthlySales
      });
      setIsLoading(false);
    }, 1000);

  }, []);

  return {
    stats,
    recentOrders,
    topProducts,
    chartData,
    isLoading
  };

  };
};