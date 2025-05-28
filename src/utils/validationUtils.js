export const validateProduct = (productData) => {
  const errors = {};

  if (!productData.name?.trim()) {
    errors.name = 'Product name is required';
  }

  if (!productData.description?.trim()) {
    errors.description = 'Product description is required';
  }

  if (!productData.price || parseFloat(productData.price) <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (!productData.inventory || parseInt(productData.inventory) < 0) {
    errors.inventory = 'Inventory must be 0 or greater';
  }

  if (!productData.category?.trim()) {
    errors.category = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};