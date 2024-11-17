import React from 'react';
import { Minus, Plus, Printer, X } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  onPrint: () => void;
}

export function CheckoutDialog({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  onPrint,
}: CheckoutDialogProps) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalWithoutVAT = total / 1.21;
  const vat = total - subtotalWithoutVAT;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Finalizar Venta</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price.toFixed(2)}€/ud.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-medium w-24 text-right">
                    {(item.quantity * item.price).toFixed(2)}€
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t space-y-2">
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
          <div className="flex space-x-4 mt-6">
            <button
              onClick={onPrint}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Printer className="w-5 h-5" />
              <span>Imprimir Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}