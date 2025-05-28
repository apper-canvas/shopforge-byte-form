import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import { buttonClasses } from '../../styles/componentClasses';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = buttonClasses.base;
  const variantClasses = buttonClasses[variant] || buttonClasses.primary;
  const sizeClasses = buttonClasses.sizes[size];
  
  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading ? (
          <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <ApperIcon name={icon} className="h-4 w-4" />
            )}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'right' && (
              <ApperIcon name={icon} className="h-4 w-4" />
            )}
          </>
        )}
      </div>
    </motion.button>
  );
};

export default Button;