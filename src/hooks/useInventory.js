import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useProducts } from './useProducts';
import { generateId } from '../utils/formatUtils';

export const useInventory = () => {
  const { products, updateProduct } = useProducts();
  const [stockMovements, setStockMovements] = useState([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate inventory metrics
  const inventoryMetrics = {
    totalProducts: products.length,
    totalStockValue: products.reduce((sum, product) => sum + (product.price * product.inventory), 0),
    lowStockItems: products.filter(product => product.inventory <= lowStockThreshold && product.inventory > 0).length,
    outOfStockItems: products.filter(product => product.inventory === 0).length,
    averageStockLevel: products.length > 0 ? products.reduce((sum, product) => sum + product.inventory, 0) / products.length : 0
  };

  // Generate low stock alerts
  useEffect(() => {
    const lowStockProducts = products.filter(product => 
      product.inventory <= lowStockThreshold && product.inventory > 0
    );
    
    const outOfStockProducts = products.filter(product => product.inventory === 0);
    
    const newAlerts = [
      ...lowStockProducts.map(product => ({
        id: `low-stock-${product.id}`,
        type: 'warning',
        product: product,
        message: `Low stock alert: ${product.name} has only ${product.inventory} units remaining`,
        timestamp: new Date().toISOString(),
        priority: 'medium'
      })),
      ...outOfStockProducts.map(product => ({
        id: `out-of-stock-${product.id}`,
        type: 'danger',
        product: product,
        message: `Out of stock: ${product.name} is completely out of stock`,
        timestamp: new Date().toISOString(),
        priority: 'high'
      }))
    ];

    setAlerts(newAlerts);
  }, [products, lowStockThreshold]);

  // Adjust stock levels
  const adjustStock = async (productId, adjustment, reason = 'Manual adjustment') => {
    setIsLoading(true);
    try {
      const product = products.find(p => p.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }

      const newStock = Math.max(0, product.inventory + adjustment);
      const actualAdjustment = newStock - product.inventory;

      // Update product inventory
      await updateProduct(productId, { inventory: newStock });

      // Record stock movement
      const movement = {
        id: generateId(),
        productId,
        productName: product.name,
        type: adjustment > 0 ? 'stock_in' : 'stock_out',
        quantity: Math.abs(actualAdjustment),
        previousStock: product.inventory,
        newStock,
        reason,
        timestamp: new Date().toISOString(),
        user: 'Admin' // In a real app, this would come from auth context
      };

      setStockMovements(prev => [movement, ...prev]);

      toast.success(`Stock ${adjustment > 0 ? 'increased' : 'decreased'} successfully`);
      return movement;
    } catch (error) {
      toast.error('Failed to adjust stock');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk stock adjustment
  const bulkAdjustStock = async (adjustments) => {
    setIsLoading(true);
    try {
      const movements = [];
      
      for (const { productId, adjustment, reason } of adjustments) {
        const movement = await adjustStock(productId, adjustment, reason);
        movements.push(movement);
      }

      toast.success(`Bulk stock adjustment completed for ${adjustments.length} products`);
      return movements;
    } catch (error) {
      toast.error('Failed to complete bulk stock adjustment');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Set stock level directly
  const setStockLevel = async (productId, newStock, reason = 'Stock level update') => {
    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const adjustment = newStock - product.inventory;
    return adjustStock(productId, adjustment, reason);
  };

  // Get stock movements for a specific product
  const getProductStockMovements = (productId) => {
    return stockMovements.filter(movement => movement.productId === productId);
  };

  // Dismiss alert
  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  // Get products with low stock
  const getLowStockProducts = () => {
    return products.filter(product => 
      product.inventory <= lowStockThreshold && product.inventory > 0
    );
  };

  // Get out of stock products
  const getOutOfStockProducts = () => {
    return products.filter(product => product.inventory === 0);
  };

  return {
    inventoryMetrics,
    stockMovements,
    alerts,
    lowStockThreshold,
    isLoading,
    adjustStock,
    bulkAdjustStock,
    setStockLevel,
    setLowStockThreshold,
    getProductStockMovements,
    dismissAlert,
    getLowStockProducts,
    getOutOfStockProducts
  };
};
