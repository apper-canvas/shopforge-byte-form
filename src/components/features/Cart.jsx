import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatUtils';
import { useCart } from '../../hooks/useCart';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty');
      return;
    }
    
    // Simulate checkout process
    toast.success('Order placed successfully!');
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Shopping Cart ({cartItems.length})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ApperIcon name="ShoppingCart" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <img
                            src={item.images[0] || '/api/placeholder/80/80'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatCurrency(item.price)}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <ApperIcon name="Minus" className="h-4 w-4" />
                            </button>
                            
                            <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <ApperIcon name="Plus" className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded text-gray-400 hover:text-danger-600 dark:hover:text-danger-400"
                          >
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>Total:</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full"
                      icon="CreditCard"
                    >
                      Checkout
                    </Button>
                    
                    <Button
                      onClick={clearCart}
                      variant="secondary"
                      className="w-full"
                      icon="Trash2"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart;