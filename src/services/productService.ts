import api from "./axiosClient";
import type { Product } from "@/types/product";

// Types for payloads
export type CreateProductDto = Omit<Product, "id" | "createdAt">;
export type UpdateProductDto = Partial<CreateProductDto>;

// Product Service
export const getProducts = (params?: { brand?: string; category?: string; page?: number; limit?: number }) =>
  api.get("/products", { params });

export const postProduct = (data: CreateProductDto) => api.post("/products", data);
export const updateProduct = (id: number, data: UpdateProductDto) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const getProductById = (id: number) => api.get(`/products/${id}`);