import React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import type { Product } from '@/types/product';

export const Card = ({ product }: { product: Product }) => (
  <div className="rounded-xl shadow p-4 flex flex-col gap-3 bg-white">
    <img src={product.imageUrl || '/images/placeholder.png'} alt={product.name} className="w-full h-40 object-cover rounded-md" />
    <div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
    <Badge label={product.category || 'General'} color="blue" />
    <Button variant="secondary" size="sm">Edit</Button>
  </div>
);
