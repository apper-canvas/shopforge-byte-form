import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import { navigationConfig } from '../../constants/navigationConfig';

const Header = ({ isDarkMode, toggleDarkMode, currentView, setCurrentView, onCartClick }) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200/30 dark:border-gray-700/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Store" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">ShopForge</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationConfig.mainNav.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <ApperIcon name={item.icon} className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              </motion.button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <motion.button
              onClick={onCartClick}
              className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="ShoppingCart" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon 
                name={isDarkMode ? "Sun" : "Moon"} 
                className="h-5 w-5" 
              />
            </motion.button>

            {/* User Menu */}
            <motion.button
              className="p-2 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="User" className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;