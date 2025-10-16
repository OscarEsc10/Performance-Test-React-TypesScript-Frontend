"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const onProducts = pathname?.startsWith("/dashboard/products");

  const handleLogout = () => {
    logout();
    router.push("/dashboard/login");
  };

  const openNewProduct = () => {
    router.push("/dashboard/products?new=1");
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-500 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
          Technova
        </Link>
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
