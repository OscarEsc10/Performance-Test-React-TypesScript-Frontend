import { mkdirSync, writeFileSync } from "fs";

// === 1. Create minimal folders ===
const folders = [
  "src/app/dashboard/products",
  "src/components/ui",
  "src/store",
  "src/services",
  "src/types",
];

folders.forEach((f) => mkdirSync(f, { recursive: true }));

// === 2. UI Components ===

// Button
writeFileSync(
  "src/components/ui/Button.tsx",
  `import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const classes = clsx(
    'rounded-md font-medium transition px-4 py-2',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'secondary' && 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
    size === 'sm' && 'text-sm',
    size === 'lg' && 'text-lg'
  );
  return <button className={classes} {...props}>{children}</button>;
};
`
);

// Badge
writeFileSync(
  "src/components/ui/Badge.tsx",
  `import React from 'react';

export const Badge = ({ label, color = 'gray' }: { label: string; color?: string }) => {
  const colors: Record<string, string> = {
    gray: 'bg-gray-200 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  };
  return <span className={\`px-2 py-1 rounded-full text-xs font-semibold \${colors[color]}\`}>{label}</span>;
};
`
);

// Card
writeFileSync(
  "src/components/ui/Card.tsx",
  `import React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import type { Product } from '@/types/product';

export const Card = ({ product }: { product: Product }) => (
  <div className="rounded-xl shadow p-4 flex flex-col gap-3 bg-white">
    <img src={product.imageUrl || '/images/placeholder.png'} alt={product.name} className="w-full h-40 object-cover rounded-md" />
    <div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <p className="text-lg font-bold">\${product.price}</p>
    </div>
    <Badge label={product.category || 'General'} color="blue" />
    <Button variant="secondary" size="sm">Edit</Button>
  </div>
);
`
);

// === 3. Zustand Store ===
writeFileSync(
  "src/store/useProductsStore.ts",
  `import { create } from 'zustand';
import { getProducts, postProduct, updateProduct, deleteProduct } from '@/services/productService';
import type { Product } from '@/types/product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (data: Product) => Promise<void>;
  editProduct: (id: number, data: Product) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await getProducts();
      set({ products: data });
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (data) => { await postProduct(data); await useProductsStore.getState().fetchProducts(); },
  editProduct: async (id, data) => { await updateProduct(id, data); await useProductsStore.getState().fetchProducts(); },
  removeProduct: async (id) => { await deleteProduct(id); await useProductsStore.getState().fetchProducts(); },
}));
`
);

// === 4. Axios Services ===

// axiosClient
writeFileSync(
  "src/services/axiosClient.ts",
  `import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export default api;
`
);

// productService
writeFileSync(
  "src/services/productService.ts",
  `import api from './axiosClient';

export const getProducts = () => api.get('/products');
export const postProduct = (data: any) => api.post('/products', data);
export const updateProduct = (id: number, data: any) => api.put(\`/products/\${id}\`, data);
export const deleteProduct = (id: number) => api.delete(\`/products/\${id}\`);
`
);

// === 5. Types ===
writeFileSync(
  "src/types/product.ts",
  `export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  isActive: boolean;
  category?: string;
  imageUrl?: string;
  createdAt: string;
}
`
);

console.log("✅ Minimal TechNova frontend structure created successfully!");
