"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome{user ? `, ${user.username}` : ""}. Manage your products below.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link href="/dashboard/products" className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6">
          <h2 className="text-xl font-semibold text-gray-800">Products</h2>
          <p className="text-gray-600 mt-1">Create, update and manage products.</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Products</div>
        </Link>

        {isAdmin && (
          <Link href="/dashboard/users" className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6">
            <h2 className="text-xl font-semibold text-gray-800">Users (Admin)</h2>
            <p className="text-gray-600 mt-1">List and manage users and roles.</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black">Go to Users</div>
          </Link>
        )}
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick tips</h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Non-admins can add and update products, but cannot delete them.</li>
          <li>Admins can also manage users.</li>
          <li>Use the Products section to access full CRUD and filters.</li>
        </ul>
      </div>
    </section>
  );
}
