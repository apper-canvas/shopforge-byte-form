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

// Mock chart data
const mockRevenueData = [
  { month: 'Jan', revenue: 85420 },
  { month: 'Feb', revenue: 92150 },
  { month: 'Mar', revenue: 78930 },
  { month: 'Apr', revenue: 95670 },
  { month: 'May', revenue: 108420 },
  { month: 'Jun', revenue: 115890 },
  { month: 'Jul', revenue: 122350 },
  { month: 'Aug', revenue: 118760 },
  { month: 'Sep', revenue: 125430 },
  { month: 'Oct', revenue: 132110 },
  { month: 'Nov', revenue: 128940 },
  { month: 'Dec', revenue: 135620 }
];

const mockSalesByCategory = [
  { category: 'Electronics', sales: 156, percentage: 42 },
  { category: 'Clothing', sales: 98, percentage: 26 },
  { category: 'Books', sales: 67, percentage: 18 },
  { category: 'Home & Garden', sales: 52, percentage: 14 }
];

const mockMonthlySales = [
  { month: 'Jan', currentYear: 245, lastYear: 210 },
  { month: 'Feb', currentYear: 267, lastYear: 235 },
  { month: 'Mar', currentYear: 198, lastYear: 180 },
  { month: 'Apr', currentYear: 289, lastYear: 260 },
  { month: 'May', currentYear: 312, lastYear: 285 },
  { month: 'Jun', currentYear: 335, lastYear: 300 },
  { month: 'Jul', currentYear: 358, lastYear: 320 },
  { month: 'Aug', currentYear: 342, lastYear: 315 },
  { month: 'Sep', currentYear: 365, lastYear: 340 },
  { month: 'Oct', currentYear: 378, lastYear: 350 },
  { month: 'Nov', currentYear: 356, lastYear: 330 },
  { month: 'Dec', currentYear: 389, lastYear: 365 }
];


export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setTopProducts(mockTopProducts);
      setRevenueData(mockRevenueData);
      setSalesByCategory(mockSalesByCategory);
      setMonthlySales(mockMonthlySales);
      setIsLoading(false);

    }, 1000);
  }, []);

  return {
    stats,
    recentOrders,
    topProducts,
    revenueData,
    salesByCategory,
    monthlySales,
    isLoading
  };

  };