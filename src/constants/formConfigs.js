export const productFormConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Product Name',
      placeholder: 'Enter product name',
      required: true,
      icon: 'Package'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter product description',
      required: true,
      fullWidth: true,
      icon: 'FileText'
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      placeholder: '0.00',
      required: true,
      icon: 'DollarSign'
    },
    {
      name: 'inventory',
      type: 'number',
      label: 'Inventory',
      placeholder: '0',
      required: true,
      icon: 'Package'
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      icon: 'Tag'
    }
  ]
};