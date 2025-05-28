import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';

import ApperIcon from '../components/ApperIcon';
import Card from '../components/common/Card';
import { dashboardConfig } from '../constants/dashboardConfig';
import { formatCurrency } from '../utils/formatUtils';
import { useDashboardData } from '../hooks/useDashboardData';

const Dashboard = () => {
  const { stats, recentOrders, topProducts, revenueData, salesByCategory, monthlySales, isLoading } = useDashboardData();


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Sales Analytics
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Revenue Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Revenue Trend
                  </h3>
                  <ApperIcon name="TrendingUp" className="h-5 w-5 text-gray-400" />
                </div>
                <div className="chart-container h-80">
                  <Chart
                    type="line"
                    height={320}
                    options={{
                      chart: {
                        id: 'revenue-trend',
                        toolbar: { show: false },
                        zoom: { enabled: true }
                      },
                      theme: {
                        mode: 'light'
                      },
                      stroke: {
                        curve: 'smooth',
                        width: 3
                      },
                      colors: ['#0ea5e9'],
                      xaxis: {
                        categories: revenueData.map(item => item.month),
                        labels: {
                          style: {
                            colors: '#6b7280'
                          }
                        }
                      },
                      yaxis: {
                        labels: {
                          style: {
                            colors: '#6b7280'
                          },
                          formatter: (value) => `$${(value / 1000).toFixed(0)}k`
                        }
                      },
                      grid: {
                        borderColor: '#e5e7eb',
                        strokeDashArray: 4
                      },
                      tooltip: {
                        y: {
                          formatter: (value) => `$${value.toLocaleString()}`
                        }
                      },
                      markers: {
                        size: 6,
                        colors: ['#0ea5e9'],
                        strokeColors: '#fff',
                        strokeWidth: 2,
                        hover: {
                          size: 8
                        }
                      }
                    }}
                    series={[{
                      name: 'Revenue',
                      data: revenueData.map(item => item.revenue)
                    }]}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Sales by Category Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Sales by Category
                  </h3>
                  <ApperIcon name="PieChart" className="h-5 w-5 text-gray-400" />
                </div>
                <div className="chart-container h-80">
                  <Chart
                    type="donut"
                    height={320}
                    options={{
                      chart: {
                        id: 'sales-category'
                      },
                      labels: salesByCategory.map(item => item.category),
                      colors: ['#0ea5e9', '#a855f7', '#22c55e', '#f59e0b'],
                      legend: {
                        position: 'bottom',
                        labels: {
                          colors: '#6b7280'
                        }
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: '70%',
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: 'Total Sales',
                                color: '#6b7280',
                                formatter: () => salesByCategory.reduce((sum, item) => sum + item.sales, 0).toString()
                              }
                            }
                          }
                        }
                      },
                      tooltip: {
                        y: {
                          formatter: (value, { seriesIndex }) => {
                            const item = salesByCategory[seriesIndex];
                            return `${value} sales (${item.percentage}%)`;
                          }
                        }
                      }
                    }}
                    series={salesByCategory.map(item => item.sales)}
                  />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Monthly Sales Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Monthly Sales Comparison
                </h3>
                <ApperIcon name="BarChart3" className="h-5 w-5 text-gray-400" />
              </div>
              <div className="chart-container h-80">
                <Chart
                  type="bar"
                  height={320}
                  options={{
                    chart: {
                      id: 'monthly-sales',
                      toolbar: { show: false }
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 4
                      }
                    },
                    colors: ['#0ea5e9', '#94a3b8'],
                    xaxis: {
                      categories: monthlySales.map(item => item.month),
                      labels: {
                        style: {
                          colors: '#6b7280'
                        }
                      }
                    },
                    yaxis: {
                      labels: {
                        style: {
                          colors: '#6b7280'
                        }
                      }
                    },
                    grid: {
                      borderColor: '#e5e7eb',
                      strokeDashArray: 4
                    },
                    legend: {
                      labels: {
                        colors: '#6b7280'
                      }
                    },
                    tooltip: {
                      y: {
                        formatter: (value) => `${value} orders`
                      }
                    }
                  }}
                  series={[
                    {
                      name: '2024',
                      data: monthlySales.map(item => item.currentYear)
                    },
                    {
                      name: '2023',
                      data: monthlySales.map(item => item.lastYear)
                    }
                  ]}
                />
              </div>
            </Card>
          </motion.div>
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
      </motion.div>
    </div>
  );
};

export default Dashboard;