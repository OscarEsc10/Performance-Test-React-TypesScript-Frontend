"use client";

import ProductForm from "../compenents/productForm";

export default function NewProductPage() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      <ProductForm />
    </section>
  );
}
