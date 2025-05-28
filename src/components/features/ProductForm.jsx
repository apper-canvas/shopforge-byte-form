import { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import Button from '../common/Button';
import { productFormConfig } from '../../constants/formConfigs';
import { validateProduct } from '../../utils/validationUtils';

const ProductForm = ({ product = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    inventory: product?.inventory || '',
    category: product?.category || '',
    images: product?.images || []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateProduct(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory),
        images: formData.images.length > 0 ? formData.images : ['/api/placeholder/300/300']
      };

      await onSubmit(productData);
      toast.success(product ? 'Product updated successfully!' : 'Product created successfully!');
    } catch (error) {
      toast.error('Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productFormConfig.fields.map((field) => (
          <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
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
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          icon={product ? "Save" : "Plus"}
        >
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;