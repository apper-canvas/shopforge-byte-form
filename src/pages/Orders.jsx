import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useOrders } from '../hooks/useOrders';
import { formatCurrency, formatDate } from '../utils/formatUtils';
import { orderStatusConfig } from '../constants/orderConfig';

const Orders = () => {
  const { orders, updateOrderStatus, isLoading } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

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
            Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track customer orders
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Statuses</option>
            {orderStatusConfig.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="text-center py-12">
              <ApperIcon name="ShoppingBag" className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Orders will appear here when customers make purchases'
                }
              </p>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Order #{order.id}
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'completed' 
                            ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                            : order.status === 'pending'
                            ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100'
                            : order.status === 'processing'
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Customer:</span>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{order.customer}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Date:</span>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{formatDate(order.createdAt)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Total:</span>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(order.total)}</p>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="input-field text-sm"
                      >
                        {orderStatusConfig.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>

                      <Button
                        size="sm"
                        variant="secondary"
                        icon="Eye"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Order Items (collapsed by default, can be expanded) */}
                  {selectedOrder?.id === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <img
                              src={item.image || '/api/placeholder/60/60'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Qty: {item.quantity} × {formatCurrency(item.price)}
                              </p>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                              {formatCurrency(item.quantity * item.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;