import { forwardRef } from 'react';
import ApperIcon from '../ApperIcon';
import { inputClasses } from '../../styles/componentClasses';

const Input = forwardRef(({ 
  type = 'text',
  label,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const baseClasses = inputClasses.base;
  const errorClasses = error ? inputClasses.error : inputClasses.normal;
  const iconClasses = icon ? (iconPosition === 'left' ? inputClasses.iconLeft : inputClasses.iconRight) : '';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              className="h-5 w-5 text-gray-400 dark:text-gray-500" 
            />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`${baseClasses} ${errorClasses} ${iconClasses} ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              className="h-5 w-5 text-gray-400 dark:text-gray-500" 
            />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-danger-600 dark:text-danger-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;