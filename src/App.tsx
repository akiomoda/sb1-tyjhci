import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Cart } from './components/Cart';
import { ProductGrid } from './components/ProductGrid';
import { Product, CartItem } from './types';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const products: Product[] = [
    { id: '1', name: 'Product A', price: 1.99 },
    { id: '2', name: 'Product B', price: 4.99 },
    { id: '3', name: 'Product C', price: 9.99 },
    { id: '4', name: 'Product D', price: 14.99 },
    { id: '5', name: 'Product E', price: 19.99 },
    { id: '6', name: 'Product F', price: 24.99 },
    { id: '7', name: 'Product G', price: 29.99 },
    { id: '8', name: 'Product H', price: 34.99 },
    { id: '9', name: 'Product I', price: 39.99 },
    { id: '10', name: 'Product J', price: 44.99 },
    { id: '11', name: 'Product K', price: 49.99 },
    { id: '12', name: 'Product L', price: 54.99 },
    { id: '13', name: 'Product M', price: 59.99 },
    { id: '14', name: 'Product N', price: 64.99 },
    { id: '15', name: 'Product O', price: 69.99 }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">POS System</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      activeCategory === 'all'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory('all')}
                  >
                    All Products
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      activeCategory === 'popular'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory('popular')}
                  >
                    Popular
                  </button>
                </div>
              </div>

              <div className="p-4 border-b">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <ProductGrid products={products} addToCart={addToCart} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;