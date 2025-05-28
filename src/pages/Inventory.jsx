import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import InventoryCard from '../components/features/InventoryCard';
import StockAdjustmentModal from '../components/features/StockAdjustmentModal';
import { useProducts } from '../hooks/useProducts';
import { useInventory } from '../hooks/useInventory';
import { formatCurrency } from '../utils/formatUtils';
import { inventoryFilters, stockStatusConfig } from '../constants/inventoryConfig';
import { productCategories } from '../constants/productConfig';

const Inventory = () => {
  const { products, isLoading } = useProducts();
  const {
    inventoryMetrics,
    alerts,
    adjustStock,
    stockMovements,
    lowStockThreshold,
    dismissAlert,
    getProductStockMovements
  } = useInventory();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('cards');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [isMovementsModalOpen, setIsMovementsModalOpen] = useState(false);
  const [selectedProductMovements, setSelectedProductMovements] = useState([]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      let matchesStatus = true;
      if (selectedStatus === 'in_stock') {
        matchesStatus = product.inventory > lowStockThreshold;
      } else if (selectedStatus === 'low_stock') {
        matchesStatus = product.inventory <= lowStockThreshold && product.inventory > 0;
      } else if (selectedStatus === 'out_of_stock') {
        matchesStatus = product.inventory === 0;
      }
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'inventory':
          aValue = a.inventory;
          bValue = b.inventory;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'value':
          aValue = a.price * a.inventory;
          bValue = b.price * b.inventory;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder, lowStockThreshold]);

  const handleStockAdjustment = (productId, adjustment, reason) => {
    if (adjustment !== undefined) {
      // Quick adjustment
      adjustStock(productId, adjustment, reason);
    } else {
      // Open adjustment modal
      const product = products.find(p => p.id === productId);
      setSelectedProduct(product);
      setIsAdjustmentModalOpen(true);
    }
  };

  const handleViewMovements = (productId) => {
    const movements = getProductStockMovements(productId);
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setSelectedProductMovements(movements);
    setIsMovementsModalOpen(true);
  };

  const handleAdjustmentSubmit = async (adjustmentData) => {
    await adjustStock(
      adjustmentData.productId,
      adjustmentData.adjustment,
      adjustmentData.reason
    );
    setIsAdjustmentModalOpen(false);
    setSelectedProduct(null);
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Inventory Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track stock levels, manage inventory, and monitor alerts
            </p>
          </div>
        </div>

        {/* Inventory Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
                <ApperIcon name="Package" className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Products
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {inventoryMetrics.totalProducts}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 dark:bg-success-900">
                <ApperIcon name="DollarSign" className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Stock Value
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(inventoryMetrics.totalStockValue)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900">
                <ApperIcon name="AlertTriangle" className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Low Stock Items
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {inventoryMetrics.lowStockItems}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-danger-100 dark:bg-danger-900">
                <ApperIcon name="XCircle" className="h-6 w-6 text-danger-600 dark:text-danger-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Out of Stock
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {inventoryMetrics.outOfStockItems}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Stock Alerts
            </h2>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' 
                      ? 'bg-warning-50 dark:bg-warning-900/20 border-warning-400' 
                      : 'bg-danger-50 dark:bg-danger-900/20 border-danger-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ApperIcon 
                        name={alert.type === 'warning' ? 'AlertTriangle' : 'XCircle'} 
                        className={`h-5 w-5 mr-3 ${
                          alert.type === 'warning' ? 'text-warning-600' : 'text-danger-600'
                        }`} 
                      />
                      <div>
                        <p className={`font-medium ${
                          alert.type === 'warning' 
                            ? 'text-warning-800 dark:text-warning-200' 
                            : 'text-danger-800 dark:text-danger-200'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      icon="X"
                      onClick={() => dismissAlert(alert.id)}
                      className="!p-2"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="all">All Categories</option>
            {productCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field"
          >
            {inventoryFilters.status.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            {inventoryFilters.sortBy.map(sort => (
              <option key={sort.value} value={sort.value}>
                Sort by {sort.label}
              </option>
            ))}
          </select>

          <Button
            variant="secondary"
            icon={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg ${
                viewMode === 'cards' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <ApperIcon name="Grid3X3" className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${
                viewMode === 'table' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <ApperIcon name="List" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Inventory Display */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <ApperIcon name="Package" className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="inventory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === 'cards' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <InventoryCard
                  key={product.id}
                  product={product}
                  onStockAdjust={handleStockAdjustment}
                  onViewMovements={handleViewMovements}
                  lowStockThreshold={lowStockThreshold}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stock Adjustment Modal */}
        <StockAdjustmentModal
          isOpen={isAdjustmentModalOpen}
          onClose={() => {
            setIsAdjustmentModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          currentStock={selectedProduct?.inventory || 0}
          onSubmit={handleAdjustmentSubmit}
        />

        {/* Stock Movements Modal */}
        <Modal
          isOpen={isMovementsModalOpen}
          onClose={() => {
            setIsMovementsModalOpen(false);
            setSelectedProduct(null);
            setSelectedProductMovements([]);
          }}
          title={`Stock Movement History - ${selectedProduct?.name}`}
          size="lg"
        >
          <div className="space-y-4">
            {selectedProductMovements.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="History" className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No stock movements recorded for this product
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedProductMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        movement.type === 'stock_in' 
                          ? 'bg-success-100 dark:bg-success-900' 
                          : 'bg-danger-100 dark:bg-danger-900'
                      }`}>
                        <ApperIcon 
                          name={movement.type === 'stock_in' ? 'Plus' : 'Minus'} 
                          className={`h-4 w-4 ${
                            movement.type === 'stock_in' 
                              ? 'text-success-600 dark:text-success-400' 
                              : 'text-danger-600 dark:text-danger-400'
                          }`} 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {movement.type === 'stock_in' ? '+' : '-'}{movement.quantity} units
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {movement.reason}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(movement.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stock: {movement.previousStock} → {movement.newStock}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        By {movement.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      </motion.div>
    </div>
  );
};

export default Inventory;
