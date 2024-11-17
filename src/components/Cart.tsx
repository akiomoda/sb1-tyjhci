import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { CheckoutDialog } from './CheckoutDialog';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export function Cart({ cart, removeFromCart, updateQuantity }: CartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalWithoutVAT = total / 1.21;
  const vat = total - subtotalWithoutVAT;

  const handlePrint = () => {
    const printContent = `
      TICKET DE VENTA
      ${new Date().toLocaleString()}
      
      ${cart.map(item => `
      ${item.name}
      ${item.quantity} x ${item.price.toFixed(2)}€ = ${(item.quantity * item.price).toFixed(2)}€
      `).join('\n')}
      
      Base Imponible: ${subtotalWithoutVAT.toFixed(2)}€
      IVA (21%): ${vat.toFixed(2)}€
      Total: ${total.toFixed(2)}€
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<pre>' + printContent + '</pre>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow h-full flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Venta Actual</h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex flex-col border rounded-lg p-3 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price.toFixed(2)}€/ud.
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 bg-white rounded-md border p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-medium">
                  {(item.quantity * item.price).toFixed(2)}€
                </span>
              </div>
            </div>
          ))}
          
          {cart.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No hay productos en la cesta
            </div>
          )}
        </div>

        <div className="p-4 border-t mt-auto space-y-2 bg-white">
          <div className="flex justify-between text-gray-600">
            <span>Base Imponible</span>
            <span>{subtotalWithoutVAT.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>IVA (21%)</span>
            <span>{vat.toFixed(2)}€</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total (IVA incluido)</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cart.length === 0}
          >
            Cobrar: {total.toFixed(2)}€
          </button>
        </div>
      </div>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onPrint={handlePrint}
      />
    </>
  );
}