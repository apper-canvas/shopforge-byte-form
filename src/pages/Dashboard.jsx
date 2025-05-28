import { useState } from 'react';

import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import Card from '../components/common/Card';
import { dashboardConfig } from '../constants/dashboardConfig';
import { formatCurrency } from '../utils/formatUtils';
import { useDashboardData } from '../hooks/useDashboardData';
import Chart from 'react-apexcharts';


const Dashboard = () => {
  const { stats, recentOrders, topProducts, chartData, isLoading } = useDashboardData();
  const [isDarkMode, setIsDarkMode] = useState(false);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Chart configurations
  const revenueChartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#0ea5e9'],
    xaxis: {
      categories: chartData.revenueData.map(item => item.month),
      labels: {
        style: {
          colors: isDarkMode ? '#9ca3af' : '#6b7280'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? '#9ca3af' : '#6b7280'
        },
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`
      }
    },
    grid: {
      borderColor: isDarkMode ? '#374151' : '#e5e7eb'
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    legend: {
      labels: {
        colors: isDarkMode ? '#9ca3af' : '#6b7280'
      }
    }
  };

  const revenueChartSeries = [{
    name: 'Revenue',
    data: chartData.revenueData.map(item => item.revenue)
  }];

  const categoryChartOptions = {
    chart: {
      type: 'donut',
      height: 350
    },
    colors: chartData.salesByCategory.map(item => item.color),
    labels: chartData.salesByCategory.map(item => item.category),
    legend: {
      position: 'bottom',
      labels: {
        colors: isDarkMode ? '#9ca3af' : '#6b7280'
      }
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: (value) => `${value}%`
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const categoryChartSeries = chartData.salesByCategory.map(item => item.sales);

  const salesChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    colors: ['#22c55e', '#f59e0b'],
    xaxis: {
      categories: chartData.monthlySales.map(item => item.month),
      labels: {
        style: {
          colors: isDarkMode ? '#9ca3af' : '#6b7280'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Orders',
          style: {
            color: isDarkMode ? '#9ca3af' : '#6b7280'
          }
        },
        labels: {
          style: {
            colors: isDarkMode ? '#9ca3af' : '#6b7280'
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Revenue ($)',
          style: {
            color: isDarkMode ? '#9ca3af' : '#6b7280'
          }
        },
        labels: {
          style: {
            colors: isDarkMode ? '#9ca3af' : '#6b7280'
          },
          formatter: (value) => `$${(value / 1000).toFixed(0)}k`
        }
      }
    ],
    grid: {
      borderColor: isDarkMode ? '#374151' : '#e5e7eb'
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light'
    },
    legend: {
      labels: {
        colors: isDarkMode ? '#9ca3af' : '#6b7280'
      }
    }
  };

  const salesChartSeries = [
    {
      name: 'Orders',
      type: 'bar',
      data: chartData.monthlySales.map(item => item.orders)
    },
    {
      name: 'Revenue',
      type: 'line',
      data: chartData.monthlySales.map(item => item.revenue)
    }
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardConfig.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {stat.id === 'revenue' ? formatCurrency(stats[stat.id]) : stats[stat.id].toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {stat.label}
                </p>
                <div className={`inline-flex items-center text-xs font-medium ${
                  stat.change > 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  <ApperIcon 
                    name={stat.change > 0 ? "TrendingUp" : "TrendingDown"} 
                    className="h-3 w-3 mr-1" 
                  />
                  {Math.abs(stat.change)}% from last month
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recent Orders
                </h2>
                <ApperIcon name="ShoppingBag" className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Order #{order.id}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customer} • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(order.total)}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                          : order.status === 'pending'
                          ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100'
                          : 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Top Products
                </h2>
                <ApperIcon name="TrendingUp" className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Sales Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive charts and graphs showing key business metrics
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Revenue Trends Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Revenue Trends
                </h3>
                <ApperIcon name="TrendingUp" className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-80">
                <Chart
                  options={revenueChartOptions}
                  series={revenueChartSeries}
                  type="line"
                  height="100%"
                />
              </div>
            </Card>

            {/* Sales by Category Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Sales by Category
                </h3>
                <ApperIcon name="PieChart" className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-80">
                <Chart
                  options={categoryChartOptions}
                  series={categoryChartSeries}
                  type="donut"
                  height="100%"
                />
              </div>
            </Card>
          </div>

          {/* Monthly Sales Comparison Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Monthly Sales Comparison
              </h3>
              <ApperIcon name="BarChart3" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-80">
              <Chart
                options={salesChartOptions}
                series={salesChartSeries}
                type="line"
                height="100%"
              />
            </div>
          </Card>
        </motion.div>


      </motion.div>
    </div>
  );
};

export default Dashboard;