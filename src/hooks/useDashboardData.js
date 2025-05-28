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


// Mock chart data for analytics
const mockChartData = {
  revenueChart: {
    series: [{
      name: 'Revenue',
      data: [85000, 92000, 78000, 105000, 110000, 125000, 135000, 142000, 138000, 145000, 155000, 165000]
    }],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  salesByCategory: {
    series: [45, 25, 20, 10],
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden']
  },
  monthlySales: {
    series: [{
      name: 'This Year',
      data: [120, 135, 101, 134, 150, 160, 175, 180, 165, 170, 185, 195]
    }, {
      name: 'Last Year',
      data: [95, 110, 85, 115, 125, 140, 155, 160, 145, 150, 165, 175]
    }],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};


export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setChartData(mockChartData);
      setTopProducts(mockTopProducts);
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

}

};