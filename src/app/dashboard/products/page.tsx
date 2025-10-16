"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/services/productService";
import type { Product } from "@/types/product";
import Modal from "@/components/ui/Modal";
import ProductForm from "./compenents/productForm";
import type { ProductFormValues } from "@/types/formSchemas";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [initialData, setInitialData] = useState<ProductFormValues | undefined>(undefined);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open create modal if URL contains ?new=1
  useEffect(() => {
    const newFlag = searchParams.get("new");
    if (newFlag === "1") {
      openCreate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const confirmDelete = async (id: number) => {
    try {
      // Dynamic import sweetalert2 if available
      const Swal = (await import("sweetalert2")).default;
      const res = await Swal.fire({
        title: "Delete product?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete",
      });
      return res.isConfirmed;
    } catch {
      // Fallback to native confirm
      return confirm("Are you sure you want to delete this product?");
    }
  };

  const handleDelete = async (id: number) => {
    const ok = await confirmDelete(id);
    if (!ok) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  const openCreate = () => {
    setEditId(undefined);
    setInitialData({ sku: "", name: "", brand: "", quantity: 0, price: 0, category: "", imageUrl: "", isActive: true });
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    const init: ProductFormValues = {
      sku: p.sku,
      name: p.name,
      brand: p.brand,
      quantity: p.quantity,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      isActive: p.isActive,
    };
    setInitialData(init);
    setOpen(true);
  };

  const closeAndRefresh = async () => {
    setOpen(false);
    setEditId(undefined);
    setInitialData(undefined);
    setLoading(true);
    await fetchProducts();
    // Clean query param if present
    router.push("/dashboard/products");
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Product
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <img
              src={product.imageUrl || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.brand} {product.category ? `/ ${product.category}` : ""}</p>
            <p className="text-lg font-bold text-green-600 mt-1">${product.price}</p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEdit(product)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} title={editId ? "Edit Product" : "New Product"} onClose={closeAndRefresh}>
        <ProductForm id={editId} initialData={initialData} onSuccess={closeAndRefresh} />
      </Modal>
    </section>
  );
}