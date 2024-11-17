import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export function ProductGrid({ products, addToCart }: ProductGridProps) {
  return (
    <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
      {products.map(product => (
        <div
          key={product.id}
          className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow bg-gray-50 text-center"
          onClick={() => addToCart(product)}
        >
          <div className="flex flex-col justify-between h-full">
            <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
            <p className="text-blue-600 font-semibold text-sm mt-1">
              {product.price.toFixed(2)}€
              <span className="block text-xs text-gray-500">(IVA incl.)</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}