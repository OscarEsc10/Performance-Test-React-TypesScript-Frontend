export interface Product {
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
