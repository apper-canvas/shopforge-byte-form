import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatUtils';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product, onEdit, onDelete, isAdmin = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(product);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id);
      toast.success('Product deleted successfully');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
          <img
            src={product.images[0] || '/api/placeholder/300/300'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Stock Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.inventory > 10 
                ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                : product.inventory > 0
                ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100'
                : 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-100'
            }`}>
              {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  icon="Edit"
                  onClick={() => onEdit(product)}
                  className="!p-2"
                />
                <Button
                  size="sm"
                  variant="danger"
                  icon="Trash2"
                  onClick={handleDelete}
                  className="!p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(product.price)}
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Category: {product.category}
              </div>
            </div>

            {!isAdmin && (
              <Button
                size="sm"
                icon="ShoppingCart"
                onClick={handleAddToCart}
                loading={isLoading}
                disabled={product.inventory === 0}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;