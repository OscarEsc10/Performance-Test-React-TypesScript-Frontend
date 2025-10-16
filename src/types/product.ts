// Product interface - fulfill with the fields required in the test
export interface Product {
  id: number;            // unique identifier
  sku: string;           // SKU unique
  name: string;          // product name
  brand: string;         // brand
  quantity: number;      // quantity
  price: number;         // Price
  isActive: boolean;     // status active/inactive
  category?: string;     // optional category
  imageUrl?: string;     // optional image url
  createdAt: string;     // date created
}
