"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/services/userServices";
import type { User } from "@/types/user";
import Modal from "@/components/ui/Modal";
import UserForm from "./components/UserForm";
import type { UserFormValues } from "@/types/formSchemas";

export default function UsersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const searchParams = useSearchParams();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [initialData, setInitialData] = useState<UserFormValues | undefined>(undefined);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
    const ok = confirm("Are you sure you want to delete this user?");
    return ok;
  };

  const handleDelete = async (id: number) => {
    const ok = await confirmDelete(id);
    if (!ok) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const openCreate = () => {
    setEditId(undefined);
    setInitialData({ username: "", email: "", password: "", role: "user", isActive: true });
    setOpen(true);
  };

  const openEdit = (u: User) => {
    setEditId(u.id);
    setInitialData({
      username: u.username,
      email: u.email,
      password: "", // Don't prefill password for edit
      role: u.role,
      isActive: u.isActive,
    });
    setOpen(true);
  };

  const closeAndRefresh = async () => {
    setOpen(false);
    setEditId(undefined);
    setInitialData(undefined);
    setLoading(true);
    await fetchUsers();
  };

   if (!isAdmin) {
    return <div className="p-8 text-center text-red-600">Access denied. Admin only.</div>;
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Create User
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div key={u.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800">{u.username}</h3>
            <p className="text-gray-600">{u.email}</p>
            <p className="text-sm text-gray-500">Role: {u.role}</p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {u.isActive ? 'Active' : 'Inactive'}
            </span>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEdit(u)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} title={editId ? "Edit User" : "Create User"} onClose={closeAndRefresh}>
        <UserForm id={editId} initialData={initialData} onSuccess={closeAndRefresh} />
      </Modal>
    </section>
  );
}
