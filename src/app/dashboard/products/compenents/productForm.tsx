"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { productSchema, type ProductFormValues } from "@/types/formSchemas";
import { postProduct, updateProduct } from "@/services/productService";

export default function ProductForm({ initialData, id, onSuccess }: { initialData?: ProductFormValues; id?: number; onSuccess?: () => void }) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormValues>(
    initialData ?? {
      sku: "",
      name: "",
      brand: "",
      quantity: 0,
      price: 0,
      category: "",
      imageUrl: "",
      isActive: true,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let v: any = value;
    if (type === "number") v = Number(value.replace(",", "."));
    if (type === "checkbox") v = checked;
    setForm((prev) => ({ ...prev, [name]: v }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = productSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    setSaving(true);
    try {
      if (id) await updateProduct(id, parsed.data);
      else await postProduct(parsed.data);
      if (onSuccess) onSuccess();
      else router.push("/dashboard/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">{id ? "Edit Product" : "New Product"}</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input name="sku" value={form.sku} onChange={onChange} className="border p-2 rounded" placeholder="SKU" />
      <input name="name" value={form.name} onChange={onChange} className="border p-2 rounded" placeholder="Name" />
      <input name="brand" value={form.brand} onChange={onChange} className="border p-2 rounded" placeholder="Brand" />
      <input name="quantity" type="number" value={form.quantity} onChange={onChange} className="border p-2 rounded" placeholder="Quantity" />
      <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} className="border p-2 rounded" placeholder="Price" />
      <input name="category" value={form.category ?? ""} onChange={onChange} className="border p-2 rounded" placeholder="Category" />
      <input name="imageUrl" value={form.imageUrl ?? ""} onChange={onChange} className="border p-2 rounded" placeholder="Image URL" />

      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isActive" checked={form.isActive} onChange={onChange} /> Active</label>

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
