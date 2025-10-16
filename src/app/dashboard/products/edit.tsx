"use client";

import ProductForm from "./compenents/productForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Edit Product #{params.id}
      </h1>
      <ProductForm />
    </section>
  );
}
