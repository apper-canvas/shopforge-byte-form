import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { stockAdjustmentFormConfig } from '../../constants/inventoryConfig';
import { validateRequired } from '../../utils/validationUtils';

const StockAdjustmentModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onSubmit, 
  currentStock = 0 
}) => {
  const [formData, setFormData] = useState({
    adjustment: '',
    reason: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewStock, setPreviewStock] = useState(currentStock);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        adjustment: '',
        reason: '',
        notes: ''
      });
      setErrors({});
      setPreviewStock(currentStock);
    }
  }, [isOpen, currentStock]);

  useEffect(() => {
    const adjustment = parseInt(formData.adjustment) || 0;
    setPreviewStock(Math.max(0, currentStock + adjustment));
  }, [formData.adjustment, currentStock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.adjustment)) {
      newErrors.adjustment = 'Stock adjustment is required';
    } else {
      const adjustment = parseInt(formData.adjustment);
      if (isNaN(adjustment)) {
        newErrors.adjustment = 'Adjustment must be a valid number';
      } else if (adjustment === 0) {
        newErrors.adjustment = 'Adjustment cannot be zero';
      } else if (currentStock + adjustment < 0) {
        newErrors.adjustment = `Cannot reduce stock below zero. Maximum reduction: ${currentStock}`;
      }
    }

    if (!validateRequired(formData.reason)) {
      newErrors.reason = 'Reason is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const adjustment = parseInt(formData.adjustment);
      await onSubmit({
        productId: product?.id,
        adjustment,
        reason: formData.reason,
        notes: formData.notes
      });
      
      onClose();
      toast.success('Stock adjustment completed successfully');
    } catch (error) {
      toast.error('Failed to adjust stock');
    } finally {
      setIsLoading(false);
    }
  };

  const getAdjustmentType = () => {
    const adjustment = parseInt(formData.adjustment) || 0;
    if (adjustment > 0) return { type: 'increase', color: 'text-success-600', icon: 'TrendingUp' };
    if (adjustment < 0) return { type: 'decrease', color: 'text-danger-600', icon: 'TrendingDown' };
    return { type: 'neutral', color: 'text-gray-600', icon: 'Minus' };
  };

  const adjustmentInfo = getAdjustmentType();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Stock Level"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Info */}
        {product && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              {product.name}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Current Stock:</span>
                <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                  {currentStock} units
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stock Adjustment Preview */}
        {formData.adjustment && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Stock after adjustment:</span>
                <div className={`text-lg font-semibold ${adjustmentInfo.color}`}>
                  {previewStock} units
                  <span className="text-sm ml-2">
                    ({parseInt(formData.adjustment) > 0 ? '+' : ''}{formData.adjustment})
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ${adjustmentInfo.color}`}>
                <i className={`icon-${adjustmentInfo.icon} text-lg`} />
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {stockAdjustmentFormConfig.fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
              {field.type === 'select' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="input-field"
                    required={field.required}
                  >
                    <option value="">Select a reason...</option>
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ) : field.type === 'textarea' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={3}
                    className="input-field"
                    required={field.required}
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                  icon={field.icon}
                />
              )}
            </div>
          ))}
        </div>

        {/* Warning for large adjustments */}
        {formData.adjustment && Math.abs(parseInt(formData.adjustment)) > 50 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-yellow-600 dark:text-yellow-400 mr-2">
                <i className="icon-AlertTriangle text-lg" />
              </div>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Large stock adjustment detected. Please ensure this is correct.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            icon="Check"
          >
            Confirm Adjustment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StockAdjustmentModal;
