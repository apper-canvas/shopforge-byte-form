export const stockAdjustmentTypes = [
  { value: 'stock_in', label: 'Stock In', icon: 'Plus', color: 'success' },
  { value: 'stock_out', label: 'Stock Out', icon: 'Minus', color: 'danger' },
  { value: 'adjustment', label: 'Adjustment', icon: 'Edit', color: 'warning' },
  { value: 'damaged', label: 'Damaged', icon: 'AlertTriangle', color: 'danger' },
  { value: 'returned', label: 'Returned', icon: 'RotateCcw', color: 'primary' },
  { value: 'sold', label: 'Sold', icon: 'ShoppingCart', color: 'success' }
];

export const stockAdjustmentReasons = [
  'Manual count adjustment',
  'Received new shipment',
  'Product sold',
  'Product returned',
  'Damaged/defective items',
  'Lost/stolen inventory',
  'Promotional giveaway',
  'Internal use',
  'Quality control rejection',
  'Supplier credit',
  'Other'
];

export const stockStatusConfig = {
  in_stock: {
    label: 'In Stock',
    color: 'success',
    bgColor: 'bg-success-100 dark:bg-success-900',
    textColor: 'text-success-800 dark:text-success-100',
    icon: 'CheckCircle'
  },
  low_stock: {
    label: 'Low Stock',
    color: 'warning',
    bgColor: 'bg-warning-100 dark:bg-warning-900',
    textColor: 'text-warning-800 dark:text-warning-100',
    icon: 'AlertTriangle'
  },
  out_of_stock: {
    label: 'Out of Stock',
    color: 'danger',
    bgColor: 'bg-danger-100 dark:bg-danger-900',
    textColor: 'text-danger-800 dark:text-danger-100',
    icon: 'XCircle'
  }
};

export const inventoryColumns = [
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'inventory', label: 'Stock Level', sortable: true },
  { key: 'price', label: 'Unit Price', sortable: true },
  { key: 'value', label: 'Stock Value', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false }
];

export const inventoryFilters = {
  status: [
    { value: 'all', label: 'All Products' },
    { value: 'in_stock', label: 'In Stock' },
    { value: 'low_stock', label: 'Low Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ],
  sortBy: [
    { value: 'name', label: 'Product Name' },
    { value: 'category', label: 'Category' },
    { value: 'inventory', label: 'Stock Level' },
    { value: 'price', label: 'Unit Price' },
    { value: 'value', label: 'Stock Value' }
  ],
  sortOrder: [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ]
};

export const stockAdjustmentFormConfig = {
  fields: [
    {
      name: 'adjustment',
      label: 'Stock Adjustment',
      type: 'number',
      placeholder: 'Enter quantity (+ for increase, - for decrease)',
      required: true,
      icon: 'Hash'
    },
    {
      name: 'reason',
      label: 'Reason',
      type: 'select',
      options: stockAdjustmentReasons.map(reason => ({ value: reason, label: reason })),
      required: true,
      icon: 'MessageSquare'
    },
    {
      name: 'notes',
      label: 'Additional Notes',
      type: 'textarea',
      placeholder: 'Optional notes about this adjustment...',
      required: false,
      icon: 'FileText',
      fullWidth: true
    }
  ]
};
