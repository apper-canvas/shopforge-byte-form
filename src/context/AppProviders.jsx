import { CartProvider } from '../hooks/useCart';

export const AppProviders = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};