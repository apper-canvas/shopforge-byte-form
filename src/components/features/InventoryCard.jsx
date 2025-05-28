import { motion } from 'framer-motion';
import { useState } from 'react';
import ApperIcon from '../ApperIcon';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatUtils';
import { stockStatusConfig } from '../../constants/inventoryConfig';

const InventoryCard = ({ product, onStockAdjust, onViewMovements, lowStockThreshold = 10 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine stock status
  const getStockStatus = () => {
    if (product.inventory === 0) return 'out_of_stock';
    if (product.inventory <= lowStockThreshold) return 'low_stock';
    return 'in_stock';
  };

  const stockStatus = getStockStatus();
  const statusConfig = stockStatusConfig[stockStatus];
  const stockValue = product.price * product.inventory;

  const handleQuickAdjust = (adjustment) => {
    onStockAdjust(product.id, adjustment, `Quick ${adjustment > 0 ? 'increase' : 'decrease'}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Category: {product.category}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                <ApperIcon name={statusConfig.icon} className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </span>
              {stockStatus === 'low_stock' && (
                <span className="text-xs text-warning-600 dark:text-warning-400">
                  Only {product.inventory} left!
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {product.inventory}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              units
            </div>
          </div>
        </div>

        {/* Stock Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unit Price</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(product.price)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Stock Value</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(stockValue)}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              icon="Minus"
              onClick={() => handleQuickAdjust(-1)}
              disabled={product.inventory === 0}
              className="!p-2"
            />
            <Button
              size="sm"
              variant="secondary"
              icon="Plus"
              onClick={() => handleQuickAdjust(1)}
              className="!p-2"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              icon="Edit"
              onClick={() => onStockAdjust(product.id)}
            >
              Adjust
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon="History"
              onClick={() => onViewMovements(product.id)}
            >
              History
            </Button>
          </div>
        </div>

        {/* Expandable Details */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <span>Product Details</span>
            <ApperIcon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              className="h-4 w-4" 
            />
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2"
            >
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Description:</span>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {product.description}
                </p>
              </div>
              {product.sku && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">SKU:</span>
                  <span className="text-gray-900 dark:text-gray-100 ml-2">
                    {product.sku}
                  </span>
                </div>
              )}
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="text-gray-900 dark:text-gray-100 ml-2">
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default InventoryCard;
