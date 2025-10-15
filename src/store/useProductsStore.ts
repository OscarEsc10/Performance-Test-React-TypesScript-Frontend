import { create } from 'zustand';
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
