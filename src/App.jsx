import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Storefront from './pages/Storefront';
import Cart from './components/features/Cart';
import { AppProviders } from './context/AppProviders';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <AppProviders>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              currentView={currentView}
              setCurrentView={setCurrentView}
              onCartClick={() => setIsCartOpen(true)}
            />
            
            <main className="pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Routes>
                    <Route path="/" element={
                      currentView === 'dashboard' ? <Dashboard /> :
                      currentView === 'products' ? <Products /> :
                      currentView === 'orders' ? <Orders /> :
                      <Storefront />
                    } />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>

            <Cart 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDarkMode ? 'dark' : 'light'}
              className="mt-16"
            />
          </div>
        </Router>
      </AppProviders>
    </div>
  );
}

export default App;